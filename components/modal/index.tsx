"use client";

import { useEffect, useRef } from "react";

import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";

export default function Modal({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 마운트 시, 이벤트 리스너에 handleFocus 함수 등록
    function handleFocus(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        // 옵션 숨기기
        setModalOpen(false);
        setModalContents(<></>);
      }
    }
    document.addEventListener("mousedown", handleFocus);

    // 언마운트 시, 이벤트 리스너에 handleFocus 함수 삭제
    return () => {
      document.removeEventListener("mousedown", handleFocus);
    };
  }, []);

  return (
    <>
      <div
        ref={ref}
        className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] border border-gray-200 rounded-md p-5 shadow bg-white z-[70]"
      >
        {children}
      </div>
      <div className="w-full h-full fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#000] opacity-30 z-[60]" />
    </>
  );
}
