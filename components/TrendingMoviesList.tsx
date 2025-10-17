import CarouselSetup from "./shared/CarouselSetup";

interface TrendingMoviesProps {
  list: {
    id: number;
    original_title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
  }[];
}

const TrendingMovies = ({ list }: TrendingMoviesProps) => {
  return (
    <div>
      <h2 className="text-4xl font-bold mb-5">Trending Today</h2>
      <CarouselSetup list={list} />
    </div>
  );
};

export default TrendingMovies;
