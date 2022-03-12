import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardList, CardViewer } from './components/CardViewer/CardViewer';
import MyStore from './store';
import timerStyles from './Timer.module.css'

const TimerHeader = ({ elm }) => {
    const [name, setName] = useState(elm.name);
    const changeName = (e) => {
        // e.preventDefault();
        setName(e.target.value);
    }
    return <>
        <input name='name' className={timerStyles.timerNameInput} type='text' value={name} onChange={changeName}></input>

    </>;
}

const ButtonControls = ({ idx, elm }) => {
    const dispatch = useDispatch();
    const addEvent = () => {
        dispatch(MyStore.setAction(MyStore.ADD_TIMER, MyStore.createTimerObj(MyStore.TYPE_EVENT_OVER)));
    }
    const addStopwatch = () => {
        dispatch(MyStore.setAction(MyStore.ADD_TIMER, MyStore.createTimerObj()));
    }
    return <div className={timerStyles.timerControlButtons}>
        <button onClick={addStopwatch}>Секундомер</button>
        <button onClick={addEvent}>Событие</button>
        <button >start</button>
        {/* {elm.type === MyStore.TYPE_STOPWATCH ? <button >pause</button> : null} */}
        {elm.type === MyStore.TYPE_STOPWATCH && <button >pause</button>}
        <button >stop</button>
        <button >del</button>
        <button >show</button>
    </div>;
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
            res = <><br /><input name='time_over' type='datetime-local' value={selStart} onChange={changeStart}></input></>
        }
        return res;
    }

    return <div className={timerStyles.eventControls}>
        <label htmlFor="sel_how" >Произойдет&nbsp;&nbsp;</label>
        <select name='sel_how' id="sel_how" value={selHow} onChange={changeHow}>
            <option value="1">через</option>
            <option value="2">в</option>
        </select>
        {renderSelTime()}
    </div>;
}

const TimerItem = ({ idx, elm, select, onClick }) => {
    // const dispatch = useDispatch();

    // const saveParams = (form) => {
    //     let date;
    //     let startDateStr = form.elements.time_over?.value;
    //     if (startDateStr) { // event
    //         let strArr = startDateStr.split(' ');
    //         if (strArr.length === 2) { // over date input
    //             let n = parseInt(strArr[0]);
    //             let mul = 1000;
    //             if (strArr[2] === 'm') {
    //                 mul = 60000;
    //             }
    //             if (strArr[2] === 'h') {
    //                 mul = 3600000;
    //             }
    //             date = Date.now() + (n * mul);
    //         } else {
    //             date = new Date(form.elements.time_over.value).getTime();
    //         }
    //         dispatch(MyStore.setAction(MyStore.SET_TIMER_PARAMS, { name: form.elements.name.value, date: date, type: +form.elements.sel_how.value, idx: idx, timeOver: form.elements.time_over.value }));
    //     } else {
    //         dispatch(MyStore.setAction(MyStore.SET_TIMER_PARAMS, { name: form.elements.name.value, idx: idx }));
    //     }

    // }
    // const onClickDel = () => {
    //     if (window.confirm("Удалить?")) {
    //         dispatch(MyStore.setAction(MyStore.DEL_TIMER, idx));
    //     }
    // }
    const click = (e) => {
        onClick(idx);
        // dispatch(MyStore.setAction(MyStore.SET_SEL_ELM_IDX, idx));
        // console.log("TimerItem click:", idx);

        // e.preventDefault();
        // e.stopPropagation();


        // let idx = parseInt(e.currentTarget.id);
        // if (e.target.name === 'start_btn') {
        //     saveParams(e.currentTarget); // form
        //     dispatch(MyStore.setAction(MyStore.START_TIMER, idx));
        // }
        // if (e.target.name === 'pause_btn') {
        //     dispatch(MyStore.setAction(MyStore.PAUSE_TIMER, idx));
        // }
        // if (e.target.name === 'stop_btn') {
        //     dispatch(MyStore.setAction(MyStore.STOP_TIMER, idx));
        // }
        // if (e.target.name === 'del_btn') {
        //     onClickDel();
        // }
        // if (e.target.name === 'show_btn') {
        //     dispatch(MyStore.setAction(MyStore.SHOW_TIMER, idx));
        // }
    }
    // const formSubmit = (e) => {
    //     e.preventDefault();
    // }
    // timerItemSel onSubmit={formSubmit}
    return (

        <div className={!select ? timerStyles.timerListItem : timerStyles.timerListItem + ' ' + timerStyles.timerItemSel} onClick={click} >
            <TimerHeader elm={elm} />
            {elm.type !== MyStore.TYPE_STOPWATCH ? <EventControls elm={elm} /> : null}
            <span>Статус: {elm.status}</span>

            {/* {console.log("timerStyles.timerListItem:", timerStyles.timerListItem) } */}
        </div>
    );
}

export const TimerList = () => {
    const dispatch = useDispatch();
    const timers = useSelector(MyStore.selTimers);
    const currSelElmIdx = useSelector(MyStore.selCurrSelElmIdx);
    // const bRender = useSelector(MyStore.selRenderFlag);
    // const addEvent = () => {
    //     dispatch(MyStore.setAction(MyStore.ADD_TIMER, MyStore.createTimerObj(MyStore.TYPE_EVENT_OVER)));
    //     // dispatch(MyStore.setAction(MyStore.ADD_TIMER, MyStore.createTimerObj()));
    // }
    // const addStopwatch = () => {
    //     dispatch(MyStore.setAction(MyStore.ADD_TIMER, MyStore.createTimerObj()));
    // }

    const click = (idx) => {
        dispatch(MyStore.setAction(MyStore.SET_SEL_ELM_IDX, idx));
    }

    const timersElements = useMemo(() => {
        return timers.map((el, idx) => {
            return (
                <TimerItem key={idx} idx={idx} elm={el} select={currSelElmIdx === idx} onClick={click} />
            )
        });
    }, [timers, currSelElmIdx]); // ,  bRender

    return (
        <div className={timerStyles.timerList}>
            {timersElements}
        </div>
    )
}

export const TimerControlPanel = () => {
    // const [currSelItemIdx, setCurrSelItemIdx] = useState(0);
    // const [currSelElmIdx, setCurrSelElmIdx] = useState(0);


    // const selItem = (idx) => {
    //     setCurrSelElmIdx(idx);
    // }
    return (
        <div className={timerStyles.timerControlPanel}>
            <ButtonControls idx={0} elm={0} />
            <TimerList />
        </div>

    )
}

const TimerTabloid = () => {
    const timers = useSelector(MyStore.selTimers);
    // const bRender = useSelector(MyStore.selRenderFlag);

    const renderTimersToDisplay = useMemo(() => {
        const res = timers.map((el, idx) => {
            return (
                el.showProgress === MyStore.DISPLAY_STATUS_SHOW ? <TimerTabloidItem key={idx} elm={el} /> : null
            )
        })
        return res;
    }, [timers]); // , bRender

    return (
        <div className={timerStyles.timerTtabloid}>
            {/* <CardViewer list={renderTimersToDisplay} /> */}
            {renderTimersToDisplay}
        </div>
    )
}

const TimerTabloidItem = ({ elm }) => {

    return (
        <div className={timerStyles.timerTabloidItem}>{elm.name}: {elm.type !== MyStore.TYPE_STOPWATCH ? 'осталось' : 'прошло'} {elm.dateString}</div>
    )
}


export const TimerComponent = () => {
    return (
        <div className={timerStyles.timer}>
            <TimerControlPanel />
            <TimerTabloid />
        </div>
    )
}