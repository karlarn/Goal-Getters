import React from "react";
import { Card, CardBody, Button, Row, Col } from "reactstrap";
import { addLike, removeLike } from "../../modules/iFeelYouManager";

// Card for rendering goals in the community board with a singular goal object and a current user interger. 
const CommunityGoal = ({ goal, currentUser }) => {

    // Calls the addLike method in the goalManager using the goal object's id. If there is no error, the page will reload.  
    const addTheFeels = (id) => {
        addLike(id)
            .then(() => window.location.reload())

    }

    // Calls the removeLike method in the goalManager using goal object's id. If there is no error the page will reload. 
    const removeTheFeels = (id) => {
        removeLike(id)
            .then(() => window.location.reload())
    }

    // The visual render of the card using the singular object that was passed through along with the currentUser id.
    return (
        <>
            <Card color="light" className="mb-1">
                <CardBody >
                    <Row>
                        <Col>
                            <b>{goal.userProfile.fullName}'s Goal:</b>
                            <p> {goal.goalToMeet}</p>
                            <b>Worst Case Senario:</b>
                            <p> {goal.worstCaseScenario}</p>
                        </Col>
                        <Col>
                            <p><b>Created:</b> 
                            {goal.dateCreated.slice([0], [10])}</p>
                            <p><b>Expected Completion Date:</b> {goal.expectedCompletionDate.slice([0], [10])}</p>
                            <p><b>Completion Date:</b> {goal.completionDate === "0001-01-01T00:00:00" ? "This goal is not completed yet." : `${goal.completionDate.slice([0], [10])}`} </p>
                        </Col>
                    </Row>
                    {/* checks if the current logged in user is in an array of likes. If this is true an "Unfeel" button is rendered. If this is false an "I Feel You" button is rendered. */}
                    {goal.likes.find((obj) => obj.userProfileId === currentUser) ? <Button color="primary" onClick={() => removeTheFeels(goal.id)}>{`Unfeel (${goal.likes.length})`}</Button> : <Button outline color="primary" onClick={() => addTheFeels(goal.id)}>{`I Feel You (${goal.likes.length})`}</Button>}
                </CardBody>
            </Card>
        </>
    )
}

export default CommunityGoal;