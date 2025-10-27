"use client";

import { HeroBtnGroupProps } from "@/app/types/otherTypes";

const HeroBtnGroup: React.FC<HeroBtnGroupProps> = ({
  movieSelector,
  setMovieSelector,
}) => {
  return (
    <aside className="absolute top-[50%] translate-[-50%] right-6 w-9 h-[110px] flex flex-col gap-2.5 items-end z-50 ">
      {[1, 2, 3, 4, 5].map((num, idx) => (
        <button
          key={num}
          className="flex items-center justify-end gap-1.5 transition-all h-[20px] w-full"
          onClick={() => setMovieSelector(idx)}
        >
          {movieSelector === idx && (
            <span className="w-[20px] h-[3px] bg-white inline-block"></span>
          )}
          <span
            className={`font-bold ${
              movieSelector === idx
                ? "text-[16px] text-white"
                : "text-[12px] text-[#9ca3af]"
            }`}
          >
            {num}
          </span>
        </button>
      ))}
    </aside>
  );
};

export default HeroBtnGroup;
