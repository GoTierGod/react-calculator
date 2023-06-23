import style from './App.module.css'

function App() {
    return (
        <main className={style.app}>
            <div className={style.calculator}>
                <div className={style.screen}></div>
                <div className={style.buttons}>
                    <button className={style.noNum}>( )</button>
                    <button className={style.noNum}>%</button>
                    <button className={style.noNum}>/</button>
                    <button className={style.clean}>AC</button>
                    <button>7</button>
                    <button>8</button>
                    <button>9</button>
                    <button className={style.delete}>D</button>
                    <button>4</button>
                    <button>5</button>
                    <button>6</button>
                    <button className={style.noNum}>x</button>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button className={style.noNum}>+</button>
                    <button>0</button>
                    <button className={style.noNum}>.</button>
                    <button className={style.noNum}>-</button>
                    <button className={style.equalTo}>=</button>
                </div>
            </div>
        </main>
    )
}

export default App
