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
    #tick(state) {
        console.log('tick');

        state.timers.forEach((el, idx, arr) => {
            // console.log(el);

            // switch (el.status) {
            //     case this.STARTED:
            //         arr[idx].start += 1000;
            //         break;
            //     default:
            //         break;
            // }
            // let currDate = new Date(arr[idx].start);
            // arr[idx].display = ('0' + (currDate.getHours() + currDate.getTimezoneOffset() / 60)).slice(-2) + ':' + ('0' + currDate.getMinutes()).slice(-2) + ':' + ('0' + currDate.getSeconds()).slice(-2);

            let currDate = 0;
            if (el.status === this.STARTED) {
                // console.log('STARTED');
                if (el.end === 0) { // если секундомер
                    arr[idx].start += 1000;
                    currDate = new Date(arr[idx].start);
                } else { // stopwatch
                    arr[idx].end -= 1000;
                    let sub = new Date(arr[idx].end - arr[idx].start);
                    if (sub <= 0) {
                        sub = 0;
                        arr[idx].status = this.STOPED;
                    }
                    currDate = new Date(sub);
                }

                // let currDate = new Date(Date.now() - el.start);
                arr[idx].display = ('0' + (currDate.getHours() + currDate.getTimezoneOffset() / 60)).slice(-2) + ':' + ('0' + currDate.getMinutes()).slice(-2) + ':' + ('0' + currDate.getSeconds()).slice(-2);
                // `${currDate.getHours()}:${currDate.getMinutes()}:${currDate.getSeconds()}`
            }


        });
    }
    reducer = (state = this.#initialState, action) => {
        switch (action.type) {
            case this.ADD_TIMER:
                state = { ...state, timers: [...state.timers, action.payload] };
                break;
            case this.LOAD_STORE:
                state = action.payload;
                break;
            case this.START_TIMER:
                state.timers[action.payload].status = this.STARTED;
                state = { ...state, bRender: !state.bRender };
                break;
            case this.STOP_TIMER:
                state.timers[action.payload].status = this.STOPED;
                // state = { ...state, bRender: !state.bRender };
                break;
            case this.PAUSE_TIMER:
                state.timers[action.payload].status = this.PAUSED;
                // state = { ...state, bRender: !state.bRender };
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

    createTimerObj(startDate = 0, endDate = 0, name = 'timer-' + Date.now()) {
        return {
            name: name,
            start: startDate,
            end: endDate,
            curr: 0,
            status: this.STOPED,
            display: '00:00:00',
        }
    }
}

export default new MyStore();
// export default new MyStore();
// export const MyStore = createStore(reducer);