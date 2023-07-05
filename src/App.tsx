import style from './App.module.css'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'

import { checkNum } from './functions/checkNum'
import { checkNoNum } from './functions/checkNoNum'
import { evaluate } from './functions/evaluate'

function App() {
    const [expression, setExpression] = useState('')

    // CLEAN THE SCREEN
    const clean = () => setExpression('')

    // DELETE
    const del = () => {
        const lastChar: string = expression[expression.length - 1]

        if (!/(\d|\S)/.test(lastChar)) {
            setExpression(expression.substring(0, expression.length - 3))
        } else {
            setExpression(expression.substring(0, expression.length - 1))
        }
    }

    // TYPING
    const typeNum = (num: string) => {
        const check = checkNum(expression, num)

        check && setExpression(expression + check)
    }

    const typeNoNum = (noNum: string) => {
        const check = checkNoNum(expression, noNum)

        check && setExpression(expression + check)
    }

    // EQUAL TO
    const equalTo = () => setExpression(evaluate(expression))

    return (
        <main className={style.app}>
            <div className={style.calculator}>
                <p data-testid='expression' className={style.screen}>
                    {expression}
                </p>
                <div className={style.buttons}>
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
                        onClick={() => typeNoNum('!')}
                        className={style.noNum}
                    >
                        n!
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
                    <button onClick={() => clean()} className={style.clean}>
                        AC
                    </button>
                    <button onClick={() => typeNum('7')}>7</button>
                    <button onClick={() => typeNum('8')}>8</button>
                    <button onClick={() => typeNum('9')}>9</button>
                    <button onClick={() => del()} className={style.delete}>
                        <FontAwesomeIcon icon={faDeleteLeft} />
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
                    <button onClick={() => typeNum('1')}>1</button>
                    <button onClick={() => typeNum('2')}>2</button>
                    <button onClick={() => typeNum('3')}>3</button>
                    <button
                        onClick={() => typeNoNum(' + ')}
                        className={style.noNum}
                    >
                        +
                    </button>
                    <button onClick={() => typeNum('0')}>0</button>
                    <button
                        onClick={() => typeNoNum('.')}
                        className={style.noNum}
                    >
                        .
                    </button>
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
