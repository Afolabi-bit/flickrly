import Image from "next/image";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";

interface HeroProps {
  title: string;
  overview: string;
  rating: number; // 1-10
}

const Hero = ({ title, overview, rating }: HeroProps) => {
  // dynamic color for rating
  let ratingColor = "text-gray-400";

  if (rating <= 1) ratingColor = "text-red-700";
  else if (rating <= 2) ratingColor = "text-red-500";
  else if (rating <= 3) ratingColor = "text-orange-500";
  else if (rating <= 4) ratingColor = "text-amber-500";
  else if (rating <= 5) ratingColor = "text-yellow-400";
  else if (rating <= 6) ratingColor = "text-lime-400";
  else if (rating <= 7) ratingColor = "text-green-400";
  else if (rating <= 8) ratingColor = "text-emerald-400";
  else if (rating <= 9) ratingColor = "text-teal-400";
  else ratingColor = "text-cyan-400";

  return (
    <div className="w-[404px] h-[285px] mt-[78px]">
      <h1 className="text-[48px] leading-[56px] font-bold mb-4">{title}</h1>

      <span
        className={`mb-4 text-[12px] leading-3 flex gap-1.5 items-center ${ratingColor}`}
      >
        <BadgeCheck strokeWidth={3} size={20} />{" "}
        <span
          className={`text-transparent bg-clip-text font-bold text-[14px] ${
            rating >= 9
              ? "bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400"
              : rating >= 7
              ? "bg-gradient-to-r from-amber-400 to-green-400"
              : "bg-gradient-to-r from-red-500 to-amber-400"
          }`}
        >
          {rating.toFixed(1)}
        </span>
      </span>

      <p className="text-[14px] leading-[18px] font-medium mb-4">{overview}</p>

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
        <span className="uppercase text-[14px] font-bold leading-6">
          watch trailer
        </span>
      </Link>
    </div>
  );
};

export default Hero;
