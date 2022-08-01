import React, { useEffect, useState } from "react";
import { getAllGoals } from "../../modules/goalManager";
import Goal from "./Goal";
import CommunityGoal from "./CommunityGoal";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { getCurrentUserId } from "../../modules/authManager";

export const CommunityGoalList = () => {
    const navigate = useNavigate();

    const [goals, setGoals] = useState([]);
    const [userId, setUserId] = useState();

    const getCommunityGoals = () => {
        getAllGoals().then(g => setGoals(g))
    }

    const setCurrentUserId = () => {
        getCurrentUserId().then((res) => setUserId(res.id))
    }

    useEffect(() => {
        getCommunityGoals();
        setCurrentUserId();
    }, [])

    return (
        <>
            <Button onClick={() => navigate(`/create`)}>Add Goal</Button>
            <div className="container">

                {goals.map((singleGoal) => (
                    <div key={singleGoal.id}>
                        {
                            userId === singleGoal.userProfile.id ? <Goal goal={singleGoal} /> : <CommunityGoal goal={singleGoal} currentUser={userId} />
                        }

                    </div>))}

            </div>
        </>
    )
}
