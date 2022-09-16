import "firebase/auth";
import { getToken } from "./authManager";

const baseUrl = '/api/IFeelYou';

// Uses the id passed in the parameter to fill in a fetch call to the api to post new information to a table in the DB. 
export const addLike = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.ok) {

            }
            else {
                throw new Error(
                    "Well, fuck."
                )
            }
        })
    })
}

// Uses an id passed into a fetch call to remove a row from a table in the DB
export const removeLike = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            try { 
                return res.ok
            }
            catch (error){
                throw new Error(
                    "Well, fuck."
                )
            }
        })
    })
}