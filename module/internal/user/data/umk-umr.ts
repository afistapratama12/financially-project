import { MinimumWageObject } from "../entity"
import { GetRegencyCode } from "./address"

// upah minimum Regional
const UMKList: MinimumWageObject = {
    //DI Yogyakarta
    "16-5": 2324776,
    "16-4": 2154519,
    "16-1": 2066439,
    "16-3": 2050447,
    "16-2": 2049266,
}

// upah minimum provinsi
const UMPList: MinimumWageObject = {
    "Aceh": 3413666,
    "Bali": 2713672,
    "Banten": 2661280,
    "Bengkulu": 2418280,
    "DI Yogyakarta": 1981782,
    "DKI Jakarta": 4900798,
    "Gorontalo": 2989350,
    "Jambi": 2943000,
    "Jawa Barat": 1986670,
    "Jawa Tengah": 1958169,
    "Jawa Timur": 2040244,
    "Kalimantan Barat": 2608601,
    "Kalimantan Selatan": 3149977,
    "Kalimantan Tengah": 3181013,
    "Kalimantan Timur": 3201396,
    "Kalimantan Utara": 3251702,
    "Kepulauan Bangka Belitung": 3498479,
    "Kepulauan Riau": 3279194,
    "Lampung": 2633285,
    "Maluku": 2812827,
    "Maluku Utara": 2976720,
    "Nusa Tenggara Barat": 2317407,
    "Nusa Tenggara Timur": 2123994,
    "Papua": 3864696,
    "Papua Barat": 3282000,
    // "Papua Barat Daya": 1,
    // "Papua Pegunungan": 1,
    // "Papua Selatan": 1,
    // "Papua Tengah": 1,
    "Riau": 3191662,
    "Sulawesi Barat": 2871794,
    "Sulawesi Selatan": 3385145,
    "Sulawesi Tengah": 2599546,
    "Sulawesi Tenggara": 2758984,
    "Sulawesi Utara": 3485000,
    "Sumatra Barat": 2742476,
    "Sumatra Selatan": 3404177,
    "Sumatra Utara": 2710493
}

export function GetUMK(address: string): number {
    const regencyCode = GetRegencyCode(address)
    if (!UMKList.hasOwnProperty(regencyCode)) {
        return -1
    }

    return UMKList[regencyCode]
}

export function GetUMP(address: string): number {
    const province = address.split(", ")[1]
    if (!UMPList.hasOwnProperty(province)) {
        return -1
    }
    
    return UMPList[province]
}
