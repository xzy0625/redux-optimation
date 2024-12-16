import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './old_store'
import { decrement, increment } from './old_store/counter';

function App() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>使用原始的redux</h1>
      { count }
      <div>
        <button onClick={() => dispatch(increment(1))}>+1</button>
      </div>
      <div>
        <button onClick={() => dispatch(decrement(1))}>-1</button>
      </div>
    </div>
  )
}

export default App
