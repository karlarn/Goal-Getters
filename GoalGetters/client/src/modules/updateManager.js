import "firebase/auth";
import { getToken } from "./authManager";

const baseUrl = '/api/GoalUpdate';

export const addGoalUpdate = (update) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(update)
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