// Librairie
import React, { useEffect, useState } from 'react';

// CSS
import './Pending.css';

export default function Pending({ socket, roomInfo, playerID, response }) {

  const [rank, setRank] = useState([]);

  useEffect(() => {
    setRank([...roomInfo.players].sort((a, b) => a.rank - b.rank));
  }, [roomInfo.players])

  useEffect(() => {
    socket.emit("game:response", roomInfo.name, response, playerID);
  }, [roomInfo.name, response, playerID, socket])
  
  return (
    <div className='d-flex justify-content-center flex-column align-items-center h-100'>

      <div className='row'>
        <div className='mb-5'>
          <h2 className='category'>La réponse était : {roomInfo.response.response}</h2>
        </div>
      </div>
      <div className='row'>
        <div className='infoCard text-white text-center p-5'>
            <div>
              <h4>{roomInfo.response.anecdote}</h4>
            </div>
        </div>
      </div>

      <div className='row p-5'>
        <div className='d-flex flex-column'>
          <table>
            <thead>
              <tr className='rankTitle'>
                <th className='lineSize'>Nom</th>
                <th>Score</th>
                <th>Classement</th>
              </tr>
            </thead>

            <tbody>
            {rank.map((player, index) => (
              <tr key={"rank_line_" + index} className={["rankCard", player.rank === 1 ? "gold" : (player.rank === 2 ? "silver" : (player.rank === 3 ? "bronze" : null))].join(" ")}>
                  <td className='lineSize'>
                    {player.name}
                  </td>
                  <td className='fs-3'>
                    {player.score}
                  </td>
                  <td className='fs-3'>
                    {player.rank}
                  </td>
              </tr>
            ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}
