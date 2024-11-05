import { ChangeEvent, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";
import TableSelect from "@/components/Select/TableSelect";

const MAJOR = [
  {
    value: "대분류 idx1",
    name: "대분류명",
  },
  {
    value: "대분류 idx2",
    name: "대분류명1",
  },
  {
    value: "대분류 idx3",
    name: "대분류명2",
  },
];
const MIDDLE = [
  {
    value: "중분류 idx1",
    name: "중분류1",
  },
  {
    value: "중분류 idx2",
    name: "중분류2",
  },
  {
    value: "중분류 idx3",
    name: "중분류3",
  },
];

export default function MissionTypeAddModal({
  major,
  middle,
}: {
  major?: string;
  middle?: string;
}) {
  const [data, setData] = useState({
    major: "",
    middle: "",
    name: "",
  });
  const [state, setState] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [majorList, setMajorList] = useState<missionType>(MAJOR);
  const [middleList, setMiddleList] = useState<missionType>();
  const [comment, setComment] = useState("");
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 대분류 props가 있으면
    if (major) {
      // 중분류 props가 있으면
      if (!middle) {
        setData({
          ...data,
          major,
        });
      } else {
        setData({
          ...data,
          major,
          middle,
        });
      }
      setMiddleList(MIDDLE);
    } else {
      // 초기화
      setMajorList(MAJOR);
      setMiddleList(undefined);
    }
  }, [major, middle]);

  const getName = (value: string, type: string = "대분류") => {
    let name = "";

    if (type === "대분류") {
      MAJOR.map((item) => {
        if (item.value === value) name = item.name;
      });
    } else {
      MIDDLE.map((item) => {
        if (item.value === value) name = item.name;
      });
    }

    return name;
  };

  // 분류 수정시
  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "major") {
      // 대분류 수정시
      // 중분류, 소분류 값 초기화
      setData({
        ...data,
        [name]: value === "all" ? "" : value,
        middle: "",
      });
      // 중분류 세팅
      if (value === "all") {
        setMiddleList(undefined);
      } else {
        setMiddleList(MIDDLE);
      }
    } else if (name === "middle") {
      // 중분류 수정시
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      name: e.target.value,
    });
  };

  // 취소 클릭시
  const handleCancelClick = () => {
    setModalOpen(false);
    setModalContents(<></>);
  };

  // 추가 클릭시
  const handleConfirmClick = () => {
    const comment = `${data.major && `${getName(data.major)} - `}${data.middle && `${getName(data.middle, "중분류")} - `}${data.name}를 추가하시겠습니까?`;

    setComment(comment);
    setConfirm(true);
  };

  // 변경 취소 클릭시
  const handleConfirmCancelClick = () => {
    setConfirm(false);
  };

  // 추가 확인 클릭시
  const handleAddClick = () => {
    const comment = `${data.major && `${getName(data.major)} - `}${data.middle && `${getName(data.middle, "중분류")} - `}${data.name}를 추가했습니다.`;

    setComment(comment);
    setState(true);
  };

  // 확인 클릭시
  const handleOkayClick = () => {
    //console.log(pathname);
    setModalOpen(false);
    setModalContents(<></>);
    router.push(pathname);
  };

  return (
    <div className="min-w-[420px] flex flex-col gap-4">
      <div className="text-[20px] font-bold">분류 추가</div>
      {confirm ? (
        comment
      ) : (
        <>
          <div className="flex flex-col gap-3 *:w-[100%]">
            <TableSelect
              className="[&_label]:w-[20%] [&_select]:w-[80%]"
              label={"미션 대분류"}
              name={"major"}
              options={[{ value: "all", name: "전체" }, ...majorList]}
              value={data.major}
              onChange={(e) => handleTypeChange(e)}
            />
            {middleList && (
              <TableSelect
                className="[&_label]:w-[20%] [&_select]:w-[80%]"
                label={"미션 중분류"}
                name={"middle"}
                options={[{ value: "all", name: "전체" }, ...middleList]}
                value={data.middle}
                onChange={(e) => handleTypeChange(e)}
              />
            )}
          </div>
          <div className="flex flex-col">
            <label className="pb-1" htmlFor="name">
              분류명
            </label>
            <input
              className="w-[100%] h-12 bg-white border border-[#ccc] rounded-md px-4 placeholder:text-[#333]/50"
              id="name"
              name="name"
              type="text"
              value={data.name}
              onChange={(e) => handleNameChange(e)}
            />
          </div>
        </>
      )}

      <div className="flex justify-between *:px-4 *:py-2 *:rounded mt-4">
        {state ? (
          <button
            className="w-full bg-[#333] text-white hover:bg-[#111]"
            onClick={handleOkayClick}
          >
            확인
          </button>
        ) : confirm ? (
          <>
            <button
              className="border border-[#ccc]"
              onClick={handleConfirmCancelClick}
            >
              취소
            </button>
            <button
              className="bg-[#333] text-white hover:bg-[#111]"
              onClick={handleAddClick}
            >
              확인
            </button>
          </>
        ) : (
          <>
            <button
              className="border border-[#ccc]"
              onClick={handleCancelClick}
            >
              취소
            </button>
            <button
              className="bg-[#333] text-white enabled:hover:bg-[#111] disabled:opacity-70"
              disabled={data.name === ""}
              onClick={handleConfirmClick}
            >
              추가
            </button>
          </>
        )}
      </div>
    </div>
  );
}
