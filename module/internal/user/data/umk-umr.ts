import { MinimumWageObject } from "../entity"

// upah minimum Regional
const UMKList: MinimumWageObject = {
    "1-1": 20000000
}

// upah minimum provinsi
const UMPList: MinimumWageObject = {
    "Aceh": 3166460,
    "Bali": 1,
    "Banten": 1,
    "Bengkulu": 1,
    "DI Yogyakarta": 1,
    "DKI Jakarta": 1,
    "Gorontalo": 1,
    "Jambi": 1,
    "Jawa Barat": 1,
    "Jawa Tengah": 1,
    "Jawa Timur": 1,
    "Kalimantan Barat": 1,
    "Kalimantan Selatan": 1,
    "Kalimantan Tengah": 1,
    "Kalimantan Timur": 1,
    "Kalimantan Utara": 1,
    "Kepulauan Bangka Belitung": 1,
    "Kepulauan Riau": 1,
    "Lampung": 1,
    "Maluku": 1,
    "Maluku Utara": 1,
    "Nusa Tenggara Barat": 1,
    "Nusa Tenggara Timur": 1,
    "Papua": 1,
    "Papua Barat": 1,
    "Papua Barat Daya": 1,
    "Papua Pegunungan": 1,
    "Papua Selatan": 1,
    "Papua Tengah": 1,
    "Riau": 1,
    "Sulawesi Barat": 1,
    "Sulawesi Selatan": 1,
    "Sulawesi Tengah": 1,
    "Sulawesi Tenggara": 1,
    "Sulawesi Utara": 1,
    "Sumatra Barat": 1,
    "Sumatra Selatan": 1,
    "Sumatra Utara": 1
}

export function GetUMK(regencyCode: string): number {
    return 0
}

export function GetUMP(province: string): number {
    return UMPList[province]
}
