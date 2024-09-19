import axios from 'axios'
import { IConstrucorForm, IUser, IUsers } from './types'
export const getUsers = async () => {
    const response = await axios.get("http://localhost:3004/users")
    return response.data
}
export const getUser = async (id: string | undefined): Promise<IUser> => {
    const response = await axios.get(`http://localhost:3004/users/${id}`)
    return response.data
}

export const deleteUser = async (id: number | string) => {
    const response = await axios.delete("http://localhost:3004/users/" + id)
    return response.data
}

export const addUser = async (data: IConstrucorForm): Promise<IUsers> => {
    const response = await axios.post(`http://localhost:3004/users`, data)
    return response.data
}


export const changeUser = async (id: string | undefined, data: IConstrucorForm): Promise<IUsers> => {
    const response = await axios.put(`http://localhost:3004/users/${id}`, data)
    return response.data
}
