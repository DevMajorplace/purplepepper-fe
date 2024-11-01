import BasicCard from "../BasicCard";
import TotalSalesModal from "../TotalSalesModal";
import NewClientModal from "../NewClientModal";
import SpecificGravity from "../SpecificGravity";
import BurnoutRate from "../BurnoutRate";

import AdminTargetSales from "./AdminTargetSales";
import AgencyRanking from "./AgencyRanking";
import AgencyList from "./AgencyList";

import Card from "@/components/card";
import { useSetModalContents, useSetModalOpen } from "@/contexts/ModalContext";

export default function AdminDashboard() {
  const setModalOpen = useSetModalOpen();
  const setModalContents = useSetModalContents();

  // 이번 달 총 수익 클릭
  const handleTotalSalesClick = () => {
    setModalOpen(true);
    setModalContents(<TotalSalesModal />);
  };

  // 새 광고주 클릭
  const handleNewClientClick = () => {
    setModalOpen(true);
    setModalContents(<NewClientModal />);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-4">
        <Card className="cursor-pointer">
          <BasicCard
            content="11.8억원"
            percent={2.5}
            title="이번 달 총 수익"
            onClick={handleTotalSalesClick}
          />
        </Card>
        <Card>
          <BasicCard content="8,236명" percent={-1.2} title="미션 수행자 수" />
        </Card>
        <Card>
          <BasicCard content="20,352건" percent={11} title="수행된 미션 수" />
        </Card>
        <Card className="cursor-pointer">
          <BasicCard
            content="540명"
            percent={5.2}
            title="새 광고주"
            onClick={handleNewClientClick}
          />
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* 이번 달 목표 매출 */}
        <Card>
          <AdminTargetSales />
        </Card>

        {/* 미션 비중 */}
        <Card>
          <SpecificGravity />
        </Card>

        {/* 매체사별 소진율 */}
        <Card>
          <BurnoutRate />
        </Card>
      </div>

      {/* 이번 달 총판 순위 & 총판별 매출 변화 */}
      <AgencyRanking />

      {/* 총판 목록 */}
      <Card>
        <AgencyList />
      </Card>
    </div>
  );
}
