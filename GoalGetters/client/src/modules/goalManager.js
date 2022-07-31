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
                    "An unknown error occurred while trying to get this goal."
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
                "Content-Type": "application/json"
            },
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get goals. Heh.",
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

export const getSingleGoalById = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
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
                    "An unknown error occurred while trying to get this goal."
                )
            }
        })
    })
}

export const updateGoal = (goal) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${goal.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(goal)
        }).then((res) => {
            if (res.ok) {

            }
            else if (res.status === 401) {
                throw new Error("Unauthorized");
            }
            else {
                throw new Error(
                    "Well, -_- .",
                );
            }
        })
    })
}

export const deleteGoal = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(id)
        }).then((res) => {
            if (res.ok) {

            } 
            else {
                throw new Error(
                    "Nope."
                )
            }
        })
    })
}

export const updateCompletion = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/Complete/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.ok) {

            }
            else {
                throw new Error(
                    "Well, -_- .",
                );
            }
        })
    })
}

export const getSingleGoalWithUpdatesById = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/WithUpdates/${id}`, {
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
                    "An unknown error occurred while trying to get you goal."
                )
            }
        })
    })
}