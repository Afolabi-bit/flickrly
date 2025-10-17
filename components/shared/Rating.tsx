import { BadgeCheck } from "lucide-react";

interface RatingProps {
  rating: number; // expected 0.0 - 10.0, can be .5
}

/**
 * Bucket rules used:
 * 0.0 <= r < 1.0   -> bucket 0-1
 * 1.0 <= r < 2.0   -> bucket 1-2
 * 2.0 <= r < 3.0   -> bucket 2-3
 * 3.0 <= r < 4.0   -> bucket 3-4
 * 4.0 <= r < 5.0   -> bucket 4-5
 * 5.0 <= r < 5.5   -> bucket 5-5.5
 * 5.5 <= r < 6.0   -> bucket 5.5-6
 * 6.0 <= r < 6.5   -> bucket 6-6.5
 * 6.5 <= r < 7.0   -> bucket 6.5-7
 * 7.0 <= r < 7.5   -> bucket 7-7.5
 * 7.5 <= r < 8.0   -> bucket 7.5-8
 * 8.0 <= r < 8.5   -> bucket 8-8.5
 * 8.5 <= r < 9.0   -> bucket 8.5-9
 * 9.0 <= r < 9.5   -> bucket 9-9.5
 * 9.5 <= r <=10.0  -> bucket 9.5-10
 */
const Rating = ({ rating }: RatingProps) => {
  // clamp to 0..10 to avoid surprises
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
    <span
      className={`mb-4 text-[12px] leading-3 flex gap-1.5 items-center ${ratingColor}`}
    >
      <BadgeCheck strokeWidth={3} size={20} />
      <span
        className={`text-transparent bg-clip-text font-bold text-[14px] ${gradientClass}`}
      >
        {r.toFixed(1)}
      </span>
    </span>
  );
};

export default Rating;
