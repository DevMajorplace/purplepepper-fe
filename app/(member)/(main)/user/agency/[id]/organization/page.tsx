import TreeItem from "@/app/(member)/(main)/_components/TreeItem";

const Tree = [
  {
    id: "test2",
    label: "광고주명2",
    depth: 0,
    clients: [
      {
        id: "test3",
        label: "광고주명3",
        depth: 1,
        clients: [],
      },
      {
        id: "test4",
        label: "광고주명4",
        depth: 1,
        clients: [],
      },
      {
        id: "test5",
        label: "광고주명5",
        depth: 1,
        clients: [],
      },
      {
        id: "test6",
        label: "광고주명6",
        depth: 1,
        clients: [],
      },
    ],
  },
  {
    id: "test10",
    label: "광고주명10",
    depth: 0,
    clients: [
      {
        id: "test11",
        label: "광고주명11",
        depth: 1,
        clients: [
          {
            id: "test20",
            label: "광고주명20",
            depth: 2,
          },
          {
            id: "test21",
            label: "광고주명21",
            depth: 2,
          },
          {
            id: "test22",
            label: "광고주명22",
            depth: 2,
          },
        ],
      },
      {
        id: "test12",
        label: "광고주명12",
        depth: 1,
        clients: [],
      },
      {
        id: "test13",
        label: "광고주명13",
        depth: 1,
        clients: [],
      },
      {
        id: "test14",
        label: "광고주명14",
        depth: 1,
        clients: [],
      },
    ],
  },
];

export default function AgencyOrganization() {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-[24px] font-bold">하위 광고주 조직도</div>
      {Tree.map((item) => (
        <TreeItem
          key={item.id}
          clients={item.clients}
          depth={item.depth}
          id={item.id}
          label={item.label}
        />
      ))}
      {Tree.length === 0 && "하위 광고주가 없습니다."}
    </div>
  );
}
