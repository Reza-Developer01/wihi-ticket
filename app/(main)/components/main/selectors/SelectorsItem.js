import Link from "next/link";

const SelectorsItem = ({ item }) => {
  return (
    <Link
      key={item.id}
      href={item.href}
      className="plans__item-button flex items-center justify-center w-full h-12 bg-white border border-[#EFF0F6] text-[#1A1C1E] leading-[22.4px] rounded-[10px]"
    >
      {item.text}
    </Link>
  );
};

export default SelectorsItem;
