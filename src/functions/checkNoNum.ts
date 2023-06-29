export const checkNoNum = (exp: string, noNum: string) => {
    const lastChar: string = exp[exp.length - 1]

    // BASIC OPERATIONS
    if ([' x ', ' - ', ' + ', ' ÷ ', ' ^ '].includes(noNum)) {
        if (/(\d|\)|!)/.test(lastChar)) {
            return noNum
        }
    }

    // PARENTHESIS
    else if (noNum === 'par') {
        if ((lastChar !== '(' && lastChar !== ')') || lastChar === undefined) {
            const parenthesis = exp.match(/(\(|\))/g)

            if (parenthesis) {
                const lastPar = parenthesis[parenthesis.length - 1]

                return lastPar === '(' ? ')' : '('
            }

            return '('
        }
    }

    // FACTORIALS
    else if (noNum === '!') {
        if (/\d/.test(lastChar)) {
            return '!'
        }
    }

    return false
}
