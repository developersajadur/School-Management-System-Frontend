"use client";

import * as React from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiMoreVertical,
} from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
});

export function DataTable({
  data: initialData,
}: {
  data: z.infer<typeof schema>[];
}) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);

  // Calculate pagination
  const totalPages = Math.ceil(initialData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = initialData.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === currentData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentData.map((item) => item.id));
    }
  };

  // Calculate if some (but not all) rows are selected
  const isSomeRowsSelected =
    selectedRows.length > 0 && selectedRows.length < currentData.length;

  return (
    <div className="w-full flex-col justify-start gap-6">
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedRows.length > 0 &&
                    selectedRows.length === currentData.length
                  }
                  onCheckedChange={toggleAllRows}
                  aria-label="Select all"
                  className={
                    isSomeRowsSelected
                      ? "data-[state=checked]:bg-muted-foreground/50 data-[state=checked]:text-muted-foreground"
                      : ""
                  }
                />
              </TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Section Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Target</TableHead>
              <TableHead className="text-right">Limit</TableHead>
              <TableHead>Reviewer</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(item.id)}
                    onCheckedChange={() => toggleRowSelection(item.id)}
                    aria-label="Select row"
                  />
                </TableCell>
                <TableCell>
                  <a
                    href="#"
                    className="text-foreground hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle link click if needed
                    }}
                  >
                    {item.header}
                  </a>
                </TableCell>
                <TableCell>
                  <div className="w-32">
                    <Badge
                      variant="outline"
                      className="text-muted-foreground px-1.5"
                    >
                      {item.type}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="text-muted-foreground px-1.5"
                  >
                    {item.status === "Done" ? (
                      <span className="text-green-500 dark:text-green-400">
                        ✓
                      </span>
                    ) : (
                      <span>↻</span>
                    )}
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      toast.promise(
                        new Promise((resolve) => setTimeout(resolve, 1000)),
                        {
                          loading: `Saving ${item.header}`,
                          success: "Done",
                          error: "Error",
                        }
                      );
                    }}
                  >
                    <Label htmlFor={`${item.id}-target`} className="sr-only">
                      Target
                    </Label>
                    <Input
                      className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
                      defaultValue={item.target}
                      id={`${item.id}-target`}
                    />
                  </form>
                </TableCell>
                <TableCell>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      toast.promise(
                        new Promise((resolve) => setTimeout(resolve, 1000)),
                        {
                          loading: `Saving ${item.header}`,
                          success: "Done",
                          error: "Error",
                        }
                      );
                    }}
                  >
                    <Label htmlFor={`${item.id}-limit`} className="sr-only">
                      Limit
                    </Label>
                    <Input
                      className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
                      defaultValue={item.limit}
                      id={`${item.id}-limit`}
                    />
                  </form>
                </TableCell>
                <TableCell>
                  {item.reviewer !== "Assign reviewer" ? (
                    item.reviewer
                  ) : (
                    <>
                      <Label
                        htmlFor={`${item.id}-reviewer`}
                        className="sr-only"
                      >
                        Reviewer
                      </Label>
                      <Select>
                        <SelectTrigger
                          className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
                          size="sm"
                          id={`${item.id}-reviewer`}
                        >
                          <SelectValue placeholder="Assign reviewer" />
                        </SelectTrigger>
                        <SelectContent align="end">
                          <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                          <SelectItem value="Jamik Tashpulatov">
                            Jamik Tashpulatov
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                        size="icon"
                      >
                        <FiMoreVertical />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Make a copy</DropdownMenuItem>
                      <DropdownMenuItem>Favorite</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-4 mt-4">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          {selectedRows.length} of {initialData.length} row(s) selected.
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Rows per page
          </Label>
          <Select
            value={`${rowsPerPage}`}
            onValueChange={(value) => {
              setRowsPerPage(Number(value));
              setCurrentPage(1); // Reset to first page when changing rows per page
            }}
          >
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue placeholder={rowsPerPage} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Go to first page</span>
            <FiChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <FiChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Go to next page</span>
            <FiChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 lg:flex"
            size="icon"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Go to last page</span>
            <FiChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
