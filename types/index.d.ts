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
  // 일괄 승인 모달
  interface WaitingChkApprovalModalProps {
    info: string[];
  }
  // 일괄 거절 모달
  interface WaitingChkRefusalModalProps {
    info: string[];
  }
  // 개별 승인 모달
  interface WaitingApprovalModalProps {
    info: {
      id: string;
      company: string;
      name: string;
      recommendId: string;
    };
  }
  // 개별 거절 모달
  interface WaitingRefusalModalProps {
    info: {
      id: string;
      company: string;
      name: string;
      recommendId: string;
    };
  }

  // 미션 관리
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
    idx: string;
    title: string;
    content: JSX.Element;
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
