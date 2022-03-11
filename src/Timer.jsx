import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyStore from './store';
import timerStyles from './Timer.module.css'

const TimerHeader = ({ elm }) => {
    const [name, setName] = useState(elm.name);
    const changeName = (e) => {
        setName(e.target.value);
    }
    return <>
        <input name='name' className={timerStyles.timerNameInput} type='text' value={name} onChange={changeName}></input>
    </>;
}

const ButtonControls = ({ elm }) => {
    return <>
        <button className={elm.status === 2 ? timerStyles.btnActive : ''} name='start_btn' type='button'>start</button>
        {elm.type === MyStore.TYPE_STOPWATCH ? <button className={elm.status === 1 ? timerStyles.btnActive : ''} name='pause_btn' type='button'>pause</button> : null}
        <button className={elm.status === 0 ? timerStyles.btnActive : ''} name='stop_btn' type='button'>stop</button>
        <button name='del_btn' type='button'>del</button>
        <button name='show_btn' className={elm.displayStatus === true ? timerStyles.btnActive : ''} type='button'>show</button>
    </>;
}

const EventControls = ({ elm }) => {
    const [selHow, setSelHow] = useState(elm.type);
    const [selOver, setSelOver] = useState(elm.timeOver);
    const [selStart, setSelStart] = useState(createInputDate(elm));
    const changeHow = (e) => {
        setSelHow(+e.target.value);
    }
    const changeStart = (e) => {
        setSelStart(e.target.value);
        // let date = new Date(e.target.value);
        // console.log(date);
        // dispatch(MyStore.setAction(MyStore.SET_TIMER_END, { idx: idx, date: date }));
    }
    const changeOver = (e) => {
        setSelOver(e.target.value);
    }
    function createInputDate(elm) {
        // let now = Date.now();
        let date = elm.date || Date.now();
        let res = new Date(date);
        // let tz = res.getTimezoneOffset();
        res.setHours(res.getHours() - res.getTimezoneOffset() / 60); // только для res.toJSON() тк он преобразует дату к UTC те отнимет часовой пояс
        return res.toJSON().slice(0, 19);

        // let date1 = res.toJSON().slice(0, 19);
        // let date2 = res.toString();
        // let date3 = res.toLocaleString();
        // let date4 = res.toLocaleDateString();
        // let date5 = res.toLocaleTimeString();
        // return res;
    }
    const renderSelTime = () => {
        let res;
        // console.log(selStart);value={selOver} 
        if (selHow === 1) {
            res =
                <select name='time_over' value={selOver} onChange={changeOver}>
                    <option value="5 s">5 сек</option>
                    <option value="10 s">10 сек</option>
                </select>
        }
        if (selHow === 2) {
            res = <input name='time_over' type='datetime-local' value={selStart} onChange={changeStart}></input>
        }
        return res;
    }

    return <>
        <label htmlFor="sel_how" >Произойдет&nbsp;&nbsp;</label>
        <select name='sel_how' id="sel_how" value={selHow} onChange={changeHow}>
            <option value="1">через</option>
            <option value="2">в</option>
        </select>
        {renderSelTime()}
    </>;
}

const TimerItem = ({ idx, elm }) => {
    const dispatch = useDispatch();

    const saveParams = (form) => {
        let date;
        let startDateStr = form.elements.time_over?.value;
        if (startDateStr) { // event
            let strArr = startDateStr.split(' ');
            if (strArr.length === 2) { // over date input
                let n = parseInt(strArr[0]);
                let mul = 1000;
                if (strArr[2] === 'm') {
                    mul = 60000;
                }
                if (strArr[2] === 'h') {
                    mul = 3600000;
                }
                date = Date.now() + (n * mul);
            } else {
                date = new Date(form.elements.time_over.value).getTime();
            }
            dispatch(MyStore.setAction(MyStore.SET_TIMER_PARAMS, { name: form.elements.name.value, date: date, type: +form.elements.sel_how.value, idx: idx, timeOver: form.elements.time_over.value }));
        } else {
            dispatch(MyStore.setAction(MyStore.SET_TIMER_PARAMS, { name: form.elements.name.value, idx: idx }));
        }

    }

    const onClickDel = () => {
        if (window.confirm("Удалить?")) {
            dispatch(MyStore.setAction(MyStore.DEL_TIMER, idx));
        }
    }
    const click = (e) => {
        let idx = parseInt(e.currentTarget.id);
        if (e.target.name === 'start_btn') {
            saveParams(e.currentTarget); // form
            dispatch(MyStore.setAction(MyStore.START_TIMER, idx));
        }
        if (e.target.name === 'pause_btn') {
            dispatch(MyStore.setAction(MyStore.PAUSE_TIMER, idx));
        }
        if (e.target.name === 'stop_btn') {
            dispatch(MyStore.setAction(MyStore.STOP_TIMER, idx));
        }
        if (e.target.name === 'del_btn') {
            onClickDel();
        }
        if (e.target.name === 'show_btn') {
            dispatch(MyStore.setAction(MyStore.SHOW_TIMER, idx));
        }
    }

    return (
        <form className={timerStyles.timerListItem} id={idx + '_timer'} onClick={click}>
            <TimerHeader elm={elm} />
            {elm.type !== MyStore.TYPE_STOPWATCH ? <EventControls elm={elm} /> : null}
            <ButtonControls elm={elm} />
            {/* <span>{elm.type !== MyStore.TYPE_STOPWATCH ? 'осталось' : 'прошло'} {elm.display}</span> */}
        </form>
    );
}

export const TimerList = () => {
    const timers = useSelector(MyStore.selTimers);
    // const bRender = useSelector(MyStore.selRenderFlag);

    const timersElements = useMemo(() => {
        return timers.map((el, idx) => {
            return (
                <TimerItem key={idx} idx={idx} elm={el} />
            )
        });
    }, [timers]); // ,  bRender
    return (
        <div className={timerStyles.timerList}>{timersElements}</div>
    )
}

const TimerTabloid = () => {
    // const timersToDisplay = useSelector(MyStore.selTimersToDisplay);
    const timers = useSelector(MyStore.selTimers);
    const bRender = useSelector(MyStore.selRenderFlag);

    const renderTimersToDisplay = useMemo(() => {
        const res = timers.map((el, idx) => {
            return (
                el.displayStatus === MyStore.DISPLAY_STATUS_SHOW ? <TimerTabloidItem key={idx} elm={el} /> : null
            )
        })
        return res;
    }, [bRender]);

    return (
        <div className={timerStyles.timerTtabloid}>
            {renderTimersToDisplay}
        </div>
    )
}

const TimerTabloidItem = ({ elm }) => {

    return (
        <div className={timerStyles.timerTabloidItem}>{elm.name}: {elm.type !== MyStore.TYPE_STOPWATCH ? 'осталось' : 'прошло'} {elm.display}</div>
    )
}


export const TimerComponent = () => {
    return (
        <div className={timerStyles.timer}>
            <TimerList />
            <TimerTabloid />
        </div>
    )
}