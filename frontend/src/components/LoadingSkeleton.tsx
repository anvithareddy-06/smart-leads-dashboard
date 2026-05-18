const LoadingSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 animate-pulse">

      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-6"></div>

      <div className="space-y-4">

        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-12 bg-gray-200 dark:bg-gray-700 rounded"
          />
        ))}

      </div>

    </div>
  );
};

export default LoadingSkeleton;