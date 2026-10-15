const JS_KEYWORDS =
  /\b(const|let|var|async|await|function|return|import|from|export|if|else|while|for|class|new|typeof|default)\b/;
const RUST_KEYWORDS =
  /\b(let|mut|async|move|await|while|for|loop|fn|pub|use|impl|struct|enum|match|if|else|return|Some|None|Ok|Err)\b/;

const build = (keywords) =>
  new RegExp(
    `(\\/\\*[\\s\\S]*?\\*\\/|\\/\\/[^\\n]*)|(\`[^\`]*\`|'[^']*'|"[^"]*")|(\\b\\d+(?:\\.\\d+)?\\b)|${keywords.source}`,
    "g"
  );

const TOKENS = { js: build(JS_KEYWORDS), rust: build(RUST_KEYWORDS) };

/**
 * Minimal token pass over a code string — enough colour to read a sample,
 * no external highlighter dependency. Returns an array of
 * { text, className } parts that can be mapped straight into JSX.
 * `lang` is "js" (default) or "rust".
 */
export function highlightCode(code, lang = "js") {
  const token = TOKENS[lang] ?? TOKENS.js;
  token.lastIndex = 0;
  const parts = [];
  let last = 0;
  let match;

  while ((match = token.exec(code)) !== null) {
    if (match.index > last) parts.push({ text: code.slice(last, match.index) });
    const [value, comment, string, number] = match;
    parts.push({
      text: value,
      className: comment
        ? "text-outline italic"
        : string
        ? "text-tertiary-fixed"
        : number
        ? "text-secondary"
        : "text-secondary-fixed-dim font-medium",
    });
    last = match.index + value.length;
  }
  if (last < code.length) parts.push({ text: code.slice(last) });
  return parts;
}
