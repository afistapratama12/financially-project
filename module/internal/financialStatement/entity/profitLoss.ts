export type ProfitLossObject = {
    Income: {
        Income: number;
        OtherIncome: ProfitLossDetail[] | number;
    },
    // HPP
    CostOfGoodsSold?: {
        CostOfGoodsSold?: number;
        OtherCostOfGoodsSold?: ProfitLossDetail[] | number;
    },

    GrossProfit: number;
    Expenses: {
        OperatingExpenses: number;
        OtherOperatingExpenses: ProfitLossDetail[] | number;
        NonOperatingExpenses: number;
        OtherNonOperatingExpenses: ProfitLossDetail[] | number;
    },

    ProfitBeforeTax: number;
    IncomeTax: number;
    NetProfit: number;
}

export type ProfitLossDetail = {
    name: string;
    amount: number;
}