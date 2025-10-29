import Image from "next/image";
import Link from "next/link";
import Rating from "../shared/Rating";
import { HeroProps } from "@/app/types/otherTypes";

const Hero = ({ title, overview, rating, id }: HeroProps) => {
  return (
    <div className="mt-[50px] w-[80%] lg:w-[404px] lg:h-[285px] lg:mt-[78px]">
      <h1 className="text-[30px] leading-[40px] mb-2 md:text-[42px] md:mb-3 lg:text-[48px] lg:leading-[56px] font-bold lg:mb-4 text-white">
        {title}
      </h1>

      <Rating rating={rating} />

      <p className="mt-2.5 text-[12px] sm:text-[14px] leading-[18px] sm:font-medium mb-4 text-white">
        {overview}
      </p>

      <Link
        className="w-[140px] sm:w-[169px] h-[36px] rounded-[6px] px-4 gap-2 flex items-center justify-between bg-[#BE123C]"
        href={`/movie/${id}`}
      >
        <span className="size-[12px] sm:size-[16px] relative">
          <Image
            src="/assets/playIcon.png"
            alt="play trailer"
            fill
            className="object-contain"
          />
        </span>
        <span className="uppercase text-[11px]  sm:text-[14px] font-bold leading-6 text-white">
          watch trailer
        </span>
      </Link>
    </div>
  );
};

export default Hero;
