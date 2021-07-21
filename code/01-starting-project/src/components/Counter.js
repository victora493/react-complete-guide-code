import { useSelector, useDispatch  } from 'react-redux';
import classes from './Counter.module.css';

const Counter = () => {
  const dispatch = useDispatch()
  const counter = useSelector(state => state.counter)
  const show = useSelector(state => state.showCounter)

  const incrementCounterHandler = () => {
    dispatch({type: 'increment'})
  };

  const increaseCounterHandler = () => {
    dispatch({type: 'increaseByAmount', amount: 5})
  };

  const decrementCounterHandler = () => {
    dispatch({type: 'decrement'})
  };

  const toggleCounterHandler = () => {
    dispatch({type: 'toggle'})
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
