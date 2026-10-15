import { useState } from "react";
import { Sparkles, ArrowRight, Grid, LayoutList } from "lucide-react";
import { NEWS_CATEGORIES, featuredArticle, topStories, latestNews } from "./data/newsData";
import FeaturedArticleCard from "./components/FeaturedArticleCard";
import TopStoryCard from "./components/TopStoryCard";
import LatestNewsCard from "./components/LatestNewsCard";
import ArticleModal from "./components/ArticleModal";
import PersonalizeFeedModal from "./components/PersonalizeFeedModal";

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All News");
  const [savedArticles, setSavedArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(null);
  const [personalizeOpen, setPersonalizeOpen] = useState(false);
  const [userInterests, setUserInterests] = useState([]);
  const [showAllLatest, setShowAllLatest] = useState(false); // View All state

  const toggleSave = (id) => {
    setSavedArticles((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const allArticles = [...topStories, ...latestNews];
  const filteredNews = selectedCategory === "All News" 
    ? allArticles 
    : allArticles.filter(item => item.category === selectedCategory);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">
            Tech Intelligence Hub
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Deep-dives, architecture breakdowns, and breaking engineering breakthroughs.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPersonalizeOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-on-primary text-xs font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Personalize Feed</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {NEWS_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => { setSelectedCategory(cat); setShowAllLatest(false); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-primary text-on-primary shadow-md shadow-primary/15"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Hero / Featured & Top Stories Grid */}
      {selectedCategory === "All News" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <FeaturedArticleCard article={featuredArticle} onRead={setActiveArticle} />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-on-surface">Top Stories</h3>
            </div>
            {topStories.slice(0, 3).map((story) => (
              <TopStoryCard
                key={story.id}
                article={story}
                saved={savedArticles.includes(story.id)}
                onToggleSave={toggleSave}
                onRead={setActiveArticle}
              />
            ))}
          </div>
        </div>
      )}

      {/* Latest / Filtered News Section with View All */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-on-surface">
            {selectedCategory === "All News" ? "Latest Engineering Dispatches" : `${selectedCategory} Articles`}
          </h3>
          {selectedCategory === "All News" && !showAllLatest && (
            <button
              onClick={() => setShowAllLatest(true)}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              View All ({allArticles.length}) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(showAllLatest ? filteredNews : filteredNews.slice(0, 6)).map((item) => (
            <LatestNewsCard
              key={item.id}
              article={item}
              saved={savedArticles.includes(item.id)}
              onToggleSave={toggleSave}
              onRead={setActiveArticle}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      <ArticleModal
        article={activeArticle}
        saved={activeArticle ? savedArticles.includes(activeArticle.id) : false}
        onToggleSave={toggleSave}
        onClose={() => setActiveArticle(null)}
      />

      <PersonalizeFeedModal
        open={personalizeOpen}
        onClose={() => setPersonalizeOpen(false)}
        initialInterests={userInterests}
        onSave={(newInterests) => {
          setUserInterests(newInterests);
          setPersonalizeOpen(false);
        }}
      />
    </div>
  );
}