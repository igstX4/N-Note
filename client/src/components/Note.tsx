import s from '../styles/Note.module.scss'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css'
import {useState} from "react";
import {Modal} from "./Modal";
import {useLocation} from "react-router-dom";
import ShareIcon from "@mui/icons-material/Share";

export const NotOwnNote = ({str} : {str : string} ) => {
    const [active, setActive] = useState(false)
    const path = useLocation()
    return (
        <div className={s.wrapper}>
            <Modal active={active} setActive={() => setActive((active) => !active)} />


            <div className={s.content}>
                {/*@ts-ignore*/}
                <ReactQuill readOnly={true} value={str} theme="bubble"/>
            </div>
            <div onClick={() => setActive(true)} className={s.shareBtn}>
                <ShareIcon style={{color: "white"}} fontSize={"large"} />
            </div>
        </div>
    )
}