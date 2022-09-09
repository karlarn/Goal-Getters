import "firebase/auth";
import { getToken } from "./authManager";

const baseUrl = '/api/IFeelYou';

export const addLike = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }).then((res) => {
            if (res.ok) {

            }
            else {
                throw new Error(
                    "Well, Fuck."
                )
            }
        })
    })
}

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
                    "Well, Fuck."
                )
            }
        })
    })
}