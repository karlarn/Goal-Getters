import "firebase/auth";
import { getToken } from "./authManager";

const baseUrl = '/api/Goal';

// Returns an array of goal objects that share a specific Id 
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

// Returns an array of all goals in the DB
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

// Posts a new goal object to the DB
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

// returns an object of one single specific goal
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

// Puts new information into something already existing in the DB
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

// Deletes a specific goal in the Db using the id as a reference
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

// Puts new information into an already existing cell by a specific Id
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

// Gets a single specific goal object with an array of updates attached to it
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