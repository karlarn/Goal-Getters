import React from "react";
import { Card, CardBody, Button, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { deleteGoal, updateCompletion } from "../../modules/goalManager";
import { DateRestructure } from "../Utils";

// goal card for rendering goals that belong specifically to the logged in user.
const Goal = ({ goal }) => {
    // navigates to different Url requests
    const navigate = useNavigate();

    // uses the deleteGoal fetch in the goalManager to delete a specific goal after that request returns the page reloads.
    const removeGoal = (id) => {
        deleteGoal(id)
            .then(() => window.location.reload())

    }

    // updateCompletion fetch call in goalManager changes the completeion date from null to an actual timestamp. After the request returns the page reloads.
    const completeGoal = (goal) => {
        updateCompletion(goal)
            .then(() => window.location.reload())
    }

    // The visual render of a card using a singular object that was passed through
    return (
            <Card color="light" className="mb-1">
                <CardBody>
                    <Row>
                    <Col>
                    <b>Your Goal:</b><p>{goal.goalToMeet}</p>
                    <b>Worst Case Scenario:</b><p>{goal.worstCaseScenario}</p>
                    <p><b>I Feel You:</b> {goal.likes.length}</p>
                    </Col>
                    <Col>
                    <p><b>Created:</b> {DateRestructure(goal.dateCreated)}</p>
                    <p><b>Expected Completion Date:</b> {DateRestructure(goal.expectedCompletionDate)}</p>
                    <p><b>Completion Date:</b> {goal.completionDate === "0001-01-01T00:00:00" ? "This goal is not completed yet." : `${DateRestructure(goal.completionDate)}`} </p>
                    </Col>
                    </Row>
                    <Button outline color="warning" onClick={() => navigate(`/goalwithupdates/${goal.id}`)}>
                        View Updates
                    </Button>
                    {goal.completionDate === "0001-01-01T00:00:00" ? <> <Button outline color="warning" onClick={() => navigate(`/goal/addupdate/${goal.id}`)}>
                        Add Update
                    </Button>
                        <Button outline color="success" onClick={() => navigate(`/edit/${goal.id}`)}>
                            Edit Goal
                        </Button>
                        <Button outline color="success" onClick={() => completeGoal(goal.id)}>
                            Accomplish Goal
                        </Button> </> : ""}
                    <Button outline color="danger" onClick={() =>
                        removeGoal(goal.id)}>
                        Delete Goal
                    </Button>
                </CardBody>
            </Card>
    )
}

export default Goal;