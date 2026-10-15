export default function ConstraintsCard({ constraints }) {
  return (
    <div className="space-y-1.5">
      <h2 className="text-xs font-semibold text-on-surface">Constraints:</h2>
      <div className="bg-surface-container-low border border-outline-variant/60 rounded-xl p-3.5 space-y-1 text-on-surface-variant font-code text-xs">
        {constraints.map((line, i) => (
          <p key={i}>
            •{" "}
            {line.parts.map((part, j) =>
              part.sup ? (
                <sup key={j} className="text-primary-container font-semibold">
                  {part.code}
                </sup>
              ) : (
                <code key={j} className="text-primary-container font-semibold">
                  {part.code}
                </code>
              )
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
