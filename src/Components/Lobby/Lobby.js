// Librairie
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Slider from 'rc-slider';

// Component
import DifficultyCard from './DifficultyCard/DifficultyCard';
import PlayerCard from './PlayerCard/PlayerCard';

// CSS
import 'react-toastify/dist/ReactToastify.css';
import 'rc-slider/assets/index.css';
import './Lobby.css';
// import PlayerBar from './PlayerBar/PlayerBar';

export default function Lobby({ socket, playerID, playerName, setPlayerName, playerHost, roomInfo, nbPlayers }) {

    const [joinRoom, setJoinRoom] = useState(""); // Récupère l'input qui contient l'identifiant de la room
    const [pseudo, setPseudo] = useState("");

    // BUTTON
    const handleJoin = () => {
      socket.emit("join:room", joinRoom, roomInfo.name);
      setJoinRoom("");
    }

    const changePlayerName = () => {
      setPseudo("");
      socket.emit("player:setname", playerID, playerName, roomInfo.name);
    }

    const startGame = () => {
      socket.emit("game:start", roomInfo.name);
    }


    // INPUT
    const joinRoomChange = (e) => {
      setJoinRoom(e.target.value);
    }

    const playerNameChange = (e) => {
      setPseudo(e.target.value);
      setPlayerName(e.target.value);
    }


    // SLIDER
    const sliderSelect = (nbQuestion) => {
      socket.emit("room:set nb-question", roomInfo.name, nbQuestion)
    }


    // DIVERS
    const copy = async () => {
      navigator.clipboard.writeText(roomInfo.name).then(() => {
        toast("ID Copié");
      });
    }

  return (
    <>
      {/* <PlayerBar /> */}

      <div className='container-fluid' style={{minHeight: '75%'}}>


          {/* Titre */}
          <div className='row'>
            <div className='d-flex justify-content-center mt-3 mb-4'>
              <h1 className="borderNeon">
                <span className="neonTextBase">E-Qui</span>
                <span className="neonTextFlash">z</span>
                <span className="neonTextBase">z</span>
              </h1>
            </div>
          </div>

          {/* Difficulté */}
          <div className='row mb-4'>
            <div className='d-flex flex-row justify-content-center'>
              <DifficultyCard host={playerHost} socket={socket} roomInfo={roomInfo} difficultyLevel={1} difficultyText="Débutant" />
              <DifficultyCard host={playerHost} socket={socket} roomInfo={roomInfo} difficultyLevel={2} difficultyText="Confirmé" />
              <DifficultyCard host={playerHost} socket={socket} roomInfo={roomInfo} difficultyLevel={3} difficultyText="Expert" />
            </div>
          </div>

          {/* Nombre de question */}
          <div className='d-flex justify-content-center'>
            <div className='row w-25 mb-4'>
              <div className='infoCard question d-flex justify-content-center align-items-center'>
                <i className="bi bi-question-lg fs-2 me-3 text-white"></i>
                <div className='w-75'>
                  <Slider disabled={!playerHost ? true : false} className={["rc-slider", !playerHost && "disabled"].join(" ")}  value={roomInfo.nbQuestion} ariaLabelForHandle="nbQuestion" min={1} max={50} step={1} onChange={(e) => sliderSelect(e)} />
                </div>
                <h5 className='text-white ms-4 mt-2 fs-3'>{roomInfo.nbQuestion}</h5>
              </div>
            </div>
          </div>
          
          {/* Joindre une salle */}
          <div className='row'>
            <div className='d-flex justify-content-center'>

              <div className='col-8'>
                <div className='infoCard lobby'>

                  {/* Ligne copy et join */}
                  <div className='row p-2 pt-3'>
                    <div className='d-flex justify-content-center'>

                      {/* Input rejoindre */}
                      <input className="roomJoin input text-center" required type="text" value={joinRoom} placeholder='Room ID' onChange={e => joinRoomChange(e)} />
                      <button className="roomJoin button join me-5" type="button" onClick={(e) => handleJoin(e)}>
                        <i className="bi bi-box-arrow-in-right p-2 fs-3"></i>
                      </button>

                      {/* Input copy */}
                      <input className="roomJoin input text-center" disabled={true} type="text" value={roomInfo.name} />
                      <button className="roomJoin button copy me-5" type="button" onClick={() => copy()}>
                        <i className="bi bi-clipboard2 p-2 fs-3"></i>
                      </button>

                      {/* Input change Name */}
                      <input className="roomJoin input text-center" maxLength={20} type="text" value={pseudo} placeholder='Pseudo' onChange={e => playerNameChange(e)} />
                      <button className="roomJoin button change me-5" type="button" onClick={() => changePlayerName()}>
                        <i className="bi bi-person-gear p-2 fs-3"></i>
                      </button>

                    </div>
                  </div>

                  {/* Ligne Player */}
                  <div className='row'>
                    <div className='d-flex justify-content-center flex-wrap'>
                      {roomInfo.players.map((player, index) => (
                        <PlayerCard text={player.name} host={player.host} key={"player_" + index} />
                      ))}
                    </div>
                  </div>

                  {/* Start Button */}
                  <div className='row'>
                    <div className='d-flex justify-content-center align-items-center'>
      
                    <button onClick={() => startGame()} disabled={nbPlayers < 1 || !playerHost ? true : false} className={['startButton', roomInfo.difficulty === "Débutant" ? 'easy' : (roomInfo.difficulty === "Confirmé" ? "medium" : (roomInfo.difficulty === "Expert" ? "hard" : null))].join(" ")}>
                        <i className='bi bi-rocket-takeoff fs-5'></i>
                    </button>  

                    </div>
                  </div>

                </div>
              </div>
            </div>


            {/* Toast */}
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />

          </div>
      </div>
    </>
  )
}
