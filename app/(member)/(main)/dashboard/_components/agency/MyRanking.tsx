import { useEffect, useRef, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS

import CardTitle from "../CardTitle";

const MY_RANKING = {
  ranking: 2,
  percent: 0.2,
};

export default function MyRanking() {
  const [ranking, setRanking] = useState(MY_RANKING);
  const [rotate, setRotate] = useState({
    transform: "",
  });
  const ref = useRef();

  useEffect(() => {
    if (!rotate.transform) {
      const rot = (((50 - ranking.percent) / 50) * 90).toFixed(0);

      setRotate({
        transform: `translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(${rot}deg) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
      });
    }
  }, [rotate]);

  const data: any = {
    datasets: [
      {
        data: [50, 35, 12, 3],
        backgroundColor: ["#c1c7cd", "#ff7770", "#ffd00a", "#54cf96"],
      },
    ],
  };

  const options = {
    // responsive 속성을 false로 지정한다.
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    circumference: 180,
    rotation: -90,
    cutout: "70%",
  };

  return (
    <div className="flex flex-col gap-3">
      <CardTitle title="이번 달 내 매출 순위" />
      <div className="w-full h-[240px] relative">
        <div className="w-[60%] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <Doughnut ref={ref} data={data} options={options} />
          <div
            className={`absolute top-[100%] left-[50%] -translate-x-[50%] -translate-y-[106%] h-[90px] w-[90px] transition-all duration-700 origin-bottom`}
            style={rotate}
          >
            <svg
              fill="#ccc"
              id="Capa_1"
              stroke="#888888"
              strokeWidth="0.00511"
              transform="rotate(180)"
              version="1.1"
              viewBox="-51.1 -51.1 613.20 613.20"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g
                id="SVGRepo_tracerCarrier"
                stroke="#CCCCCC"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3.066"
              />
              <g id="SVGRepo_iconCarrier">
                <g>
                  <path d="M255.5,0C238.131,0,224,14.131,224,31.5v88c0,0.156,0.005,0.312,0.015,0.468l24,384c0.247,3.953,3.525,7.032,7.485,7.032 s7.238-3.079,7.485-7.032l24-384c0.01-0.156,0.015-0.312,0.015-0.468v-88C287,14.131,272.869,0,255.5,0z M272,119.266l-16.5,264 l-16.5-264V31.5c0-9.098,7.402-16.5,16.5-16.5S272,22.402,272,31.5V119.266z" />
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div className="w-[76%] h-[160px] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex justify-between items-end">
          <div className="w-[10%] text-right">100%</div>
          <div className="absolute -top-[14px] left-[50%] -translate-x-[50%]">
            50%
          </div>
          <div className="absolute top-[44%] left-[86%]">15%</div>
          <div className="absolute bottom-[8%] left-[90%]">3%</div>
          <div className="w-[10%]">0%</div>
        </div>
        <div className="absolute top-[60%] left-[50%] -translate-x-[50%] flex flex-col gap-6 justify-center items-center">
          <div className="text-[24px] font-bold">상위 {ranking.percent}%</div>
          <div className="text-xl font-semibold text-[#aaa]">
            {ranking.ranking}위
          </div>
        </div>
      </div>
    </div>
  );
}
