export interface PaginationProps {
  pageItems?: number;
  pageCount: number;
  onChange(e: React.ChangeEvent<HTMLSelectElement>): void;
  onPageChange(e: { selected: number }): void;
}
