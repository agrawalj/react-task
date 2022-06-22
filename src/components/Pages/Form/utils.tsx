import UserFormInputs from "../../Input"
import { User } from '../../../types'

export const defaultValues = {
    "email": "",
    "full_name": "",
    "username": "",
    "phone": "",
    "configurable_details": [
        {
            "website": {
                "website_url": "",
            }
        },
        {
            "company": {
                "company_name": "",
            }
        },
        {
            "address": {
                "street": "",
                "suite": "",
                "city": "",
                "zipcode": ""
            }
        }
    ],
}

export function renderUserFormInputs(user: User | any, detailName: string, register: any, errors: any) {
    if (Array.isArray(user[detailName])) {
        const configurable_details = [...user[detailName]]
        return configurable_details.reduce((previousVal, currentval) => {
            const currentvalKeyName = Object.keys(currentval)[0]
            const currentObj = currentval[currentvalKeyName]
            const element = Object.keys(currentObj).map((curObjdetailName) => {
                if (curObjdetailName !== '_metadata') {
                    return (
                        <>
                            <UserFormInputs
                                userDetails={currentObj[curObjdetailName]}
                                detailName={curObjdetailName}
                                register={register}
                                errors={errors}
                            />
                        </>
                    )
                }
            })
            return [...previousVal, <p><strong>{Object.keys(currentval)[0]} </strong></p >, ...element]
        }, [])
    }

    return (<UserFormInputs
        userDetails={user[detailName]}
        detailName={detailName}
        register={register}
        errors={errors} />)
}