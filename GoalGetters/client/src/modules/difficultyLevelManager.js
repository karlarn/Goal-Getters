import "firebase/auth";
import { getToken } from "./authManager";

// Start of the url for all the fetch call in this file. 
const baseUrl = '/api/DifficultyLevel';

// Returns an array of strings 
export const getDifficultyLevels = () => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get categories.",
                )
            }

        })
    })

}