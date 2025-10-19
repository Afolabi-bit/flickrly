import Image from "next/image";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import Rating from "../shared/Rating";

interface HeroProps {
  title: string;
  overview: string;
  rating: number; // 1-10
}

const Hero = ({ title, overview, rating }: HeroProps) => {
  return (
    <div className="w-[404px] h-[285px] mt-[78px]">
      <h1 className="text-[48px] leading-[56px] font-bold mb-4 text-white">
        {title}
      </h1>

      <Rating rating={rating} />

      <p className="text-[14px] leading-[18px] font-medium mb-4 text-white">
        {overview}
      </p>

      <Link
        className="w-[169px] h-[36px] rounded-[6px] px-4 gap-2 flex items-center justify-between bg-[#BE123C]"
        href="/"
      >
        <Image
          src="/assets/playIcon.png"
          alt="play trailer"
          width={16}
          height={16}
          className="object-contain"
        />
        <span className="uppercase text-[14px] font-bold leading-6 text-white">
          watch trailer
        </span>
      </Link>
    </div>
  );
};

export default Hero;
