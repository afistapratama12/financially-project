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

    GrossProfit: number; // Pendapatan Kotor

    Expenses: {
        OperatingExpenses: {
            salaries: ProfitLossDetail[] | number;
            utilities: ProfitLossDetail[] | number;
            rent: ProfitLossDetail[] | number;
        };
        OtherOperatingExpenses: ProfitLossDetail[] | number;
    },

    ProfitBeforeTax: number; // Laba Sebelum Pajak
    IncomeTax: number; // Pajak Penghasilan, perhitungan berdasarkan pajak penghasilan
    
    NetProfit: number; // Laba Bersih
}

export type ProfitLossDetail = {
    name: string;
    amount: number;
}