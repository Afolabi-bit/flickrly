import { Metadata } from "next";

interface MoviePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: MoviePageProps): Promise<Metadata> {
  return {
    title: `Movie ${params.id}`,
  };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = params;

  // Example: Fetch movie details from an API
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`,
    },
    cache: "no-store",
  });

  const movie = await res.json();

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">{movie.title}</h1>
      <p className="text-gray-500 mt-2">{movie.overview}</p>
    </main>
  );
}
