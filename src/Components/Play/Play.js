// Librairie
import React, { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

// Component
import PlayerCard from './PlayerCard/PlayerCard';

// CSS
import './Play.css';

export default function Play({ roomInfo, response, setResponse }) {

    const [toPlay, setToPlay] = useState(false);
     
    const clickResponse = (e) => {
        if (!toPlay) {
            setResponse(e.target.value);
            setToPlay(true);
        }
    }

    const responseZone = roomInfo.question.propositions.map((proposition, index) => {

        return (
            <div className='col-6 m-0 p-0 text-center' key={index}>
                
                <button type="button" 
                disabled={toPlay && response !== proposition ? true : false} 
                value={proposition} 
                onClick={(e) => clickResponse(e)} 
                className={proposition === response ? `responseBtn response_${index} selected` : `responseBtn response_${index}`}>
                    {proposition}
                </button>
                
            </div>
        )
    })

  return (
    <>
        {/* EN-tete qui contient les joueurs */}
        <div className='row mb-5'>
            <div className='d-flex justify-content-center'>

            {roomInfo.players.map((player, index) => (
                <div key={index}>
                    {player.name !== "En attente de joueur..." && <PlayerCard player={player} />}
                </div>
            ))}
            </div>
        </div>

        <div className='row'>
            <h1 className='mb-5 category text-center'>{roomInfo.question.category}</h1>
        </div>

        <div className='row'>
            <div className='d-flex justify-content-center flex-wrap'>
                <div className='infoCard play col-8'>

                    <h3 id='question' className='text-white text-center my-4'>{roomInfo.question.question}</h3>
                    <div className='row'>
                        {responseZone}
                    </div>

                    <div className='row mt-4'>
                        <div className='d-flex justify-content-between'>
                            <div className='nbQuestion'>
                                <h1>{roomInfo.remainingQuestion}</h1>
                            </div>
                            <div className={['difficulty', roomInfo.difficulty === "Débutant" ? "easy" : (roomInfo.difficulty === "Confirmé" ? "medium" : "hard")].join(" ")}>
                                <h1>{roomInfo.difficulty}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='row'>
            <div className='d-flex justify-content-center mt-4'>

            <CountdownCircleTimer
                isPlaying
                duration={15}
                size={100}
                strokeWidth={8}
                colors={['#fd695e']}
                >
                {({ remainingTime }) => <span className='text-white fs-3 fw-bold'>{remainingTime}</span>}
            </CountdownCircleTimer>
            </div>
        </div>
    </>
  )
}