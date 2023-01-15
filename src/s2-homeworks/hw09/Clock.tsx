import React, {useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)

    const start = () => {

        const id: number = +setInterval(() => {
            setDate(new Date(Date.now()))
            localStorage.setItem('hw9-date', JSON.stringify(Date.now()))
        }, 1000)
        setTimerId(id)
        // пишут студенты // запустить часы (должно отображаться реальное время, а не +1)
        // сохранить ид таймера (https://learn.javascript.ru/settimeout-setinterval#setinterval)

    }

    const stop = () => {
        // пишут студенты // поставить часы на паузу, обнулить ид таймера (timerId <- undefined)
        clearInterval(timerId)
        setTimerId(undefined)
    }

    const onMouseEnter = () => { // пишут студенты // показать дату если наведена мышка

        setShow(true)
    }
    const onMouseLeave = () => { // пишут студенты // спрятать дату если мышка не наведена
        setShow(false)
    }

    const stringTime = date.toLocaleTimeString('en-GB') || <br/>
    function addZero(num:number) {
        if (num >= 0 && num <= 9) {
            return '0' + num;
        } else {
            return num;
        }
    }
    const stringDate= addZero(date.getDate()) + '.' +
        addZero(date.getMonth() + 1) + '.' +
        addZero(date.getFullYear())
    // часы24:минуты:секунды (01:02:03)/(23:02:03)/(24:00:00)/(00:00:01) // пишут студенты

    //console.log(stringDate)// день.месяц.год (01.02.2022) // пишут студенты, варианты 01.02.0123/01.02.-123/01.02.12345 не рассматриваем

    //replace(/[^a-zа-яё0-9\s]/gi, ' ')
    // день недели на английском, месяц на английском (https://learn.javascript.ru/intl#intl-datetimeformat)
    let day = new Intl.DateTimeFormat('en-US', {weekday: "long"})
    let month = new Intl.DateTimeFormat('en-US', {month: "long"})
    const stringDay = day.format(date) || <br/> // пишут студенты
    const stringMonth = month.format(date) || <br/> // пишут студенты

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                            <span id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    //disabled={true} // пишут студенты // задизэйблить если таймер запущен
                   // disabled={!!timerId}//перевод в boolean
                    disabled={timerId!==undefined}
                    onClick={start}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    //disabled={} // пишут студенты // задизэйблить если таймер не запущен
                    //disabled={!!timerId !== true}
                    disabled={timerId===undefined}
                    onClick={stop}

                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock
