"use client";

import { useStore } from "zustand";
import { useEffect, useState } from "react";

import SettingForm from "./_components/SettingForm";

import { useUser } from "@/stores/auth.store";
import instance from "@/api/axios";

export default function Client() {
  const user = useStore(useUser, (state) => {
    return state.user;
  });
  const [userInfo, setUserInfo] = useState<member>();

  const fetchData = async () => {
    try {
      const res = await instance.get(`/users/my-info`);

      // 회원 정보
      setUserInfo({
        company: res.data.company_name,
        id: res.data.user_id,
        name: res.data.manager_name,
        phone: res.data.manager_contact,
        account: {
          bank: res.data.account_bank,
          accountNumber: res.data.account_number,
          depositor: res.data.account_holder,
        },
        recommendId: res.data.parent_id,
      });
    } catch (error: any) {
      //console.log(error);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="text-xl font-bold pb-3">회원 정보</div>
      {userInfo && <SettingForm type={user.role} user={userInfo} />}
    </div>
  );
}
