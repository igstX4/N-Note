import s from '../styles/SignUp.module.scss'
import {FormRegisterData as FormData} from "../interfaces/Interfaces";
import {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {fetchRegister, setTitle} from "../redux/slices/UserSlice";
import {Navigate, useNavigate} from "react-router-dom";

export const SignUp = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>();
    const [error, setError] = useState<string>('')
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)

    useEffect(() => {
        setError(user.error)
        dispatch(setTitle('Register'))
    }, [user.error])
    const onSubmit : SubmitHandler<FormData> = (values) => {
        if (values.password === values.secondPassword) {
            dispatch(fetchRegister(values))
        } else {
            setError('Password not match')
        }
    }
    if (user.data) {
        return <Navigate to='/' />
    }

    return (
        <div className={s.signDiv}>
            <form className={s.signMain} onSubmit={handleSubmit(onSubmit)}>
                <h1 className={s.title}>Enter data</h1>
                <input className={s.input} {...register("email", {required: true})} placeholder="Enter your email"/>

                <input className={s.input} {...register("username", {required: true})} placeholder="Enter your username"/>

                <input className={s.input} {...register("password", {required: true})} placeholder="Enter your password"/>

                <input className={s.input} {...register("secondPassword", {required: true})} placeholder="Reapet your password"/>

                <input className={s.btn} value='Sign up' type="submit"  />

                {error ? <h1 className={s.error}>{error}</h1> : null}
            </form>
        </div>
    )
}