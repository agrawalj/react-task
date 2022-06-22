export interface Configurable_details {
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        _metadata: {};
    };
    company: {
        company_name: string;
        _metadata: {};
    };
    website: {
        website_url: string;
        _metadata: {};
    }
}

export interface User {
    uid: string;
    title: string;
    locale: string;
    _version: string;
    updated_at: string;
    email: string;
    full_name: string;
    phone: string;
    username: string;
    configurable_details: Configurable_details[];
}

export interface State {
    users: User[];
}

interface FullName {
    type: string;
    required: boolean;
    required_error_message: string;
    pattern: RegExp;
    pattern_error_message: string;
    minLength: number;
    minLength_error_message: string;
    maxLength: number;
    maxLength_error_message: string;
}

interface UserName {
    type: string;
    required: boolean;
    required_error_message: string;
    minLength: number;
    minLength_error_message: string;
    maxLength: number;
    maxLength_error_message: string;
}

interface Email {
    type: string;
    required: boolean,
    required_error_message: string;
    pattern: RegExp;
    pattern_error_message: string;
}

interface Street {
    type: string,
    required: boolean,
    required_error_message: string,
}

interface Suite {
    type: string;
    required: boolean;
    required_error_message: string;
}

interface City {
    type: string;
    minLength: number;
    minLength_error_message: string;
    required: boolean;
    required_error_message: string;
    pattern: RegExp;
    pattern_error_message: string;
}

interface ZipCode {
    type: string;
    pattern: RegExp,
    pattern_error_message: string,
    required: boolean,
    required_error_message: string
}

interface WebSiteURL {
    type: string;
    pattern: RegExp;
    pattern_error_message: string;
}

interface CompanyName {
    type: string;
    required: boolean;
    required_error_message: string;
    minLength: number;
    minLength_error_message: string;
    pattern: RegExp;
    pattern_error_message: string;
}

interface Phone {
    type: string;
    required: boolean;
    required_error_message: string;
    pattern: RegExp;
    pattern_error_message: string;
}

export interface Validations {
    full_name: FullName;
    username: UserName;
    email: Email;
    street: Street;
    suite: Suite;
    city: City;
    zipcode: ZipCode;
    website_url: WebSiteURL;
    company_name: CompanyName;
    phone: Phone;
}

export interface ErrorMessageProps {
    children: string;
}

export interface InputProps {
    userDetails: string;
    detailName: string;
    register: any;
    errors: any;
}
