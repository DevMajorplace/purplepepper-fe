import Link from "next/link";
import { useStore } from "zustand";

import { useUser } from "@/stores/auth.store";

export default function UserDetailTab({
  tabs,
}: {
  tabs: { name: string; link: string; on: boolean; admin?: boolean }[];
}) {
  const user = useStore(useUser, (state) => {
    return state.user;
  });

  return (
    <div>
      <div className="inline-flex items-center p-1 bg-[#f6f6f6] rounded-md h-12">
        {tabs.map((tab, index) => {
          if (user.level !== 10 && !tab.admin) {
            return (
              <Link
                key={index}
                className="*:h-[34px] *:px-5 *:rounded-md *:flex *:items-center *:cursor-pointer"
                href={tab.link}
              >
                <div
                  className={`${tab.on ? "bg-[#fff] text-[#333] font-semibold" : "text-[#333]/50"}`}
                >
                  {tab.name}
                </div>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}
