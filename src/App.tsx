import { useState } from 'react'
import style from './App.module.css'

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
    const typeNum = (num: string) => setExpression(expression + num)
    const typeNoNum = (nonum: string) => setExpression(expression + nonum)

    // EQUAL TO
    const equalTo = () => null

    return (
        <main className={style.app}>
            <div className={style.calculator}>
                <div className={style.screen}>{expression}</div>
                <div className={style.buttons}>
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
                        D
                    </button>
                    <button onClick={() => typeNum('4')}>4</button>
                    <button onClick={() => typeNum('5')}>5</button>
                    <button onClick={() => typeNum('6')}>6</button>
                    <button
                        onClick={() => typeNoNum(' x ')}
                        className={style.noNum}
                    >
                        x
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
