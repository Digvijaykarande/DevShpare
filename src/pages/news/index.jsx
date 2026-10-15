import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Newspaper, Sparkles, ArrowRight, Search, Bookmark, RefreshCw, X, Filter } from "lucide-react";
import { cn } from "../../utils/cn";
import FeaturedArticleCard from "../../components/pages/news/FeaturedArticleCard";
import TopStoryCard from "../../components/pages/news/TopStoryCard";
import LatestNewsCard from "../../components/pages/news/LatestNewsCard";
import ArticleModal from "../../components/pages/news/ArticleModal";
import PersonalizeFeedModal from "../../components/pages/news/PersonalizeFeedModal";
import Toast from "../../components/ui/toast";
import { api } from "../../lib/api";
import { fetchLiveNews, NEWS_CATEGORIES } from "./data/newsData";

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All News");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [savedIds, setSavedIds] = useState(new Set());
  const [activeArticle, setActiveArticle] = useState(null);
  const [personalizeOpen, setPersonalizeOpen] = useState(false);
  const [interests, setInterests] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Live feed state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featured, setFeatured] = useState(null);
  const [topStories, setTopStories] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [allArticles, setAllArticles] = useState([]);

  const loadNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLiveNews();
      setFeatured(data.featured);
      setTopStories(data.topStories);
      setLatestNews(data.latestNews);
      setAllArticles(data.allNews || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load live tech news. Please click refresh or try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  // Load saved article IDs and personalization preferences from backend (if signed in)
  useEffect(() => {
    if (!localStorage.getItem("devsphere_token")) return;
    let mounted = true;

    // Load saved article bookmarks
    api.get("/news/saved")
      .then((data) => {
        if (mounted && data?.saved?.length) {
          setSavedIds(new Set(data.saved.map((s) => s.articleId)));
        }
      })
      .catch(() => {});

    // Load personalization interests
    api.get("/news/preferences")
      .then((data) => {
        if (mounted && data?.interests?.length) {
          setInterests(data.interests);
        }
      })
      .catch(() => {});

    return () => { mounted = false; };
  }, []);

  const notify = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleSave = (id) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      const wasSaved = next.has(id);
      if (wasSaved) {
        next.delete(id);
        notify("Article removed from bookmarks");
        // Sync with backend
        if (localStorage.getItem("devsphere_token")) {
          api.delete(`/news/saved/${id}`).catch(() => {});
        }
      } else {
        next.add(id);
        notify("Article saved to bookmarks!");
        // Sync with backend — look up article from allArticles state
        if (localStorage.getItem("devsphere_token")) {
          const article = allArticles.find((a) => a.id === id);
          if (article) {
            api.post("/news/saved", {
              id: article.id,
              title: article.title,
              summary: article.summary,
              category: article.category,
              date: article.date,
              source: article.source,
              link: article.link,
              image: article.image,
            }).catch(() => {});
          }
        }
      }
      return next;
    });
  };

  // Main Filter Logic: Search, Category, Personalization, Saved Only
  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      if (!article) return false;

      // Filter by Saved
      if (showSavedOnly && !savedIds.has(article.id)) {
        return false;
      }

      // Filter by Category
      if (activeCategory !== "All News" && article.category !== activeCategory) {
        return false;
      }

      // Filter by Personalization Interests (if any selected)
      if (interests.length > 0 && activeCategory === "All News") {
        const text = `${article.title} ${article.summary} ${article.category}`.toLowerCase();
        const matchesInterest = interests.some((interest) => {
          const keyword = interest.split("&")[0].trim().toLowerCase();
          return text.includes(keyword);
        });
        if (!matchesInterest) return false;
      }

      // Filter by Search Query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const titleMatch = article.title?.toLowerCase().includes(query);
        const summaryMatch = article.summary?.toLowerCase().includes(query);
        const catMatch = article.category?.toLowerCase().includes(query);
        const sourceMatch = article.source?.toLowerCase().includes(query);
        if (!titleMatch && !summaryMatch && !catMatch && !sourceMatch) {
          return false;
        }
      }

      return true;
    });
  }, [allArticles, activeCategory, searchQuery, showSavedOnly, savedIds, interests]);

  // Derived featured, top stories, latest from filtered articles
  const currentFeatured = useMemo(() => {
    if (showSavedOnly || searchQuery || activeCategory !== "All News" || interests.length > 0) {
      return null;
    }
    return featured;
  }, [featured, showSavedOnly, searchQuery, activeCategory, interests]);

  const currentTopStories = useMemo(() => {
    if (currentFeatured) {
      return filteredArticles.filter((a) => a.id !== currentFeatured.id).slice(0, 3);
    }
    return filteredArticles.slice(0, 3);
  }, [filteredArticles, currentFeatured]);

  const currentLatestNews = useMemo(() => {
    const excludeIds = new Set([
      ...(currentFeatured ? [currentFeatured.id] : []),
      ...currentTopStories.map((a) => a.id),
    ]);
    return filteredArticles.filter((a) => !excludeIds.has(a.id));
  }, [filteredArticles, currentFeatured, currentTopStories]);

  const handleSavePreferences = (selected) => {
    setInterests(selected);
    setPersonalizeOpen(false);
    notify(
      selected.length
        ? `Feed personalized for ${selected.length} topic${selected.length > 1 ? "s" : ""}`
        : "Feed preferences cleared"
    );
    // Sync with backend
    if (localStorage.getItem("devsphere_token")) {
      api.post("/news/preferences", { interests: selected }).catch(() => {});
    }
  };

  const resetFilters = () => {
    setActiveCategory("All News");
    setSearchQuery("");
    setShowSavedOnly(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-full overflow-hidden">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-outline-variant/30 pb-6 w-full"
      >
        <div className="flex flex-col gap-1.5 w-full max-w-2xl shrink-0">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <Newspaper className="h-4 w-4" />
            <span>Devsphere Tech Pulse</span>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
              LIVE DISPATCH
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight w-full">
            Stay Ahead in Tech
          </h1>
          <p className="text-sm text-on-surface-variant leading-relaxed w-full block">
            Latest developer updates, AI engineering breakthroughs, open-source trends, and system architectures. Curated for developers, by developers.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap shrink-0 sm:self-start">
          <button
            type="button"
            onClick={() => setShowSavedOnly((prev) => !prev)}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all border shadow-xs cursor-pointer",
              showSavedOnly
                ? "bg-primary text-on-primary border-primary shadow-primary/20"
                : "bg-surface-container-lowest text-on-surface border-outline-variant/60 hover:bg-surface-container-low"
            )}
          >
            <Bookmark className={cn("h-3.5 w-3.5", showSavedOnly && "fill-current")} />
            Saved {savedIds.size > 0 && `(${savedIds.size})`}
          </button>

          <button
            type="button"
            onClick={() => setPersonalizeOpen(true)}
            className="flex items-center gap-1.5 rounded-xl bg-primary-container px-3.5 py-2.5 text-xs font-bold text-on-primary-container hover:bg-primary hover:text-on-primary transition-all border border-primary/20 shadow-xs cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {interests.length ? `Tailored (${interests.length})` : "Personalize Feed"}
          </button>

          <button
            type="button"
            onClick={loadNews}
            disabled={loading}
            aria-label="Refresh news"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-outline-variant/60 bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors shadow-xs cursor-pointer"
          >
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin text-primary")} />
          </button>
        </div>
      </motion.div>

      {/* Search & Category Filter Navigation */}
      <div className="flex flex-col gap-3 w-full">
        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap w-full">
          {/* Real-time Search Input */}
          <div className="relative flex-1 min-w-[240px] w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant/70" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tech news (e.g. OpenAI, React, Rust, Security)..."
              className="w-full rounded-2xl border border-outline-variant/50 bg-surface-container-lowest pl-10 pr-9 py-2.5 text-xs font-medium text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-on-surface-variant hover:text-on-surface"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Tech Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full">
          {NEWS_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer shadow-xs",
                activeCategory === cat && !showSavedOnly
                  ? "bg-primary text-on-primary shadow-md shadow-primary/20"
                  : "bg-surface-container-lowest text-on-surface-variant border border-outline-variant/60 hover:bg-surface-container-low hover:text-on-surface"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center w-full">
          <div className="h-9 w-9 animate-spin rounded-full border-3 border-outline-variant/30 border-t-primary" />
          <p className="text-sm font-bold text-on-surface">Fetching live developer dispatches…</p>
          <p className="text-xs text-on-surface-variant">Connecting to engineering streams</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="flex flex-col items-center gap-3 py-16 text-center rounded-2xl border border-red-500/20 bg-red-500/5 p-6 w-full">
          <p className="text-sm font-bold text-red-600">{error}</p>
          <button
            type="button"
            onClick={loadNews}
            className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-on-primary shadow-sm hover:opacity-90"
          >
            Retry Fetching
          </button>
        </div>
      )}

      {/* Empty Search/Filter Results */}
      {!loading && !error && filteredArticles.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center rounded-3xl border border-dashed border-outline-variant/60 bg-surface-container-lowest p-8 w-full">
          <Filter className="h-10 w-10 text-on-surface-variant/50" />
          <h3 className="font-display text-base font-bold text-on-surface">No technical stories match your filter</h3>
          <p className="text-xs text-on-surface-variant max-w-sm">
            {showSavedOnly
              ? "You haven't bookmarked any tech articles yet. Click the bookmark icon on any article to save it."
              : "Try adjusting your search query or selecting a different technical category."}
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-on-primary shadow-sm hover:opacity-90 transition-all cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* News Content Grid */}
      {!loading && !error && filteredArticles.length > 0 && (
        <div className="flex flex-col gap-8 w-full">
          {/* Featured & Top Stories Section */}
          {(currentFeatured || currentTopStories.length > 0) && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr] w-full">
              {currentFeatured && (
                <FeaturedArticleCard
                  article={currentFeatured}
                  saved={savedIds.has(currentFeatured.id)}
                  onToggleSave={toggleSave}
                  onRead={setActiveArticle}
                />
              )}
              {currentTopStories.length > 0 && (
                <div className="flex flex-col gap-3.5 justify-between w-full">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-sm font-extrabold uppercase tracking-wider text-on-surface-variant">
                      Top Developer Stories
                    </h2>
                    <span className="text-xs text-primary font-bold">{currentTopStories.length} Articles</span>
                  </div>
                  {currentTopStories.map((article) => (
                    <TopStoryCard
                      key={article.id}
                      article={article}
                      saved={savedIds.has(article.id)}
                      onToggleSave={toggleSave}
                      onRead={setActiveArticle}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Latest Technical Dispatches Section */}
          {currentLatestNews.length > 0 && (
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
                <h2 className="font-display text-lg font-bold text-on-surface">
                  Latest Technical Dispatches
                </h2>
                {activeCategory !== "All News" && (
                  <button
                    type="button"
                    onClick={() => setActiveCategory("All News")}
                    className="flex items-center gap-1 text-xs font-bold text-primary hover:opacity-80 transition-opacity"
                  >
                    View All Categories
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 w-full">
                {currentLatestNews.map((article) => (
                  <LatestNewsCard
                    key={article.id}
                    article={article}
                    saved={savedIds.has(article.id)}
                    onToggleSave={toggleSave}
                    onRead={setActiveArticle}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Article Full Detail Modal */}
      <ArticleModal
        article={activeArticle}
        saved={activeArticle ? savedIds.has(activeArticle.id) : false}
        onToggleSave={toggleSave}
        onClose={() => setActiveArticle(null)}
        onNotify={notify}
      />

      {/* Personalize Feed Modal */}
      <PersonalizeFeedModal
        open={personalizeOpen}
        onClose={() => setPersonalizeOpen(false)}
        onSave={handleSavePreferences}
        initialInterests={interests}
      />

      {/* Toast Confirmation */}
      <Toast message={toastMessage} />
    </div>
  );
}