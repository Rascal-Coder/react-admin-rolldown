import { useTree, useTreeNode } from "./context";

const TreeLines = () => {
  const { showLines, indent } = useTree();
  const { level, isLast, parentPath } = useTreeNode();

  if (!showLines || level === 0) {
    return null;
  }

  const leftOffset = 12;

  return (
    <div className="pointer-events-none absolute top-0 bottom-0 left-0">
      {/* Render vertical lines for all parent levels */}
      {Array.from({ length: level }, (_, index) => {
        const shouldHideLine = parentPath[index] === true;
        if (shouldHideLine && index === level - 1) {
          return null;
        }

        return (
          <div
            className="absolute top-0 bottom-0 border-border border-l"
            key={index.toString()}
            style={{
              left: index * (indent ?? 0) + leftOffset,
              display: shouldHideLine ? "none" : "block",
            }}
          />
        );
      })}

      {/* Horizontal connector line */}
      <div
        className="absolute top-1/2 border-border border-t"
        style={{
          left: (level - 1) * (indent ?? 0) + leftOffset,
          width: (indent ?? 0) - 4,
          transform: "translateY(-1px)",
        }}
      />

      {/* Vertical line to midpoint for last items */}
      {isLast && (
        <div
          className="absolute top-0 border-border border-l"
          style={{
            left: (level - 1) * (indent ?? 0) + leftOffset,
            height: "50%",
          }}
        />
      )}
    </div>
  );
};

export default TreeLines;
