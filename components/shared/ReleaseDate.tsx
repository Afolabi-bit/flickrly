interface Date {
  date: string;
}
const ReleaseDate = ({ date }: Date) => {
  return (
    <span className="leading-0 text-[12px] font-bold text-[#9CA3AF]">
      {new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </span>
  );
};

export default ReleaseDate;
