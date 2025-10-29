import { RatingProps } from "@/app/types/otherTypes";
import { BadgeCheck } from "lucide-react";

const Rating = ({ rating }: RatingProps) => {
  const r = Math.max(0, Math.min(10, rating));

  let ratingColor = "text-gray-400";

  switch (true) {
    // full-step buckets
    case r < 1.0:
      ratingColor = "text-red-700"; // 0 - 1
      break;
    case r < 2.0:
      ratingColor = "text-red-600"; // 1 - 2
      break;
    case r < 3.0:
      ratingColor = "text-orange-600"; // 2 - 3
      break;
    case r < 4.0:
      ratingColor = "text-amber-600"; // 3 - 4
      break;
    case r < 5.0:
      ratingColor = "text-yellow-500"; // 4 - 5
      break;

    // half-step buckets (5.0 onward)
    case r < 5.5:
      ratingColor = "text-yellow-400"; // 5.0 - 5.5
      break;
    case r < 6.0:
      ratingColor = "text-lime-400"; // 5.5 - 6.0
      break;
    case r < 6.5:
      ratingColor = "text-lime-500"; // 6.0 - 6.5
      break;
    case r < 7.0:
      ratingColor = "text-green-400"; // 6.5 - 7.0
      break;
    case r < 7.5:
      ratingColor = "text-green-500"; // 7.0 - 7.5
      break;
    case r < 8.0:
      ratingColor = "text-emerald-400"; // 7.5 - 8.0
      break;
    case r < 8.5:
      ratingColor = "text-emerald-500"; // 8.0 - 8.5
      break;
    case r < 9.0:
      ratingColor = "text-teal-400"; // 8.5 - 9.0
      break;
    case r < 9.5:
      ratingColor = "text-teal-500"; // 9.0 - 9.5
      break;
    default:
      // 9.5 - 10.0
      ratingColor = "text-cyan-400";
      break;
  }

  // gradient for the numeric text: give stronger, cooler gradients as rating increases.
  const gradientClass =
    r >= 9.5
      ? "bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"
      : r >= 8.5
      ? "bg-gradient-to-r from-emerald-400 to-teal-400"
      : r >= 7.0
      ? "bg-gradient-to-r from-lime-400 to-emerald-400"
      : r >= 5.0
      ? "bg-gradient-to-r from-amber-400 to-lime-400"
      : "bg-gradient-to-r from-red-500 to-amber-400";

  return (
    <span className={`flex gap-1.5 items-center ${ratingColor}`}>
      <BadgeCheck strokeWidth={3} className="size-3.5 lg:size-5" />
      <span
        className={`text-transparent bg-clip-text font-bold text-[12px] sm:text-[14px] ${gradientClass}`}
      >
        {r.toFixed(1)}
      </span>
    </span>
  );
};

export default Rating;
