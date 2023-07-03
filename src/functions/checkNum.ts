export const checkNum = (exp: string, num: string): string | boolean => {
    const lastChar = exp[exp.length - 1]

    if (!/(π|!)/.test(lastChar)) {
        return num
    }

    return false
}
