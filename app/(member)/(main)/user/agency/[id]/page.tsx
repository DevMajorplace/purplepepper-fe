"use client";

import AgencyForm from "../_components/AgencyForm";

import { useIdUser } from "@/contexts/IdContext";

export default function Agency() {
  const idUser = useIdUser();

  return (
    <div>
      <div className="text-xl font-bold pb-3">회원 정보</div>
      <AgencyForm idUser={idUser} type="수정" />
    </div>
  );
}
