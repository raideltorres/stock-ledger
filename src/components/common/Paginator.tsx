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
    const pages = [];

    // Siempre mostrar la primera página
    pages.push(1);

    // Mostrar puntos suspensivos si hay más de 2 páginas antes de la actual
    if (currentPage > 3) {
      pages.push("...");
    }

    // Página anterior
    if (currentPage > 2) {
      pages.push(currentPage - 1);
    }

    // Página actual
    if (currentPage !== 1 && currentPage !== totalPages) {
      pages.push(currentPage);
    }

    // Página siguiente
    if (currentPage < totalPages - 1) {
      pages.push(currentPage + 1);
    }

    // Mostrar puntos suspensivos si hay más de 2 páginas después de la actual
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Siempre mostrar la última página
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
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
