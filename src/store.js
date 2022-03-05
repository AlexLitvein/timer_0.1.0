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
        state.timers.forEach((el, idx, arr) => {
            // arr[idx] = el + 1;
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
            case this.TICK:
                console.log('TICK');
                this.#tick(state);
                state = { ...state, bRender: !state.bRender };
                break;
            default:
                break;
        }
        return state;
    }

    createTimerObj(startDate, endDate = 0, name = 'timer-' + Date.now()) {
        return {
            name: name,
            start: startDate,
            end: endDate,
            curr: 0,
        }
    }
}

export default new MyStore();
// export default new MyStore();
// export const MyStore = createStore(reducer);