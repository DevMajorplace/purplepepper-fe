import { useEffect, useRef, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS
import { TooltipItem } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

import CardTitle from "./CardTitle";

const SERIES = [
  { name: "정답미션", amount: 5.2, percent: 8.2, color: "#697077" },
  { name: "검색미션", amount: 2.1, percent: 7, color: "#878D96" },
  { name: "저장미션", amount: 1.9, percent: 2.5, color: "#A2A9B1" },
  { name: "공유미션", amount: 1.4, percent: -6.5, color: "#c1c7cd" },
  { name: "기타", amount: 1.2, percent: 1.7, color: "#DDE1E6" },
];
const MISSION_COLOR = [
  "bg-mission-1",
  "bg-mission-2",
  "bg-mission-3",
  "bg-mission-4",
  "bg-mission-5",
];

export default function SpecificGravity() {
  const [missions, setMissions] = useState(SERIES);
  const [datasets, setDatasets] = useState<any>();
  const [total, setTotal] = useState<number>();
  const ref = useRef();

  useEffect(() => {
    if (!datasets) {
      const label = missions.map((item) => {
        return item.name;
      });
      const data = missions.map((item) => {
        return item.amount;
      });
      const backgroundColor = missions.map((item) => {
        return item.color;
      });
      let total = 0;

      missions.map((item) => {
        total += item.amount;
      });

      setDatasets([{ label, data, backgroundColor }]);
      setTotal(total);
    }
  }, [datasets]);

  const data: any = {
    datasets,
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
        callbacks: {
          label: (tooltipItems: TooltipItem<any>) => {
            const index = tooltipItems.dataIndex;
            const label = tooltipItems.dataset.label[index];
            const value = tooltipItems.formattedValue;

            return `${label} : ${value}억`;
          },
        },
      },
      datalabels: {
        // datalables 플러그인 세팅
        formatter: function (value: number) {
          return total && `${((value / total) * 100).toFixed(0)}%`;
        },
        color: "black",
      },
    },
    cutout: "50%",
    borderWidth: 0,
    borderJoinStyle: "round",
  };

  return (
    <div className="flex flex-col gap-10">
      <CardTitle title="미션 비중(원)" />
      <div className="flex">
        <div className="w-[55%] h-[200px]">
          {datasets && (
            <Doughnut
              ref={ref}
              data={data}
              options={options}
              plugins={[ChartDataLabels as any]}
            />
          )}
        </div>
        <div className="w-[45%] flex flex-col gap-3 justify-center">
          {missions.map((item, index) => (
            <div key={index} className="flex justify-between w-full">
              <div className="flex gap-2 items-center w-[65%]">
                <span
                  className={`block w-4 h-4 rounded-full ${MISSION_COLOR[index]}`}
                />
                <div className="w-[55%]">{item.name}</div>
                <div>{item.amount}억</div>
              </div>
              <div className="flex items-center">
                <div
                  className={`py-[2px] px-[12px] rounded-3xl ${item.percent > 0 ? "bg-gray-100" : "bg-[#697077] text-white"}`}
                >
                  {item.percent}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
