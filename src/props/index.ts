import { FormDetails } from "@/module/internal/entity";
import { FinancialStatementDetail, FinancialStatementObject } from "@/module/internal/financialStatement/entity";
import { SavingRateObject } from "@/module/internal/savingRate/entity";

export type AnyProps = {
    [key: string]: string;
}

export type FeatureTypeEnum = "saving-rate" | "financial-statement"
export type SavingRateRangeEnum = "month" | "year"
export type FinancialStatementTypeEnum = "personal" | "business"
export type FinancialStatementBusinessTypeEnum = "service" | "trade" | "manufacture" | "other"

export type FeatureProps = {
    type: FeatureTypeEnum;
    savingRateRange: SavingRateRangeEnum | null;
    financialStatementType: FinancialStatementTypeEnum | null;
    financialStatementBusinessType?: FinancialStatementBusinessTypeEnum;
    financialStatementBusinessName?: string;
}

export type FormFeatureProps = {
    name: string,
    isWithDetail: boolean,
    isRequired?: boolean,
    isEmptyCondition: boolean;
    data: number,
    setData: (data: number | FormDetails) => void,
    dataDetail?: any[],
    setDataDetail: (data: FormDetails) => void,  
}

export type ResultPageProps = {
    id: string,
}

export type VisitorProps = {
    id: string;
    fullname: string;
    address: string;
}

export type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}

export type LocalSavingRateHistoryProps = {
    id: string,
    type: FeatureProps,
    data: SavingRateObject,
}

export type LocalFinancialStatementHistoryProps = {
    id: string,
    type: FeatureProps,
    data: FinancialStatementObject | FinancialStatementDetail
}
