"use client";

import ClientForm from "./_components/ClientForm";

import { useIdUser } from "@/contexts/IdContext";

export default function Client() {
  const idUser = useIdUser();

  return (
    <div>
      <div className="text-xl font-bold pb-3">회원 정보</div>
      <ClientForm idUser={idUser} type="수정" />
    </div>
  );
}
