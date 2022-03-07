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
    return <>
        <button name='start_btn'>start</button>
        {elm.type === MyStore.TYPE_STOPWATCH ? <button name='pause_btn'>pause</button> : null}
        <button name='stop_btn'>stop</button>
    </>;
}

const EventControls = () => {
    // const dispatch = useDispatch();
    const [selHow, setSelHow] = useState('0');
    const [selOver, setSelOver] = useState('s');
    const [selStart, setSelStart] = useState(createInputDate());
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

    function createInputDate() {
        let res = new Date();
        res.setHours(res.getHours() - res.getTimezoneOffset() / 60);
        return res.toJSON().slice(0, 19);
    }
    const renderSelTime = () => {
        let res;
        // console.log(selStart);value={selOver} 
        if (selHow === '0') {
            res =
                <select name='choose_time' onChange={changeOver}>
                    <option value="s">5 сек</option>
                    <option value="s">10 сек</option>
                </select>
        } else {
            res = <input name='choose_time' type='datetime-local' value={selStart} onChange={changeStart}></input>
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
    const dispatch = useDispatch();

    const click = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        let date;
        // console.log(el.target);
        // console.log(`${el.target.id} ${el.target.className}`);
        let idx = parseInt(e.currentTarget.id);
        // console.log("el.currentTarget.name:", e.currentTarget.name);
        // console.log("el.target.name:", e.target.name);

        let dateStr = form.elements.choose_time.value;
        if (dateStr.length === 1) { // over date input
            let n = parseInt(form.elements.choose_time.innerText);

            console.log("n", n);

            let mul = 1000;
            if (dateStr === 'm') {
                mul = 60000;
            }
            if (dateStr === 'h') {
                mul = 3600000;
            }
            date = Date.now() + (n * mul);
        } else {
            date = new Date(dateStr)
        }

        dispatch(MyStore.setAction(MyStore.SET_TIMER_PARAMS, { name: form.elements.name.value, date: date, idx: idx }));

        // console.log("form.elements.name:", form.elements.name);
        // if (e.target.tagName === 'BUTTON') {
        // console.log(idx);

        if (e.target.name === 'start_btn') {
            dispatch(MyStore.setAction(MyStore.START_TIMER, idx));
        }
        if (e.target.name === 'pause_btn') {
            dispatch(MyStore.setAction(MyStore.PAUSE_TIMER, idx));
        }
        if (e.target.name === 'stop_btn') {
            dispatch(MyStore.setAction(MyStore.STOP_TIMER, idx));
        }
        // }
    }

    return (
        <form className='timer-elm' id={idx + '_timer'} onClick={click}>
            <TimerHeader elm={elm} />
            {elm.type === MyStore.TYPE_EVENT ? <EventControls/> : null}
            <ButtonControls elm={elm} />
            <span>{elm.type === MyStore.TYPE_EVENT ? 'осталось' : 'прошло'} {elm.display}</span>
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