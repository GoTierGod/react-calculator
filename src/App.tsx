import style from './App.module.css'

import { useEffect, useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'

import { checkNum } from './functions/checkNum'
import { checkNoNum } from './functions/checkNoNum'
import { evaluate } from './functions/evaluate'

function App() {
    const [lastAns, setLastAns] = useState('last answer')
    const [expression, setExpression] = useState('')

    // CLEAN THE SCREEN
    const clean = useCallback(() => setExpression(''), [])

    // DELETE
    const del = useCallback(() => {
        const lastChar = expression[expression.length - 1]

        if (!/(\d|\S)/.test(lastChar)) {
            setExpression((prevExpression) =>
                prevExpression.substring(0, expression.length - 3)
            )
        } else {
            setExpression((prevExpression) =>
                prevExpression.substring(0, expression.length - 1)
            )
        }
    }, [expression])

    // TYPING
    const typeNum = useCallback(
        (num: string) => {
            const check = checkNum(expression, num)

            check && setExpression((prevExpression) => prevExpression + check)
        },
        [expression]
    )

    const typeNoNum = useCallback(
        (noNum: string) => {
            const check = checkNoNum(expression, noNum)

            check && setExpression((prevExpression) => prevExpression + check)
        },
        [expression]
    )

    // EXP
    const typeExp = useCallback(() => {
        const lastChar = expression[expression.length - 1]

        if (/\d/.test(lastChar)) {
            const lastNum = expression.match(/(\d+\.*\d*)$/)

            lastNum &&
                setExpression((prevExpression) =>
                    prevExpression.replace(
                        new RegExp(`${lastNum[0]}$`),
                        `${lastNum[0]}e+`
                    )
                )
        }
    }, [expression])

    // LOG
    const typeLog = useCallback(() => {
        const lastChar = expression[expression.length - 1]

        if (/(\d|π|e)/.test(lastChar)) {
            const lastNum = expression.match(/(\d+\.*\d*|π|e)$/)

            lastNum &&
                setExpression((prevExpression) =>
                    prevExpression.replace(
                        new RegExp(`${lastNum[0]}$`),
                        `log(${lastNum[0]})`
                    )
                )
        }
    }, [expression])

    // LN
    const typeLn = useCallback(() => {
        const lastChar = expression[expression.length - 1]

        if (/(\d|π|e)/.test(lastChar)) {
            const lastNum = expression.match(/(\d+\.*\d*|π|e)$/)

            lastNum &&
                setExpression((prevExpression) =>
                    prevExpression.replace(
                        new RegExp(`${lastNum[0]}$`),
                        `ln(${lastNum[0]})`
                    )
                )
        }
    }, [expression])

    // POSITIVE / NEGATIVE
    const posNeg = useCallback(() => {
        const lastChar = expression[expression.length - 1]

        if (/(\d|π|e|\))/.test(lastChar)) {
            const lastNum = expression.match(
                /(\(-(\d+\.?\d*|π|e)\)|\d+\.?\d*|π|e)$/
            )
            const num = lastNum && lastNum[0].match(/(\d+\.?\d*|π|e)/)

            num &&
                setExpression((prevExpression) =>
                    prevExpression.replace(
                        new RegExp(`${lastNum[0].replace(/[()]/g, '\\$&')}$`),
                        lastNum[0].includes('-') ? `${num[0]}` : `(-${num[0]})`
                    )
                )
        }
    }, [expression])

    // ROUND
    const round = useCallback(() => {
        const lastChar = expression[expression.length - 1]

        if (/\d/.test(lastChar)) {
            const lastNum = expression.match(/(\d+\.*\d*)$/)

            lastNum &&
                setExpression((prevExpression) =>
                    prevExpression.replace(
                        new RegExp(`${lastNum[0]}$`),
                        `${Math.round(Number(lastNum[0]))}`
                    )
                )
        }
    }, [expression])

    // EQUAL TO
    const equalTo = useCallback(() => {
        const result = evaluate(expression)

        setExpression(result)
        setLastAns(result)
    }, [expression])

    // KEYDOWN HANDLER
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            e.preventDefault()

            const nums: string[] = [
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
            ]
            const noNums: { [key: string]: string } = {
                '.': '.',
                '+': ' + ',
                '-': ' - ',
                '/': ' ÷ ',
                '*': ' x ',
                '(': 'par',
                ')': 'par',
                '!': '!',
                r: '√',
                s: ' ^ 2',
                t: '10 ^ ',
                p: 'π',
                e: 'e',
                '%': ' % ',
                m: ' mod ',
            }

            if (nums.includes(e.key)) typeNum(e.key)
            else if (noNums[e.key]) typeNoNum(noNums[e.key])
            else if (e.key === 'Backspace') del()
            else if (e.key === 'Enter') equalTo()
        },
        [typeNum, typeNoNum, del, equalTo]
    )

    // KEYDOWN EVENTS
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

    return (
        <main className={style.app}>
            <div className={style.calculator}>
                <div className={style.screen}>
                    <span data-testid='ans'>
                        {lastAns.length === 0 ? 'last answer' : lastAns}
                    </span>
                    <p data-testid='expression'>
                        {expression.length === 0 ? 'expression' : expression}
                    </p>
                </div>
                <div className={style.buttons}>
                    <button
                        onClick={() => {
                            lastAns.length > 0 && typeNum(lastAns)
                        }}
                        className={style.ans}
                    >
                        ans
                    </button>
                    <button onClick={() => typeLog()} className={style.noNum}>
                        log
                    </button>
                    <button onClick={() => typeLn()} className={style.noNum}>
                        ln
                    </button>
                    <button
                        onClick={() => typeNoNum('e')}
                        className={style.noNum}
                    >
                        e
                    </button>
                    <button onClick={() => clean()} className={style.clean}>
                        AC
                    </button>
                    <button
                        onClick={() => typeNoNum(' ^ 2')}
                        className={style.noNum}
                    >
                        x²
                    </button>
                    <button
                        onClick={() => typeNoNum('√')}
                        className={style.noNum}
                    >
                        √x
                    </button>
                    <button
                        onClick={() => typeNoNum('π')}
                        className={style.noNum}
                    >
                        π
                    </button>
                    <button
                        onClick={() => typeNoNum(' ^ ')}
                        className={style.noNum}
                    >
                        x^
                    </button>
                    <button
                        aria-label='Delete'
                        onClick={() => del()}
                        className={style.delete}
                    >
                        <FontAwesomeIcon icon={faDeleteLeft} />
                    </button>
                    <button onClick={() => posNeg()} className={style.noNum}>
                        +/-
                    </button>
                    <button
                        onClick={() => typeNoNum('par')}
                        className={style.noNum}
                    >
                        ( )
                    </button>
                    <button
                        onClick={() => typeNoNum(' % ')}
                        className={style.noNum}
                    >
                        %
                    </button>
                    <button
                        onClick={() => typeNoNum(' ÷ ')}
                        className={style.noNum}
                    >
                        ÷
                    </button>
                    <button onClick={() => round()} className={style.noNum}>
                        rou
                    </button>
                    <button onClick={() => typeExp()} className={style.noNum}>
                        exp
                    </button>
                    <button onClick={() => typeNum('7')}>7</button>
                    <button onClick={() => typeNum('8')}>8</button>
                    <button onClick={() => typeNum('9')}>9</button>
                    <button
                        onClick={() => typeNoNum('!')}
                        className={style.noNum}
                    >
                        n!
                    </button>
                    <button
                        onClick={() => typeNoNum(' mod ')}
                        className={style.noNum}
                    >
                        mod
                    </button>
                    <button onClick={() => typeNum('4')}>4</button>
                    <button onClick={() => typeNum('5')}>5</button>
                    <button onClick={() => typeNum('6')}>6</button>
                    <button
                        onClick={() => typeNoNum(' x ')}
                        className={style.noNum}
                    >
                        X
                    </button>
                    <button
                        onClick={() => typeNoNum('10 ^ ')}
                        className={style.noNum}
                    >
                        10^
                    </button>
                    <button onClick={() => typeNum('1')}>1</button>
                    <button onClick={() => typeNum('2')}>2</button>
                    <button onClick={() => typeNum('3')}>3</button>
                    <button
                        onClick={() => typeNoNum(' + ')}
                        className={style.noNum}
                    >
                        +
                    </button>
                    <button
                        onClick={() => typeNoNum('1 ÷ ')}
                        className={style.noNum}
                    >
                        ¹/x
                    </button>
                    <button
                        onClick={() => typeNoNum('.')}
                        className={style.noNum}
                    >
                        .
                    </button>
                    <button onClick={() => typeNum('0')}>0</button>
                    <button
                        onClick={() => typeNoNum(' - ')}
                        className={style.noNum}
                    >
                        -
                    </button>
                    <button onClick={() => equalTo()} className={style.equalTo}>
                        =
                    </button>
                </div>
            </div>
        </main>
    )
}

export default App
