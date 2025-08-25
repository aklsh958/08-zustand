import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface NotesProps {
  params: { slug?: string[] };
}

export const generateMetadata = async ({
  params,
}: {
  params: { slug?: string[] };
}): Promise<Metadata> => {
  const slug = params.slug ?? [];
  const tag = slug[0]?.toLowerCase() !== "all" ? slug[0]?.toLowerCase() : undefined;

  const title = tag ? `Notes filtered by ${tag}` : "All notes";
  const description = tag
    ? `Browse notes filtered by the ${tag} tag.`
    : "Browse all available notes without filters.";

  const urlTagSegment = tag || "all";
  const url = `https://07-routing-nextjs-one-kappa.vercel.app/notes/filter/${urlTagSegment}`;

  const ogAlt = tag ? `Notes tagged ${tag}` : "All notes";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: ogAlt,
        },
      ],
    },
  };
};

export default function Notes({ params }: NotesProps) {
  const slug = params.slug ?? [];
  const tag = slug[0]?.toLowerCase() !== "all" ? slug[0]?.toLowerCase() : undefined;

  return <NotesClient tag={tag} />;
}