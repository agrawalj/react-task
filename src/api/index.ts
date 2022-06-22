import axios from 'axios'
import { User } from './../types'

const BASE_URL = 'https://api.contentstack.io/v3'
const config = {
    headers: {
        api_key: 'blt98f6767c74521388',
        authorization: 'cs07582181eb8404465a488e37',
        'Content-Type': 'application/json'
    }
}

export const getEntryObj = (data: any) => {
    const entry = {
        entry: {
            title: data?.full_name || null,
            full_name: data?.full_name || null,
            username: data?.username || null,
            email: data?.email || null,
            phone: data?.phone || null,
            configurable_details: [
                {
                    address: {
                        street: data?.street || null,
                        suite: data?.suite || null,
                        city: data?.city || null,
                        zipcode: data?.zipcode || null,
                    }
                },
                {
                    company: {
                        company_name: data?.company_name || null
                    }
                },
                {
                    website: {
                        website_url: data?.website_url || null
                    }
                }
            ]
        }
    }
    return JSON.stringify(entry)
}

export function getUser(uid: string): Promise<User> {
    return axios.get(`${BASE_URL}/content_types/users/entries/${uid}?environment=development&locale=en-us&include_fallback=true&include_branch=false`, config)
}

export function createUser(data: any): Promise<User> {
    return axios.post(`${BASE_URL}/content_types/users/entries?locale=en-us&include_branch=false`,
        getEntryObj(data)
        , config)
}

export function updateUser(uid: string, data: any): Promise<User> {
    return axios.put(`${BASE_URL}/content_types/users/entries/${uid}?locale=en-us&include_branch=false`,
        getEntryObj(data)
        , config)
}

export function publishUser(uid: string): Promise<User> {
    return axios.post(`${BASE_URL}/content_types/users/entries/${uid}/publish`, {
        "entry": {
            "environments": ["development"],
            "locales": ["en-us"]
        },
        "locale": "en-us",
    }, config)
}

export function getAllUsers(): Promise<User[]> {
    return axios.get(`${BASE_URL}/content_types/users/entries?locale=en-us&include_workflow=false&include_publish_details=true&include_branch=false`, config)
}

export function deleteUser(uid: string): Promise<User[]> {
    return axios.delete(`${BASE_URL}/content_types/users/entries/${uid}?locale=en-us&delete_all_localized=true`, config)
}