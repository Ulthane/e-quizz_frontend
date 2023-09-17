// Librairie
import React from 'react';
import './PlayerCard.css';

export default function PlayerCard({ text, host }) {

  return (
    <div className='col-5 mt-4 mx-4'>
        <div className='cardPlayer'>
            <span className={text === "En attente de joueur..." ? "text-secondary" : null}>{text}</span>
            <div className={host ? 'host': null}></div>
        </div>
    </div>
  )
}