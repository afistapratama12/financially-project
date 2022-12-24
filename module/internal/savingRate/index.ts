import { SavingRateObject } from './entity';

// perhitungan income: income + otherIncome
// perhitungan pengeluaran: installments + expenses
// perhitungan sisa uang: invest + saving
// jika sisa uang ternyata lebih kecil dari (income - pengeluaran), maka sisa uang ditambahkan dengan (income - pengeluaran - sisa uang)
// saving rate = sisa uang / income
export function CalculationSavingRate(savingRateData: SavingRateObject) {
    let totalIncome = savingRateData.income + savingRateData.otherIncome;
    
    let totalSaving: number =  savingRateData.saving

    if (typeof savingRateData.investment === 'number') {
        totalSaving += savingRateData.investment;
    } else {
        totalSaving += savingRateData.investment.reduce((acc, curr) => acc + curr.amount, 0);
    }

    let totalExpenditure:number
    
    if (typeof savingRateData.installments === 'number') {
        totalExpenditure = savingRateData.installments;
    } else {
        totalExpenditure = savingRateData.installments.reduce((acc, curr) => acc + curr.amount, 0);
    }

    if (typeof savingRateData.expenses === 'number') {
        totalExpenditure += savingRateData.expenses;
    } else {
        totalExpenditure += savingRateData.expenses.reduce((acc, curr) => acc + curr.amount, 0);
    }

    if(totalSaving < (totalIncome - totalExpenditure)) {
        totalSaving += totalIncome - totalExpenditure - totalSaving
    }
    
    savingRateData.savingRate = totalSaving / totalIncome;

    return savingRateData;
}

export function SavingRateAnalysis(address: string, savingRateData: SavingRateObject | {}) {
    // parameter logic
    // 1. saving rate 10% (minimum), 20% (ideal), 30% (bagus), 50% sangat bagus
    // 2. gaji dari UMK (lebih kecil, mendekati, lebih besar dikit, sangat besar)
    // 3. other income lebih besar dari gaji atau tidak
}