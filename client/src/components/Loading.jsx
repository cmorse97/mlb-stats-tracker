// Full-page loading spinner — use for page-level loading states.
// For loading states inside widgets/cards, use an inline spinner instead
// so it stays proportional to the container.
const Loading = () => (
  <div className="flex items-center justify-center py-24">
    <div className="w-8 h-8 border-2 border-blue-400 rounded-full animate-spin border-t-transparent" />
  </div>
);

export default Loading;
