import React from "react";
import { Card, CardBody, Button, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { deleteGoal, updateCompletion } from "../../modules/goalManager";


const Goal = ({ goal }) => {
    const navigate = useNavigate();

    const removeGoal = (id) => {
        deleteGoal(id)
            .then(() => window.location.reload())

    }

    const completeGoal = (goal) => {
        updateCompletion(goal)
            .then(() => window.location.reload())
    }

    return (
            <Card>
                <CardBody>
                    <Row>
                    <Col>
                    <b>Your Goal:</b><p className="nobr">{goal.goalToMeet}</p>
                    <b>Worst Case Scenario:</b><p>{goal.worstCaseScenario}</p>
                    <p><b>I Feel You:</b> {goal.likes.length}</p>
                    </Col>
                    <Col>
                    <p><b>Created:</b> {goal.dateCreated.slice([0], [10])}</p>
                    <p><b>Expected Completion Date:</b> {goal.expectedCompletionDate.slice([0], [10])}</p>
                    <p><b>Completion Date:</b> {goal.completionDate === "0001-01-01T00:00:00" ? "This goal is not completed yet." : `${goal.completionDate.slice([0], [10])}`} </p>
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