export type SavingRateObject = {
    savingRate? : number;
    income: number | SavingRateDetail[];
    otherIncome: number;
    saving: number;
    investment: SavingRateDetail[] | number;
    installments: SavingRateDetail[] | number; // cicilan
    expenses: SavingRateDetail[] | number; // pengeluaran selain cicilan
};

export type SavingRateDetail = {
    name: string;
    amount: number;
}
