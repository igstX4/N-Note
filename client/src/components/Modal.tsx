import s from '../styles/Modal.module.scss'
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

interface ModalI {
    active: boolean
    setActive : () => void,
    children?: JSX.Element,
}
export const Modal : React.FC<ModalI> = ({children, active, setActive}) => {
    const path = `http://localhost:3000${useLocation().pathname}`
    const [showWindow, setShowWindow] = useState(false);

    useEffect(() => {
        if (showWindow) {
            const timeoutId = setTimeout(() => {
                setShowWindow(false);
            }, 3000);
            return () => clearTimeout(timeoutId);
        }
    }, [showWindow]);
    const toggleWindow = () => {
        navigator.clipboard.writeText(path)
        setShowWindow(!showWindow);
    };
    return (
        <div onClick={setActive} className={`${s.modalBg} ${active ? s.active : ''}`}>
            <div onClick={(e) => e.stopPropagation()} className={s.content}>
                {children ? children : (
                    <>
                    <div className={s.textWrapper}>
                        <p>{path}</p>
                    </div>
                        <button onClick={toggleWindow} className={s.btn}>Copy!</button>
                    </>
                )}
            </div>
            <div className={`${s.copyDiv} ${showWindow ? s.opened : ''}`}>
                <p>Copied!</p>
            </div>
        </div>
    )
}