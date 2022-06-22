import React, { useEffect } from "react"
import { Table } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

interface User {
    uid: string;
    title: string;
    locale: string;
    _version: string;
    updated_at: string;
}

interface State {
    users: User[];
}


const TableComponent: React.FC = () => {
    const dispatch = useDispatch()
    const users: User[] = useSelector((state: State) => {
        return state.users
    })
    const navigate = useNavigate();

    function handleClick(path: string) {
        navigate(path);
    }

    function handleDelete(uid: string) {
        dispatch({ type: "USER_DELETE_REQUEST", payload: { uid } })
    }

    useEffect(() => {
        dispatch({ type: "USERS_FETCH_REQUEST" })
    }, [])

    return (
        <>
            {users && users.length > 0 && (
                <>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Language</th>
                                <th>Version</th>
                                <th>Modified At</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, idx) => {
                                    return (<tr key={user.uid} >
                                        <td>{idx + 1}</td>
                                        <td>{user.title}</td>
                                        <td>{user.locale}</td>
                                        <td>{user._version}</td>
                                        <td>{user.updated_at}</td>
                                        <td><Button variant="primary" onClick={() => {
                                            dispatch({ type: 'SINGLE_USER_FETCH_REQUEST', payload: { uid: user.uid } })
                                            handleClick(`edit/${user.uid}`)
                                        }}>Edit</Button></td>
                                        <td><Button variant="danger" onClick={() => handleDelete(user.uid)}>Delete</Button></td>
                                    </tr>)
                                })
                            }
                        </tbody>
                    </Table>
                    <Button variant="warning" onClick={() => navigate(`add`)}> Add Entry </Button></>)
            }
        </>
    )
}

export default TableComponent