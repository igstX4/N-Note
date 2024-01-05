import {FC} from "react";
import s from '../styles/DeleteNote.module.scss'
import $api from "../api/axios";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../redux/store";
import {fetchMe} from "../redux/slices/UserSlice";

interface DeleteModalI {
    id: string
    active: boolean
    setActive: () => void
}

export const DeleteModal: FC<DeleteModalI> = ({id, active, setActive}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleDelete = () => {
        try {
            $api.delete(`/note/${id}`).then(() => {
                setActive()
                dispatch(fetchMe())
                navigate('/')
            })
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className={`${s.bg} ${active ? s.active : ''}`} onClick={handleDelete}>
            <div className={s.content} onClick={(e) => e.stopPropagation()}>
                <h1 className={s.text}>Are you sure you want to delete?</h1>

                <div className={s.options}>
                    <button onClick={handleDelete}>Yes</button>
                    <button onClick={setActive}>No</button>
                </div>
            </div>
        </div>
    )
}