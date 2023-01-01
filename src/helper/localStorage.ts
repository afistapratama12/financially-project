import {
    LocalSavingRateHistoryProps,
    LocalFinancialStatementHistoryProps,
} from "@/src/props"

export function findSavingRateHistory(data: LocalSavingRateHistoryProps[], id: string): LocalSavingRateHistoryProps {
    const result = data.find((item) => item.id === id)
    if (result === undefined) return {} as LocalSavingRateHistoryProps
    return result
}

export function findFinancialStatementHistory(data: LocalFinancialStatementHistoryProps[], id: string): LocalFinancialStatementHistoryProps {
    const result = data.find((item) => item.id === id)
    if (result === undefined) return {} as LocalFinancialStatementHistoryProps
    return result
}