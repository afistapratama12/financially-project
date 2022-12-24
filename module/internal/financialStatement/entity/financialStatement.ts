// jenis usaha : "jasa" / "dagang" / "industri"
export type BusinessType = "service" | "trade" | "manufacture"

// untuk badan
export type FinancialStatementObject = {
    IncomeStatement: {
        Income: number;
        OtherIncome: FinancialStatementDetail[] | number;
    };
    ExpenseStatement: {
        Installment: FinancialStatementDetail[] | number;
        Expense: FinancialStatementDetail[] | number;
        OtherExpense: FinancialStatementDetail[] | number;
    };
    CashStatement: {
        Cash: number;
        Bank: number;
        CashEquivalent: FinancialStatementDetail[] | number;
    };
    ReceivableStatement: FinancialStatementDetail[] | number;
    CurrentAssetStatement: {
        Deposito: FinancialStatementDetail[] | number;
        Investment: FinancialStatementDetail[] | number;
        OtherCurrentAsset: FinancialStatementDetail[] | number;
    };
    FixedAssetStatement: {
        Building: FinancialStatementDetail[] | number;
        Machinery: FinancialStatementDetail[] | number;
        Vehicle: FinancialStatementDetail[] | number;
        Land: FinancialStatementDetail[] | number;
        OtherFixedAsset: FinancialStatementDetail[] | number;
    } | number;

    LiabilityStatement: {
        Loan: FinancialStatementDetail[] | number;
        OtherLiability: FinancialStatementDetail[] | number;
    };
}

// untuk pribadi
export type UserFinancialStatementObject = {
    CashStatement: {
        Cash: number;
        Bank: number;
        CashEquivalent: FinancialStatementDetail[] | number;
    },
    ReceivableStatement: FinancialStatementDetail[] | number,
    CurrentAssetStatement: {
        Deposito: FinancialStatementDetail[] | number,
        Investment: FinancialStatementDetail[] | number,
        OtherCurrentAsset: FinancialStatementDetail[] | number,
    },
    FixedAssetStatement: {
        Building: FinancialStatementDetail[] | number,
        Machinery: FinancialStatementDetail[] | number,
        Vehicle: FinancialStatementDetail[] | number,
        Land: FinancialStatementDetail[] | number,
        OtherFixedAsset: FinancialStatementDetail[] | number,
    }
    LiabilityStatement: {
        Loan: FinancialStatementDetail[] | number,
        OtherLiability: FinancialStatementDetail[] | number,
    }
}

export type FinancialStatementDetail = {
    name: string;
    amount: number;
}