"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PiPlusBold } from "react-icons/pi";
import { GoPencil, GoTrash } from "react-icons/go";

import NoticeModal from "./NoticeModal";

import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";
import instance from "@/api/axios";
import { categories } from "@/config/site";

export default function NoticeForm() {
  const [info, setInfo] = useState<{
    category: string;
    title: string;
    content: string;
    target: string[];
    files: any[];
  }>({
    category: "category1",
    title: "",
    content: "",
    target: ["agency", "client"],
    files: [],
  });
  const [filesInput, setFilesInput] = useState([
    <input
      key={0}
      className="w-[100%] h-12 bg-white border border-[#ccc] rounded-md px-4 placeholder:text-[#333]/50 content-center"
      name="file"
      type="file"
      //onChange={(e) => handleUploadFile(e, 0)}
    />,
  ]);
  const [filesCount, setFilesCount] = useState(1);
  const params = useSearchParams();
  const searchParams = new URLSearchParams(params);
  const id = searchParams.get("id");
  const router = useRouter();
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();

  const fetchData = async () => {
    try {
      const res = await instance.get(
        // eslint-disable-next-line prettier/prettier
        `/boards/${id}`
      );

      setInfo({
        category: res.data.category,
        title: res.data.title,
        content: res.data.content,
        target: res.data.visible,
        files: res.data.file_urls,
      });
    } catch (error: any) {
      //console.log(error);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleFileInputAdd = () => {
    setFilesInput([
      ...filesInput,
      <input
        key={filesCount}
        className="w-[100%] h-12 bg-white border border-[#ccc] rounded-md px-4 placeholder:text-[#333]/50 content-center"
        name="file"
        type="file"
        //onChange={(e) => handleUploadFile(e, filesCount)}
      />,
    ]);
    setFilesCount((prev) => prev + 1);
  };

  // 공지사항 수정시
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

  // 파일 업로드
  // const handleUploadFile = (e: any, index: number) => {
  //   const files: any = e.target.files;
  //   const value: any = e.target.value;

  //   if (files.length !== 0) {
  //     const file = files[0];
  //     let newInfo = [];

  //     console.log(filesInput.length, info.files.length);

  //     if (filesInput.length === info.files.length) {
  //       newInfo = info.files.map((item, i) => {
  //         if (i === index) {
  //           return file;
  //         } else return item;
  //       });
  //     } else {
  //       newInfo = [...info.files, file];
  //     }
  //     console.log(newInfo);

  //     setInfo({ ...info, files: newInfo });
  //   } else {
  //     return;
  //   }
  // };

  const handleDeleteClick = () => {
    setModalOpen(true);
    setModalContents(<NoticeModal info={{ ...info, id }} type={"delete"} />);
  };

  // 제출시
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as any;
    const formData = new FormData();

    if (Array.isArray(target.elements.file)) {
      target.elements.file.map((file: any) => {
        formData.append("file", file);
      });
    } else {
      formData.append("file", target.elements.file);
    }

    setModalOpen(true);
    setModalContents(
      <NoticeModal
        file={formData}
        info={id ? { ...info, id } : info}
        type={id ? "edit" : "add"}
        // eslint-disable-next-line prettier/prettier
      />
    );
    //console.dir(e.target.elements.file);
  };

  return (
    <div className="w-[720px]">
      <form
        className="flex flex-col gap-4 [&_.inputWrap]:flex [&_.inputWrap]:justify-between *:[&_.inputWrap]:w-[49%]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="">
          <div className="flex flex-col gap-2">
            <label htmlFor="category">카테고리</label>
            <div>
              <div className="inline-flex items-center p-[4px] bg-[#f6f6f6] rounded-md h-[42px] *:h-[34px] *:px-5 *:rounded-md *:flex *:items-center *:cursor-pointer">
                {categories.map((item) => (
                  <div
                    key={item.id}
                    className={`${info.category === item.id ? "bg-[#fff] text-[#333] font-semibold" : "text-[#333]/50"}`}
                    role="presentation"
                    onClick={() => setInfo({ ...info, category: item.id })}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col gap-2">
            <label htmlFor="target">배포 대상</label>
            <div>
              <div className="inline-flex items-center p-[4px] bg-[#f6f6f6] rounded-md h-[42px] *:h-[34px] *:px-5 *:rounded-md *:flex *:items-center *:cursor-pointer">
                <div
                  className={`${info.target.includes("agency") && info.target.includes("client") ? "bg-[#fff] text-[#333] font-semibold" : "text-[#333]/50"}`}
                  role="presentation"
                  onClick={() =>
                    setInfo({ ...info, target: ["agency", "client"] })
                  }
                >
                  전체
                </div>
                <div
                  className={`${info.target.includes("agency") && !info.target.includes("client") ? "bg-[#fff] text-[#333] font-semibold" : "text-[#333]/50"}`}
                  role="presentation"
                  onClick={() => setInfo({ ...info, target: ["agency"] })}
                >
                  총판
                </div>
                <div
                  className={`${info.target.includes("client") && !info.target.includes("agency") ? "bg-[#fff] text-[#333] font-semibold" : "text-[#333]/50"}`}
                  role="presentation"
                  onClick={() => setInfo({ ...info, target: ["client"] })}
                >
                  광고주
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <Input
            className="w-full"
            htmlFor={"title"}
            label="공지사항 제목"
            name={"title"}
            placeholder="공지사항 제목을 입력해주세요."
            type={"text"}
            value={info.title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <Textarea
            htmlFor={"content"}
            label="공지사항 본문"
            name={"content"}
            placeholder="공지사항 본문을 입력해주세요."
            value={info.content}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-2 w-[70%]">{filesInput}</div>
          <button
            className="bg-[#000] text-white rounded-md px-4 flex items-center gap-1 h-12 disabled:bg-[#000]/60"
            disabled={filesCount > 4}
            type="button"
            onClick={handleFileInputAdd}
          >
            <PiPlusBold className="text-[18px] pt-[1px]" /> 파일 추가
          </button>
        </div>
        <div className="flex justify-center gap-3 pt-6 *:px-8 *:py-3 *:rounded-md [&_.addBtn]:bg-[#111] hover:[&_.addBtn]:bg-[#202020] [&_.addBtn]:text-white [&_.cancelBtn]:border [&_.cancelBtn]:border-[#888]">
          <button className="addBtn flex items-center gap-2" type="submit">
            <GoPencil className="text-[18px] pt-[1px]" /> {id ? "수정" : "등록"}
          </button>
          {id && (
            <div
              className="bg-[#DC2626] text-white flex items-center gap-2 cursor-pointer"
              role="presentation"
              onClick={handleDeleteClick}
            >
              <GoTrash className="text-[18px] pt-[1px]" /> 삭제
            </div>
          )}
          <div
            className="border border-[#ccc] cursor-pointer"
            role="presentation"
            onClick={() => router.back()}
          >
            취소
          </div>
        </div>
      </form>
    </div>
  );
}
