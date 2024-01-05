import s from '../styles/HeaderItem.module.scss'
import {NavLink} from "react-router-dom";

interface NavBarItemI {
    id: string,
    title : string,
    click: () => void
}
export const HeaderItem = ({id, title, click} : NavBarItemI) => {
    return (
        <NavLink onClick={click} to={`/${id}`}><div className={s.navItem}>
            <p className={s.navText}>{title}</p>
        </div></NavLink>
    )
}