import Image from "next/image";
import Link from "next/link";

interface MoviePageProps {
  params: { id: string };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?language=en-US&append_to_response=videos`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`,
      },
      cache: "no-store",
    }
  );

  const movie = await res.json();

  console.log(movie);

  const trailer = movie.videos?.results?.find(
    (vid: any) =>
      vid.type === "Trailer" && (vid.site === "YouTube" || vid.site === "Vimeo")
  );

  return (
    <main className="min-h-screen text-white">
      <header className="px-[98px] h-[80px] flex items-center">
        {" "}
        <Link href={"/"} className="flex items-center gap-6 w-[187px]">
          <Image
            priority
            src="/assets/tv.png"
            alt="TV logo"
            width={50}
            height={50}
          />
          <h1 className="text-2xl font-bold leading-6 text-black">Flickerly</h1>
        </Link>
      </header>
      <section className="px-[98px] pt-10">
        <div>
          <h1>{movie.title}</h1>
        </div>
        {trailer && (
          <div className="aspect-video w-full h-[449px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </section>
    </main>
  );
}
