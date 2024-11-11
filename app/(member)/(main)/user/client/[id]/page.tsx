"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useStore } from "zustand";

import ClientForm from "./_components/ClientForm";

import { useId, useIdUser } from "@/contexts/IdContext";
import { useUser } from "@/stores/auth.store";

export default function Client() {
  const user = useStore(useUser, (state) => {
    return state.user;
  });
  const idUser = useIdUser();
  const id = useId();

  useEffect(() => {
    console.log(id);
    if (user.level !== 10) redirect(`/user/client/${id}/cash/usage`);
  });

  return (
    <div>
      <div className="text-xl font-bold pb-3">회원 정보</div>
      <ClientForm idUser={idUser} type="수정" />
    </div>
  );
}
