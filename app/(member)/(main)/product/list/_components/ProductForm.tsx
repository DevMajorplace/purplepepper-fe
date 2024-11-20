import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { createColumnHelper } from "@tanstack/react-table";

import TableTh from "../../../_components/TableTh";
import Table from "../../../_components/Table";

import SearchList from "./SearchList";

import OnOffButton from "@/components/button/OnOffButton";
import Input from "@/components/Input";
import CalendarInput, { dateFormat } from "@/components/Input/CalendarInput";
import useDebounce from "@/hooks/useDebounce";

type RowObj = {
  major: string; // 대분류명
  idx: string; // 중분류 IDX
  name: string; // 증분류명
  small: number; // 하위 소분류 수
  createdAt: string; // 등록일시
  average: number; // 평균 입금가
  price: number; // 상품가 입력
};

const columnHelper = createColumnHelper<RowObj>();

const TIME = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

const AFFILIATE = [
  {
    idx: "idx1",
    name: "매체사명1",
  },
  {
    idx: "idx2",
    name: "매체사명2",
  },
  {
    idx: "idx3",
    name: "매체사명3",
  },
  {
    idx: "idx4",
    name: "매체사명4",
  },
  {
    idx: "idx5",
    name: "매체사명5",
  },
  {
    idx: "idx6",
    name: "매체사명6",
  },
  {
    idx: "idx7",
    name: "매체사명7",
  },
  {
    idx: "idx8",
    name: "매체사명8",
  },
  {
    idx: "idx9",
    name: "매체사명9",
  },
  {
    idx: "idx10",
    name: "매체사명10",
  },
];

const BROWSER = [
  {
    idx: "idx1",
    name: "브라우저 경로1",
  },
  {
    idx: "idx2",
    name: "브라우저 경로2",
  },
  {
    idx: "idx3",
    name: "브라우저 경로3",
  },
  {
    idx: "idx4",
    name: "브라우저 경로4",
  },
  {
    idx: "idx5",
    name: "브라우저 경로5",
  },
  {
    idx: "idx6",
    name: "브라우저 경로6",
  },
  {
    idx: "idx7",
    name: "브라우저 경로7",
  },
  {
    idx: "idx8",
    name: "브라우저 경로8",
  },
  {
    idx: "idx9",
    name: "브라우저 경로9",
  },
  {
    idx: "idx10",
    name: "브라우저 경로10",
  },
];

const TABLE_DATA = [
  {
    major: "대분류",
    idx: "idx1",
    price: 100,
    name: "중분류명",
    small: 10,
    createdAt: "2024-10-10",
    average: 60,
  },
];

