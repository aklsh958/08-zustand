import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { NoteTag } from '@/types/note';

type Props = {
  params: Promise<{ slug?: string[] }>;
};
export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const res = slug?.[0];

  const tag: NoteTag | undefined =
    !res || res.toLowerCase() === 'all' ? undefined : (res as NoteTag);

  const queryClient = new QueryClient();

  const initialNotes = await queryClient.fetchQuery({
    queryKey: ['notes', 1, '', tag ?? 'all'],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: '', tag }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialNotes={initialNotes} initialTag={tag} />
    </HydrationBoundary>
  );
}