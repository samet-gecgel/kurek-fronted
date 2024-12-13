import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const nextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg ${
          currentPage === 1 
            ? 'text-zinc-600 cursor-not-allowed' 
            : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
        }`}
      >
        <ChevronLeft size={20} />
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`w-10 h-10 rounded-lg ${
            currentPage === index + 1
              ? 'bg-blue-500 text-white'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg ${
          currentPage === totalPages 
            ? 'text-zinc-600 cursor-not-allowed' 
            : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
        }`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
} 