export const checkNoNum = (exp: string, noNum: string) => {
    const lastChar: string = exp[exp.length - 1]

    // BASIC OPERATIONS
    if ([' x ', ' - ', ' + ', ' ÷ ', ' ^ '].includes(noNum)) {
        if (/(\d|\)|!|π)/.test(lastChar)) {
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

    // SQUARE ROOT
    else if (noNum === '√') {
        if (lastChar === ' ' || lastChar === undefined) return noNum
    }

    // PI
    else if (noNum === 'π') {
        if (
            (!/\d/.test(lastChar) && lastChar !== '√') ||
            lastChar === undefined
        ) {
            return 'π'
        }
    }

    return false
}
