import React from 'react';
import "./Timer.css";

export default function Timer({ timer }) {
  return (
    <div className='timer'>
        { timer }
    </div>
  )
}