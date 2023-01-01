import { 
    FeatureTypeEnum,
    SavingRateRangeEnum,
    FinancialStatementTypeEnum,
    FinancialStatementBusinessTypeEnum,
    AnyProps
} from "."

export const path = {
    SAVING_RATE_RESULT: "/saving-rate/result/",
    FINANCIAL_STATEMENT_RESULT: "/financial_statement/result/",
} as AnyProps

export const apiURL = {
    CHECK_VISITOR: "/api/v1/visitors/check",
    CREATE_VISITOR: "/api/v1/visitors",
} as AnyProps

export const local = {
    VISITOR_ID: "_v_id",
    VISITOR_FULLNAME: "_v_fn",
    VISITOR_ADDRESS: "_v_addr",
    SAVING_RATE_HISTORY: "_sr_history",
    FINANCIAL_STATEMENT_HISTORY: "_fs_history",
}

export const featureType = {
    SAVING_RATE: "saving-rate" as FeatureTypeEnum,
    FINANCIAL_STATEMENT: "financial-statement" as FeatureTypeEnum,
}

export const savingRateRange = {
    MONTH: "month" as SavingRateRangeEnum,
    YEAR: "year" as SavingRateRangeEnum,
}

export const financialStatementType = {
    PERSONAL: "personal" as FinancialStatementTypeEnum,
    BUSINESS: "business" as FinancialStatementTypeEnum,
}

export const financialStatementBusinessType = {
    SERVICE: "service" as FinancialStatementBusinessTypeEnum,
    TRADE: "trade" as FinancialStatementBusinessTypeEnum,
    MANUFACTURE: "manufacture" as FinancialStatementBusinessTypeEnum,
    OTHER: "other" as FinancialStatementBusinessTypeEnum,
}