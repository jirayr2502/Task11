import { Link, Outlet } from "react-router-dom"
import { IUsers } from "../lib/types"
import { useEffect, useState } from "react"
import { getUsers, deleteUser, getUser, addUser, changeUser } from "../lib/api"

export const Layout = () => {
    const [users, setUsers] = useState<IUsers[]>([])


    useEffect(() => {
        getUsers().then(response => setUsers(response));
    })

    const deleteUserData = (id: number | string): void => {
        deleteUser(id)
            .then(response => setUsers(users.filter(user => user.id != response.id)))

    }
    return (
        <>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/add'>Add</Link>
            </nav>
            <div style={{ padding: 10, background: 'yellowgreen', height: 400, width: 600 }}>
                <Outlet context={{
                    users,
                    deleteUserData,
                    getUser,
                    addUser,
                    changeUser
                }} />
            </div>
        </>
    )
}