import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface PageProps {
  params: { slug?: string[] };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params.slug ?? [];
  const tag = slug[0]?.toLowerCase() !== "all" ? slug[0] : undefined;

  const title = tag ? `Notes filtered by ${tag}` : "All notes";
  const description = tag
    ? `Browse notes filtered by the ${tag} tag.`
    : "Browse all available notes without filters.";

  const urlTagSegment = tag || "all";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://07-routing-nextjs-one-kappa.vercel.app/notes/filter/${urlTagSegment}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: tag || "All notes",
        },
      ],
    },
  };
}

export default function Notes({ params }: PageProps) {
  const slug = params.slug ?? [];
  const tag = slug[0]?.toLowerCase() !== "all" ? slug[0] : undefined;

  return <NotesClient tag={tag} />;
}