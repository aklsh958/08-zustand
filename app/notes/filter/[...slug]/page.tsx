import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface NotesProps {
  params: Promise<{ slug?: string[] }>;
}

export const generateMetadata = async ({ params }: NotesProps): Promise<Metadata> => {
  const { slug } = await params;
  const tag = slug?.[0] && slug[0].toLowerCase() !== "all" ? slug[0] : undefined;

  const title = tag ? `Notes filtered by ${tag}` : "All notes";
  const description = tag
    ? `Browse notes filtered by the ${tag} tag.`
    : "Browse all available notes without filters.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://07-routing-nextjs-one-kappa.vercel.app/notes/filter/${tag?.toLowerCase() || 'all'}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: tag ? `Notes tagged ${tag}` : "All notes",
        },
      ],
    },
  };
};

export default async function Notes({ params }: NotesProps) {
  const { slug } = await params;
  const tag = slug?.[0] && slug[0].toLowerCase() !== "all" ? slug[0] : undefined;

  return <NotesClient tag={tag} />;
}