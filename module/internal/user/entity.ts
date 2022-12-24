export type AddressObject = {
    [province: string]: RegencyObject;
}

export type RegencyObject = {
    [regency: string]: string;
}

export type MinimumWageObject = {
    [address: string]: number;
}