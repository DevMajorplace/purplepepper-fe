"use client";

import { useSearchParams } from "next/navigation";

import ProductForm from "../_components/ProductForm";

import Card from "@/components/card";

export default function ProductAdd() {
  const _searchParams = useSearchParams();
  const searchParams = new URLSearchParams(_searchParams);
  const idx = searchParams.get("idx");

  return (
    <Card className="min-h-[86vh] pt-8 pb-16">
      {idx && <ProductForm idx={idx} type="수정" />}
      {!idx && <ProductForm type="추가" />}
    </Card>
  );
}
