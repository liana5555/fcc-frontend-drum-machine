import React from "react";


export default function Drumpad (props) {

    const styles = {
        backgroundColor: props.isHeld ? "white" : ""
    } 
   

    return (
        <div className='drum-pad' id={props.id} onClick={props.function} style={styles}>{props.text}
        <audio className="clip" loop={false} src={"https://s3.amazonaws.com/freecodecamp/drums/"+ props.id + ".mp3"}  id={props.text}></audio>
        </div>
    )
}