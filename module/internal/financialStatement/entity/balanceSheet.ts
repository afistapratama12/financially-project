// TODO: perlu direvisi lagi structnya
export type BalanceSheetObject = {
    aseets: {
        currentAssets: {
            cash: number;
            bank: number;
            receivables: number;
            inventory?: number;
            cashEquivalent: number;
        },
        totalcurrentAssets: number;

        fixedAssets: {
            building: number;
            machiney: number;
            vehicle: number;
            land: number;
            investment: number;
            otherFixedAsset: number;
        },
        totalFixedAssets: number;
        totalAssets: number;
    },

    liabilities: {
        currentLiabilities: {
            debt: number;
        },
        totalCurrentLiabilities: number;

        longTermLiabilities: {
            loan: number;
            otherLiabilities: number;
        },
        totalLongTermLiabilities: number;
        totalLiabilities: number;
    },

    Equity: {
        NetWorth: number;
        RetainedEarnings?: number;
        OtherEquity: number;
        TotalEquity: number;
    },

    TotalLiabilitiesAndEquity: number;
}

export type UserBalanceSheetObject = {
    aseets: {
        currentAssets: {
            cash: number;
            bank: number;
            receivables: number;
            cashEquivalent: number;
        },
        totalcurrentAssets: number;

        fixedAssets: {
            building: number;
            machiney: number;
            vehicle: number;
            land: number;
            investment: number;
            otherFixedAsset: number;
        },
        totalFixedAssets: number;
        totalAssets: number;
    },

    liabilities: {
        currentLiabilities: {
            debt: number;
        },
        totalCurrentLiabilities: number;

        longTermLiabilities: {
            loan: number;
            otherLiabilities: number;
        },
        totalLongTermLiabilities: number;
        totalLiabilities: number;
    },

    equity: {
        netWorth: number;
        otherEquity: number;
        totalEquity: number;
    },

    totalLiabilitiesAndEquity: number
}

export type BalanceSheetDetail = {
    name: string;
    amount: number;
}