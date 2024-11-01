import Card from "@/components/card";

const POINT_LIST = [
  {
    name: "일반미션",
    point: 0,
  },
  {
    name: "정답미션",
    point: 21,
  },
  {
    name: "공유미션",
    point: 21,
  },
  {
    name: "네이버 플레이스",
    point: 150,
  },
  {
    name: "카카오 선물하기",
    point: 150,
  },
  {
    name: "네이버 플레이스 알림받기",
    point: 40,
  },
  {
    name: "네이버 플레이스 저장하기",
    point: 40,
  },
  {
    name: "네이버 플레이스 킵하기",
    point: 40,
  },
  {
    name: "네이버 플레이스 블로그 공유하기",
    point: 55,
  },
  {
    name: "카카오 선물하기 상품 찜",
    point: 55,
  },
  {
    name: "카카오 선물하기 리뷰 공감하기",
    point: 55,
  },
  {
    name: "캡쳐미션",
    point: 10000,
  },
  {
    name: "캡쳐미션 - 상품 찜",
    point: 0,
  },
  {
    name: "캡쳐미션 - 브랜드 찜",
    point: 0,
  },
  {
    name: "캡쳐미션 - 앱 설치",
    point: 0,
  },
  {
    name: "캡쳐미션 - 상품 찜",
    point: 10000,
  },
  {
    name: "캡쳐미션 - 브랜드 찜",
    point: 10000,
  },
  {
    name: "캡쳐미션 - 앱 설치",
    point: 100000,
  },
  {
    name: "랭크업",
    point: 0,
  },
  {
    name: "랭크업",
    point: 100000,
  },
  {
    name: "무신사",
    point: 90,
  },
  {
    name: "스마트스토어",
    point: 45,
  },
  {
    name: "인스타그램",
    point: 100000,
  },
  {
    name: "무신사 상품 찜",
    point: 90,
  },
  {
    name: "무신사 브랜드 찜",
    point: 90,
  },
  {
    name: "스마트스토어 상품 찜",
    point: 45,
  },
  {
    name: "스마트스토어 소식받기",
    point: 60,
  },
  {
    name: "인스타그램 팔로우",
    point: 100000,
  },
  {
    name: "스페셜미션",
    point: 50,
  },
  {
    name: "스페셜미션",
    point: 0,
  },
  {
    name: "스페셜미션",
    point: 0,
  },
  {
    name: "올리브영",
    point: 0,
  },
  {
    name: "오늘의집 상품 찜",
    point: 0,
  },
  {
    name: "올리브영 상품 찜",
    point: 200,
  },
  {
    name: "올리브영 브랜드 찜",
    point: 250,
  },
  {
    name: "오늘의집 상품 찜",
    point: 200,
  },
  {
    name: "일반미션",
    point: 0,
  },
  {
    name: "카카오 선물하기",
    point: 0,
  },
  {
    name: "카카오 선물하기 상품 찜 (반복가능)",
    point: 100,
  },
];

export default function MissionPoint() {
  return (
    <Card>
      <div className="w-[480px]">
        <p className="text-end mb-1">*부가세 별도</p>
        <div className="border border-[#9ca3bb] rounded-xl overflow-hidden">
          <div className="flex bg-[#e9edf9] text-[18px] font-bold py-4 px-5">
            <div className="w-[80%]">미션 종류</div>
            <div className="w-[20%] text-center">이용 포인트</div>
          </div>
          <div className="text-lg">
            {POINT_LIST.map((item, index) => (
              <div key={index} className="flex py-4 px-5 hover:bg-[#ebedf3]">
                <div className="w-[80%]">{item.name}</div>
                <div className="w-[20%] text-center text-[#a6aab5] font-semibold">
                  {item.point}P
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
