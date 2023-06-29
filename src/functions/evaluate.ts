export const evaluate = (exp: string): string => {
    let evaluable: string = exp
        .replace(/÷/g, '/')
        .replace(/x/g, '*')
        .replace(/\^/, '**')

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

    const evaluation: number = new Function(`return ${evaluable}`)()

    return evaluation.toString().trim()
}
