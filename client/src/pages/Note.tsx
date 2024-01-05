import {OwnNote} from "../components/OwnNote";
import {NotOwnNote} from "../components/Note";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import $api from "../api/axios";
import {NoteI} from "../interfaces/Interfaces";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {setTitle} from "../redux/slices/UserSlice";

export const Note = () => {
    let param = useParams();
    const dispatch = useAppDispatch()
    const [note, setNote] = useState<NoteI>()
    const [loading, setLoading] = useState(true)
    const user = useAppSelector(state => state.user)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        const getNote = async () => {
            try {
                const response = await $api.get(`/note/${param.id}`)
                if (response.data) {
                    setLoading(false)
                    setNote(response.data)
                    dispatch(setTitle(response.data.name))
                }
            } catch (e : any) {
                console.log(e)
                setLoading(false)
                setError(e.response.data.message)
            }
            
        }
        getNote()

    }, [param.id])
    if (loading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <h1>{error}</h1>
    }
    if (note?.authorId === user.data?.id) {
        return <OwnNote id={note ? note._id : 'Loading'} access={note ? note.access : 'Loading'} defaultText={note ? note.text : 'Loading...'} />
    } else {
        return <NotOwnNote str={note ? note.text : 'Loading...'} />
    }
}
