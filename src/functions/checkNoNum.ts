export const checkNoNum = (exp: string, noNum: string) => {
    const lastChar: string = exp[exp.length - 1]

    if ([' x ', ' - ', ' + ', ' ÷ '].includes(noNum)) {
        if (/\d/.test(lastChar)) {
            return noNum
        }
    }

    return false
}
