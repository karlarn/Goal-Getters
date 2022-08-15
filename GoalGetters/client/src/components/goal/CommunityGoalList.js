import React, { useEffect, useState } from "react";
import { getAllGoals } from "../../modules/goalManager";
import Goal from "./Goal";
import CommunityGoal from "./CommunityGoal";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { getCurrentUserId } from "../../modules/authManager";

// Renders a list of all the goals created.
export const CommunityGoalList = () => {
    // navigates to a different URL fetch request.
    const navigate = useNavigate();

    // Holds an array of goal objects
    const [goals, setGoals] = useState([]);
    // Holds a single interger
    const [userId, setUserId] = useState();

    // uses the getAllGoals method from goalManager, after the fetch returns an array of goal objects it is set in the goals useState.
    const getCommunityGoals = () => {
        getAllGoals().then(g => setGoals(g))
    }

    // Fetches the Id of the logged in user from authManager, then sets the userId useState to an interger. 
    const setCurrentUserId = () => {
        getCurrentUserId().then((res) => setUserId(res.id))
    }

    // When you navigate to "/communitygoals" after the page loads, will call these two methods to set the useState.
    useEffect(() => {
        getCommunityGoals();
        setCurrentUserId();
    }, [])

    return (
        <>
            <div className="container">
            <Button color="success" size="lg" onClick={() => navigate(`/create`)}>Add Goal</Button>
            {/* maps out the array of objects in the goals useState. Depending on the userProfile Id of the goal it will render one of two cards  */}
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
