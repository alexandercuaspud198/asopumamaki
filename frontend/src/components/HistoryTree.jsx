import treeAssets from '../data/historyTreeAssets.json';

function TreeArtwork({ part, ...props }) {
  const asset = treeAssets[part];
  return (
    <img
      src={`${process.env.PUBLIC_URL}/${asset.src}`}
      width={asset.width}
      height={asset.height}
      alt=""
      aria-hidden="true"
      decoding="async"
      {...props}
    />
  );
}

export function HistoryBranch({ side, eager = false }) {
  return <TreeArtwork part="frame" className={`history-event-frame frame-${side}`} loading={eager ? 'eager' : 'lazy'} />;
}

export default function HistoryTree() {
  return (
    <div className="history-botanical-tree" aria-hidden="true">
      <TreeArtwork part="crown" className="history-tree-crown" fetchPriority="high" />
      <TreeArtwork part="trunk" className="history-tree-trunk" />
      <TreeArtwork part="roots" className="history-tree-roots" loading="lazy" />
    </div>
  );
}
