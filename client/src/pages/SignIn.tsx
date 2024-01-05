import s from '../styles/SignIn.module.scss'
import {SubmitHandler, useForm} from "react-hook-form";
import {FormLoginData as FormData}  from "../interfaces/Interfaces";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {fetchLogin, setTitle} from "../redux/slices/UserSlice";
import {Navigate} from "react-router-dom";

export const SignIn = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>();
    const [error, setError] = useState<string>('')
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    useEffect(() => {
        setError(user.error)
        dispatch(setTitle('Login'))
    }, [user.error])
    const onSubmit : SubmitHandler<FormData> = (values) => {
        dispatch(fetchLogin(values))
    }
    if (user.data) {
        return <Navigate to='/' />
    }
    return (
        <div className={s.signDiv}>
            <form className={s.signMainLogin} onSubmit={handleSubmit(onSubmit)}>
                <h1 className={s.title}>Enter data</h1>
                <input className={s.input} {...register("email", {required: true})} placeholder="Enter your email"/>


                <input className={s.input} {...register("password", {required: true})} placeholder="Enter your password"/>


                <input className={s.btn} value='Sign in' type="submit"  />

                {error ? <h1 className={s.error}>{error}</h1> : null}
            </form>
        </div>
    )
}