import style from './App.module.css'

import { useEffect, useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'

import { checkNum } from './functions/checkNum'
import { checkNoNum } from './functions/checkNoNum'
import { evaluate } from './functions/evaluate'

function App() {
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

    // EQUAL TO
    const equalTo = useCallback(
        () => setExpression(evaluate(expression)),
        [expression]
    )

    // KEYDOWN HANDLER
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
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
                <p data-testid='expression' className={style.screen}>
                    {expression}
                </p>
                <div className={style.buttons}>
                    <button className={style.ans}>ans</button>
                    <button className={style.noNum}>log</button>
                    <button className={style.noNum}>ln</button>
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
                    <button onClick={() => del()} className={style.delete}>
                        <FontAwesomeIcon icon={faDeleteLeft} />
                    </button>
                    <button className={style.noNum}>+/-</button>
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
                    <button className={style.noNum}>|x|</button>
                    <button className={style.noNum}>exp</button>
                    <button onClick={() => typeNum('7')}>7</button>
                    <button onClick={() => typeNum('8')}>8</button>
                    <button onClick={() => typeNum('9')}>9</button>
                    <button
                        onClick={() => typeNoNum('!')}
                        className={style.noNum}
                    >
                        n!
                    </button>
                    <button className={style.noNum}>mod</button>
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
