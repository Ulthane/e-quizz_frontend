// Librairie
import React from 'react';

// Composant
import Finish from '../../Components/Finish/Finish';
import Loading from '../../Components/Loading/Loading';
import Lobby from '../../Components/Lobby/Lobby';
import Pending from '../../Components/Pending/Pending';
import Play from '../../Components/Play/Play';

// CSS
import './Home.css';


export default function Home({ socket, playerID, playerName, playerHost, setPlayerName, roomInfo, difficulty, setDifficulty, nbPlayers, response, setResponse, DEBUG }) {

  return (
    <>
      {roomInfo && (
         roomInfo.state.type === "LOBBY" ?
          <Lobby socket={socket} playerID={playerID} playerName={playerName} setPlayerName={setPlayerName} playerHost={playerHost} roomInfo={roomInfo} difficulty={difficulty} setDifficulty={setDifficulty} nbPlayers={nbPlayers} />
      : (
        roomInfo.state.type === "LOADING" ?
        <Loading />
      : (
        roomInfo.state.type === "PLAY" ?
        <Play roomInfo={roomInfo} response={response} setResponse={setResponse} />
      : (
        roomInfo.state.type === "FINISH" ?
        <Finish playerName={playerName} roomInfo={roomInfo} />
      : (
        roomInfo.state.type === "PENDING" ?
        <Pending socket={socket} roomInfo={roomInfo} playerID={playerID} response={response} /> 
      : null))))
      )}

      <div className='fixed-bottom'>
        <div className='m-2 footer-text d-flex justify-content-between'>
          <div>Powered by NeoTeam - v1.1.0</div>
          <div>Question by <a href="https://openquizzdb.org/index.php">OpenQuizzDB</a>&nbsp;/&nbsp;<a href="https://creativecommons.org/licenses/by-sa/4.0/deed.fr">"CC BY-SA"</a></div>
        </div>
      </div>
      
      {/* DEBUG */}
      {DEBUG &&
      <div className='d-flex flex-column'>
          <h5 className='text-danger'>DEBUG</h5>
          <div><b>Room ID :</b>&nbsp;{roomInfo.name}</div>
          <div><b>Room Players :</b>&nbsp;{roomInfo.players.length}/{roomInfo.state.maxPlayers}</div>
          <div><b>Room State :</b>&nbsp;{roomInfo.state.type}</div>       
          <div><b>Socket ID :</b>&nbsp;{playerID}</div>
          <div><b>Socket Name :</b>&nbsp;{playerName}</div>
      </div>}
      {/* DEBUG */}
    </>
  )

}