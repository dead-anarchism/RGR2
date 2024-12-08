import style from "../../src/styles/OutputArea/OutputArea.module.css"
import { useState } from "react";
const OutputArea = ({...props}) => {
    const [dataout, SetDataout] = useState(props.data);
    console.log(props.data);
    return(
        <div className={style.output__area}>
            <span style={{display: "flex", marginBottom:"15px"}}>Output</span>
            <textarea className={style.output_text__area} placeholder="Hello world" disabled value={props.response}/>
        </div>
    )
}
export default OutputArea;