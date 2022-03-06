import './App.css';

import { useDispatch, useSelector } from 'react-redux';
// import { selValA, setVal} from './store';
import MyStore from './store';
import { useEffect, useMemo, useState } from 'react';
import { TimerList } from './Timer';
// import { Timer } from './Timer';


// const state = {
//   bRender: true,
//   timers: [1]
// };

function App() {
  const dispatch = useDispatch();


  const click = () => {
    // dispatch(MyStore.setAction(MyStore.ADD_TIMER, MyStore.createTimerObj(Date.now(), Date.now() + 6000)));
    dispatch(MyStore.setAction(MyStore.ADD_TIMER, MyStore.createTimerObj()));
  }

  useEffect(() => {
    // dispatch(MyStore.setAction(MyStore.LOAD_STORE, state));
    const t1 = setInterval(() => {
      dispatch(MyStore.setAction(MyStore.TICK));
    }, 1000);
    // console.log('LOAD_STORE');

    return () => {
      clearInterval(t1);
      console.log('like willUnmount');
    }
  }, []);

  // const timersElements = useMemo(() => {
  //   return timers.map((el, idx) => {
  //     // console.log(el);
  //     return (
  //       <Timer key={idx} elm={el} />
  //       // <div key={idx}>{el.name}</div>
  //     )
  //   });
  // }, [timers, bRender]); // 

  return (
    <div className="App">
      {/* {doRender} */}
      <button onClick={click}>clk</button>
      <TimerList />
      {/* <div>{timersElements}</div> */}
      {console.log('draw App')}
    </div>

  );
}

export default App;
