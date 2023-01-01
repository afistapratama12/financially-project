import { FinancialStatementDetail } from "../entity";

export function getTotalIfWithDetail(data: number| FinancialStatementDetail[]): number {
    let total = 0;
    
    if (typeof data === 'number') {
        return data;
    } else if (Array.isArray(data)) {
        data.forEach((item) => {
            total += item.amount;
        }); 
    }

    return total;
}

export function getTotalIfWithDetails(...data: Array<number| FinancialStatementDetail[]>): number {
    let total = 0;

    data.forEach((item) => {
        total += getTotalIfWithDetail(item);
    });

    return total;
}