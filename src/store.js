import { createStore } from 'redux';

// const ADD_VAL = 'ADD_VAL';

// const initialState = {
//     a: 2,
//     b: 0,
// };

// export function setVal(payload) {
//     return {
//         type: ADD_VAL,
//         payload,
//     };
// }

// export function selValA(store) {
//     return store.a;
// }

// function reducer(state = initialState, action) {
//     switch (action.type) {
//         case ADD_VAL:
//             state = { ...state, a: state.a + action.payload };
//             break;

//         default:
//             break;
//     }
//     return state;
// }

// function createTimerObj(startDate, endDate, name = 'timer-' + Date.now()) {
//     return {
//         name: name,
//         start: startDate,
//         end: endDate,
//         curr: 0,
//     }
// }

class MyStore {
    ADD_TIMER = 'ADD_TIMER';
    LOAD_STORE = 'LOAD_STORE';
    TICK = 'TICK';
    START_TIMER = 'START_TIMER';
    STOP_TIMER = 'STOP_TIMER';
    PAUSE_TIMER = 'PAUSE_TIMER';
    STOPED = 0;
    PAUSED = 1;
    STARTED = 2;
    TYPE_STOPWATCH = 0;
    TYPE_EVENT = 1;
    DISPLAY_DEFAULT = '00:00:00';
    // SET_TIMER_END = 'SET_TIMER_END';
    SET_TIMER_PARAMS = 'SET_TIMER_PARAMS';

    // держим в классе, чтобы видеть структуру объекта
    #initialState = {
        bRender: true,
        timers: []
    };

    constructor() {
        this.store = createStore(this.reducer);
    }
    selTimers(store) {
        return store.timers;
    }
    selRenderFlag(store) {
        return store.bRender;
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
        el.display = this.DISPLAY_DEFAULT;
        if (el.type === this.TYPE_STOPWATCH) {
            el.start = 0;
        }
    }
    setTimerParams = (state, params) => {
        const el = state.timers[params.idx];
        el.name = params.name;
        el.date = params.date;
        // if (el.type === this.TYPE_STOPWATCH) {
        //     el.start = 0;
        // }
        // el.end = date;
    }
    formatDate = (date) => {
        return ('0' + (date.getHours() + date.getTimezoneOffset() / 60)).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
    }
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
                el.display = this.formatDate(currDate);
            }
        });
    }
    reducer = (state = this.#initialState, action) => {
        switch (action.type) {
            case this.ADD_TIMER:
                this.addTimer(state, action.payload);
                state = { ...state, timers: [...state.timers] };
                break;
            case this.LOAD_STORE:
                state = action.payload;
                break;
            case this.START_TIMER:
                state.timers[action.payload].status = this.STARTED;
                state = { ...state, bRender: !state.bRender };
                break;
            case this.STOP_TIMER:
                this.stopTimer(state, action.payload);
                break;
            case this.PAUSE_TIMER:
                state.timers[action.payload].status = this.PAUSED;
                break;
            case this.SET_TIMER_PARAMS:
                this.setTimerParams(state, action.payload);
                // state.timers[action.payload.idx].end = action.payload.date;
                break;
            case this.TICK:
                this.#tick(state);
                state = { ...state, bRender: !state.bRender };
                break;
            default:
                break;
        }
        return state;
    }

    // createTimerObj(name = '', date = 0, type = this.TYPE_STOPWATCH,) {
    //     return {
    //         name: name,
    //         type: type,
    //         date: date,
    //         // start: startDate,
    //         // end: endDate,
    //         // curr: 0,
    //         status: this.STOPED,
    //         display: this.DISPLAY_DEFAULT,
    //     }
    // }
    createTimerObj(type = this.TYPE_STOPWATCH) {
        return {
            name: '',
            type: type,
            date: 0,
            // start: startDate,
            // end: endDate,
            // curr: 0,
            status: this.STOPED,
            display: this.DISPLAY_DEFAULT,
        }
    }
}

export default new MyStore();
