export function isEmpty(value: any) {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    );
}

export function isEmpties(...values: any) {
    return values.every(isEmpty);
}