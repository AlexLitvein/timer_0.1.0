import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyStore from './store';

export const Timer = ({ idx, elm }) => {

    return (
        <div className='timer-elm'>
            <span>{elm.name}: </span>
            <span>{elm.display}</span>
            {/* <span>{elm.status}</span> */}
            {/* <button className='start' id={idx}>start</button>
            <button className='pause' id={idx}>pause</button>
            <button className='stop' id={idx}>stop</button> */}
            <button id={idx + '_start'}>start</button>
            <button id={idx + '_pause'}>pause</button>
            <button id={idx + '_stop'}>stop</button>
        </div>
    )
}

export const TimerList = () => {
    const dispatch = useDispatch();
    const timers = useSelector(MyStore.selTimers);
    const bRender = useSelector(MyStore.selRenderFlag);

    const click = (el) => {
        // console.log(`${el.target.id} ${el.target.className}`);
        let idx = parseInt(el.target.id);        
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

    const timersElements = useMemo(() => {
        return timers.map((el, idx) => {
            // console.log(el);
            return (
                <Timer key={idx} idx={idx} elm={el} />
                // <div key={idx}>{el.name}</div>
            )
        });
    }, [timers, bRender]); // 
    return (
        <div onClick={click}>{timersElements}</div>
    )
}