import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyStore from './store';

const TimerHeader = ({ elm }) => {
    const [name, setName] = useState(elm.name);
    const changeName = (e) => {
        setName(e.target.value);
    }
    return <>
        <input name='name' type='text' value={name} onChange={changeName}></input>
    </>;
}

const ButtonControls = ({ elm }) => {
    // let cls; // btn-status
    return <>
        <button className={elm.status === 2 ? 'btn-status' : ''} name='start_btn' type='button'>start</button>
        {elm.type === MyStore.TYPE_STOPWATCH ? <button className={elm.status === 1 ? 'btn-status' : ''} name='pause_btn' type='button'>pause</button> : null}
        <button className={elm.status === 0 ? 'btn-status' : ''} name='stop_btn' type='button'>stop</button>
        <button name='del_btn' type='button'>del</button>
    </>;
}

const EventControls = ({ elm }) => {
    // const dispatch = useDispatch();
    const [selHow, setSelHow] = useState(elm.type);
    const [selOver, setSelOver] = useState(elm.date);
    const [selStart, setSelStart] = useState(createInputDate(elm));
    const changeHow = (e) => {
        setSelHow(e.target.value);
        // let date = new Date(el.target.value);
        // elm.end = undefined;
        // console.log(`${el.target.value} ${el.target.innerText}`);
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
        let date = elm.date || null;
        let res = new Date(date);
        res.setHours(res.getHours() - res.getTimezoneOffset() / 60);
        return res.toJSON().slice(0, 19);
    }
    const renderSelTime = () => {
        let res;
        // console.log(selStart);value={selOver} 
        if (selHow === '1') {
            res =
                <select name='choose_time' value={selOver} onChange={changeOver}>
                    <option value="5 s">5 сек</option>
                    <option value="10 s">10 сек</option>
                </select>
        } 
        if (selHow === '2') {
            res = <input name='choose_time' type='datetime-local' value={selStart} onChange={changeStart}></input>
        }
        return res;
    }

    return <>
        <label htmlFor="sel-start" >Произойдет&nbsp;&nbsp;</label>
        <select name='sel_start' id="sel-start" value = {selHow} onChange={changeHow}>
            <option value="1">через</option>
            <option value="2">в</option>
        </select>
        {renderSelTime()}
    </>;
}

const Timer = ({ idx, elm }) => {
    const dispatch = useDispatch();

    const click = (e) => {
        // e.preventDefault();
        // e.stopPropagation();

        const form = e.currentTarget;
        let date;
        let idx = parseInt(e.currentTarget.id);
        // console.log("el.currentTarget.name:", e.currentTarget.name);

        let startDateStr = form.elements.choose_time?.value;
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
                date = new Date(form.elements.choose_time.value)
            }
            dispatch(MyStore.setAction(MyStore.SET_TIMER_PARAMS, { name: form.elements.name.value, date: date, type: form.elements.sel_start.value, idx: idx }));
        }

        if (e.target.name === 'start_btn') {
            dispatch(MyStore.setAction(MyStore.START_TIMER, idx));
            // temp
            // MyStore.saveStore();
            // dispatch(MyStore.setAction(MyStore.SAVE_STORE));
        }
        if (e.target.name === 'pause_btn') {
            dispatch(MyStore.setAction(MyStore.PAUSE_TIMER, idx));
        }
        if (e.target.name === 'stop_btn') {
            dispatch(MyStore.setAction(MyStore.STOP_TIMER, idx));
        }
        if (e.target.name === 'del_btn') {
            dispatch(MyStore.setAction(MyStore.DEL_TIMER, idx));
        }
    }

    return (
        <form className='timer-elm' id={idx + '_timer'} onClick={click}>
            <TimerHeader elm={elm} />
            {elm.type !== MyStore.TYPE_STOPWATCH ? <EventControls elm={elm} /> : null}
            <ButtonControls elm={elm} />
            <span>{elm.type !== MyStore.TYPE_STOPWATCH ? 'осталось' : 'прошло'} {elm.display}</span>
        </form>
    );
}

// const Stopwatch = ({ idx, elm }) => {
//     return (
//         <div className='timer-elm'>
//             {/* <span>{elm.name}: </span> */}
//             <TimerHeader idx={idx} elm={elm} />

//             {/* <button id={idx + '_start'}>start</button>
//             <button id={idx + '_pause'}>pause</button>
//             <button id={idx + '_stop'}>stop</button> */}
//             <ButtonControls idx={idx} elm={elm} />
//             <span>прошло: {elm.display}</span>
//         </div>
//     );
// }

// const Event = ({ idx, elm }) => {
//     const [selOver, setSelOver] = useState('0');
//     const [selStart, setSelStart] = useState(createInputDate());
//     const changeOver = (el) => {
//         // console.log(el.target.value);
//         setSelOver(el.target.value);
//         // console.log(selStart);
//     }
//     const changeStart = (el) => {
//         setSelStart(el.target.value);
//     }
//     function createInputDate() {
//         let res = new Date();
//         res.setHours(res.getHours() - res.getTimezoneOffset() / 60);
//         return res.toJSON().slice(0, 19);
//     }


//     const renderSelTime = () => {
//         let res;
//         // console.log(selStart);

//         if (selOver === '0') {
//             res =
//                 <select id="choose-time" >
//                     <option value="s">5 сек</option>
//                     <option value="m">1 мин</option>
//                 </select>
//         } else {
//             res = <input id="sel-time" type='datetime-local' value={selStart} onChange={changeStart}></input>
//         }
//         return res;
//     }

//     return (
//         <div className='timer-elm'>
//             <span>{elm.name}: </span>
//             <label htmlFor="sel-start" >Произойдет&nbsp;&nbsp;</label>
//             <select id="sel-start" onChange={changeOver}>
//                 <option value="0">через</option>
//                 <option value="1">в</option>
//             </select>
//             {renderSelTime()}
//             <button id={idx + '_start'}>start</button>
//             <button id={idx + '_stop'}>stop</button>
//             <span>осталось: {elm.display}</span>
//         </div>
//     )
// }

export const TimerList = () => {
    // const dispatch = useDispatch();
    const timers = useSelector(MyStore.selTimers);
    const bRender = useSelector(MyStore.selRenderFlag);

    // const click = (el) => {
    //     // console.log(el.target);
    //     // console.log(`${el.target.id} ${el.target.className}`);
    //     let idx = parseInt(el.target.id);
    //     if (el.target.tagName === 'BUTTON') {
    //         // console.log(idx);
    //         if (el.target.id.includes('start')) {
    //             dispatch(MyStore.setAction(MyStore.START_TIMER, idx));
    //         }
    //         if (el.target.id.includes('pause')) {
    //             dispatch(MyStore.setAction(MyStore.PAUSE_TIMER, idx));
    //         }
    //         if (el.target.id.includes('stop')) {
    //             dispatch(MyStore.setAction(MyStore.STOP_TIMER, idx));
    //         }
    //     }
    // }

    const timersElements = useMemo(() => {
        return timers.map((el, idx) => {
            // let comp;
            // if (el.type === MyStore.TYPE_EVENT) {
            //     comp = <Event key={idx} idx={idx} elm={el} />
            // } else {
            //     comp = <Stopwatch key={idx} idx={idx} elm={el} />
            // }
            // console.log(el);
            return (
                // comp
                <Timer key={idx} idx={idx} elm={el} />
            )
        });
    }, [timers, bRender]); // 
    return (
        // <div onClick={click}>{timersElements}</div>
        <div>{timersElements}</div>
    )
}