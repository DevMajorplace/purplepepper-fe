import { Dispatch } from "react";

import { affiliate } from "@/contexts/AffiliateContext";
import { idUser } from "@/contexts/IdContext";

export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
  // components
  // navbar
  interface NavbarProps {
    brandText: string;
    button?: JSX.Element | null;
  }
  // sidebar
  interface SidebarProps {
    open: boolean;
    setOpen(boolean): void;
  }
  // Input
  interface InputProps {
    name: string;
    label: string;
    htmlFor: string;
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    width?: string;
    height?: string;
    background?: string;
    border?: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    readOnly?: boolean;
  }
  // CalendarInput
  type ValuePiece = Date | null;
  type Value = ValuePiece | [ValuePiece, ValuePiece];

  interface CalendarInputProps {
    placeholder?: string;
    width?: string;
    height?: string;
    background?: string;
    border?: string;
    style?: string;
    startDate: string;
    endDate?: string;
    range?: boolean;
    onChange: (value: Value, index?: number) => void;
    required?: boolean;
    minDate?: string;
  }

  // Select
  // TableSelect 테이블 분류 검색
  interface TableSelectProps {
    label: string;
    name: string;
    value: string;
    options: {
      value: string;
      name: string;
    }[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
    selectClassName?: string;
  }
  // MissionTypeSelect 분류 선택
  type missionType = {
    value: string;
    name: string;
  }[];

  interface MissionTypeSelectProps {
    missionType: {
      major: string;
      middle: string;
      small: string;
    };
    setMissionType: Dispatch<
      SetStateAction<{
        major: string;
        middle: string;
        small: string;
      }>
    >;
    major: {
      value: string;
      name: string;
    }[];
    middle?: missionType;
    small?: missionType;
    setMiddle: Dispatch<SetStateAction<missionType | undefined>>;
    setSmall: Dispatch<SetStateAction<missionType | undefined>>;
  }

  //Textarea
  interface TextareaProps {
    name: string;
    label: string;
    htmlFor: string;
    placeholder?: string;
    width?: string;
    height?: string;
    background?: string;
    border?: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextareaElement>) => void;
    required?: boolean;
  }

  // app
  // 앱 공통
  // 포인트 리스트 아이템
  interface PointListItemProps {
    idx: string;
    type?: string;
    content?: string;
    detail?: string;
    point: number;
    createdAt: Date;
    listType?: string;
  }

  // 조직도 트리 아이템
  interface TreeItemProps {
    label: string;
    id: string;
    clients?: TreeItemProps[];
    depth: number;
  }

  // dashboard
  interface CardTitleProps {
    title: string;
    onClick?: () => void;
  }
  // 상단 기본
  interface BasicCardProps {
    title: string;
    content: string;
    percent: number;
    onClick?: () => void;
  }
  // 차트
  interface NewChartProps {
    options: ApexOptions;
    series: ApexOptions["series"];
    type?:
      | "line"
      | "area"
      | "bar"
      | "pie"
      | "donut"
      | "radialBar"
      | "scatter"
      | "bubble"
      | "heatmap"
      | "candlestick"
      | "boxPlot"
      | "radar"
      | "polarArea"
      | "rangeBar"
      | "rangeArea"
      | "treemap";
    height?: number;
    width?: number;
  }

  // table
  interface TableProps {
    tableData: {
      data: any;
      columns: any;
    };
    tableClass?: string;
  }
  interface TableMissionProps {
    status?: string;
    name?: string;
    type?: string;
  }
  interface TableParticipateProps {
    count: number;
    status: string;
    total: number;
  }
  interface TablePeriodProps {
    start: string;
    end: string;
  }

  // 사용자 관리
  // 총판 agency
  type agency = {
    company: string;
    id: string;
    password: string;
    name: string;
    phone: string;
    memo: string;
    use: boolean;
    account?: {
      bank: string;
      accountNumber: string;
      depositor: string;
    };
  };
  interface AgencyFormProps {
    type: string;
    idUser?: idUser;
  }
  // 총판 매출 및 광고주
  // 목표 매출 테이블
  interface SalesTableProps {
    data: { target: number; sales: number }[];
    className: string;
  }
  // 광고주 수 테이블
  interface ClientTableProps {
    data: { depth_1: number; depth_2: number; depth_3: number }[];
    className: string;
  }

  // 광고주 client
  type client = {
    company: string;
    id: string;
    password: string;
    name: string;
    phone: string;
    memo: string;
    use: boolean;
    account?: {
      bank: string;
      accountNumber: string;
      depositor: string;
    };
    recommendId?: string;
  };
  interface ClientFormProps {
    type: string;
    idUser?: idUser;
  }

  // 가입 대기자 waiting
  // 대기자 테이블

  interface WaitingData {
    user_id: string;
    company_name: string;
    manager_name: string;
    manager_contact: string;
    parent_id: string;
    created_at: string;
    business_registration: string;
  }

  interface RefuseData {
    user_id: string;
    company_name: string;
    manager_name: string;
    manager_contact: string;
    parent_id: string;
    created_at: string;
    business_registration: string;
    declined_at: string;
    rejection_reason: string;
  }

  interface Waiting {
    id: string;
    company: string;
    name: string;
    phone: string;
    recommendId: string;
    createdAt: string;
    certificate: string;
  }
  [];
  // 일괄 승인 모달
  interface WaitingChkApprovalModalProps {
    info: string[];
    setData: Dispatch<SetStateAction<Waiting>>;
    setTotal: Dispatch<SetStateAction<number>>;
    setTotalPages: Dispatch<SetStateAction<number>>;
  }
  // 일괄 거절 모달
  interface WaitingChkRefusalModalProps {
    info: string[];
    setData: Dispatch<SetStateAction<Waiting>>;
    setTotal: Dispatch<SetStateAction<number>>;
    setTotalPages: Dispatch<SetStateAction<number>>;
  }
  // 개별 승인 모달
  interface WaitingApprovalModalProps {
    info: {
      id: string;
      company: string;
      name: string;
      recommendId: string;
    };
    setData: Dispatch<SetStateAction<Waiting>>;
    setTotal: Dispatch<SetStateAction<number>>;
    setTotalPages: Dispatch<SetStateAction<number>>;
  }
  // 개별 거절 모달
  interface WaitingRefusalModalProps {
    info: {
      id: string;
      company: string;
      name: string;
      recommendId: string;
    };
    setData: Dispatch<SetStateAction<Waiting>>;
    setTotal: Dispatch<SetStateAction<number>>;
    setTotalPages: Dispatch<SetStateAction<number>>;
  }

  // 미션 관리
  // 미션 통계
  interface StatisticsData {
    idx: string;
    recommnedIdx?: string;
    recommnedName?: string;
    affiliateIdx?: string;
    affiliateName?: string;
    missionIdx: string;
    missionName: string;
    clientIdx?: string;
    clientName?: string;
    landingCount: number;
    participationCount: number;
    participationDate: string;
  }
  interface ClientStatisticsProps {
    data: StatisticsData[];
    chk: string[];
    handleAllChkChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleChkChange: (e: ChangeEvent<HTMLInputElement>, target: string) => void;
    handleSort: (type: string) => void;
  }
  interface AdminStatisticsProps {
    data: StatisticsData[];
    chk: string[];
    handleAllChkChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleChkChange: (e: ChangeEvent<HTMLInputElement>, target: string) => void;
    handleSort: (type: string) => void;
  }
  // 미션 참여자 내역
  interface MissionData {
    idx: string;
    affiliateIdx: string;
    affiliateName: string;
    adid: string;
    clientIdx: string;
    clientName: string;
    missionIdx: string;
    missionName: string;
    missionType: {
      major: string;
      middle: string;
      small: string;
    };
    userInputValue: string;
    reward: number;
    abusing: boolean;
    response: boolean;
    ip: string;
    participationDate: string;
  }
  interface ClientMissionProps {
    data: MissionData[];
    chk: string[];
    handleAllChkChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleChkChange: (e: ChangeEvent<HTMLInputElement>, target: string) => void;
    handleSort: (type: string) => void;
  }
  interface AdminMissionProps {
    data: MissionData[];
    chk: string[];
    handleAllChkChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleChkChange: (e: ChangeEvent<HTMLInputElement>, target: string) => void;
    handleSort: (type: string) => void;
  }
  // 미션 분류 관리
  // 미션 분류 수정 모달
  interface MissionTypeEditModalProps {
    info: {
      idx: string;
      name: string;
      isUse: boolean;
      used: boolean;
    };
  }

  // 상품 관리
  // 상품 목록
  // 상품 추가
  interface Product {
    name: string;
    explanation: string;
    thumbnail: string;
    isDisplay: boolean;
    startDate: string;
    endDate: string;
    pointRate: {
      depth_1: number | undefined;
      depth_2: number | undefined;
      depth_3: number | undefined;
    };
    correctRate: number | undefined;
    affiliate: string[];
    browserInflow: string[];
    productPrice: {
      idx: string;
      price: number | undefined;
    }[];
  }

  // 검색리스트 컴포넌트
  interface SearchListProps {
    title: string;
    placeholder: string;
    info: Product;
    setInfo: Dispatch<SetStateAction<Product>>;
    selected: string[];
    list: {
      idx: string;
      name: string;
    }[];
    setQuery: Dispatch<SetStateAction<string>>;
  }
  // 브라우저 유입 폼
  interface browserInflow {
    idx: string;
    name: string;
    type: number;
    isUse: boolean;
    appName?: string;
    uriScheme?: string;
    appLink?: string;
    universalLink?: string;
    memo?: string;
  }
  interface BrowserInflowFormProps {
    type: string;
    idx?: string;
  }

  // 입출금 관리
  // 입출금 승인 모달
  interface MoneyChkModalProps {
    info: string[];
  }

  // 매체사 관리
  interface AffiliateFormProps {
    affiliate: affiliate;
  }

  // faq
  interface AccordionProps {
    id: string;
    title: string;
    createdAt: string;
  }

  // 회원가입
  interface InputWrapProps {
    value?: string;
    name: string;
    label: string;
    type: string;
    placeholder: string;
    required?: boolean;
    className?: string;
    tabIndex?: number;
    onChange(e: any): void;
  }

  // 내 정보
  // 회원 정보 폼
  type member = {
    company: string;
    id: string;
    password?: string;
    name: string;
    phone: string;
    account?: {
      bank: string;
      accountNumber: string;
      depositor: string;
    };
    recommendId?: string;
  };
  interface SettingFormProps {
    type: string;
    user: member;
  }
}
