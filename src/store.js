import { createStore } from 'redux';

class MyStore {
<<<<<<< HEAD
  ADD_TIMER = 'ADD_TIMER';
  DEL_TIMER = 'DEL_TIMER';
  LOAD_STORE = 'LOAD_STORE';
  SAVE_STORE = 'SAVE_STORE';
  TICK = 'TICK';
  START_TIMER = 'START_TIMER';
  STOP_TIMER = 'STOP_TIMER';
  PAUSE_TIMER = 'PAUSE_TIMER';
  SHOW_TIMER = 'SHOW_TIMER';
  UPDATE_TIMERS = 'UPDATE_TIMERS';
  SET_SEL_ELM_IDX = 'SET_SEL_ELM_IDX';
  STOPED = 'Stopped';
  PAUSED = 'Paused';
  STARTED = 'Started';
  TYPE_STOPWATCH = 0;
  TYPE_EVENT_OVER = 1;
  TYPE_EVENT_AT = 2;
  DISPLAY_DEFAULT = '00:00:00';
  SHOW_PROGRESS = false;
  // DISPLAY_STATUS_SHOW = true;
  // SET_TIMER_END = 'SET_TIMER_END';
  // SET_TIMER_PARAMS = 'SET_TIMER_PARAMS';

  // держим в классе, чтобы видеть структуру объекта
  #initialState = {
    currSelElmIdx: 0,
    bRender: true,
    timers: [],
  };

  constructor() {
    this.store = createStore(this.reducer);
  }
  loadStore() {
    let store;
    const str = localStorage.getItem('my_timer');
    if (str) {
      store = JSON.parse(str);
    }
    return store;
  }
  saveStore(state) {
    localStorage.setItem('my_timer', JSON.stringify(state));
  }
  selTimers(store) {
    return store.timers;
  }
  selRenderFlag(store) {
    return store.bRender;
  }
  selCurrSelElmIdx(store) {
    return store.currSelElmIdx;
  }
  setAction(action, payload) {
    return {
      type: action,
      payload,
=======
    ADD_TIMER = 'ADD_TIMER';
    DEL_TIMER = 'DEL_TIMER';
    LOAD_STORE = 'LOAD_STORE';
    SAVE_STORE = 'SAVE_STORE';
    TICK = 'TICK';
    START_TIMER = 'START_TIMER';
    STOP_TIMER = 'STOP_TIMER';
    PAUSE_TIMER = 'PAUSE_TIMER';
    SHOW_TIMER = 'SHOW_TIMER';
    UPDATE_TIMERS = 'UPDATE_TIMERS';
    SET_SEL_ELM_IDX = 'SET_SEL_ELM_IDX';
    STOPED = 'Stopped';
    PAUSED = 'Paused';
    STARTED = 'Started';
    TYPE_STOPWATCH = 0;
    TYPE_EVENT_OVER = 1;
    TYPE_EVENT_AT = 2;
    DISPLAY_DEFAULT = '00:00:00';
    SHOW_PROGRESS = false;
    // DISPLAY_STATUS_SHOW = true;
    // SET_TIMER_END = 'SET_TIMER_END';
    // SET_TIMER_PARAMS = 'SET_TIMER_PARAMS';

    // держим в классе, чтобы видеть структуру объекта
    #initialState = {
        currSelElmIdx: 0,
        bRender: true,
        timers: [],
>>>>>>> 56aa5e9ebb5b4ab9dadaf3be04adfb69d20b7846
    };
  }
  addTimer = (state, timer) => {
    if (!timer.name) {
      if (timer.type === this.TYPE_STOPWATCH) {
        timer.name = 'timer ' + state.timers.length;
      } else {
        timer.name = 'event ' + state.timers.length;
      }
    }
    state.timers.push(timer);
  };
  stopTimer = (state, idx) => {
    const el = state.timers[idx];
    el.status = this.STOPED;
    el.dateString = this.DISPLAY_DEFAULT;
    if (el.type === this.TYPE_STOPWATCH) {
      el.date = 0;
    }
<<<<<<< HEAD
    // console.log("el:", el);
    // console.log("state.timers[idx]:", state.timers[idx]);
  };
  // setTimerParams = (state, params) => {
  //     const el = state.timers[params.idx];
  //     state.timers[params.idx] = { ...el, ...params };
  // }
  formatDate = (date) => {
    return (
      ('0' + (date.getHours() + date.getTimezoneOffset() / 60)).slice(-2) +
      ':' +
      ('0' + date.getMinutes()).slice(-2) +
      ':' +
      ('0' + date.getSeconds()).slice(-2)
    );
  };
  // getCurrSelElm=()=>{
  //     return
  // }
  // updateTimers() {
  //     return {
  //         type: this.UPDATE_TIMERS,
  //     };
  // }
  #tick(state) {
    console.log('tick');
    state.timers.forEach((el, idx, arr) => {
      let currDate = 0;
      if (el.status === this.STARTED) {
=======
    saveStore(state) {
        localStorage.setItem('my_timer', JSON.stringify(state));
    }
    selTimers(store) {
        return store.timers;
    }
    selRenderFlag(store) {
        return store.bRender;
    }
    selCurrSelElmIdx(store) {
        return store.currSelElmIdx;
    }
    setAction(action, payload) {
        return {
            type: action,
            payload,
        };
    }
    addTimer = (state, timer) => {
        if (!timer.name) {
            if (timer.type === this.TYPE_STOPWATCH) {
                timer.name = 'timer ' + state.timers.length;
            } else {
                timer.name = 'event ' + state.timers.length;
            }
        }
        state.timers.push(timer);
    }
    stopTimer = (state, idx) => {
        const el = state.timers[idx];
        el.status = this.STOPED;
        el.dateString = this.DISPLAY_DEFAULT;
>>>>>>> 56aa5e9ebb5b4ab9dadaf3be04adfb69d20b7846
        if (el.type === this.TYPE_STOPWATCH) {
          // если секундомер (stopwatch)
          el.date += 1000;
          currDate = new Date(el.date);
        } else {
          // event
          currDate = Date.now();
          let sub = new Date(el.date - Date.now());
          if (sub <= 0) {
            sub = 0;
            this.stopTimer(state, idx);
          }
          currDate = new Date(sub);
        }
<<<<<<< HEAD
        el.dateString = this.formatDate(currDate);
      }
    });
  }
  #updateTimers = (state) => {
    return { ...state, timers: [...state.timers] };
  };
  reducer = (state = this.#initialState, action) => {
    switch (action.type) {
      case this.ADD_TIMER:
        this.addTimer(state, action.payload);
        // state = { ...state, timers: [...state.timers] };
        // state = { ...state, bRender: !state.bRender };
        state = this.#updateTimers(state);
        break;
      case this.UPDATE_TIMERS:
        state = this.#updateTimers(state);
        break;
      case this.SET_SEL_ELM_IDX:
        // state.currSelElmIdx = state.timers[action.payload];
        // state = this.#updateTimers(state);
        state = { ...state, currSelElmIdx: action.payload };
        break;
      case this.SHOW_TIMER:
        // state = { ...state, timersToDisplay: [...state.timersToDisplay, action.payload] };
        state.timers[action.payload].showProgress = !state.timers[action.payload].showProgress;
        // state = { ...state, bRender: !state.bRender };
        // state = { ...state, timers: [...state.timers] };
        state = this.#updateTimers(state);
        break;
      case this.DEL_TIMER:
        state.timers.splice(action.payload, 1);
        // state = { ...state, bRender: !state.bRender };
        // state = { ...state, timers: [...state.timers] };
        state = this.#updateTimers(state);
        this.saveStore(state);
        break;
      case this.LOAD_STORE:
        // const oldStore = this.loadStore();
        // if (oldStore) {
        //   state = oldStore;
        // }
        state = this.loadStore() || state;
        break;
      case this.SAVE_STORE:
        this.saveStore(state);
        break;
      case this.START_TIMER:
        state.timers[action.payload].status = this.STARTED;
        // state = { ...state, bRender: !state.bRender };
        // state = { ...state, timers: [...state.timers] };
        state = this.#updateTimers(state);
        break;
      case this.STOP_TIMER:
        this.stopTimer(state, action.payload);
        // state = { ...state, timers: [...state.timers] };
        state = this.#updateTimers(state);
        break;
      case this.PAUSE_TIMER:
        state.timers[action.payload].status = this.PAUSED;
        // state = { ...state, timers: [...state.timers] };
        state = this.#updateTimers(state);
        break;
      // case this.SET_TIMER_PARAMS:
      // this.setTimerParams(state, action.payload);
      // state.timers[action.payload.idx].end = action.payload.date;
      // break;
      case this.TICK:
        this.#tick(state);
        state = { ...state, bRender: !state.bRender };
        break;
      default:
        break;
=======
        // console.log("el:", el);
        // console.log("state.timers[idx]:", state.timers[idx]);
    }
    // setTimerParams = (state, params) => {
    //     const el = state.timers[params.idx];
    //     state.timers[params.idx] = { ...el, ...params };
    // }
    formatDate = (date) => {
        return ('0' + (date.getHours() + date.getTimezoneOffset() / 60)).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
    }
    // getCurrSelElm=()=>{
    //     return 
    // }
    // updateTimers() {
    //     return {
    //         type: this.UPDATE_TIMERS,
    //     };
    // }
    #tick(state) {
        console.log('tick');
        state.timers.forEach((el, idx, arr) => {
            let currDate = 0;
            if (el.status === this.STARTED) {
                if (el.type === this.TYPE_STOPWATCH) { // если секундомер (stopwatch)
                    el.date += 1000;
                    currDate = new Date(el.date);
                } else { // event
                    currDate = Date.now();
                    let sub = new Date(el.date - Date.now());
                    if (sub <= 0) {
                        sub = 0;
                        this.stopTimer(state, idx);
                    }
                    currDate = new Date(sub);
                }
                el.dateString = this.formatDate(currDate);
            }
        });
    }
    #updateTimers = (state) => {
        return { ...state, timers: [...state.timers] };
    }
    reducer = (state = this.#initialState, action) => {
        switch (action.type) {
            case this.ADD_TIMER:
                this.addTimer(state, action.payload);
                // state = { ...state, timers: [...state.timers] };
                // state = { ...state, bRender: !state.bRender };
                state = this.#updateTimers(state);
                break;
            case this.UPDATE_TIMERS:
                state = this.#updateTimers(state);
                break;
            case this.SET_SEL_ELM_IDX:
                // state.currSelElmIdx = state.timers[action.payload];
                // state = this.#updateTimers(state);
                state = { ...state, currSelElmIdx: action.payload };
                break;
            case this.SHOW_TIMER:
                // state = { ...state, timersToDisplay: [...state.timersToDisplay, action.payload] };
                state.timers[action.payload].showProgress = !state.timers[action.payload].showProgress;
                // state = { ...state, bRender: !state.bRender };
                // state = { ...state, timers: [...state.timers] };
                state = this.#updateTimers(state);
                break;
            case this.DEL_TIMER:
                state.timers.splice(action.payload, 1);
                // state = { ...state, bRender: !state.bRender };
                // state = { ...state, timers: [...state.timers] };
                state = this.#updateTimers(state);
                this.saveStore(state);
                break;
            case this.LOAD_STORE:
                const oldStore = this.loadStore();
                if (oldStore) {
                    state = oldStore;
                }
                break;
            case this.SAVE_STORE:
                this.saveStore(state);
                break;
            case this.START_TIMER:
                state.timers[action.payload].status = this.STARTED;
                // state = { ...state, bRender: !state.bRender };
                // state = { ...state, timers: [...state.timers] };
                state = this.#updateTimers(state);
                break;
            case this.STOP_TIMER:
                this.stopTimer(state, action.payload);
                // state = { ...state, timers: [...state.timers] };
                state = this.#updateTimers(state);
                break;
            case this.PAUSE_TIMER:
                state.timers[action.payload].status = this.PAUSED;
                // state = { ...state, timers: [...state.timers] };
                state = this.#updateTimers(state);
                break;
            // case this.SET_TIMER_PARAMS:
            // this.setTimerParams(state, action.payload);
            // state.timers[action.payload.idx].end = action.payload.date;
            // break;
            case this.TICK:
                this.#tick(state);
                state = { ...state, bRender: !state.bRender };
                break;
            default:
                break;
        }
        return state;
>>>>>>> 56aa5e9ebb5b4ab9dadaf3be04adfb69d20b7846
    }
    return state;
  };

<<<<<<< HEAD
  createTimerObj(type = this.TYPE_STOPWATCH) {
    return {
      name: '',
      type: type,
      date: 0,
      timeOver: '',
      // end: endDate,
      // curr: 0,
      status: this.STOPED,
      showProgress: this.SHOW_PROGRESS,
      dateString: this.DISPLAY_DEFAULT,
    };
  }
=======
    createTimerObj(type = this.TYPE_STOPWATCH) {
        return {
            name: '',
            type: type,
            date: 0,
            timeOver: '',
            // end: endDate,
            // curr: 0,
            status: this.STOPED,
            showProgress: this.SHOW_PROGRESS,
            dateString: this.DISPLAY_DEFAULT,
        }
    }
>>>>>>> 56aa5e9ebb5b4ab9dadaf3be04adfb69d20b7846
}

export default new MyStore();
