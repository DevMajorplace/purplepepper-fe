import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";

import CardTitle from "../CardTitle";
import Table from "../../../_components/Table";
import TableTh from "../../../_components/TableTh";

type AdminRowObj = {
  currentSales: number;
  targetSales: number;
  percent: number;
};

type DistributorsRowObj = {
  name: string;
  currentSales: number;
  targetSales: {
    idx: string;
    amount: number;
  };
  percent: number;
};

const adminColumnHelper = createColumnHelper<AdminRowObj>();
const distributorsColumnHelper = createColumnHelper<DistributorsRowObj>();

const ADMIN_SALES = {
  currentSales: 100000000,
  targetSales: 120000000,
};

const DISTRIBUTORS = [
  {
    idx: "idx-1",
    name: "총판명1",
    currentSales: 100000,
    targetSales: 200000,
  },
  {
    idx: "idx-2",
    name: "총판명2",
    currentSales: 100000,
    targetSales: 200000,
  },
  {
    idx: "idx-3",
    name: "총판명3",
    currentSales: 100000,
    targetSales: 200000,
  },
  {
    idx: "idx-4",
    name: "총판명4",
    currentSales: 100000,
    targetSales: 200000,
  },
  {
    idx: "idx-5",
    name: "총판명5",
    currentSales: 100000,
    targetSales: 200000,
  },
  {
    idx: "idx-6",
    name: "총판명6",
    currentSales: 100000,
    targetSales: 200000,
  },
  {
    idx: "idx-7",
    name: "총판명7",
    currentSales: 100000,
    targetSales: 200000,
  },
  {
    idx: "idx-8",
    name: "총판명8",
    currentSales: 100000,
    targetSales: 200000,
  },
  {
    idx: "idx-9",
    name: "총판명9",
    currentSales: 100000,
    targetSales: 200000,
  },
  {
    idx: "idx-10",
    name: "총판명10",
    currentSales: 100000,
    targetSales: 200000,
  },
  {
    idx: "idx-11",
    name: "총판명11",
    currentSales: 100000,
    targetSales: 200000,
  },
  {
    idx: "idx-12",
    name: "총판명12",
    currentSales: 100000,
    targetSales: 200000,
  },
];

