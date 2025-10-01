import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export const dynamic = "force-dynamic";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  const page = 1;
  const perPage = 12;
  const search = "";

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, perPage, search],
    queryFn: () => fetchNotes({ page, perPage, search }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialPage={page} perPage={perPage} />
    </HydrationBoundary>
  );
}
