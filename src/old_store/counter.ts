// 1. 定义一个action type
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'

// 2. 定义一个action creator
export const increment = (num: number) => ({
  type: INCREMENT,
  payload: num,
})

export const decrement = (num: number) => ({
  type: DECREMENT,
  payload: num,
})

// 3. 定义一个初始状态
const initState = {
  value: 0,
};

// 4. 定义一个reducer
export const counter = (state = initState, action: Record<string, any>) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        value: state.value + action.payload
      }
    case DECREMENT:
      return {
        ...state,
        value: state.value - action.payload
      }
    default:
      return state
  }
}


