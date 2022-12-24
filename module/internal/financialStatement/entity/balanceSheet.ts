// TODO: perlu direvisi lagi structnya
export type BalanceSheetObject = {
    Assets: {
        CurrentAssets: {
            Cash: number;
            Bank: number;
            Receivables: number;
            Inventory?: number;
            OtherCurrentAssets: BalanceSheetDetail[] | number;
        }

        FixedAssets: {
            PropertyPlantEquipment: BalanceSheetDetail[] | number;
            AccumulatedDepreciation: BalanceSheetDetail[] | number;
            OtherFixedAssets: BalanceSheetDetail[] | number;
        },

        OtherAssets: BalanceSheetDetail[] | number;
        TotalAssets: number;
    },

    Liabilities: {
        CurrentLiabilities: {
            AccountsPayable: number;
            AccruedLiabilities: number;
            OtherCurrentLiabilities: BalanceSheetDetail[] | number;
        },

        LongTermLiabilities: {
            Loan: BalanceSheetDetail[] | number;
            OtherLongTermLiabilities: BalanceSheetDetail[] | number;
        },

        OtherLiabilities: BalanceSheetDetail[] | number;
        
        TotalLiabilities: number;
    },

    Equity: {
        NetWorth?: number;
        PaidInCapital: number;
        RetainedEarnings: number;
        OtherEquity: BalanceSheetDetail[] | number;
        TotalEquity: number;
    },
}

export type BalanceSheetDetail = {
    name: string;
    amount: number;
}