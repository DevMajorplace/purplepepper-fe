import { ChangeEvent, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import OnOffButton from "@/components/button/OnOffButton";
import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";

export default function MissionTypeEditModal({
  info,
}: MissionTypeEditModalProps) {
  const [data, setData] = useState(info);
  const [state, setState] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();
  const router = useRouter();
  const pathname = usePathname();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      name: e.target.value,
    });
  };

  const handleClickIsUse = () => {
    setData((prev) => {
      return {
        ...data,
        isUse: !prev.isUse,
      };
    });
  };

  // 변경 클릭시
  const handleConfirmClick = () => {
    setConfirm(true);
  };

  // 취소 클릭시
  const handleCancelClick = () => {
    setModalOpen(false);
    setModalContents(<></>);
  };

  // 변경 확인 클릭시
  const handleEditClick = () => {
    setState(true);
  };

  // 변경 취소 클릭시
  const handleConfirmCancelClick = () => {
    setConfirm(false);
  };

  // 분류 삭제하기 클릭시
  const handleDeleteConfirmClick = () => {
    setIsDelete(true);
  };

  // 분류 삭제하기 취소 클릭시
  const handleDeleteConfirmCancelClick = () => {
    setIsDelete(false);
  };

  // 분류 삭제하기 삭제 클릭시
  const handleDeleteClick = () => {
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
      <div className="text-[20px] font-bold">
        {isDelete ? "분류 삭제" : "분류 정보 수정"}
      </div>
      {isDelete ? (
        state ? (
          <div>{info.name}이 삭제되었습니다.</div>
        ) : (
          <div>{info.name}을 삭제하시겠습니까?</div>
        )
      ) : state ? (
        <div>
          {data.name !== info.name && (
            <div>분류명이 {data.name}으로 수정되었습니다.</div>
          )}
          {data.isUse !== info.isUse && (
            <div>
              상태가 {data.isUse ? "비활성화" : "활성화"} 상태로 변경되었습니다.
            </div>
          )}
        </div>
      ) : confirm ? (
        <div>
          {data.name !== info.name && (
            <div>
              {info.name}을 {data.name}으로 수정하시겠습니까?
            </div>
          )}
          {data.isUse !== info.isUse && (
            <div>
              {data.isUse ? "활성화" : "비활성화"} 상태를{" "}
              {data.isUse ? "비활성화" : "활성화"} 상태로 변경하시겠습니까?
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
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
          <div
            className="flex gap-2 items-center cursor-pointer"
            role="presentation"
            onClick={handleClickIsUse}
          >
            현재 상태: {data.isUse ? "활성화" : "비활성화"}
            <OnOffButton on={data.isUse} />
          </div>
          <div>
            <button
              className={`rounded-md px-6 py-3 bg-[#DC2626] text-white disabled:opacity-50`}
              disabled={data.used}
              onClick={handleDeleteConfirmClick}
            >
              {data.used ? "삭제 불가능: 미션 구동 기록 존재" : "분류 삭제하기"}
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between *:px-4 *:py-2 *:rounded mt-4">
        {state ? (
          <button
            className="w-full bg-[#333] text-white hover:bg-[#111]"
            onClick={handleOkayClick}
          >
            확인
          </button>
        ) : isDelete ? (
          <>
            <button
              className="border border-[#ccc]"
              onClick={handleDeleteConfirmCancelClick}
            >
              취소
            </button>
            <button
              className="bg-[#333] text-white hover:bg-[#111]"
              onClick={handleDeleteClick}
            >
              확인
            </button>
          </>
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
              onClick={handleEditClick}
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
              disabled={data.name === info.name && data.isUse === info.isUse}
              onClick={handleConfirmClick}
            >
              변경
            </button>
          </>
        )}
      </div>
    </div>
  );
}
