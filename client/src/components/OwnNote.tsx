import s from '../styles/OwnNote.module.scss'
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import {QuilInput} from "./QuilInput";
import {FC, useEffect, useState} from "react";
import $api from "../api/axios";
import {Modal} from "./Modal";
import DeleteIcon from '@mui/icons-material/Delete';
import {DeleteModal} from "./DeleteModal";
import {useAppDispatch} from "../redux/store";
import {fetchMe} from "../redux/slices/UserSlice";
import {useNavigate} from "react-router-dom";
interface OwnNoteI {
  defaultText : string,
    access: string,
    id : string,
    isCreating? : boolean
}
export const OwnNote : FC<OwnNoteI> = ({defaultText, access, id, isCreating}) => {

    const [text, setText] = useState(defaultText)
    const [noteType, setNoteType] = useState(access)
    const [saved, setSaved] = useState(true)
    const [name, setName] = useState('')
    const [activeDelete, setDelete] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setText(defaultText)
        setNoteType(access)
    }, [id])
    const handleSave = () => {
        if (isCreating) {
            $api.post('note/create', {name: name, access: noteType, text : text}).then((data) => {
                navigate(`/${data.data._id}`)
                dispatch(fetchMe())
            })
        }else  {
            try {
                $api.patch(`/note/${id}`, {text: text, access: noteType}).then((data) => {
                    setSaved(true)
                })
            } catch (e) {
                console.log(e)
            }
        }

    }
    const [active, setActive] = useState(false)
    return (
        <div className={s.maindiv}>
            {!isCreating ? <Modal active={active} setActive={() => setActive((active) => !active)} /> : null}
            {!isCreating ? <DeleteModal id={id} active={activeDelete} setActive={() => setDelete((item) => !item)}/> : null}
           <div className={s.quilDiv}><QuilInput setSaved={() => setSaved(false)} text={text} setText={setText}/></div>
            <>
                <div className={s.controllsDiv}>
                    <div className={s.accessDiv}>
                        {!isCreating ? <div onClick={() => setActive(true)} className={s.shareBtn}>
                            <ShareIcon style={{color: "white"}} fontSize={"large"} />
                        </div> : null}
                        <FormControl className={s.form}>
                            <InputLabel id="demo-simple-select-label">Access</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={noteType}
                                label="Type"
                                onChange={(e) => {
                                    setSaved(false)
                                    setNoteType(e.target.value)
                                }}
                            >
                                <MenuItem value={'LINK'}>Link</MenuItem>
                                <MenuItem value={'PRIVATE'}>Private</MenuItem>
                            </Select>
                        </FormControl>
                        {isCreating ? <input onChange={e => setName(e.target.value)} value={name} className={s.nameNote} placeholder={'Name'}/> : null}
                    </div>

                    {!isCreating ? <h1 className={s.status}>{saved ? 'Saved' : 'Not saved'}</h1> : null}
                    <div className={s.saveDiv}>
                        {!isCreating ? <div onClick={() => setDelete(true)} className={s.deleteBtn}><DeleteIcon style={{color: 'white'}} fontSize={'large'}/></div> : null}
                        <button onClick={handleSave} className={s.savebtn}>Save</button>
                    </div>
                </div>
            </>

        </div>
    )
}