interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  return (
    <div className="flex items-center justify-between mt-6">

      <button
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        className="px-5 py-2 rounded-xl border disabled:opacity-50 hover:bg-gray-100"
      >
        Previous
      </button>

      <p className="text-gray-600 font-medium">
        Page {currentPage} of {totalPages}
      </p>

      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        className="px-5 py-2 rounded-xl border disabled:opacity-50 hover:bg-gray-100"
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;