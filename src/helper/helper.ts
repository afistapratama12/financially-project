
export const formatToCurrency = (val: number = 0): string => {
        if (val <= 0) return "" 
        if (val < 1000) return val.toString()

        let res = ""
        let str = val.toString()
        
        for (let i = str.length - 1; i >= 0; i--) {
            res += str[i]
            if ((str.length - i) % 3 === 0 && i !== 0) {
                res += ","
            }
        }
        
        return res.split("").reverse().join("")
}

export function getSerial(len: number = 6): string {
    const char = "abcdefghijklmnopqrstuvwxyz0123456789"
    let res = ""

    for (let i = 0; i < len; i++) {
        res += char[Math.floor(Math.random() * char.length)]
    }

    return res
}

export function generateSlug(str: string, serial?: string): string {
    // remove all special characters
    str = str.replace(/[^\w\s]/gi, "").toLowerCase()
    // replace all spaces with -
    str = str.replace(/\s+/g, "-")
    
    // if using serial, add serial to the end of slug
    if (serial) {
        str += "-" + serial
    }

    return str
}