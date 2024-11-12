"use client";

import { useStore } from "zustand";

import SettingForm from "./_components/SettingForm";

import { useUser } from "@/stores/auth.store";

export default function Client() {
  const user = useStore(useUser, (state) => {
    return state.user;
  });

  return (
    <div>
      <div className="text-xl font-bold pb-3">회원 정보</div>
      <SettingForm type={user.level === 3 ? "agency" : "client"} user={user} />
    </div>
  );
}
