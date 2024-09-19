import { useNavigate, useOutletContext } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { IConstrucorForm } from "../lib/types"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'


interface AddForm {
    addUser: (data: IConstrucorForm) => void
}
export const AddUser = () => {

    const navigate = useNavigate()
    const { addUser } = useOutletContext<AddForm>()

    const UserData = yup.object({
        name: yup.string().required('The field is empty, please fill it out'),
        surname: yup.string().required('The field is empty, please fill it out'),
        age: yup.number().required('The field is empty, please fill it out').min(16, 'age must be over 16'),
        salary: yup.number().required('The field is empty, please fill it out')
    }).required()

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IConstrucorForm>({
        resolver: yupResolver(UserData)
    })

    const handleAddUser = (data: IConstrucorForm): void => {
        addUser(data)
        reset()
        navigate('/')
    }


    return (
        <>
            <h2>AddUser</h2>
            <form onSubmit={handleSubmit(handleAddUser)} className="addUser">
                <input
                    placeholder="enter your name"
                    type="text"
                    {...register('name')}
                />
                {errors.name && <p>{errors.name.message}</p>}
                <input
                    placeholder="enter your surname"
                    type="text"
                    {...register('surname')}
                />
                {errors.surname && <p>{errors.surname.message}</p>}
                <input
                    placeholder="enter your age"
                    type="text"
                    {...register('age')}
                />
                {errors.age && <p>{errors.age.message}</p>}
                <input
                    placeholder="enter your salary"
                    type="text"
                    {...register('salary')}
                />
                {errors.salary && <p>{errors.salary.message}</p>}

                <button>Save</button>
            </form>
        </>
    )
}