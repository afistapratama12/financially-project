import { GetAddressList } from "./address"
import { GetUMK, GetUMP } from "./umk-umr"

function getGapFromSalaryWithUMR(salary: number, umr: number): number {
  if (salary !== umr) {
    return ((salary - umr) / umr) * 100
  }

  return 0
}

function GetInformationGap(salary: number, address: string): string {
    let UMR = GetUMK(address)

    if (UMR === -1) UMR = GetUMP(address) 
    if (UMR === -1) return "not found: upah minimum"
    
    const gap = getGapFromSalaryWithUMR(salary, UMR)
    
    if (gap === 0) {
        return `sama dengan Upah Minimum di tempat tinggal kamu`
    } else if (gap > 0 && gap <= 10) {
        return `sedikit lebih tinggi dari Upah Minimum di tempat tinggal kamu`
    } else if (gap > 10 && gap <= 50) {
        return `lebih tinggi dari Upah Minimum di tempat tinggal kamu`
    } else if (gap > 50) {
        return `jauh lebih tinggi dari Upah Minimum di tempat tinggal kamu`
    } else if (gap < 0 && gap >= -10) {
        return `sedikit lebih rendah dari Upah Minimum di tempat tinggal kamu`
    } else if (gap < -10 && gap >= -50) {
        return `kurang dari Upah Minimum di tempat tinggal kamu`
    } else if (gap < -50) {
        return `sangat kurang dari Upah Minimum di tempat tinggal kamu`
    } else {
        return `not found: cannot find gap information`
    }
}

export { 
    getGapFromSalaryWithUMR, 
    GetInformationGap, 
    GetAddressList, 
    GetUMK, 
    GetUMP 
}