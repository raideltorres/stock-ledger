import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { BaseFiltersState } from "@/utils/types";

export type PaginatorProps = {
  totalItems: number;
  currentPage: number;
  itemsPerPage?: number;
  itemsPerPageOptions?: number[];
  onPageChange?: (partial: BaseFiltersState) => void;
  onItemsPerPageChange?: (partial: BaseFiltersState) => void;
};

export function Paginator({
  totalItems = 0,
  currentPage = ROWS_PER_PAGE,
  itemsPerPage = 10,
  itemsPerPageOptions = ROWS_PER_PAGE_OPTIONS,
  onPageChange,
  onItemsPerPageChange,
}: PaginatorProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pages = getPages();

  return (
    <div className="w-full flex flex-row flex-nowrap items-center justify-between gap-2">
      <Select
        onValueChange={(limit) =>
          onItemsPerPageChange?.({ limit: Number(limit) })
        }
        defaultValue={itemsPerPage.toString()}
      >
        <SelectTrigger>
          <SelectValue placeholder="Seleccione" />
        </SelectTrigger>
        <SelectContent>
          {itemsPerPageOptions?.map((option) => (
            <SelectItem key={`option-item-${option}`} value={option.toString()}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex flex-row flex-nowrap items-center justify-center gap-0">
        {/* Botón anterior */}
        <button
          onClick={() => onPageChange?.({ page: currentPage - 1 })}
          disabled={currentPage <= 1}
          className={cn(
            "border rounded-tl-sm rounded-bl-sm p-2",
            currentPage <= 1 ? "text-gray-400" : "cursor-pointer"
          )}
        >
          <ChevronLeft size={16} />
        </button>

        {/* Páginas */}
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={index} className="border min-w-8 py-1 px-2 text-center">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() =>
                page !== currentPage && onPageChange?.({ page: Number(page) })
              }
              className={cn(
                "border min-w-8 py-1 px-2 text-center",
                page === currentPage
                  ? "bg-gray-200 text-gray-400"
                  : "cursor-pointer"
              )}
            >
              {page}
            </button>
          )
        )}

        {/* Botón siguiente */}
        <button
          onClick={() => onPageChange?.({ page: currentPage + 1 })}
          disabled={currentPage >= totalPages}
          className={cn(
            "border rounded-tr-sm rounded-br-sm p-2",
            currentPage >= totalPages ? "text-gray-400" : "cursor-pointer"
          )}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
