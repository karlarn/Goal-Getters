import React from "react";
import { Card, CardBody, Button, Row, Col } from "reactstrap";
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
                    <Row>
                        <Col>
                     <b>{goal.userProfile.fullName}'s Goal:</b>   
                    <p> {goal.goalToMeet}</p>
                    <b>Worst Case Senario:</b>
                    <p> {goal.worstCaseScenario}</p>
                    </Col>
                    <Col>
                    <p><b>Created:</b> {goal.dateCreated.slice([0], [10])}</p>
                    <p><b>Expected Completion Date:</b> {goal.expectedCompletionDate.slice([0], [10])}</p>
                    <p><b>Completion Date:</b> {goal.completionDate === "0001-01-01T00:00:00" ? "This goal is not completed yet." : `${goal.completionDate.slice([0], [10])}`} </p>
                    </Col>
                    </Row>
                    {goal.likes.find((obj) => obj.userProfileId === currentUser) ? <Button color="primary" onClick={() => removeTheFeels(goal.id)}>{`Unfeel (${goal.likes.length})`}</Button> : <Button outline color="primary" onClick={() => addTheFeels(goal.id)}>{`I Feel You (${goal.likes.length})`}</Button>}
                </CardBody>
            </Card>
        </>
    )
}

export default CommunityGoal;