import Image from "next/image";
import Link from "next/link";

interface heroProps {
  title: string;
  overview: string;
  rating: number;
}

const Hero = ({ title, overview, rating }: heroProps) => {
  return (
    <div className="w-[404px] h-[285px] mt-[78px] ">
      <h1 className="text-[48px] leading-[56px] font-bold mb-4 ">{title}</h1>
      <span className="mb-4 text-[12px] leading-3 ">{rating}</span>
      <p className="text-[14px] leading-[18px] font-medium mb-4">{overview}</p>
      <Link
        className="w-[169px] h-[36px] rounded-[6px] px-4 gap-2 flex items-center justify-between bg-[#BE123C] "
        href={"/"}
      >
        <Image
          src="/assets/playIcon.png"
          alt="play trailer"
          width={16}
          height={16}
          className="object-contain"
        />
        <span className="uppercase text-[14px] font-bold leading-6 ">
          watch trailer
        </span>
      </Link>
    </div>
  );
};

export default Hero;
