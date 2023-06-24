export const evaluate = (exp: string) => {
    const evaluable: string = exp.replace(/÷/g, '/').replace(/x/g, '*')

    const evaluation: number = new Function(`return ${evaluable}`)()

    return evaluation.toString().trim()
}
