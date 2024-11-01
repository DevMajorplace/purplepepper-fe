"use client";

import { useEffect, useRef, useState } from "react";
import { BsCalendar4Range } from "react-icons/bs";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

//const TODAY = new Date();

// 날짜 포맷 변경
export const dateFormat = (date: Value, type = "day", delimiter = ".") => {
  if (date === null) {
    return ""; // Return empty string if date is null
  }

  const year = date instanceof Date && date.getFullYear();
  const month =
    date instanceof Date && (date.getMonth() + 1).toString().padStart(2, "0");
  const day =
    date instanceof Date && date.getDate().toString().padStart(2, "0");

  if (type === "month") {
    return [year, month].join(delimiter);
  }

  return [year, month, day].join(delimiter);
};

export const dayToString = (date: Date) => {
  const day = date.getDay();

  switch (day) {
    case 0:
      return "일";
    case 1:
      return "월";
    case 2:
      return "화";
    case 3:
      return "수";
    case 4:
      return "목";
    case 5:
      return "금";
    case 6:
      return "토";
    default:
      return "";
  }
};

export const tileClassName = ({ date, view }: { date: Date; view: string }) => {
  // 일요일(0) 또는 토요일(6)인지 확인하여 클래스를 지정합니다.
  if (view === "month" && date.getDay() === 0 /* 일요일 */) {
    return "sun"; // 일요일에 해당하는 클래스
  }
  if (view === "month" && date.getDay() === 1 /* 월요일 */) {
    return "mon"; // 월요일에 해당하는 클래스
  }
  if (view === "month" && date.getDay() === 2 /* 화요일 */) {
    return "tue"; // 화요일에 해당하는 클래스
  }
  if (view === "month" && date.getDay() === 3 /* 수요일 */) {
    return "wed"; // 수요일에 해당하는 클래스
  }
  if (view === "month" && date.getDay() === 4 /* 목요일 */) {
    return "thu"; // 목요일에 해당하는 클래스
  }
  if (view === "month" && date.getDay() === 5 /* 금요일 */) {
    return "fri"; // 금요일에 해당하는 클래스
  }
  if (view === "month" && date.getDay() === 6 /* 토요일 */) {
    return "sat"; // 토요일에 해당하는 클래스
  }

  return ""; // 다른 날짜는 추가 클래스가 없습니다.
};

export const tileDayFormat = (date: Date) => {
  return date.getDate().toString();
};

export default function CalendarInput({
  placeholder,
  width = "w-[100%]",
  height = "h-12",
  background = "bg-white",
  border = "border border-[#ccc]",
  style = "",
  startDate,
  endDate,
  range = false,
  onChange,
  required = false,
  minDate,
}: CalendarInputProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const calRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (calRef.current && !calRef.current.contains(e.target as Node)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 인풋 클릭시 캘린더 토글
  const handleClick = () => {
    setShowCalendar(!showCalendar);
  };

  // 캘린더 날짜 변화시
  const handleDayChange = (value: Value) => {
    onChange(value);
    setShowCalendar(false);
  };

  return (
    <div ref={calRef} className="relative">
      <div className={`relative`}>
        <BsCalendar4Range
          className={`mr-2 text-base absolute left-4 top-[53%] translate-y-[-50%]  ${
            !startDate && !endDate ? "text-[#333]/50" : ""
          }`}
        />
        <input
          className={`
            ${width} 
            ${height} 
            ${background} 
            ${border} 
            rounded-md 
            pl-10
            ${style}
            cursor-pointer
            placeholder:text-[#333]/50
          `}
          defaultValue={
            range && endDate ? `${startDate} ~ ${endDate}` : startDate
          }
          placeholder={placeholder}
          required={required}
          type="text"
          onClick={handleClick}
        />
      </div>
      {showCalendar && (
        <div className="absolute top-[calc(100%+6px)] left-[0] calendarWrap z-10">
          <Calendar
            calendarType="gregory"
            formatDay={(locale, date) => tileDayFormat(date)}
            locale="ko-KR"
            minDate={minDate ? new Date(minDate) : undefined}
            returnValue={range ? "range" : "start"}
            selectRange={range ? true : false}
            showNeighboringMonth={false}
            tileClassName={tileClassName}
            value={
              range && endDate
                ? ([new Date(startDate), new Date(endDate)] as Value)
                : startDate
            }
            onChange={(value) => handleDayChange(value)}
          />
        </div>
      )}
    </div>
  );
}
