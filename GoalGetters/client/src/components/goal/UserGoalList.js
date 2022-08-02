import React, { useEffect, useState } from "react";
import { getGoalsById } from "../../modules/goalManager";
import Goal from "./Goal";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export default function UserGoalList() {
    const navigate = useNavigate();

    const [goals, setGoals] = useState([]);

    const getUserGoals = () => {
        getGoalsById().then(g => setGoals(g));
    }

    useEffect(() => {
        getUserGoals()

    }, [])

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