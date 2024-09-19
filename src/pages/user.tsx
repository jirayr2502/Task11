import { useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { IConstrucorForm, IUser } from "../lib/types"
import { getUser } from "../lib/api"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from 'yup'

interface changeForm {
    changeUser: (id: string | undefined, data: IConstrucorForm) => void
}

const UserData = yup.object({
    name: yup.string().required('The field is empty, please fill it out'),
    surname: yup.string().required('The field is empty, please fill it out'),
    age: yup.number().required('The field is empty, please fill it out').min(16, 'age must be over 16'),
    salary: yup.number().required('The field is empty, please fill it out')
}).required()

export const User = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [user, setUser] = useState<IUser>({
        id: '',
        name: '',
        surname: '',
        age: '',
        salary: ''
    })
    const { changeUser } = useOutletContext<changeForm>()
    useEffect(() => {
        getUser(id)
            .then(response => setUser(response))
    })
    const { name, surname, age, salary } = user

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IConstrucorForm>({
        resolver: yupResolver(UserData)
    })

    const handleChange = (data: IConstrucorForm) => {
        changeUser(id, data)
        reset()
        navigate('/')
    }

    return (
        <>
            <h2>User</h2>
            <form onSubmit={handleSubmit(handleChange)}>
                <input
                    placeholder="change your name"
                    type="text"
                    defaultValue={name}
                    {...register('name')}
                />
                {errors.name && <p>{errors.name.message}</p>}
                <input
                    placeholder="change your surname"
                    type="text"
                    defaultValue={surname}
                    {...register('surname')}
                />
                {errors.surname && <p>{errors.surname.message}</p>}
                <input
                    placeholder="change your age"
                    type="text"
                    defaultValue={age}
                    {...register('age')}
                />
                {errors.age && <p>{errors.age.message}</p>}
                <input
                    placeholder="change your salary"
                    type="text"
                    defaultValue={salary}
                    {...register('salary')}
                />
                {errors.salary && <p>{errors.salary.message}</p>}
                <button type="submit">Save</button>
            </form>
        </>
    )
}