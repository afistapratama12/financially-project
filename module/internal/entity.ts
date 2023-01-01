import { BalanceSheetDetail, FinancialStatementDetail, ProfitLossDetail } from "./financialStatement/entity";
import { SavingRateDetail } from "./savingRate/entity";

export type FormDetails = BalanceSheetDetail[] | FinancialStatementDetail[] | ProfitLossDetail[] | SavingRateDetail[]
export type FormDetail = BalanceSheetDetail | FinancialStatementDetail | ProfitLossDetail | SavingRateDetail