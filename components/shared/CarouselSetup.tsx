import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Rating from "./Rating";

interface MovieItem {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface CarouselSetupProps {
  list: MovieItem[];
}

const CarouselSetup: React.FC<CarouselSetupProps> = ({ list }) => {
  return (
    <Carousel className="bg-[#eee] p-9 shadow-2xl rounded-xl h-fit">
      <CarouselContent className="flex flex-nowrap">
        {list.map((item) => (
          <CarouselItem
            key={item.id}
            className="basis-[250px] flex-shrink-0  h- overflow-y-visible pb-3 "
          >
            <Link
              key={item.id}
              href="/"
              style={{ userSelect: "none" }}
              className="group bg-white block  max-w-[250px] h-[490px] rounded-sm "
            >
              <div className="overflow-hidden rounded-t-sm">
                <Image
                  width={250}
                  height={370}
                  className="object-cover w-[250px] h-[370px] rounded-t-sm transform transition-transform duration-500 group-hover:scale-105"
                  src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                  alt={item.title}
                />
              </div>
              <div className="px-2.5 pt-0.5 pb-2.5">
                <p>
                  <span className="text-[12px] font-bold mr-2">
                    Release date:
                  </span>
                  <span className="text-[12px] font-bold text-[#9CA3AF]">
                    {new Date(item.release_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </p>
                <h2 className="text-[18px] font-bold text-[#111827] mb-1 truncate">
                  {item.title}
                </h2>
                <Rating rating={item.vote_average} />
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
      <CarouselPrevious />
    </Carousel>
  );
};

export default CarouselSetup;
