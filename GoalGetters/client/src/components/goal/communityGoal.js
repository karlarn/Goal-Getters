import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { addLike, removeLike } from "../../modules/iFeelYouManager";

const CommunityGoal = ({ goal, currentUser }) => {

    const addTheFeels = (id) => {
        addLike(id)
            .then(() => window.location.reload())

    }

    const removeTheFeels = (id) => {
        removeLike(id)
            .then(() => window.location.reload())
    }

    return (
        <>
            <Card >
                <CardBody >
                    <p>{goal.userProfile.fullName}'s Goal: {goal.goalToMeet}</p>
                    <p>Worst Case Senario: {goal.worstCaseScenario}</p>
                    <p>Created: {goal.dateCreated.slice([0], [10])}</p>
                    <p>Expected Completion Date: {goal.expectedCompletionDate.slice([0], [10])}</p>
                    <p>Completion Date: {goal.completionDate === "0001-01-01T00:00:00" ? "This goal is not completed yet." : `${goal.completionDate.slice([0], [10])}`} </p>
                    {goal.likes.find((obj) => obj.userProfileId === currentUser) ? <Button color="primary" onClick={() => removeTheFeels(goal.id)}>{`Unfeel (${goal.likes.length})`}</Button> : <Button outline color="primary" onClick={() => addTheFeels(goal.id)}>{`I Feel You (${goal.likes.length})`}</Button>}
                </CardBody>
            </Card>
        </>
    )
}

export default CommunityGoal;