export default function TargetSalesModal() {
  const [adminData, setAdminData] = useState<AdminRowObj[]>([]);
  const [distributorsData, setDistributorsData] = useState<
    DistributorsRowObj[]
  >([]);
  const [editAdmin, setEditAdmin] = useState<boolean>(false);
  const [editDistributors, setEditDistributors] =
    useState<{ idx: string; targetSales: number; isEdit: boolean }[]>();

  useEffect(() => {
    if (adminData.length === 0) {
      const percent = Number(
        // eslint-disable-next-line prettier/prettier
        ((ADMIN_SALES.currentSales / ADMIN_SALES.targetSales) * 100).toFixed(2)
      );

      setAdminData([
        {
          ...ADMIN_SALES,
          percent,
        },
      ]);
    }

    if (distributorsData.length === 0) {
      const data = DISTRIBUTORS.map((item) => {
        const percent = Number(
          // eslint-disable-next-line prettier/prettier
          ((item.currentSales / item.targetSales) * 100).toFixed(2)
        );

        return {
          ...item,
          targetSales: { idx: item.idx, amount: item.targetSales },
          percent,
        };
      });

      const editData = DISTRIBUTORS.map((item) => {
        return {
          idx: item.idx,
          targetSales: item.targetSales,
          isEdit: false,
        };
      });

      setDistributorsData(data);
      setEditDistributors(editData);
    }
  }, [adminData, distributorsData, editDistributors]);

  const chkEdit = (idx: string) => {
    let chk;

    editDistributors?.filter((item) => {
      if (item.idx === idx) chk = item.isEdit;
    });

    return chk;
  };

  const handleAdminEdit = () => {
    setEditAdmin(true);
  };

  const handleDistributorsEdit = (idx: string) => {
    const newEditDistributors = editDistributors?.map((item) => {
      if (item.idx === idx) {
        return { ...item, isEdit: true };
      } else {
        return item;
      }
    });

    setEditDistributors(newEditDistributors);
  };

  const ADMIN_COLUMNS = [
    adminColumnHelper.accessor("currentSales", {
      id: "currentSales",
      header: () => <TableTh text="현재 매출" />,
      cell: (info) => `${info.getValue().toLocaleString()}원`,
    }),
    adminColumnHelper.accessor("targetSales", {
      id: "targetSales",
      header: () => <TableTh text="목표 매출" />,
      cell: (info) => (
        <>
          {editAdmin ? (
            <input
              className="no_spin_button border border-[#dedede] h-[28px] px-3 text-right"
              defaultValue={info.getValue()}
              name="admin"
              type="number"
            />
          ) : (
            <p
              className="cursor-pointer"
              role="presentation"
              onClick={handleAdminEdit}
            >
              {info.getValue().toLocaleString()}원{" "}
              <span className="text-[12px] text-[#aaa] pl-1">
                클릭하여 수정
              </span>
            </p>
          )}
        </>
      ),
    }),
    adminColumnHelper.accessor("percent", {
      id: "percent",
      header: () => <TableTh text="매출 달성량" />,
      cell: (info) => `${info.getValue()}%`,
    }),
  ];

  const DISTRIBUTORS_COLUMNS = [
    distributorsColumnHelper.accessor("name", {
      id: "name",
      header: () => <TableTh text="총판명" />,
      cell: (info) => info.getValue(),
    }),
    distributorsColumnHelper.accessor("currentSales", {
      id: "currentSales",
      header: () => <TableTh text="현재 매출" />,
      cell: (info) => `${info.getValue().toLocaleString()}원`,
    }),
    distributorsColumnHelper.accessor("targetSales", {
      id: "targetSales",
      header: () => <TableTh text="목표 매출" />,
      cell: (info) => {
        const isEdit = chkEdit(info.getValue().idx);

        return (
          <>
            {isEdit ? (
              <input
                className="no_spin_button border border-[#dedede] h-[28px] px-3 text-right"
                defaultValue={info.getValue().amount}
                name={info.getValue().idx}
                type="number"
              />
            ) : (
              <p
                className="cursor-pointer"
                role="presentation"
                onClick={() => handleDistributorsEdit(info.getValue().idx)}
              >
                {info.getValue().amount.toLocaleString()}원{" "}
                <span className="text-[12px] text-[#aaa] pl-1">
                  클릭하여 수정
                </span>
              </p>
            )}
          </>
        );
      },
    }),
    distributorsColumnHelper.accessor("percent", {
      id: "percent",
      header: () => <TableTh text="매출 달성량" />,
      cell: (info) => `${info.getValue()}%`,
    }),
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={(e) => handleSubmit(e)}>
      <div className="flex flex-col gap-1">
        <CardTitle title="목표 매출" />
        <div className="w-[52vw] overflow-hidden overflow-y-scroll scroll-bar pr-1">
          <Table
            tableClass="relative [&_thead]:sticky [&_thead]:-top-[1px] [&_th]:w-[40%] [&_th:last-child]:w-[20%] [&_td]:py-3 [&_td]:h-[49px]"
            tableData={{ data: adminData, columns: ADMIN_COLUMNS }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <CardTitle title="총판별 소진량" />
        <div className="w-[52vw] max-h-[48vh] overflow-hidden overflow-y-scroll scroll-bar pr-1">
          <Table
            tableClass="relative [&_thead]:sticky [&_thead]:-top-[1px] [&_td]:w-[30%] [&_td:first-child]:w-[20%] [&_td:last-child]:w-[20%] [&_td]:py-3 [&_td]:h-[49px]"
            tableData={{
              data: distributorsData,
              columns: DISTRIBUTORS_COLUMNS,
            }}
          />
        </div>
      </div>
      <div className="flex justify-center pt-2">
        <button
          className="w-full h-14 bg-navy-800 hover:bg-navy-900 text-white text-lg text-center content-center rounded-lg cursor-pointer"
          type="submit"
        >
          일괄 수정
        </button>
      </div>
    </form>
  );
}
