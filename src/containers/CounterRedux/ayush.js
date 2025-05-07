import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment ,decrement } from '../../redux/slices/ayush'


export const AyushRedux = () => {
  const ayush = useSelector((state) => state?.ayush?.ayushvalue)
  const count = useSelector((state) => state?.counter?.value)
  const name = useSelector((state) => state)
  const dispatch = useDispatch()
    console.log('state',name);
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{ayush}, Conuter Value = {count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}