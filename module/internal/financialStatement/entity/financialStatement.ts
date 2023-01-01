// jenis usaha: "jasa" / "dagang" / "industri"
export type BusinessType = "service" | "trade" | "manufacture"

// untuk badan
// TODO: apalagi data yang diperlukan
export type FinancialStatementObject = {
    incomeStatement: {
        income: number;
        otherIncome: FinancialStatementDetail[] | number;
    };

    // for "trade"
    purchases?: {
        products: FinancialStatementDetail[] | number; // pembelian barang dagangan
    }

    // for "manufacture"
    production?: {
        rawMaterial: FinancialStatementDetail[] | number; // bahan baku
        productionCost: FinancialStatementDetail[] | number; // biaya produksi selain bahan baku
    }

    expenseStatement: {
        installment: FinancialStatementDetail[] | number; // bayar cicilan bank, dll
        expense: {
            salary: FinancialStatementDetail[] | number; // gaji karyawan
            utility: FinancialStatementDetail[] | number; // listrik, air, telepon, dll
            rent: FinancialStatementDetail[] | number; // biaya sewa dll
        }
        otherExpense: FinancialStatementDetail[] | number; // biaya lainnya
    };
    cashStatement: {
        cash: number;
        bank: number;
        cashEquivalent: FinancialStatementDetail[] | number;
    };
    receivables: FinancialStatementDetail[] | number; // piutang

    fixedAssetStatement: {
        building: FinancialStatementDetail[] | number; // pembelian gedung / rumah / bangunan
        machiney: FinancialStatementDetail[] | number; // alat produksi
        vehicle: FinancialStatementDetail[] | number; // kendaraan
        land: FinancialStatementDetail[] | number; // pembelian tanah
        investment: FinancialStatementDetail[] | number; // deposito, saham, reksadana, dll
        otherFixedAsset: FinancialStatementDetail[] | number;
    };

    liabilityStatement: { // tanggungan / kewajiban
        debt: FinancialStatementDetail[] | number; // utang ke orang / warung / bon
        loan: FinancialStatementDetail[] | number; // pinjaman bank, dll
        otherLiability: FinancialStatementDetail[] | number; // kewajiban lainnya
    };
}

// untuk pribadi
export type UserFinancialStatementObject = {
    cashStatement: {
        cash: number;
        bank: number;
        cashEquivalent: FinancialStatementDetail[] | number;
    },
    receivables: FinancialStatementDetail[] | number,
    
    fixedAssetStatement: {
        building: FinancialStatementDetail[] | number, // rumah pribadi / gudang pribadi
        machiney: FinancialStatementDetail[] | number, // mesin pribadi / alat rumah tangga
        vehicle: FinancialStatementDetail[] | number, // kendaraan pribadi
        land: FinancialStatementDetail[] | number, // tanah pribadi
        investment: FinancialStatementDetail[] | number, // deposito, saham, reksadana, dll
        otherFixedAsset: FinancialStatementDetail[] | number, // aset lainnya
    }

    liabilityStatement: {
        debt: FinancialStatementDetail[] | number, // utang ke orang / warung / bon
        loan: FinancialStatementDetail[] | number, // pinjaman bank, dll
        otherLiability: FinancialStatementDetail[] | number, // kewajiban lainnya
    }
}

export type FinancialStatementDetail = {
    name: string;
    amount: number;
}