import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS
//import { ChartData, ChartDataset } from "chart.js/auto";

import CardTitle from "../CardTitle";

import Card from "@/components/card";

const DEFAULT = [
  {
    rank: 5,
    name: "홍길동1",
    data: [10, 18],
  },
  {
    rank: 4,
    name: "홍길동2",
    data: [18, 27],
  },
  {
    rank: 1,
    name: "홍길동3",
    data: [40, 72],
  },
  {
    rank: 2,
    name: "홍길동4",
    data: [30, 42],
  },
  {
    rank: 3,
    name: "홍길동5",
    data: [22, 33],
  },
  {
    rank: 6,
    name: "홍길동6",
    data: [8, 15],
  },
  {
    rank: 7,
    name: "홍길동7",
    data: [1, 10],
  },
];
const YEAR = new Date().getFullYear();
const MONTH = new Date().getMonth() + 1;
const LASTDATE = new Date(YEAR, MONTH, 0).getDate();
const RANK_COLOR = [
  "bg-rank-1",
  "bg-rank-2",
  "bg-rank-3",
  "bg-rank-4",
  "bg-rank-5",
  "bg-rank-6",
  "bg-rank-7",
];

export default function AgencyRanking() {
  const [ranking, setRanking] = useState<{ rank: number; name: string }[]>();
  const [datasets, setDatasets] = useState<any>();
  const ref = useRef();

  useEffect(() => {
    if (!ranking) {
      const ranking = DEFAULT.sort((a, b) => {
        return a.rank - b.rank;
      }).map((item) => {
        return { rank: item.rank, name: item.name };
      });

      setRanking(ranking);
    }

    if (!datasets) {
      const datasets = DEFAULT.map((item) => {
        return { label: item.name, data: item.data };
      });

      setDatasets(datasets);
    }
  }, [ranking, datasets]);

  const labels = [];

  for (let i = 1; i <= LASTDATE; i++) {
    labels.push(
      // eslint-disable-next-line prettier/prettier
      `${String(MONTH).padStart(2, "0")}/${String(i).padStart(2, "0")}`
    );
  }

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
    },
  };

  return (
    <div className="grid grid-cols-[1fr_3fr] gap-4">
      <Card className="gap-3">
        <CardTitle title="이번 달 총판 순위" />
        <div className="border border-[#e5e5e5] border-b-0">
          <div className="flex w-full bg-[#F2F4F8] border-b border-[#e5e5e5] py-3 text-center">
            <div className="w-[30%]">순위</div>
            <div className="w-[70%]">이름</div>
          </div>
          {ranking?.map((item) => (
            <div
              key={item.rank}
              className="flex w-full border-b border-[#e5e5e5] py-3 text-center"
            >
              <div className="w-[30%]">{item.rank}</div>
              <div className="w-[70%]">{item.name}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="gap-3">
        <CardTitle title="총판별 매출 변화(백 만원)" />
        <div className="flex gap-4">
          {ranking?.map((item, index) => (
            <div key={item.rank} className="flex items-center gap-2">
              <span
                className={`block w-4 h-4 rounded-full ${RANK_COLOR[index]}`}
              />{" "}
              {item.name}
            </div>
          ))}
        </div>
        <div className="h-[320px]">
          {datasets && <Line ref={ref} data={data} options={options} />}
        </div>
      </Card>
    </div>
  );
}
