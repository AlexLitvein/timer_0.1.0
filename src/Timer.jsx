import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyStore from './store';

const TimerHeader = ({ idx, elm }) => {
    const [name, setName] = useState(elm.name);
    const changeName = (el) => {
        setName(el.target.value);
    }
    return <>
        <input id={idx + '_name'} type='text' value={name} onChange={changeName}></input>
    </>;
}

const ButtonControls = ({ idx, elm }) => {
    return <>
        <button id={idx + '_start'}>start</button>
        {elm.type === MyStore.TYPE_STOPWATCH ? <button id={idx + '_pause'}>pause</button> : null}
        <button id={idx + '_stop'}>stop</button>
    </>;
}

const EventControls = ({ idx, elm }) => {
    const dispatch = useDispatch();
    const [selHow, setSelHow] = useState('0');
    const [selStart, setSelStart] = useState(createInputDate());
    const changeHow = (el) => {
        setSelHow(el.target.value);
        // let date = new Date(el.target.value);
        // elm.end = undefined;
        // console.log(`${el.target.value} ${el.target.innerText}`);
    }
    const changeStart = (el) => {
        setSelStart(el.target.value);
        let date = new Date(el.target.value);
        // console.log(date);
        dispatch(MyStore.setAction(MyStore.SET_TIMER_END, { idx: idx, date: date }));
    }
    const changeOver = (el) => {
        let n = parseInt(el.target.innerText);
        let mul = 1000;
        if (el.target.value === 'm') {
            mul = 60000;
        }
        if (el.target.value === 'h') {
            mul = 3600000;
        }
        dispatch(MyStore.setAction(MyStore.SET_TIMER_END, { idx: idx, date: n * mul }));
        // console.log(el.target);
        // console.log(`${el.target.value} ${el.target.innerText}`);
    }
    function createInputDate() {
        let res = new Date();
        res.setHours(res.getHours() - res.getTimezoneOffset() / 60);
        return res.toJSON().slice(0, 19);
    }
    const renderSelTime = () => {
        let res;
        // console.log(selStart);
        if (selHow === '0') {
            res =
                <select id={idx + '_choose-time'} onChange={changeOver}>
                    <option value="s">5 сек</option>
                    <option value="s">10 сек</option>
                </select>
        } else {
            res = <input id={idx + '_sel-time'} type='datetime-local' value={selStart} onChange={changeStart}></input>
        }
        return res;
    }

    return <>
        <label htmlFor="sel-start" >Произойдет&nbsp;&nbsp;</label>
        <select id="sel-start" onChange={changeHow}>
            <option value="0">через</option>
            <option value="1">в</option>
        </select>
        {renderSelTime()}
    </>;
}

const Timer = ({ idx, elm }) => {
    return (
        <div className='timer-elm'>
            <TimerHeader idx={idx} elm={elm} />
            {elm.type === MyStore.TYPE_EVENT ? <EventControls idx={idx} elm={elm} /> : null}
            <ButtonControls idx={idx} elm={elm} />
            <span>{elm.type === MyStore.TYPE_EVENT ? 'осталось' : 'прошло'} {elm.display}</span>
        </div>
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
    const dispatch = useDispatch();
    const timers = useSelector(MyStore.selTimers);
    const bRender = useSelector(MyStore.selRenderFlag);

    const click = (el) => {
        // console.log(el.target);
        // console.log(`${el.target.id} ${el.target.className}`);
        let idx = parseInt(el.target.id);
        if (el.target.tagName === 'BUTTON') {
            // console.log(idx);
            if (el.target.id.includes('start')) {
                dispatch(MyStore.setAction(MyStore.START_TIMER, idx));
            }
            if (el.target.id.includes('pause')) {
                dispatch(MyStore.setAction(MyStore.PAUSE_TIMER, idx));
            }
            if (el.target.id.includes('stop')) {
                dispatch(MyStore.setAction(MyStore.STOP_TIMER, idx));
            }
        }
    }

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
        <div onClick={click}>{timersElements}</div>
    )
}