export default function ProductForm({
  idx,
  type,
}: {
  idx?: string;
  type: string;
}) {
  const [info, setInfo] = useState<Product>({
    name: "",
    explanation: "",
    thumbnail: "",
    isDisplay: false,
    startDate: "",
    endDate: "",
    pointRate: {
      depth_1: undefined,
      depth_2: undefined,
      depth_3: undefined,
    },
    correctRate: undefined,
    affiliate: [],
    browserInflow: [],
    productPrice: [
      {
        idx: "idx1",
        price: 100,
      },
    ],
  });
  const router = useRouter();
  const [affiliateQuery, setAffiliateQuery] = useState("");
  const [affiliate, setAffiliate] = useState(AFFILIATE);
  const [browserInflowQuery, setBrowserInflowQuery] = useState("");
  const [browserInflow, setBrowserInflow] = useState(BROWSER);
  const debouncedAffiliateQuery = useDebounce(affiliateQuery, 1000);
  const debouncedBrowserInflowQuery = useDebounce(browserInflowQuery, 1000);
  const [priceData, setPriceData] = useState(info.productPrice);
  const [tableData, setTableData] = useState(TABLE_DATA);

  useEffect(() => {
    if (affiliateQuery) {
      const aff = AFFILIATE.filter((item) => {
        if (item.name.includes(affiliateQuery)) return item;
      });

      setAffiliate(aff);
    } else {
      setAffiliate(AFFILIATE);
    }

    if (browserInflowQuery) {
      const brow = BROWSER.filter((item) => {
        if (item.name.includes(browserInflowQuery)) return item;
      });

      setBrowserInflow(brow);
    } else {
      setBrowserInflow(BROWSER);
    }
  }, [debouncedAffiliateQuery, debouncedBrowserInflowQuery]);

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>, idx: string) => {
    const newPrice = priceData.map((item) => {
      if (item.idx === idx) {
        return { ...item, price: Number(e.target.value) };
      } else {
        return item;
      }
    });

    setPriceData(newPrice);
  };

  const COLUMNS = [
    columnHelper.accessor("major", {
      id: "major",
      header: () => <TableTh text="상위 대분류명" />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("idx", {
      id: "idx",
      header: () => <TableTh text="중분류 IDX" />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: () => <TableTh text="중분류명" />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("small", {
      id: "small",
      header: () => <TableTh text="하위 소분류 수" />,
      cell: (info) => info.getValue().toLocaleString(),
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => <TableTh text="등록일시" />,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("average", {
      id: "average",
      header: () => <TableTh text="평균 입금가" />,
      cell: (info) => info.getValue().toLocaleString(),
    }),
    columnHelper.accessor("price", {
      id: "price",
      header: () => <TableTh className="text-center" text="상품가 입력" />,
      cell: (info) => {
        const idx = info.row.original.idx;
        let price;

        priceData.filter((item) => {
          if (item.idx === idx) price = item.price;
        });

        return (
          <div className="flex justify-center items-center">
            <input
              className="no_spin_button h-10 border border-[#ccc] rounded-md text-right px-2"
              defaultValue={price}
              name={idx}
              type="number"
            />
          </div>
        );
      },
    }),
  ];

  // 정보 수정시
  const handleChange = (
    // eslint-disable-next-line prettier/prettier
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setInfo({
      ...info,
      [name]: value,
    });
  };

  // 이미지 업로드
  const readImage = (image: File) => {
    const reader = new FileReader();

    reader.readAsDataURL(image);
    reader.onloadend = (e) => {
      const {
        currentTarget: { result },
      }: any = e;

      setInfo({
        ...info,
        thumbnail: result,
      });
    };
  };

  // 썸네일 업로드
  const handleUploadFile = (e: any) => {
    const files: any = e.target.files;

    if (files.length !== 0) {
      const file = files[0];

      readImage(file);
    } else {
      return;
    }
  };

  // 이미지 드래그 앤 드롭
  const handleImgDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      readImage(e.dataTransfer.files[0]);
    }
  };

  // 이미지 삭제
  const handleImgRemove = (e: any) => {
    e.preventDefault();

    setInfo({
      ...info,
      thumbnail: "",
    });
  };

  // 노출시작 일시 변경
  const handleStartDateChange = (value: Value) => {
    const time = info.startDate.split(" ")[1];
    const date = dateFormat(value, "day", "-");

    setInfo({
      ...info,
      startDate: `${date} ${time ? time : "00:00"}`,
    });
  };

  // 노출시작 시간 변경
  const handleStartTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const time = e.target.value;
    const date = info.startDate.split(" ")[0];

    setInfo({
      ...info,
      startDate: `${date} ${time}`,
    });
  };

  // 노출종료 일시 변경
  const handleEndDateChange = (value: Value) => {
    const time = info.endDate.split(" ")[1];
    const date = dateFormat(value, "day", "-");

    setInfo({
      ...info,
      endDate: `${date} ${time ? time : "00:00"}`,
    });
  };

  // 노출종료 시간 변경
  const handleEndTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const time = e.target.value;
    const date = info.endDate.split(" ")[0];

    setInfo({
      ...info,
      endDate: `${date} ${time}`,
    });
  };

  // 포인트 분배비율 변경시
  const handlePointChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInfo({
      ...info,
      pointRate: {
        ...info.pointRate,
        [name]: value,
      },
    });
  };

  // 제출시
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    console.log(data);
    console.log(info);
  };

  return (
    <div className="w-[880px]">
      <form
        className="flex flex-col gap-4 [&_.inputWrap]:flex [&_.inputWrap]:justify-between *:[&_.inputWrap]:w-[49%]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="text-[18px] font-bold">상품의 정보를 입력해주세요.</div>
        {/* 상품명 */}
        <div className="inputWrap">
          <Input
            htmlFor={"name"}
            label="상품 이름"
            name={"name"}
            placeholder="상품 이름 입력"
            type={"text"}
            value={info.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        {/* 상품 설명 */}
        <div>
          <Input
            htmlFor={"explanation"}
            label="상품 설명"
            name={"explanation"}
            placeholder="상품 설명 입력"
            type={"text"}
            value={info.explanation}
            onChange={(e) => handleChange(e)}
          />
        </div>
        {/* 썸네일 이미지 */}
        <div className="inputWrap">
          <div className="flex flex-col gap-2">
            <div>썸네일 이미지</div>
            <label
              className="flex flex-col items-center justify-center w-full py-6 px-4 text-center border border-[#d6d6d6] rounded-lg cursor-pointer bg-[#f9f9f9] dark:bg-gray-700 hover:bg-[#f6f6f6] dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-800"
              htmlFor="dropzone-file"
              onDragEnter={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => handleImgDrop(e)}
            >
              <span className="hidden text-[0px] w-0 h-0">
                상품 썸네일 이미지 업로드
              </span>
              <div className="flex flex-col items-center justify-center">
                {info.thumbnail ? (
                  <div className="relative w-[90%]">
                    <img
                      alt="미리보기"
                      className="w-full"
                      src={
                        info.thumbnail
                          ? info.thumbnail
                          : `/images/icon/user.png`
                      }
                    />
                    <div
                      className="absolute -right-4 -top-4 text-3xl z-10"
                      role="presentation"
                      onClick={(e) => handleImgRemove(e)}
                    >
                      <RiCloseCircleFill />
                    </div>
                  </div>
                ) : (
                  <div className="py-3 flex flex-col items-center">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mb-2 text-[#999] dark:text-gray-400"
                      fill="none"
                      viewBox="0 0 20 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                    <p className="text-sm text-[#999] dark:text-gray-400">
                      <span className="font-semibold">
                        파일을 드래그 하거나 클릭
                      </span>
                      해서 업로드 해주세요.
                    </p>
                    <p className="text-xs text-[#999] dark:text-gray-400">
                      PNG, JPG, JPEG
                    </p>
                  </div>
                )}
              </div>
              <input
                accept=".png, .jpeg, .jpg"
                className="hidden"
                id="dropzone-file"
                name="thumbnail"
                type="file"
                onChange={(e) => handleUploadFile(e)}
              />
            </label>
          </div>
        </div>
        {/* 노출 일시 */}
        <div>
          <div className="flex flex-col gap-2">
            <div>노출시작/종료일시</div>
            <div className="flex items-center gap-3">
              노출 기간 여부
              <div
                className="flex gap-2 items-center cursor-pointer"
                role="presentation"
                onClick={() => {
                  setInfo({
                    ...info,
                    isDisplay: !info.isDisplay,
                  });
                }}
              >
                <OnOffButton on={info.isDisplay} />
              </div>
            </div>
            <div className="inputWrap">
              <div className="flex gap-2">
                <CalendarInput
                  placeholder="노출시작 일시"
                  range={false}
                  required={true}
                  startDate={info.startDate ? info.startDate.split(" ")[0] : ""}
                  width="w-64"
                  onChange={(value) => handleStartDateChange(value)}
                />
                <select
                  className="w-64 h-12 bg-white border border-[#ccc] rounded-md pl-3 cursor-pointer placeholder:text-[#333]/50"
                  id="startDate"
                  name="startDate"
                  onChange={(e) => handleStartTimeChange(e)}
                >
                  {TIME.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              {info.isDisplay && (
                <div className="flex gap-2">
                  <CalendarInput
                    placeholder="노출종료 일시"
                    range={false}
                    required={true}
                    startDate={info.endDate ? info.endDate.split(" ")[0] : ""}
                    width="w-64"
                    onChange={(value) => handleEndDateChange(value)}
                  />
                  <select
                    className="w-64 h-12 bg-white border border-[#ccc] rounded-md pl-3 cursor-pointer placeholder:text-[#333]/50"
                    id="endDate"
                    name="endDate"
                    onChange={(e) => handleEndTimeChange(e)}
                  >
                    {TIME.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* 포인트 분배비율 */}
        <div className="inputWrap">
          <div className="flex flex-col gap-2">
            <div>포인트 분배비율</div>
            <div className="flex gap-2">
              <Input
                className="no_spin_button"
                htmlFor={"depth_1"}
                label="상위 1단계"
                name={"depth_1"}
                placeholder="비율 입력"
                type={"number"}
                value={String(info.pointRate.depth_1)}
                onChange={(e) => handlePointChange(e)}
              />
              <Input
                className="no_spin_button"
                htmlFor={"depth_2"}
                label="상위 2단계"
                name={"depth_2"}
                placeholder="비율 입력"
                type={"number"}
                value={String(info.pointRate.depth_2)}
                onChange={(e) => handlePointChange(e)}
              />
              <Input
                className="no_spin_button"
                htmlFor={"depth_3"}
                label="상위 3단계"
                name={"depth_3"}
                placeholder="비율 입력"
                type={"number"}
                value={String(info.pointRate.depth_3)}
                onChange={(e) => handlePointChange(e)}
              />
            </div>
          </div>
        </div>
        {/* 한계 정답률 */}
        <div className="inputWrap">
          <Input
            className="no_spin_button"
            htmlFor={"correctRate"}
            label="한계 정답률"
            name={"correctRate"}
            placeholder="미입력시 기본 80%, 이 이하로 내려가면 미션 일시중지"
            type={"number"}
            value={String(info.correctRate)}
            onChange={(e) => handleChange(e)}
          />
        </div>
        {/* 매체사 설정 */}
        <div>
          <SearchList
            info={info}
            list={affiliate}
            placeholder={"매체사명을 입력해주세요."}
            selected={info.affiliate}
            setInfo={setInfo}
            setQuery={setAffiliateQuery}
            title={"매체사"}
          />
        </div>
        {/* 브라우저 경로 설정 */}
        <div>
          <SearchList
            info={info}
            list={browserInflow}
            placeholder={"브라우저 경로명을 입력해주세요."}
            selected={info.browserInflow}
            setInfo={setInfo}
            setQuery={setBrowserInflowQuery}
            title={"브라우저 경로"}
          />
        </div>
        {/* 상품가 설정 */}
        <div className="flex flex-col gap-2">
          <div>상품가 설정</div>
          <Table
            tableClass="[&_td]:py-3"
            tableData={{
              data: tableData,
              columns: COLUMNS,
            }}
          />
        </div>
        <div className="flex justify-center gap-3 pt-6 *:px-8 *:py-3 *:rounded-md [&_.addBtn]:bg-[#111] hover:[&_.addBtn]:bg-[#202020] [&_.addBtn]:text-white [&_.cancelBtn]:border [&_.cancelBtn]:border-[#888]">
          <button className="addBtn" type="submit">
            {type === "추가" ? "저장" : "수정"}
          </button>
          <button
            className="cancelBtn"
            type="button"
            onClick={() => router.back()}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
