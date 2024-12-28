
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; 
    
    let start = Math.max(0, currentPage - Math.floor(showPages / 2));
    let end = Math.min(totalPages - 1, start + showPages - 1);
    if (end - start + 1 < showPages) {
      start = Math.max(0, end - showPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0 || isLoading}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getPageNumbers().map((pageNum) => (
        <Button
          key={`page-${pageNum}`}
          variant={pageNum === currentPage ? "default" : "outline"}
          onClick={() => onPageChange(pageNum)}
          disabled={isLoading}
          className="min-w-[40px]"
        >
          {pageNum + 1}
        </Button>
      ))}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1 || isLoading}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}