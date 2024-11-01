import { Line } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS
import { useEffect, useRef, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";

import CardTitle from "./CardTitle";
import Table from "../../_components/Table";
import TableTh from "../../_components/TableTh";

type RowObj = {
  date: string;
  sales: number;
};

const columnHelper = createColumnHelper<RowObj>();

const YEAR = new Date().getFullYear();
const MONTH = new Date().getMonth() + 1;
const LASTDATE = new Date(YEAR, MONTH, 0).getDate();

const DEFAULT = [
  {
    date: "2024.10.01",
    sales: 10000000,
  },
  {
    date: "2024.10.02",
    sales: 17000000,
  },
  {
    date: "2024.10.03",
    sales: 20000000,
  },
  {
    date: "2024.10.04",
    sales: 13000000,
  },
  {
    date: "2024.10.05",
    sales: 18000000,
  },
  {
    date: "2024.10.06",
    sales: 22000000,
  },
  {
    date: "2024.10.07",
    sales: 16000000,
  },
  {
    date: "2024.10.08",
    sales: 13000000,
  },
  {
    date: "2024.10.09",
    sales: 18000000,
  },
  {
    date: "2024.10.10",
    sales: 22000000,
  },
  {
    date: "2024.10.11",
    sales: 16000000,
  },
  {
    date: "2024.10.12",
    sales: 13000000,
  },
  {
    date: "2024.10.13",
    sales: 18000000,
  },
  {
    date: "2024.10.14",
    sales: 22000000,
  },
  {
    date: "2024.10.15",
    sales: 16000000,
  },
];

const COLUMNS = [
  columnHelper.accessor("date", {
    id: "date",
    header: () => <TableTh text="일자" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("sales", {
    id: "sales",
    header: () => <TableTh text="수익" />,
    cell: (info) => `${info.getValue().toLocaleString()}원`,
  }),
];

export default function TotalSalesModal() {
  const [datasets, setDatasets] = useState<any>();
  const [dailySales, setDailySales] = useState(DEFAULT);
  const ref = useRef();

  useEffect(() => {
    if (!datasets) {
      const data = DEFAULT.map((item) => {
        const sales = (item.sales / 1000000).toFixed(0);

        return sales;
      });

      setDatasets([{ label: "일 매출", data }]);
    }
  }, [datasets]);

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
    <div className="flex flex-col gap-3">
      <CardTitle title="이번 달 일별 매출" />
      <div className="flex gap-4">
        <div className="w-[16vw] max-h-[64vh] overflow-hidden overflow-y-scroll scroll-bar pr-1">
          <Table
            tableClass="relative [&_thead]:sticky [&_thead]:-top-[1px]"
            tableData={{ data: dailySales, columns: COLUMNS }}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-[16px] font-bold">일 매출(백 만원)</div>
          <div className="w-[52vw] h-[60vh]">
            {datasets && <Line ref={ref} data={data} options={options} />}
          </div>
        </div>
      </div>
    </div>
  );
}
