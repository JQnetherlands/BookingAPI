export function toNumber(value, fieldname) {
    if (typeof value === "number") return value;

    if (typeof value === "string" && value.trim() !== "" && !isNaN(value)) {
        return Number(value);
    }

    throw new Error(`${fieldname} must be a valid number`)
}