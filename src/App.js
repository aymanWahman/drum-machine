
import audioClips from "./AudioClips";
import Pad from "./Pad";
import { useState } from "react";


function App() {
  const [volume, setVolume] = useState(1);
  const [recording, setRecording] = useState("");
  const [speed, setSpeed] = useState(0.5);

  const playRecording = () => {
    let index = 0;
    let recordArray = recording.split(" ");
    const interval = setInterval(() => {
      const audioTag = document.getElementById(recordArray[index]);
      audioTag.volume= volume;
      audioTag.currentTime = 0;
      audioTag.play();
      index ++
    
    }, speed * 600);
    setTimeout(() => clearInterval(interval), 600 * speed * recordArray.length - 1);
  }

  return (
    <div className="bg-info min-vh-100 text-white" id="drum-machine">
      <div className="text-center" >
        <h1>Drum Machine</h1>
        {audioClips.map((clip) => (
          <Pad keyTrigger={clip.id} clip={clip} volume={volume} setRecording={setRecording}/>
          ))}
          <br/>
          <h4>volume</h4>
          <input type="range" step="0.01" onChange={(e) => setVolume(e.target.value)}
           value={volume} max="1" min="0" className="w-50" />
           <h3 id="display">{recording}</h3>
           {recording && (
            <>
            <button onClick={playRecording} className="btn btn-primary m-3">Play</button>
            <button onClick={() => setRecording("")} className="btn btn-danger">Clear</button>
            <br/>
            <h4>speed</h4>
            <input type="range" step="0.01" onChange={(e) => setSpeed(e.target.value)}
             value={speed} max="1.2" min="0.1" className="w-50"/>
            </>
           )}
      </div>
    </div>
    );
}

export default App;