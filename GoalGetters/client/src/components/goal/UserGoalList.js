import React, { useEffect, useState } from "react";
import { getGoalsById } from "../../modules/goalManager";
import Goal from "./Goal";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

// Exported to application views for the landing page
export default function UserGoalList() {
    const navigate = useNavigate();

    // empty array of goals until useState is called at the bottom
    const [goals, setGoals] = useState([]);

    // Method for using an import from goalManager. Fetches all the goals of the logged in user. User is not identified in the front end. 
    const getUserGoals = () => {
        getGoalsById().then(g => setGoals(g));
    }

    // Built in method from the react library
    useEffect(() => {
        getUserGoals()

    }, [])

    // HtMl and library stuff
    return (
            <div className="container">
            <Button color="success" size="lg" onClick={() => navigate(`/create`)}>Add Goal</Button>
                <div>
                    {goals.map((singleGoal) => (
                        <Goal goal={singleGoal} key={singleGoal.id} />
                    ))}
                </div>
            </div>
    )
}