import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Pages({
  totalPages,
  activePage,
  startPage,
  pageRange,
  className,
  createQueryString,
}: {
  totalPages: number;
  activePage: number;
  startPage: number;
  pageRange: number;
  className: string;
  createQueryString: (
    name: string | string[],
    // eslint-disable-next-line prettier/prettier
    value: string | string[]
  ) => string;
}) {
  return (
    <Pagination className={className}>
      <PaginationContent>
        {startPage - 1 > 0 && (
          <PaginationItem>
            <PaginationPrevious
              href={`?${createQueryString("page", (startPage - 1).toString())}`}
            />
          </PaginationItem>
        )}
        {[...Array(pageRange)].map((a, i) => (
          <div key={i}>
            {startPage + i <= totalPages && (
              <PaginationItem>
                <PaginationLink
                  href={`?${createQueryString("page", (startPage + i).toString())}`}
                  isActive={activePage === startPage + i}
                >
                  {startPage + i}
                </PaginationLink>
              </PaginationItem>
            )}
          </div>
        ))}
        {totalPages > startPage + pageRange && (
          <PaginationItem>
            <PaginationNext
              href={`?${createQueryString("page", (startPage + pageRange).toString())}`}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
