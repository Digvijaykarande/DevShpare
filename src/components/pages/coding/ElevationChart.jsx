import { motion } from "framer-motion";
import { computeTrappedWater } from "../../../pages/coding/data/problems";

export default function ElevationChart({ heights }) {
  const { trapped, total } = computeTrappedWater(heights);
  const max = Math.max(...heights, 1);
  const peak = Math.max(...heights);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-on-surface">Visual Elevation Matrix (Profile)</span>
        <span className="text-xs font-semibold text-secondary">trapped_units = {total}</span>
      </div>

      <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/60 flex flex-col items-center">
        <div className="w-full h-36 flex items-end justify-between gap-1 px-2 pt-4 bg-surface-container-lowest rounded-lg border border-outline-variant/50">
          {heights.map((h, i) => {
            const isPeak = h === peak;
            const waterUnits = trapped[i];
            return (
              <div key={i} className="flex-1 flex flex-col justify-end items-center h-full">
                {waterUnits > 0 && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(waterUnits / max) * 100}%` }}
                    transition={{ duration: 0.5, delay: i * 0.02, ease: "easeOut" }}
                    className="w-full bg-secondary/80 rounded-t-sm mb-0.5 shadow-xs"
                  />
                )}
                <div
                  className={`w-full rounded-t-sm ${isPeak ? "bg-primary-container" : "bg-outline-variant"}`}
                  style={{ height: h === 0 ? "2px" : `${(h / max) * 100}%` }}
                />
                <span className={`text-[10px] mt-1 font-code ${isPeak ? "text-primary-container font-bold" : "text-outline"}`}>
                  {h}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4 mt-3 pt-1 text-[11px] text-on-surface-variant flex-wrap justify-center">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-xs bg-outline-variant" />
            <span className="font-medium">Terrain Block</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-xs bg-secondary/80" />
            <span className="text-secondary font-semibold">Trapped Rain Water (blue)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-xs bg-primary-container" />
            <span className="text-primary-container font-semibold">Max Peak ({peak})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
