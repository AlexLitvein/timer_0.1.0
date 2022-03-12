import './App.css';
import './reset.css';

import { useDispatch, useSelector } from 'react-redux';
import MyStore from './store';
import { useEffect, useMemo, useState } from 'react';
import { TimerComponent, TimerList } from './Timer';

function App() {

  // let now0 = Date.now();
  // let now = new Date(Date.now());
  // let date1 = new Date().getTime();
  // let date2 = JSON.stringify(now);
  // let res = new Date(date);
  // let tz = res.getTimezoneOffset();
  // res.setHours(res.getHours() - tz / 60);


  const dispatch = useDispatch();

  // const addEvent = () => {
  //   dispatch(MyStore.setAction(MyStore.ADD_TIMER, MyStore.createTimerObj(MyStore.TYPE_EVENT_OVER)));
  //   // dispatch(MyStore.setAction(MyStore.ADD_TIMER, MyStore.createTimerObj()));
  // }
  // const addStopwatch = () => {
  //   dispatch(MyStore.setAction(MyStore.ADD_TIMER, MyStore.createTimerObj()));
  // }
  useEffect(() => {
    dispatch(MyStore.setAction(MyStore.LOAD_STORE));

    const t1 = setInterval(() => {
      dispatch(MyStore.setAction(MyStore.TICK));
    }, 1000);
    
    window.addEventListener("beforeunload", () => {
      dispatch(MyStore.setAction(MyStore.SAVE_STORE));
    });

    // return () => {
    //   clearInterval(t1);
    //   dispatch(MyStore.setAction(MyStore.SAVE_STORE));
    //   console.log('like willUnmount');
    // }
  }, []);

  return (
    <div className="App">
      {/* {doRender} */}
      {/* <button onClick={addStopwatch}>Секундомер</button>
      <button onClick={addEvent}>Событие</button> */}
      <TimerComponent />
      {console.log('draw App')}
    </div>

  );
}

export default App;
