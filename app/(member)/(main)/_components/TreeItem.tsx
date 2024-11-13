"use client";

import { useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { LuMinusSquare, LuPlusSquare } from "react-icons/lu";

export default function TreeItem({ label, id, clients, depth }: TreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (clients?.length) setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="flex flex-col gap-3"
      style={{ marginLeft: `${depth ? 40 : 0}px` }}
    >
      <div
        className="flex gap-2 items-center text-lg"
        role="presentation"
        onClick={handleClick}
      >
        {clients &&
          clients.length > 0 &&
          (isExpanded ? (
            <LuMinusSquare className="pt-[1px]" />
          ) : (
            <LuPlusSquare className="pt-[1px]" />
          ))}{" "}
        {label}
      </div>
      {isExpanded &&
        clients?.length &&
        clients.map((client) => <TreeItem key={client.id} {...client} />)}
    </div>
  );
}
