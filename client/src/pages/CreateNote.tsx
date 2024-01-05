import {OwnNote} from "../components/OwnNote";
import {useEffect} from "react";
import {setTitle} from "../redux/slices/UserSlice";
import {useAppDispatch} from "../redux/store";

export const CreateNote = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setTitle('Creating note'))
    })
    return (
        <OwnNote defaultText={'enter your text'} access={'LINK'} id={''} isCreating={true}/>
    )
}