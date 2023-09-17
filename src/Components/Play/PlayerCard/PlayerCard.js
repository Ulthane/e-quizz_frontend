// Librairie
import React from 'react';

// CSS
import './PlayerCard.css';

export default function PlayerCard({ player }) {

    function limit (string = '', limit = 0) {
        const newString = string.substring(0, limit)

        if (string.length > limit) {
            return newString + "..."
        }

        return newString
    }

  return (
    <div className={['bgPlayer text-white text-center mx-4 mt-3', player.rank === 1 ? "gold" : (player.rank === 2 ? "silver" : (player.rank === 3 ? "bronze" : null))].join(" ")}>
        <div className='d-flex flex-column mb-3'>
            <div className='mb-auto'>
                {limit(player.name, 14)}
            </div>
            <div className='fw-bold fs-3'>
                {player.score}
            </div>
        </div>
    </div>
  )
}
