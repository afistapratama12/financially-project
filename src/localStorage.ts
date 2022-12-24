export const localID: string = "_v_id"
export const localVFN: string = "_v_fn"
export const localVADDR: string = "_v_addr"

export function setLocalVisitor(id: string, fullname: string, address: string) {
    localStorage.setItem(localID, id)
    localStorage.setItem(localVFN, fullname)
    localStorage.setItem(localVADDR, address)
}

export function removeLocalVisitor() {
    localStorage.removeItem(localID)
    localStorage.removeItem(localVFN)
    localStorage.removeItem(localVADDR)
}