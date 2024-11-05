import { ChangeEvent, useEffect, useState } from "react";

import TableSelect from "./TableSelect";

import useCustomParams from "@/hooks/useCustomParams";

const DEFAULT_MISSIONTYPE = {
  major: "all",
  middle: "",
  small: "",
};
const MAJOR = [
  {
    value: "major1",
    name: "대분류1",
  },
  {
    value: "major2",
    name: "대분류2",
  },
  {
    value: "major3",
    name: "대분류3",
  },
];
const MIDDLE = [
  {
    value: "middle1",
    name: "중분류1",
  },
  {
    value: "middle2",
    name: "중분류2",
  },
  {
    value: "middle3",
    name: "중분류3",
  },
];
const SMALL = [
  {
    value: "small1",
    name: "소분류1",
  },
  {
    value: "small2",
    name: "소분류2",
  },
  {
    value: "small3",
    name: "소분류3",
  },
];

export default function MissionTypeSelect() {
  const [missionType, setMissionType] = useState(DEFAULT_MISSIONTYPE);
  const [major, setMajor] = useState<missionType>(MAJOR);
  const [middle, setMiddle] = useState<missionType>();
  const [small, setSmall] = useState<missionType>();
  const { getCustomParams, setCustomParams } = useCustomParams();

  useEffect(() => {
    const major = getCustomParams("major");
    const middle = getCustomParams("middle");
    const small = getCustomParams("small");

    // 대분류 params가 있으면
    if (major) {
      // 중분류 params가 있으면
      if (middle) {
        // 소분류 params가 있으면
        if (small) {
          setMissionType({
            major,
            middle,
            small,
          });
        } else {
          setMissionType({
            ...missionType,
            major,
            middle,
          });
        }
        // 중분류 params가 all이 아니면 소분류 세팅
        middle !== "all" && setSmall(SMALL);
      } else {
        setMissionType({
          ...missionType,
          major,
        });
      }
      // 대분류 params가 all이 아니면 중분류 세팅
      major !== "all" && setMiddle(MIDDLE);
    } else {
      // 초기화
      setMissionType(DEFAULT_MISSIONTYPE);
      setMajor(MAJOR);
      setMiddle(undefined);
      setSmall(undefined);
    }
  }, [
    getCustomParams("major"),
    getCustomParams("middle"),
    getCustomParams("small"),
  ]);

  // 분류 수정시
  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newValue = value === "all" ? "" : value;

    if (name === "major") {
      // 대분류 수정시
      // 중분류, 소분류 값 초기화
      setMissionType({
        [name]: newValue,
        middle: "",
        small: "",
      });
      // 중분류 세팅
      if (value === "all") {
        setMiddle(undefined);
      } else {
        setMiddle(MIDDLE);
      }
      // 소분류 초기화
      setSmall(undefined);
      // 중분류, 소분류 params 삭제
      //deleteCustomParams(["middle", "small"]);
      setCustomParams([name, "page"], [value, "1"], ["middle", "small"]);
    } else if (name === "middle") {
      // 중분류 수정시
      // 소분류 값 초기화
      setMissionType({
        ...missionType,
        [name]: newValue,
        small: "",
      });
      // 소분류 세팅
      if (value === "all") {
        setSmall(undefined);
      } else {
        setSmall(SMALL);
      }
      // 소분류 params 삭제
      //deleteCustomParams(["small"]);
      setCustomParams([name, "page"], [value, "1"], ["small"]);
    } else {
      // 소분류 수정시
      setMissionType({
        ...missionType,
        [name]: newValue,
      });
      setCustomParams([name, "page"], [value, "1"]);
    }
  };

  return (
    <>
      <TableSelect
        label={"미션 대분류"}
        name={"major"}
        options={[{ value: "all", name: "전체" }, ...major]}
        value={missionType.major}
        onChange={(e) => handleTypeChange(e)}
      />
      {middle && (
        <TableSelect
          label={"미션 중분류"}
          name={"middle"}
          options={[{ value: "all", name: "전체" }, ...middle]}
          value={missionType.middle}
          onChange={(e) => handleTypeChange(e)}
        />
      )}
      {small && (
        <TableSelect
          label={"미션 소분류"}
          name={"small"}
          options={[{ value: "all", name: "전체" }, ...small]}
          value={missionType.small}
          onChange={(e) => handleTypeChange(e)}
        />
      )}
    </>
  );
}
