import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { addLike, removeLike } from "../../modules/iFeelYouManager";

const CommunityGoal = ({goal, currentUser}) => {

    const addTheFeels = (id) => {
        addLike(id)
        .then(()=> window.location.reload())

    }

    const removeTheFeels = (id) => {
        removeLike(id)
        .then(()=> window.location.reload())
    } 

    return (
        <>
        <Card>
            <CardBody> 
                <p>Goal: {goal.goalToMeet}</p> 
                <p>Expected completion date: {goal.expectedCompletionDate.slice([0],[10])}</p>
                <p>Worst Case: {goal.worstCaseScenario}</p>
                <p>Created on: {goal.dateCreated.slice([0],[10 ])}</p>
                {goal.likes.find((obj) =>obj.userProfileId===currentUser) ? <Button onClick={()=>removeTheFeels(goal.id)}>{`Unfeel (${goal.likes.length})`}</Button> : <Button onClick={()=>addTheFeels(goal.id)}>{`I Feel You (${goal.likes.length})`}</Button> }    
            </CardBody>
        </Card>
        </>
    )
}

export default CommunityGoal;