import { Link, useOutletContext } from "react-router-dom"
import { IUsers } from "../lib/types"
interface Context {
    users: IUsers[]
    deleteUserData: (id: number | string) => void
}

export const UserList = () => {
    const {users,deleteUserData} = useOutletContext<Context>()
  
    return (
        <>
            <h2>UserList</h2>
            {
                users.map(user => 
                    <div key={user.id}>
                        <p>{user.name}</p>
                        <p>{user.surname}</p>
                        <p>{user.age}</p>
                        <p>{user.salary} AMD</p>
                        <button onClick={() => deleteUserData(user.id)}>Delete</button>
                        <Link to={'/user/' + user.id}>Edit</Link>
                    </div>
                )
            }
        </>
    )
}