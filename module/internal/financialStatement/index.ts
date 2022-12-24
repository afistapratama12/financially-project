import { UserFinancialStatementObject, BalanceSheetObject } from "./entity"

//TODO: need improvement
function ProcessBalanceSheetPersonal(statement:  UserFinancialStatementObject) :BalanceSheetObject {    
    let totalAsset = statement.CashStatement.Cash + statement.CashStatement.Bank;
    let TotalLiabilities = 0;

    return {
        Assets: {
            CurrentAssets: {
                Cash: statement.CashStatement.Cash,
                Bank: statement.CashStatement.Bank,
                Receivables: 0,
                OtherCurrentAssets: 0
            },
            FixedAssets: {
                PropertyPlantEquipment: 0,
                AccumulatedDepreciation: 0,
                OtherFixedAssets: 0
            },
            OtherAssets: 0,
            TotalAssets: 0
        },
        Liabilities: {
            CurrentLiabilities: {
                AccountsPayable: 0,
                AccruedLiabilities: 0,
                OtherCurrentLiabilities: 0
            },
            LongTermLiabilities: {
                Loan: 0,
                OtherLongTermLiabilities: 0
            },
            OtherLiabilities: 0,
            TotalLiabilities: 0
        },
        Equity: {
            NetWorth: 0,
            OtherEquity: 0,
            TotalEquity: 0
        }
    }
}