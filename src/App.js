import './App.css';
import React from 'react';
import Drumpad from './Drumpad';

function App() {
  const [drumpad, setDrumPad] = React.useState(originalsState())
  const [innerText, setInnerText] = React.useState("")

  React.useEffect(() => {
    document.addEventListener("keydown", keyDownhandler);

    return () => {
      document.removeEventListener("keydown", keyDownhandler);
    };

  }, [])


function holdPad(id) {
  setDrumPad(oldPad => oldPad.map(pad => {
      return pad.id === id ? 
          {...pad, isHeld: !pad.isHeld} :
          pad
  }))
}

  function hadnleClick(id,text) {
     
    holdPad(id);

    let audio_tag = document.getElementById(text);
    audio_tag.currentTime=0;
    audio_tag.play();
    setInnerText(id);
    audio_tag.onended = () => holdPad(id)
   

  }

  function keyDownhandler (event) {
    
      let audio_tag = document.getElementById((event.key).toUpperCase())
      if (audio_tag !== undefined) {
        audio_tag.currentTime=0;
        audio_tag.play();
        setInnerText(audio_tag.parentNode.id)
        holdPad(audio_tag.parentNode.id);
        
      }
      else {
        console.log("Error")
      }
     
    }





  function originalsState() {
    const newArray = []
    const pad_text= ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"]
    const drum_audio = ["Heater-1",
                        "Heater-2",
                        "Heater-3",
                        "Heater-4_1",
                        "Heater-6",
                        "Dsc_Oh",
                        "Kick_n_Hat",
                        "RP4_KICK_1",
                        "Cev_H2"]
    const length = pad_text.length
    for (let i = 0; i<length; i++) {
      newArray.push({

          text: pad_text[i],
          isHeld: false,
          id: drum_audio[i]
      })
    }
    return newArray
  }

  const pad= drumpad.map(pad => <Drumpad key={pad.id} id={pad.id} text={pad.text} isHeld={pad.isHeld} function={() => hadnleClick(pad.id, pad.text)} keyDown_function={() => keyDownhandler()}/>)
  

  return (
    <main>
      <h1>Drum Machine</h1>
      <div id="drum-machine">
      <div id="display">{innerText}</div>
        <div className='drumpad_container'>
            {pad}

        </div>

     </div>

    </main>
  );
  
}

export default App;
