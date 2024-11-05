"use client";

import AffiliateForm from "./_components/AffiliateForm";

import { useAffiliate } from "@/contexts/AffiliateContext";
import { ModalProvider } from "@/contexts/ModalContext";

export default function Client() {
  const affiliate = useAffiliate();

  return (
    <ModalProvider>
      <div className="text-xl font-bold pb-3">매체사 정보 수정</div>
      <AffiliateForm affiliate={affiliate} />
    </ModalProvider>
  );
}
