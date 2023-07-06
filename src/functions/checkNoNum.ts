export const checkNoNum = (exp: string, noNum: string): string | boolean => {
    const lastChar: string = exp[exp.length - 1]

    // EASY TO ADD OPERATIONS
    if ([' x ', ' - ', ' + ', ' ÷ ', ' ^ ', ' % ', ' ^ 2'].includes(noNum)) {
        if (/(\d|\)|!|π|e)/.test(lastChar)) {
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
            return noNum
        }
    }

    // SQUARE ROOT
    else if (noNum === '√') {
        if (lastChar === ' ' || lastChar === undefined) return noNum
    }

    // PI
    else if (noNum === 'π' || noNum === 'e') {
        if (!/(\d|\.|π|!|e)/.test(lastChar) || lastChar === undefined) {
            return noNum
        }
    }

    // DECIMAL
    else if (noNum === '.') {
        const lastNum = exp.match(/(\d+\.*\d*)$/)

        if (lastNum) {
            if (!lastNum[0].includes('.') && /\d/.test(lastChar)) {
                return noNum
            }
        }
    }

    return false
}
