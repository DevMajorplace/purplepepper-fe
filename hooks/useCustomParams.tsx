"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useCustomParams() {
  const router = useRouter();
  const pathname = usePathname();
  const _searchParams = useSearchParams();

  // 쿼리스트링 생성
  const createQueryString = useCallback(
    (name: string | string[], value: string | string[]) => {
      const searchParams = new URLSearchParams(_searchParams.toString());

      if (Array.isArray(name) && Array.isArray(value)) {
        name.map((e, i) => {
          searchParams.set(e, value[i]);
        });
      } else {
        searchParams.set(name as string, value as string);
      }

      return searchParams.toString();
    },
    // eslint-disable-next-line prettier/prettier
    [_searchParams]
  );

  const getCustomParams = (key: string) => {
    const searchParams = new URLSearchParams(_searchParams.toString());

    return searchParams.get(key);
  };

  const setCustomParams = (
    name: string | string[],
    // eslint-disable-next-line prettier/prettier
    value: string | string[],
    // eslint-disable-next-line prettier/prettier
    keys?: string[]
  ) => {
    const searchParams = new URLSearchParams(
      // eslint-disable-next-line prettier/prettier
      createQueryString(name, value).toString()
    );

    keys &&
      keys.map((i) => {
        searchParams.delete(i);
      });

    return router.push(`${pathname}?${searchParams.toString()}`);
  };

  const deleteCustomParams = (keys: string[]) => {
    const searchParams = new URLSearchParams(_searchParams.toString());

    keys.map((i) => {
      searchParams.delete(i);
    });

    router.push(`${pathname}?${searchParams.toString()}`);
  };

  return {
    getCustomParams,
    setCustomParams,
    deleteCustomParams,
    createQueryString,
  };
}
