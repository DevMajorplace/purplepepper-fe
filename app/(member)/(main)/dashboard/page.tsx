"use client";

import { useStore } from "zustand";

import Notice from "./_components/Notice";
import AdminDashboard from "./_components/admin/AdminDashboard";
import DistributorDashboard from "./_components/agency/AgencyDashboard";
import ClientDashboard from "./_components/client/ClientDashboard";

import Card from "@/components/card";
import { useUser } from "@/stores/auth.store";
import { ModalProvider } from "@/contexts/ModalContext";
import { Suspense } from "react";

export default function Dashboard() {
  const user = useStore(useUser, (state) => {
    return state.user;
  });

  return (
    <div className="flex flex-col gap-4">
      {/* <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <MissionCard title="오늘까지 완료된 미션">
          <CompletedMissions />
        </MissionCard>
        <MissionCard title="어제의 인기 미션">
          <PopularMissions />
        </MissionCard>
      </div> */}
      <Card>
        <Notice />
      </Card>
      {/* 모달CONTEXT */}
      <ModalProvider>
        <Suspense>
          {/* 관리자 */}
          {user.role === "admin" && <AdminDashboard />}
          {/* 총판 */}
          {user.role === "agency" && <DistributorDashboard />}
          {/* 광고주 */}
          {user.role === "client" && <ClientDashboard />}
        </Suspense>
      </ModalProvider>
    </div>
  );
}
