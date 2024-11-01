import { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS
import { TooltipItem } from "chart.js/auto";
import { IoIosArrowForward } from "react-icons/io";

import CardTitle from "./CardTitle";
import BurnoutRateModal from "./BurnoutRateModal";

import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";

const COMPANY = [
  {
    name: "매체사1",
    burnoutRate: 70,
  },
  {
    name: "매체사2",
    burnoutRate: 60,
  },
  {
    name: "매체사3",
    burnoutRate: 55,
  },
  {
    name: "매체사4",
    burnoutRate: 50,
  },
  {
    name: "매체사5",
    burnoutRate: 51,
  },
  {
    name: "매체사6",
    burnoutRate: 40,
  },
  {
    name: "매체사7",
    burnoutRate: 30,
  },
  {
    name: "매체사8",
    burnoutRate: 9,
  },
];

export default function BurnoutRate() {
  const [companies, setCompanies] = useState(COMPANY);
  const [datasets, setDatasets] = useState<any>();
  const [labels, setLabels] = useState<string[]>();
  const ref = useRef();
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();

  useEffect(() => {
    if (!datasets) {
      const datas = companies.map((item) => {
        return item.burnoutRate;
      });
      const maxDatas = companies.map((item) => {
        return 100 - item.burnoutRate;
      });

      setDatasets([
        { data: datas, backgroundColor: "#878D96" },
        { data: maxDatas, backgroundColor: "#DDE1E6" },
      ]);
    }

    if (!labels) {
      const labels = companies.map((item) => {
        return item.name;
      });

      setLabels(labels);
    }
  }, [datasets, labels]);

  const data: any = {
    labels,
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
            const label =
              tooltipItems.datasetIndex === 0 ? "현재 소진율" : "잔여 소진율";
            const value = `${tooltipItems.formattedValue}%`;

            return `${label} : ${value}`;
          },
        },
      },
    },
    barThickness: 24,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const handleClick = () => {
    setModalOpen(true);
    setModalContents(<BurnoutRateModal />);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center *:cursor-pointer">
        <CardTitle title="매체사별 소진율" onClick={handleClick} />
        <IoIosArrowForward
          className="w-[24px] text-2xl"
          onClick={handleClick}
        />
      </div>
      <div className="fles flex-col">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="block w-4 h-4 rounded-full bg-[#878D96]" /> 현재
            소진율
          </div>
          <div className="flex items-center gap-2">
            <span className="block w-4 h-4 rounded-full bg-[#DDE1E6]" /> 잔여
            소진율
          </div>
        </div>
      </div>
      <div className="h-[240px]">
        {datasets && <Bar ref={ref} data={data} options={options} />}
      </div>
    </div>
  );
}
