"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import css from "./page.module.css";
import Link from "next/link";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    updateSearchQuery(value);
  };

  const validTag = tag?.toLowerCase() === "all" ? undefined : tag;

  const { data, isLoading } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", validTag ?? null, currentPage, searchQuery],
    queryFn: () => fetchNotes(currentPage, searchQuery, validTag),
  });

  const notes: FetchNotesResponse["notes"] = data?.notes ?? [];
  const totalPagesNumber: number = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onSearch={handleSearchChange} />
        {totalPagesNumber > 1 && (
          <Pagination
            totalPages={totalPagesNumber}
            currentPage={currentPage}
            setPage={setCurrentPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading ? (
        <p className={css.loading}>Loading notes...</p>
      ) : (
        <NoteList notes={notes} />
      )}
    </div>
  );
}