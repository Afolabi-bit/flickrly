import Image from "next/image";
const Header = () => {
  return (
    <header className=" h-[80px] w-full z-50 flex justify-between items-center">
      <div className="flex items-center gap-6 w-[187px]">
        <Image
          priority
          src="/assets/tv.png"
          alt="TV logo"
          width={50}
          height={50}
        />
        <h1 className="text-2xl font-bold leading-6 ">Flickerly</h1>
      </div>
      <form className="form w-[525px] h-[36px] relative">
        <input
          type="text"
          placeholder="What do you want to watch?"
          className="w-full h-full px-[10px] py-[6px] outline-white rounded-[6px] placeholder:text-white border border-white "
        />
        <button type="submit" className="absolute top-[6px] right-[10px]">
          <Image
            src="/assets/Search.png"
            alt="search icon"
            width={16}
            height={16}
            priority
          />
        </button>
      </form>
      <div>
        <button className="cursor-pointer w-[114px] h-[36px] flex justify-between items-center">
          <span className="text-[16px] font-bold">Sign in</span>
          <Image
            src="/assets/Menu.png"
            alt="menu-icon"
            width={36}
            height={36}
            priority
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
