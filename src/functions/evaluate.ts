export const evaluate = (exp: string): string => {
    // Check for invalid set of parenthesis
    let [opening, closing] = [0, 0]

    for (const char of exp) {
        char === '(' && opening++
        char === ')' && closing++
    }

    if (opening !== closing) return 'Non-closed parenthesis'

    // REPLACE FOR NECESSARY CHARACTERS
    let evaluable: string = exp
        .replace(/÷/g, '/')
        .replace(/x/g, '*')
        .replace(/\^/g, '**')
        .replace(/π/g, '3.1416')

    // PARENTHESIS MULTIPLICATIONS
    const parMul = evaluable.match(/(\)\(|\d\(|\)\d)/)
    if (parMul) {
        for (const pm of parMul) {
            evaluable = evaluable.replace(pm, pm[0] + '*' + pm[1])
        }
    }

    // RESOLVE FACTORIALS
    const factorials = evaluable.match(/\d+!/g)
    if (factorials) {
        const resFactorial = (num: number): number => {
            if (num === 0) {
                return 1
            } else {
                return num * resFactorial(num - 1)
            }
        }

        for (const fac of factorials) {
            const num = Number(fac.replace('!', ''))

            evaluable = evaluable.replace(fac, resFactorial(num).toString())
        }
    }

    // RESOLVE SQUARE ROOTS
    const sqrt = evaluable.match(/(√\((.*?)\)|√\d+)/g)
    if (sqrt) {
        for (const sr of sqrt) {
            const exp: string = sr.replace('√', '')
            const resolvedExp: number = new Function(`return ${exp}`)()

            evaluable = evaluable.replace(sr, String(Math.sqrt(resolvedExp)))
        }
    }

    // EVALUATE USING A FUNCTION CONSTRUCTOR AND RETURN THE RESULT
    let evaluation: number
    try {
        evaluation = new Function(`return ${evaluable}`)()
    } catch (err) {
        return 'Syntax error'
    }

    return String(Number(evaluation.toFixed(3)))
}
