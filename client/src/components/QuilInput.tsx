import 'quill/dist/quill.snow.css';
import React, {useState} from "react";
import s from '../styles/QuilInput.module.scss'
import ReactQuill from "react-quill";

interface QuilInput {
    text: string,
    setText: (text : string) => void,
    setSaved: () => void
}
export const QuilInput = ({text, setText, setSaved} : QuilInput) => {

    const changeText = (value : string) => {
        setText(value)
        setSaved()
    }
    return (
        <div className={s.inputDiv}>
            {/*@ts-ignore*/}
            <ReactQuill value={text} onChange={changeText} className={s.quil} />
        </div>
    )
}