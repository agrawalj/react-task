import validations from './validations'
import { ErrorMessageProps, InputProps } from '../../types'


const ErrorMessage = ({ children }: ErrorMessageProps) => <p style={{ color: 'red' }}>{children}</p>

export default function ({ userDetails, detailName, register, errors }: InputProps) {
    return (<div className="form-group" key={detailName}>
        <label>{detailName}</label>
        <input
            defaultValue={userDetails}
            {...register(detailName, { ...validations[detailName] })}
            className={`form-control`}
        />

        {errors[detailName] && <ErrorMessage>{validations[detailName][`${errors[detailName].type}_error_message`]}</ErrorMessage>}
    </div>)
}