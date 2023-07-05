export const checkNum = (exp: string, num: string): string | boolean => {
    const lastChar = exp[exp.length - 1]

    if (!/(π|!|e)/.test(lastChar) || lastChar === undefined) {
        return num
    }

    return false
}
