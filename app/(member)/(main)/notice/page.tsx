import { redirect } from "next/navigation";

import { categories } from "@/config/site";

export default function Notice() {
  const category = categories[0].id;

  redirect(`/notice/${category}`);
}
