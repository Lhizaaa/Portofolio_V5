import React, { useState, useEffect, useRef, memo } from "react";

/**
 * CodeShowcase — an animated, self-typing code-editor card used on the Home
 * hero. Replaces the old static GIF with something that actually feels like a
 * frontend developer's workspace: a macOS-style window that "writes" a small
 * React snippet line by line, complete with syntax highlighting, a blinking
 * caret and a live status bar.
 */

// Each token => [text, colorClass]. Lines are arrays of tokens so we can both
// highlight and reveal them character-by-character.
const CODE_LINES = [
  [["const", "text-accent"], [" ", ""], ["developer", "text-fg"], [" = ", "text-muted"], ["{", "text-muted"]],
  [["  name", "text-fg"], [": ", "text-muted"], ["'Luqman Hakim'", "text-emerald-400"], [",", "text-muted"]],
  [["  role", "text-fg"], [": ", "text-muted"], ["'Frontend Developer'", "text-emerald-400"], [",", "text-muted"]],
  [["  stack", "text-fg"], [": ", "text-muted"], ["[", "text-muted"], ["'React'", "text-emerald-400"], [", ", "text-muted"], ["'JS'", "text-emerald-400"], ["]", "text-muted"], [",", "text-muted"]],
  [["  available", "text-fg"], [": ", "text-muted"], ["true", "text-accent"], [",", "text-muted"]],
  [["};", "text-muted"]],
  [["", ""]],
  [["build", "text-sky-400"], ["(", "text-muted"], ["developer", "text-fg"], [")", "text-muted"], [".", "text-muted"], ["ship", "text-sky-400"], ["();", "text-muted"]],
];

const TYPE_SPEED = 28;
const LINE_PAUSE = 180;
const RESTART_PAUSE = 2600;

const flatLen = (line) => line.reduce((n, [t]) => n + t.length, 0);

const CodeShowcase = memo(({ isHovering }) => {
  // How many characters of the current line are revealed.
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [done, setDone] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (done) {
      timer.current = setTimeout(() => {
        setLineIndex(0);
        setCharCount(0);
        setDone(false);
      }, RESTART_PAUSE);
      return () => clearTimeout(timer.current);
    }

    const currentLine = CODE_LINES[lineIndex];
    const total = flatLen(currentLine);

    if (charCount < total) {
      timer.current = setTimeout(() => setCharCount((c) => c + 1), TYPE_SPEED);
    } else if (lineIndex < CODE_LINES.length - 1) {
      timer.current = setTimeout(() => {
        setLineIndex((l) => l + 1);
        setCharCount(0);
      }, LINE_PAUSE);
    } else {
      setDone(true);
    }

    return () => clearTimeout(timer.current);
  }, [lineIndex, charCount, done]);

  // Render a line, revealing only the first `reveal` characters.
  const renderLine = (line, reveal) => {
    let remaining = reveal;
    return line.map(([text, color], i) => {
      if (remaining <= 0) return null;
      const slice = text.slice(0, remaining);
      remaining -= text.length;
      return (
        <span key={i} className={color}>
          {slice}
        </span>
      );
    });
  };

  return (
    <div
      className={`relative w-full max-w-[520px] mx-auto rounded-2xl border border-line bg-surface shadow-2xl overflow-hidden transition-transform duration-500 ${
        isHovering ? "scale-[1.02] -rotate-1" : "scale-100"
      }`}
    >
      {/* Window title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-surface-2">
        <span className="w-3 h-3 rounded-full bg-red-400/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
        <span className="w-3 h-3 rounded-full bg-green-400/80" />
        <span className="ml-3 text-xs text-muted font-mono">developer.js</span>
        <span className="ml-auto flex items-center gap-1.5 text-[0.65rem] text-accent font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          live
        </span>
      </div>

      {/* Code body */}
      <div className="px-4 py-5 font-mono text-xs sm:text-sm leading-relaxed min-h-[230px] sm:min-h-[260px] bg-surface">
        {CODE_LINES.map((line, i) => {
          const reveal =
            i < lineIndex ? flatLen(line) : i === lineIndex ? charCount : 0;
          const isActive = i === lineIndex && !done;
          return (
            <div key={i} className="flex">
              <span className="select-none w-6 mr-3 text-right text-muted/40 shrink-0">
                {i + 1}
              </span>
              <code className="whitespace-pre break-words">
                {renderLine(line, reveal)}
                {(isActive || (done && i === CODE_LINES.length - 1)) && (
                  <span className="inline-block w-[2px] h-4 -mb-0.5 ml-0.5 bg-accent animate-blink align-middle" />
                )}
              </code>
            </div>
          );
        })}
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-4 px-4 py-2 border-t border-line bg-surface-2 text-[0.65rem] text-muted font-mono">
        <span className="text-accent">UTF-8</span>
        <span>JavaScript</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          Ready to Innovate
        </span>
      </div>

      {/* Ambient glow */}
      <div
        className={`pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-700 ${
          isHovering ? "opacity-100" : "opacity-0"
        }`}
        style={{ boxShadow: "0 0 60px rgb(var(--c-accent) / 0.25)" }}
      />
    </div>
  );
});

CodeShowcase.displayName = "CodeShowcase";

export default CodeShowcase;
