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
        .replace(/π/g, Math.PI.toString())
        .replace(/(?<!\d)e/g, Math.E.toString())

    // PARENTHESIS MULTIPLICATIONS
    const parMul = evaluable.match(/(\)\(|\d\(|\)\d)/g)
    if (parMul) {
        for (const pm of parMul) {
            evaluable = evaluable.replace(pm, pm[0] + '*' + pm[1])
        }
    }

    // RESOLVE FACTORIALS
    const factorialsOps = evaluable.match(/\d+!/g)
    if (factorialsOps) {
        const resFactorial = (num: number): number => {
            if (num === 0) {
                return 1
            } else {
                return num * resFactorial(num - 1)
            }
        }

        for (const fac of factorialsOps) {
            const num = Number(fac.replace('!', ''))

            evaluable = evaluable.replace(fac, resFactorial(num).toString())
        }
    }

    // RESOLVE SQUARE ROOTS
    const sqrtOps = evaluable.match(/(√\((.*?)\)|√\d+)/g)
    if (sqrtOps) {
        for (const sr of sqrtOps) {
            const exp: string = sr.replace('√', '')
            const resolvedExp: number = new Function(`return ${exp}`)()

            evaluable = evaluable.replace(sr, String(Math.sqrt(resolvedExp)))
        }
    }

    // RESOLVE PERCENTAGE
    const perOps = evaluable.match(/(\(.*\)|\d+\.*\d*)\s%\s(\(.*\)|\d+\.*\d*)/g)
    if (perOps) {
        for (const per of perOps) {
            const left = per.split('%')[0].trim()
            const right = per.split('%')[1].trim()

            evaluable = evaluable.replace(per, `(${left}/100) * (${right})`)
        }
    }

    // RESOLVE LOG
    const logOps = evaluable.match(/log\(\d+\.*\d*\)/g)
    if (logOps) {
        for (const log of logOps) {
            const number = log.match(/\d+\.*\d*/)

            number &&
                (evaluable = evaluable.replace(log, `Math.log10(${number[0]})`))
        }
    }

    // RESOLVE LN
    const lnOps = evaluable.match(/ln\(\d+\.*\d*\)/g)
    if (lnOps) {
        for (const ln of lnOps) {
            const number = ln.match(/\d+\.*\d*/)

            number &&
                (evaluable = evaluable.replace(ln, `Math.log(${number[0]})`))
        }

        console.log(evaluable)
    }

    // MODULUS
    evaluable = evaluable.replace('mod', '%')

    // EVALUATE USING A FUNCTION CONSTRUCTOR AND RETURN THE RESULT
    let evaluation: number
    try {
        evaluation = new Function(`return ${evaluable}`)()
    } catch (err) {
        return 'Syntax error'
    }

    return Number(evaluation.toFixed(14)).toString()
}
