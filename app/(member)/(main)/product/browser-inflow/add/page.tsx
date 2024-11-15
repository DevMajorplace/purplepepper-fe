"use client";

import { useSearchParams } from "next/navigation";

import BrowserInflowForm from "../_components/BrowserInflowForm";

import Card from "@/components/card";

export default function BrowserInflowAdd() {
  const _searchParams = useSearchParams();
  const searchParams = new URLSearchParams(_searchParams);
  const idx = searchParams.get("idx");

  return (
    <Card className="min-h-[86vh] pt-8 pb-16">
      {idx && <BrowserInflowForm idx={idx} type="수정" />}
      {!idx && <BrowserInflowForm type="추가" />}
    </Card>
  );
}
