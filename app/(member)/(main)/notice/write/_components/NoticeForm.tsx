"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { GoPencil } from "react-icons/go";

import Input from "@/components/Input";
import Textarea from "@/components/Textarea";

export default function NoticeForm() {
  const [info, setInfo] = useState<{
    category: string;
    title: string;
    content: string;
    target: number[];
    files: any[];
  }>({
    category: "category1",
    title: "",
    content: "",
    target: [3, 2],
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
  const idx = searchParams.get("idx");

  useEffect(() => {
    if (idx) {
      setInfo({
        category: "category1",
        title: "공지사항 제목",
        content: "공지사항 내용",
        target: [3, 2],
        files: [],
      });
    }
  }, [idx]);

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

  // 제출시
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
                <div
                  className={`${info.category === "category1" ? "bg-[#fff] text-[#333] font-semibold" : "text-[#333]/50"}`}
                  role="presentation"
                  onClick={() => setInfo({ ...info, category: "category1" })}
                >
                  카테고리1
                </div>
                <div
                  className={`${info.category === "category2" ? "bg-[#fff] text-[#333] font-semibold" : "text-[#333]/50"}`}
                  role="presentation"
                  onClick={() => setInfo({ ...info, category: "category2" })}
                >
                  카테고리2
                </div>
                <div
                  className={`${info.category === "category3" ? "bg-[#fff] text-[#333] font-semibold" : "text-[#333]/50"}`}
                  role="presentation"
                  onClick={() => setInfo({ ...info, category: "category3" })}
                >
                  카테고리3
                </div>
                <div
                  className={`${info.category === "category4" ? "bg-[#fff] text-[#333] font-semibold" : "text-[#333]/50"}`}
                  role="presentation"
                  onClick={() => setInfo({ ...info, category: "category4" })}
                >
                  카테고리4
                </div>
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
                  className={`${info.target.includes(3) && info.target.includes(2) ? "bg-[#fff] text-[#333] font-semibold" : "text-[#333]/50"}`}
                  role="presentation"
                  onClick={() => setInfo({ ...info, target: [3, 2] })}
                >
                  전체
                </div>
                <div
                  className={`${info.target.includes(3) && !info.target.includes(2) ? "bg-[#fff] text-[#333] font-semibold" : "text-[#333]/50"}`}
                  role="presentation"
                  onClick={() => setInfo({ ...info, target: [3] })}
                >
                  총판
                </div>
                <div
                  className={`${info.target.includes(2) && !info.target.includes(3) ? "bg-[#fff] text-[#333] font-semibold" : "text-[#333]/50"}`}
                  role="presentation"
                  onClick={() => setInfo({ ...info, target: [2] })}
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
            <GoPencil className="text-[18px] pt-[1px]" />{" "}
            {idx ? "수정" : "등록"}
          </button>
          <Link className="border border-[#ccc]" href={"/notice"}>
            취소
          </Link>
        </div>
      </form>
    </div>
  );
}
