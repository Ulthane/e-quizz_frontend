import React, { useEffect, useState } from 'react';
// import Confetti from '../Confetti/Confetti';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti';

export default function Finish({ playerName, roomInfo }) {

    const [message, setMessage] = useState("PENDING");
    const [image, setImage] = useState("PENDING");
    const [winner, setWinner] = useState(false);

    const { width, height } = useWindowSize()

    useEffect(() => {

        roomInfo.players.forEach(p => {
            if (p.name === playerName) {
                switch (p.rank) {
                    case 1:
                        setMessage("Bravo, vous êtes 1er !");
                        setImage("gold");
                        setWinner(true);
                        break;
                    case 2:
                        setMessage("Bravo, vous êtes 2eme !");
                        setImage("silver");
                        setWinner(true);
                        break;
                    case 3:
                        setMessage("Bravo, vous êtes 3eme !");
                        setImage("bronze");
                        setWinner(true);
                        break;
                    default:
                        setMessage("Dommage, vous avez perdu !");
                        setImage("poo");
                        break;
                }
            }
        });

    }, [roomInfo, playerName]);

  return (
        <div className='d-flex justify-content-center align-items-center flex-column h-100 text-white'>
            <div className='fs-2'>
                {message}
            </div>
            <div>
                {winner ? <Confetti width={width} height={height} /> : null}
            </div>
            <div className='my-5'>
                <img src={`./assets/images/${image}-trophy.png`} alt='Trophée en or' width='175' />
            </div>
            <div className='fs-5'>
                Retour au lobby dans {roomInfo.timer}
            </div>
        </div>
  )
}