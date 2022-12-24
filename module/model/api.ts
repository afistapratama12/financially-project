export type ErrorResponse = {
    code: string; // format: ERR-<code> -> ex: ERR-400
    errors: string; // error message from system
    message: string; // error information to front end
}

export type RegisterRequest = {
    fullname: string;
    email: string;
    password: string;
    address: string;
}

export function newErrorResponse(code: string, errors: string, message: string): ErrorResponse {
    return { code, errors, message }
}

export type LoginRequest = {
    email: string;
    password: string;
}

export type RegisterLoginResponse = {
    message: string;
    token: string;
}

export function newRegisterLoginResponse(message: string, token: string): RegisterLoginResponse {
    return { message, token }
}

export type FeatureOption = "saving_rate" | "financial_statement" | "personal_finance" | "other"

//TODO: jika ada yang menggunakan fitur, maka total free usage akan dikurangi 1
export type UsingFeatureRequest = {
    feature: FeatureOption 
}
