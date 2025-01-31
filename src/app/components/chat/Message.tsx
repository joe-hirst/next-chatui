export const Message = ({ role, content }) => {
  return (
    <div className="mb-6 flex items-start">
      {/* Avatar */}
      <div className="mr-3 flex-shrink-0">
        <div
          className={`w-8 h-8 rounded-sm flex items-center justify-center ${
            role === "assistant" ? "bg-emerald-600" : "bg-gray-600"
          }`}
        >
          <span className="text-gray-100 text-sm">
            {role === "assistant" ? "AI" : "U"}
          </span>
        </div>
      </div>
      {/* Message content */}
      <div
        className={`flex-1 space-y-2 px-4 py-3 rounded-lg ${
          role === "assistant"
            ? "bg-gray-800 text-gray-100"
            : "bg-gray-700 text-gray-100"
        }`}
      >
        <p className="prose prose-invert prose-sm max-w-none">{content}</p>
      </div>
    </div>
  );
};
