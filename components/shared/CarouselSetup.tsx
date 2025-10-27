import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { CarouselSetupProps } from "@/app/types/otherTypes";
import MovieCard from "./MovieCard";

const CarouselSetup: React.FC<CarouselSetupProps> = ({ list }) => {
  return (
    <Carousel className="bg-[#eee] p-9 shadow-2xl rounded-xl h-fit">
      <CarouselContent className="flex flex-nowrap">
        {list.map((item) => (
          <CarouselItem
            key={item.id}
            className="basis-[250px] flex-shrink-0  h- overflow-y-visible pb-3 "
          >
            <MovieCard movie={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
      <CarouselPrevious />
    </Carousel>
  );
};

export default CarouselSetup;
