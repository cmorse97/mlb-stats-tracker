const Loading = ({ size = "md", message = "Loading..." }) => {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
      <div
        className={`animate-spin rounded-full border-t-transparent border-blue-500 ${sizes[size]}`}
      />
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  );
};
export default Loading;
