"use client";

import { useEffect, useState } from "react";

import Accordion from "./_components/Accordion";

const NOTICE = [
  {
    idx: "idx1",
    title: "미션은 어떻게 등록 하나요?",
    content: (
      <>
        광고주 페이지로 이동하여 가입을 진행 후 승인 절차를 밟고, 내 사업장에
        필요한 여러가지 미션 등록을 할 수 있습니다.
        <br />
        미션을 올리기 전, 미리보기를 통하여 간단하게 세팅이 가능합니다.
      </>
    ),
    createdAt: "2024. 12. 10",
  },
  {
    idx: "idx2",
    title: "내가 올린 광고는 어디서 확인이 가능할까요?",
    content: (
      <>
        안드로이드/ IOS 캐시플랜 앱을 다운로드 한 후 확인이 가능합니다.
        <br />
        미션의 경우 시간별 분할로 등재가 됩니다.
      </>
    ),
    createdAt: "2024. 12. 10",
  },
  {
    idx: "idx3",
    title: "광고 비용은 어떻게 될까요?",
    content: (
      <>
        미션마다 금액이 상이합니다.
        <br />
        광고주 로그인 &gt; 왼쪽 상단 미션 포인트 확인에서 미션마다의 금액을
        확인할 수 있습니다.
      </>
    ),
    createdAt: "2024. 12. 10",
  },
  {
    idx: "idx4",
    title: "공유미션 세팅 방법이 궁금합니다.",
    content: (
      <>
        미션설명 옆 PSD 파일을 다운로드 하신 후 내 업체를 넣어주세요.
        (캐시플랜에 등재되어 진행되고 있는 미션 참고)
        <br />
        <br />
        미션 시작 URL : ex) 네이버 미션일 경우 naver.com 입력.
        <br />
        미션 종료 URL : 사진 &gt; 주변 &gt; 지도 &gt; 리뷰 미션의 경우 브라우저
        마다 모바일로 접속 후 끝나는 지점의 URL 복사 후 붙여넣기.
      </>
    ),
    createdAt: "2024. 12. 10",
  },
  {
    idx: "idx5",
    title: "광고주 제재, 위반으로 인한 이용정지",
    content: (
      <>
        미션의 정답을 일부러 누락시키거나, 불법 사이트를 홍보하는 경우 이용정지
        사유 입니다.
        <br />
        미션 신고 누적이 100개 이상 될 경우 이용정지 사유 입니다.
      </>
    ),
    createdAt: "2024. 12. 10",
  },
  {
    idx: "idx6",
    title: "카드 결제는 불가한가요?",
    content: <>카드 결제는 아직 지원하고 있지 않는 점 양해 부탁드립니다.</>,
    createdAt: "2024. 12. 10",
  },
  {
    idx: "idx7",
    title: "문의는 어떻게 접수하나요?",
    content: (
      <>
        캐시플랜에 많은 관심을 보내주셔서 감사합니다.
        <br />
        캐시플랜 이용중 발생한 모든 문의 사항은 epad@naver.com또는 카카오톡
        캐시플랜 으로 문의 부탁드립니다.
      </>
    ),
    createdAt: "2024. 12. 10",
  },
  {
    idx: "idx8",
    title: "광고주 가입승인 절차는 어떻게되나요?",
    content: (
      <>
        회원가입 진행시 사업자등록증을 첨부하여 캐시플랜 운영자의 검토를 마친 후
        1~2일 내에 승인이 됩니다.
      </>
    ),
    createdAt: "2024. 12. 10",
  },
];

export default function Notice() {
  const [notice, setNotice] = useState<
    {
      title: string;
      content: React.JSX.Element;
      idx: string;
      createdAt: string;
    }[]
  >([]);

  useEffect(() => {
    setNotice(NOTICE);
  }, []);

  return (
    <div>
      {notice.map((item, index) => (
        <Accordion
          key={index}
          content={item.content}
          createdAt={item.createdAt}
          idx={item.idx}
          title={item.title}
        />
      ))}
    </div>
  );
}
