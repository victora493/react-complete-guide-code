import { useSelector, useDispatch  } from 'react-redux';
import classes from './Counter.module.css';
import { counterActions } from '../store/counter-slice'

const Counter = () => {
  const dispatch = useDispatch()
  const counter = useSelector(state => state.counter.counter)
  const show = useSelector(state => state.counter.showCounter)

  const incrementCounterHandler = () => {
    dispatch(counterActions.increment())
  };

  const increaseCounterHandler = () => {
    dispatch(counterActions.increase(5))
  };

  const decrementCounterHandler = () => {
    dispatch(counterActions.decrement())
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter())
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div className="buttons">
        <button onClick={decrementCounterHandler}>decrement</button>
        <button onClick={increaseCounterHandler}>increase by 5</button>
        <button onClick={incrementCounterHandler}>increment</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
