import { useEffect, useRef, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS
import { TooltipItem } from "chart.js/auto";
import { IoIosArrowForward } from "react-icons/io";

import CardTitle from "../CardTitle";

import TargetSalesModal from "./TargetSalesModal";

import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";

export default function AdminTargetSales() {
  const [datasets, setDatasets] = useState<any>();
  const ref = useRef();
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();

  useEffect(() => {
    if (!datasets) {
      setDatasets([
        {
          label: ["달성량", "잔여량"],
          data: [70, 30],
          backgroundColor: ["#878d96", "#dde1e6"],
        },
      ]);
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

            return `${label} : ${value}%`;
          },
        },
      },
    },
    cutout: "70%",
    borderWidth: 0,
    borderJoinStyle: "round",
  };

  const handleClick = () => {
    setModalOpen(true);
    setModalContents(<TargetSalesModal />);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center *:cursor-pointer">
        <CardTitle title="이번 달 목표 매출" onClick={handleClick} />
        <IoIosArrowForward
          className="w-[24px] text-2xl"
          onClick={handleClick}
        />
      </div>
      <div className="relative">
        <div className="absolute -top-5 left-0 flex gap-4">
          <div className="flex items-center gap-2">
            <span className="block w-4 h-4 rounded-full bg-[#878D96]" /> 달성량
          </div>
          <div className="flex items-center gap-2">
            <span className="block w-4 h-4 rounded-full bg-[#DDE1E6]" /> 잔여량
          </div>
        </div>
        <div className="h-[200px] relative">
          {datasets && <Doughnut ref={ref} data={data} options={options} />}
          <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col justify-center items-center">
            <div className="text-[28px] font-bold">17.6억원</div>
            <div className="text-[18px] font-semibold">70%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
