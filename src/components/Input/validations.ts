import {Validations} from '../../types'

export default {
    full_name: {
        type: "text",
        required: true,
        required_error_message: "This field is required",
        pattern: /^[A-Za-z ]+$/i,
        pattern_error_message: "Alphabetical characters only",
        minLength: 2,
        minLength_error_message: "Should be more then 2 characters",
        maxLength: 20,
        maxLength_error_message: "Name cannot exceed 20 characters"
    },
    username: {
        type: "text",
        required: true,
        required_error_message: "This field is required",
        minLength: 3,
        minLength_error_message: "Should be more then 3 characters",
        maxLength: 10,
        maxLength_error_message: "Name cannot exceed 10 characters"
    },
    email: {
        type: "email",
        required: true,
        required_error_message: "This field is required",
        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        pattern_error_message: "Enter a valid Email id",

    },
    street: {
        type: "text",
        required: true,
        required_error_message: "This field is required.",
    },
    suite: {
        type: "text",
        required: true,
        required_error_message: "This field is required.",
    },
    city: {
        type: "text",
        minLength: 2,
        minLength_error_message: "City should be at least 2 characters",
        required: true,
        required_error_message: "This field is required",
        pattern: /^[A-Za-z]+$/i,
        pattern_error_message: "Alphabetical characters only"
    },
    zipcode: {
        type: "text",
        pattern: /[0-9]*/,
        pattern_error_message: "Zip code should be numbers only",
        required: true,
        required_error_message: "This field is required"
    },
    website_url: {
        type: "text",
        pattern: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
        pattern_error_message: "Enter valid a URL",
    },
    company_name: {
        type: "text",
        required: true,
        required_error_message: "",
        minLength: 3,
        minLength_error_message: "Company name should be at least 3 characters",
        pattern: /^[ A-Za-z0-9_@./#&+-]*$/,
        pattern_error_message: "Alphabetical characters only"
    },
    phone: {
        type: "tel",
        required: true,
        required_error_message: "This feild is required",
        // pattern: /[0-9]{3}-[0-9]{3}-[0-9]{3}/,
        // pattern_error_message: "Enter a valid phone number"
    },
} as Validations | any
 