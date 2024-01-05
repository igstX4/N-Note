import s from '../styles/Header.module.scss'
import {HeaderItem} from "./Headeritem";
import {Link, NavLink, Outlet, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {useEffect, useState} from "react";
import {fetchMe} from "../redux/slices/UserSlice";
import SaveIcon from '@mui/icons-material/Save';
import $api from "../api/axios";
import '../styles/BuregerMenu.css'
import LogoutIcon from '@mui/icons-material/Logout';

export const Header = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const params = useParams()
    const [saved, setSaved] = useState(true)
    const note = user.data?.createdNotes.find((item) => item._id === params.id)
    const [title, setTitle] = useState(user.title)
    const [value, setValue] = useState(false)
    useEffect(() => {
        dispatch(fetchMe())
    }, [])
    useEffect(() => {
        setTitle(user.title)
    }, [user.title])
    const onSave = () => {
        if (!note) {
            return null
        }
        try {
            $api.post(`/note/${note._id}`, {newName: title}).then(() => {
                dispatch(fetchMe())
                setSaved(true)
            })
        } catch (e) {
            console.log(e)
        }
    }
    const logOut = () => {
        try {
            $api.post('/auth/logout').then(() => {
                localStorage.removeItem('token')
                dispatch(fetchMe())
            })
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className={s.navheader}>
            <header className={s.header}>
                <Link to={'/'}><h1 className={s.title}>N - Notes</h1></Link>
                <div className={s.titleDiv}>
                    {note ? <input value={title} onChange={(e) => {
                        setTitle(e.target.value)
                        setSaved(false)
                    }} className={s.titleInput}/> : <h1 className={s.title}>{user.title}</h1>}
                    {note && !saved ? <SaveIcon onClick={onSave} className={s.icon} fontSize={'large'}/> : null}
                </div>
                <h1 onClick={logOut} className={s.signout}
                    style={user.data ? {visibility: 'visible'} : {visibility: "hidden"}}>Log out</h1>
                    <LogoutIcon style={user.data ? {visibility: 'visible'} : {visibility: "hidden"}} onClick={logOut} className={s.logOut} fontSize={'large'}/>
            </header>

            <div className={s.layoutdiv}>
                    <div className={s.navbar}>
                        {!user.data ? <><HeaderItem click={() => setValue(false)} title={'Sign in'} id={'login'}/>
                                <HeaderItem click={() => setValue(false)} title={'Sign up'} id={'register'}/> </>
                            : user.data.createdNotes.length !== 0 ? user.data.createdNotes.map((item) => <HeaderItem click={() => setValue(false)}
                                    id={item._id} key={item._id} title={item.name}/>) :
                                <h1 className={s.error1}>You have not created any notes yet</h1>
                        }
                        {user.data ? <NavLink to={'/createNote'}><h1 className={s.toCreate}>+ Create note</h1></NavLink> : null}
                    </div>
                <div className="hamburger-menu">
                    <input
                        id="menu__toggle"
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setValue(e.target.checked)}
                    />
                    <label className="menu__btn" htmlFor="menu__toggle">
                        <span></span>
                    </label>
                    <ul className="menu__box">
                        <Link to={'/'}><h1 className={s.titleBurger}>N-Note</h1></Link>
                        {!user.data ? <><HeaderItem click={() => setValue(false)} title={'Sign in'} id={'login'}/>
                                <HeaderItem click={() => setValue(false)} title={'Sign up'} id={'register'}/> </>
                            : user.data.createdNotes.length !== 0 ? user.data.createdNotes.map((item) => <HeaderItem click={() => setValue(false)}
                                    id={item._id} key={item._id} title={item.name}/>) :
                                <h1 className={s.error1}>You have not created any notes yet</h1>
                        }
                        {user.data ?
                            <NavLink onClick={() => setValue(false)} to={'/createNote'}><h1 className={s.toCreate}>+ Create note</h1></NavLink> : null}
                    </ul>
                </div>
                <div style={{width: '100%'}}>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}
