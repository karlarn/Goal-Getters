import "firebase/auth";
import { getToken } from "./authManager";

const baseUrl = '/api/Goal';

export const getGoalsById = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/UserGoals`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get this category."
                )
            }
        })
    })
}

export const getAllGoals = () => {
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

export const addGoal = (goal) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(goal)
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