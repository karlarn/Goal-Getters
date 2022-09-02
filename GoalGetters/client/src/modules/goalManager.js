import "firebase/auth";
import { getToken } from "./authManager";

const baseUrl = '/api/Goal';

// Returns an array of goal objects that share a specific Id 
export const getGoalsById = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/UserGoals`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(
                    "An error occurred while trying to get your goals."
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
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get community goals.",
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
                    "Something went wrong while trying to create your post."
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
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(
                    "An error occurred while trying to get this goal."
                )
            }
        })
    })
}

// Puts new information into columns of a row that already exists in the DB
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
                throw new Error("You are unauthorized to edit this goal.")
            }
            else {
                throw new Error(
                    "Something went wrong while trying to update your existing goal.",
                );
            }
        })
    })
}

// Deletes a specific goal row in the Db using the id as a reference
export const deleteGoal = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.ok) {
            }
            else {
                throw new Error(
                    "Something went wrong while trying to delete your goal."
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
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.ok) {
            }
            else {
                throw new Error(
                    "Something went wrong while trying to update your completion date.",
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
                    "An unknown error occurred while trying to get your goal."
                )
            }
        })
    })
}