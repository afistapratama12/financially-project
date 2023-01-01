import { getTotalIfWithDetail, getTotalIfWithDetails } from ".";
import { BalanceSheetObject, UserBalanceSheetObject } from "../entity/balanceSheet";
import { FinancialStatementObject, UserFinancialStatementObject } from "../entity/financialStatement";

export function processUserBalanceSheet(data: UserFinancialStatementObject): UserBalanceSheetObject {    
    const totalCurrentAsset = getTotalIfWithDetails(
        data.cashStatement.cash,
        data.cashStatement.bank,
        data.cashStatement.cashEquivalent,
        data.receivables,
    );

    const totalFixedAsset = getTotalIfWithDetails(
        data.fixedAssetStatement.building,
        data.fixedAssetStatement.machiney,
        data.fixedAssetStatement.vehicle,
        data.fixedAssetStatement.land,
        data.fixedAssetStatement.investment,
        data.fixedAssetStatement.otherFixedAsset,
    );
    
    const totalAsset = totalCurrentAsset + totalFixedAsset

    const totalCurrentLiabilities = getTotalIfWithDetails(
        data.liabilityStatement.debt,
    );

    const totalLongTermLiabilities = getTotalIfWithDetails(
        data.liabilityStatement.loan,
        data.liabilityStatement.otherLiability,
    );

    const totalLiabilities = totalCurrentLiabilities + totalLongTermLiabilities;

    return {
        aseets: {
            currentAssets: {
                cash: data.cashStatement.cash,
                bank: data.cashStatement.bank,
                receivables: getTotalIfWithDetail(data.receivables),
                cashEquivalent: getTotalIfWithDetail(data.cashStatement.cashEquivalent),
            },
            totalcurrentAssets: totalCurrentAsset,
            fixedAssets: {
                building: getTotalIfWithDetail(data.fixedAssetStatement.building),
                machiney: getTotalIfWithDetail(data.fixedAssetStatement.machiney),
                vehicle: getTotalIfWithDetail(data.fixedAssetStatement.vehicle),
                land: getTotalIfWithDetail(data.fixedAssetStatement.land),
                investment: getTotalIfWithDetail(data.fixedAssetStatement.investment),
                otherFixedAsset: getTotalIfWithDetail(data.fixedAssetStatement.otherFixedAsset),
            },
            totalFixedAssets: totalFixedAsset,
            totalAssets: totalAsset,
        },

        liabilities: {
            currentLiabilities: {
                debt: getTotalIfWithDetail(data.liabilityStatement.debt),
            },
            totalCurrentLiabilities: totalCurrentLiabilities,
            longTermLiabilities: {
                loan: getTotalIfWithDetail(data.liabilityStatement.loan),
                otherLiabilities: getTotalIfWithDetail(data.liabilityStatement.otherLiability),
            },
            totalLongTermLiabilities: totalLongTermLiabilities,
            totalLiabilities: totalLiabilities,
        },

        equity: {
            netWorth: totalAsset - totalLiabilities,
            otherEquity: 0,
            totalEquity: totalAsset - totalLiabilities,
        },

        totalLiabilitiesAndEquity: totalLiabilities + (totalAsset - totalLiabilities),
    } as UserBalanceSheetObject;
}

export function processBalanceSheet(data: FinancialStatementObject): BalanceSheetObject {
    return {} as BalanceSheetObject;
}