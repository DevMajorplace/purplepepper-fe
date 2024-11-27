import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";
import instance from "@/api/axios";

export default function MoneyChkApprovalModal({
  type,
  info,
}: {
  type: string;
  info: any;
}) {
  const [state, setState] = useState(false);
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();
  const router = useRouter();
  const params = useParams();
  const { category } = params;

  // 취소 클릭시
  const handleCancelClick = () => {
    setModalOpen(false);
    setModalContents(<></>);
  };

  // 확인 클릭시
  const handleConfirmClick = async () => {
    try {
      if (type === "add") {
        // 추가일 때
        await instance.post(`/boards`, {
          category: info.category,
          title: info.title,
          content: info.content,
          visible: info.target,
          file_urls: info.files,
        });
      } else if (type === "edit") {
        // 수정일 때
        await instance.put(`/boards/${info.id}`, {
          category: info.category,
          title: info.title,
          content: info.content,
          visible: info.target,
          file_urls: info.files,
        });
      } else {
        // 삭제일 때
        await instance.delete(`/boards/${info.id}`);
      }

      setState(true);
    } catch (error: any) {
      //console.log(error);
      alert(error.response.data.message);
    }
  };

  // 확인 클릭시
  const handleOkayClick = () => {
    setModalOpen(false);
    setModalContents(<></>);
    router.push(`/notice/${category}`);
  };

  return (
    <div className="min-w-[360px]">
      <div className="text-[20px] font-bold">
        공지사항{" "}
        {type === "delete" ? "삭제" : type === "edit" ? "수정" : "추가"}
      </div>
      <p className="text-[#000]/60 mt-1 mb-6">
        {state
          ? `${info.title}을 ${type === "delete" ? "삭제" : type === "edit" ? "수정" : "추가"}했습니다.`
          : `${info.title}을 ${type === "delete" ? "삭제" : type === "edit" ? "수정" : "추가"} 하시겠습니까?`}
      </p>
      <div className="flex justify-between *:px-4 *:py-2 *:rounded">
        {state ? (
          <button
            className="w-full bg-[#333] text-white hover:bg-[#111]"
            onClick={handleOkayClick}
          >
            확인
          </button>
        ) : (
          <>
            <button
              className="border border-[#ccc]"
              onClick={handleCancelClick}
            >
              취소
            </button>
            <button
              className="bg-[#333] text-white hover:bg-[#111]"
              onClick={handleConfirmClick}
            >
              {type === "delete" ? "삭제" : type === "edit" ? "수정" : "추가"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
