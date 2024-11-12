"use client";

import { useState } from "react";
import { useParams, usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import Navbar from "@/components/navbar/";
import Sidebar from "@/components/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();

  // Navbar 정보
  const nav = siteConfig.navContent.filter((item) => {
    if (params) {
      return pathname.includes(item.href);
    } else {
      return pathname === item.href;
    }
  });
  let label;

  // 파라미터 값이 있으면
  if (params.id) {
    label = "회원명";
  } else {
    label = nav[0].label;
  }

  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} setOpen={setOpen} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full dark:bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-2.5 flex-none transition-all dark:bg-navy-900 md:pr-2 xl:ml-[240px]`}
        >
          {/* Routes */}
          <Navbar brandText={label} />
          <div className="mx-auto min-h-[90vh] p-4 pt-8">{children}</div>
          <div className="p-3">{/* <Footer /> */}</div>
        </main>
      </div>
    </div>
  );
}
