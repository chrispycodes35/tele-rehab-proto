"use client";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const sortOptions = [
  { key: "recent", label: "Recently Updated" },
  { key: "name", label: "Name" },
];
const pageSizes = [10, 20, 50];

interface TableToolbarProps {
  search: string;
  sortKey: string;
  pageSize: number;
  onSearch: (v: string) => void;
  onSortChange: (v: string) => void;
  onPageSizeChange: (v: number) => void;
}

export default function TableToolbar({
  search,
  sortKey,
  pageSize,
  onSearch,
  onSortChange,
  onPageSizeChange,
}: TableToolbarProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  return (
    <div className="flex items-center gap-4 mb-4">
      <Input
        className="w-64 rounded-full"
        placeholder="Search Exercise"
        value={search}
        onChange={e => onSearch(e.target.value)}
      />
      <Popover open={sortOpen} onOpenChange={setSortOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="rounded-full min-w-[180px] justify-between">
            {sortOptions.find(o => o.key === sortKey)?.label || "Sort"}
            <span className="ml-2">▼</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-44 p-0">
          {sortOptions.map(opt => (
            <Button
              key={opt.key}
              variant="ghost"
              className={`w-full justify-start ${sortKey === opt.key ? "bg-gray-100" : ""}`}
              onClick={() => { onSortChange(opt.key); setSortOpen(false); }}
            >
              {opt.label}
            </Button>
          ))}
        </PopoverContent>
      </Popover>
      <Popover open={sizeOpen} onOpenChange={setSizeOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="rounded-full min-w-[80px] justify-between">
            {pageSize} <span className="ml-2">▼</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-24 p-0">
          {pageSizes.map(size => (
            <Button
              key={size}
              variant="ghost"
              className={`w-full justify-start ${pageSize === size ? "bg-gray-100" : ""}`}
              onClick={() => { onPageSizeChange(size); setSizeOpen(false); }}
            >
              {size}
            </Button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
} 