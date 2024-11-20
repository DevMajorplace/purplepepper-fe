import { ChangeEvent } from "react";
import { IoIosSearch } from "react-icons/io";

export default function SearchList({
  title,
  placeholder,
  info,
  setInfo,
  selected,
  list,
  setQuery,
}: SearchListProps) {
  // 선택된 매체사 클릭시 삭제
  const handleRemoveClick = (item: string) => {
    const newItem = selected.filter((value) => {
      return value !== item;
    });

    if (title === "매체사") {
      setInfo({ ...info, affiliate: newItem });
    } else {
      setInfo({ ...info, browserInflow: newItem });
    }
  };

  // 매체사명 검색 - 300ms마다 자동 검색
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // 매체사 클릭시 추가/제거
  const handleListClick = (item: string) => {
    let newItem: string[] = [];

    if (selected.includes(item)) {
      newItem = selected.filter((value) => {
        return value !== item;
      });
    } else {
      if (title === "매체사") {
        newItem = [...info.affiliate, item];
      } else {
        newItem = [...info.browserInflow, item];
      }
    }

    if (title === "매체사") {
      setInfo({ ...info, affiliate: newItem });
    } else {
      setInfo({ ...info, browserInflow: newItem });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div>{title} 설정</div>
      {selected.length > 0 && (
        <div className="flex flex-col gap-1 pb-2 text-[12px]">
          <div className="text-[#666]">
            현재 선택된 {title} 목록(클릭시 제거)
          </div>
          <div className="flex flex-wrap gap-2">
            {selected.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer border border-[#ccc] rounded-md text-center py-2 px-4"
                role="presentation"
                onClick={() => handleRemoveClick(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <div className="border border-[#ccc] rounded-md overflow-hidden">
          <div
            className={`items-center gap-1 px-4 h-full flex border-b border-b-[#ccc]`}
          >
            <IoIosSearch className="text-[18px] pt-[1px] search_icon" />{" "}
            <input
              className="h-12 px-2 placeholder:text-[#333]/50 w-full outline-none"
              placeholder={placeholder}
              type="search"
              onChange={(e) => handleSearch(e)}
            />
          </div>
          <div className="overflow-y-scroll scroll-bar h-52 px-2 py-2">
            <div className="flex flex-col">
              {list.map((item, index) => (
                <div
                  key={index}
                  className={`p-2 cursor-pointer ${selected.includes(item.name) ? "bg-[#eee]" : ""}`}
                  role="presentation"
                  onClick={() => handleListClick(item.name)}
                >
                  {item.name}
                </div>
              ))}
            </div>
            {list.length === 0 && (
              <div className="w-full h-full text-center content-center">
                검색된 {title}가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
