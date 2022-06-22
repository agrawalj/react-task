import { useParams, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { defaultValues, renderUserFormInputs, } from "./utils";
import { User, State } from "../../../types"

const Form: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let user: User | unknown;
    if (params.uid) {
        user = useSelector((state: State) => {
            const {
                email,
                full_name,
                phone,
                username,
                configurable_details
            } = state.users?.filter((user) => user?.uid === params?.uid)[0]

            return {
                email,
                full_name,
                phone,
                username,
                configurable_details
            }
        })
    }

    const onSubmit = (data: any) => {
        if (!params.uid) {
            dispatch({ type: 'USER_CREATE_REQUEST', payload: { userData: data } })
            navigate('/')
        }
        else {
            dispatch({ type: "USER_UPDATE_REQUEST", payload: { uid: params.uid, userData: data } })
            navigate('/')
        }
    };

    useEffect(() => {
        if (params?.uid) {
            const { email = '', full_name = '', phone = '', username = '', configurable_details = [] } = user as User
            reset({
                email,
                full_name,
                phone,
                username,
                configurable_details
            })
        }
        else {
            reset(defaultValues)
        }
    }, [reset])

    return (
        <Container fluid style={{ width: '50%', paddingTop: '10vh' }}>
            {
                params.uid ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <>
                                {
                                    user && Object.keys(user as User).length > 0 && Object.keys(user as User).map((detailName: any) =>
                                        renderUserFormInputs(user, detailName, register, errors))
                                }
                                <button type="submit" className="btn btn-primary">
                                    {params?.uid ? 'Save' : 'Add'}
                                </button>
                            </>
                        </div>
                    </form>) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            {
                                defaultValues && Object.keys(defaultValues).length > 0 && Object.keys(defaultValues).map((detailName: any) =>
                                    renderUserFormInputs(defaultValues, detailName, register, errors))
                            }
                            <button type="submit" className="btn btn-primary">
                                {params?.uid ? 'Save' : 'Add'}
                            </button>
                        </div>
                    </form>
                )
            }
        </Container>
    )
}

export default Form