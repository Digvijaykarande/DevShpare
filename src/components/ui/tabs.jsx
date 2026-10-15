import { createContext, useContext, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "../../utils/cn";

const TabsContext = createContext(null);

function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs.* components must be used inside <Tabs>");
  return ctx;
}

/** Root: holds the active value. Uncontrolled by default (defaultValue), or pass value+onValueChange. */
export function Tabs({ defaultValue, value, onValueChange, className, children }) {
  const [internal, setInternal] = useState(defaultValue);
  const active = value ?? internal;
  const setActive = onValueChange ?? setInternal;
  const layoutId = useId();

  return (
    <TabsContext.Provider value={{ active, setActive, layoutId }}>
      <div className={cn("flex flex-col", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children }) {
  return (
    <div
      role="tablist"
      className={cn(
        "flex items-center gap-1 p-1 rounded-lg bg-surface-container-low border border-outline-variant/50 overflow-x-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className }) {
  const { active, setActive, layoutId } = useTabs();
  const isActive = active === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => setActive(value)}
      className={cn(
        "relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors z-0",
        isActive ? "text-on-surface" : "text-on-surface-variant hover:text-on-surface",
        className
      )}
    >
      {isActive && (
        <motion.span
          layoutId={`tabs-indicator-${layoutId}`}
          className="absolute inset-0 rounded-md bg-surface-container-lowest shadow-2xs border border-outline-variant/60 -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
        />
      )}
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }) {
  const { active } = useTabs();
  const reduceMotion = useReducedMotion();
  if (active !== value) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={value}
        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
