// Librairie
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import socketIOClient from "socket.io-client";

// Component
import Home from './Pages/Home/Home';

// Route
import route from './Routes/route';

// CSS
import 'react-toastify/dist/ReactToastify.css';


function App() {
  
  const [socket, setSocket] = useState();
  const [playerID, setPlayerID] = useState(0);
  const [playerName, setPlayerName] = useState("Guest");
  const [message, setMessage] = useState("");
  const [roomInfo, setRoomInfo] = useState();
  const [nbPlayers, setNbPlayers] = useState(0);
  const [response, setResponse] = useState(0);
  const [playerHost, setPlayerHost] = useState(true);

  let endpoint;
  
  switch(process.env.NODE_ENV) {
    case "production":
      endpoint = "https://e-quizz.gamosaurus.fr"; // PROD
      break;
    default:
      endpoint = "http://localhost:5000"; // DEV
      break;
  }

  const DEBUG = false;

  useEffect(() => {
    const socket = socketIOClient(endpoint);
    setSocket(socket);


    // SOCKET PLAYER //
    // Réception de l'ID joueur
    socket.on("player:id", (id) => {
      setPlayerID(id);
    })

    // Réception du nom du joueur
    socket.on("player:name", (name) => {
      setPlayerName(name);
    })

    socket.on("player:host", (state) => {
      setPlayerHost(state)
    })


    // SOCKET ROOM //
    // Reception des information de la room
    // On rempli le lobby par des joueurs en attente
    socket.on("room:info", (info) => {
      const nbPlayers = info.players.length;
      setNbPlayers(nbPlayers);

      let delta = info.state.maxPlayers - nbPlayers;

      const playerObject = {
        id: 0,
        name: "En attente de joueur...",
        score: 0,
        rank: 0,
      }

      if (nbPlayers < info.state.maxPlayers) {
        for (let i=0; i < delta; i++) {
          info.players.push(playerObject);
        }
      }

      setRoomInfo(info);
    })

    // Réception des joueurs
    socket.on("room:players", (players) => {
      
      setRoomInfo((roomInfoLocal) => {
        setNbPlayers(players.length);

        let delta = roomInfoLocal.state.maxPlayers - players.length;

        const playerObject = {
          id: 0,
          name: "En attente de joueur...",
          score: 0,
          rank: 0,
        }
  
        if (players.length < roomInfoLocal.state.maxPlayers) {
          for (let i=0; i < delta; i++) {
            players.push(playerObject);
          }
        }

        return {...roomInfoLocal, players: players};
      })
    })

    // Reception de l'état
    socket.on("room:state", (state) => {
      setRoomInfo((prevState) => ({...prevState, state: state}));
    })

    // Reception de la difficulté
    socket.on("room:get difficulty", (difficulty) => {
      const newDifficulty = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
      setRoomInfo((prevState) => ({...prevState, difficulty: newDifficulty}));
    })

    // Reception du nombre de question restante
    socket.on("room:get nb-question", (nbQuestion) => {
      setRoomInfo((prevState) => ({...prevState, nbQuestion: nbQuestion}));
    })

    // Reception du nombre de question restante
    socket.on("room:remaining-question", (remainingQuestion) => {
      setRoomInfo((prevState) => ({...prevState, remainingQuestion: remainingQuestion}));
    })

    // Reception des questions
    socket.on("room:question", (question) => {
      setRoomInfo((prevState) => ({...prevState, question: question}));
    })


    // Reception du timer
    socket.on("room:timer", (timer) => {
      setRoomInfo((prevState) => ({...prevState, timer: timer}));
    })

    // Reception de la réponse
    socket.on("room:response", (response) => {
      setRoomInfo((prevState) => ({...prevState, response: response}));
    })

    socket.on("room:winner", (winner) => {
      setRoomInfo((prevState) => ({...prevState, winner: winner}));
    })

    // Reception des message d'erreur ou succès
    socket.on("room:message", (state, message) => {
      switch(state) {
        case 1:
          toast.warning(message);
          break;
        case 2:
          toast.error(message);
          break;
        default:
          toast.info(message);
          break;
      }

      setMessage(message);
    })


    return () => {
      socket.close("player:id");
      socket.close("player:name");
      socket.close("player:host");
      socket.close("room:state");
      socket.close("room:get difficulty");
      socket.close("room:get nb-question");
      socket.close("room:remaining-question");
      socket.close("room:question");
      socket.close("room:info");
      socket.close("room:players");
      socket.close("room:timer");
      socket.close("room:response");
      socket.close("room:winner");
      socket.close("room:message");
      socket.disconnect();
    };

  }, [endpoint]);

  return (
    <>
    <Routes>
      <Route path={route.HOME} element={<Home 
                                          socket={socket} 
                                          playerID={playerID} 
                                          playerName={playerName}
                                          playerHost={playerHost} 
                                          setPlayerName={setPlayerName} 
                                          roomInfo={roomInfo}
                                          message={message}
                                          // setDifficulty={setDifficulty}
                                          nbPlayers={nbPlayers}
                                          response={response} 
                                          setResponse={setResponse}
                                          DEBUG={DEBUG} 
                                        />} />
    </Routes>

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

    </>
  );
}

export default App;