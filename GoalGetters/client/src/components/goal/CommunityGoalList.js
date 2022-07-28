import React, { useEffect, useState } from "react";
import { getAllGoals } from "../../modules/goalManager";
import Goal from "./Goal";
import CommunityGoal from "./communityGoal";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import firebase from "firebase/app";
import "firebase/auth";

export const CommunityGoalList =() => {
    const navigate = useNavigate();

    const [goals, setGoals] = useState([]);
    const [user, setUser] = useState();

    const getCommunityGoals = () => {
        getAllGoals().then(g => setGoals(g))
    }

    const setCurrentUserEmail = () => {
        const currentUser = firebase.auth().currentUser.email;
        setUser(currentUser);
    }

    useEffect(() => {
        getCommunityGoals();
        setCurrentUserEmail();
    }, [])

    return (
        <>
            <Button onClick={() => navigate(`/create`)}>Add Goal</Button>
            <div className="container">
                
                    {goals.map((singleGoal) => (
                        <div key={singleGoal.id}>
                        {
                            user === singleGoal.userProfile.email ? <Goal goal={singleGoal}  /> : <CommunityGoal goal={singleGoal} />
                        }
                        
                        </div> ))}
                
            </div>
        </>
    )
}
