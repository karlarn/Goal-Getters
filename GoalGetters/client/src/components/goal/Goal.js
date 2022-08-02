import React from "react";
import { Card, CardBody, Button } from "reactstrap";
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
                    <p>Your Goal: {goal.goalToMeet}</p>
                    <p>Worst Case Scenario: {goal.worstCaseScenario}</p>
                    <p>I Feel You: {goal.likes.length}</p>
                    <p>Created: {goal.dateCreated.slice([0], [10])}</p>
                    <p>Expected Completion Date: {goal.expectedCompletionDate.slice([0], [10])}</p>
                    <p>Completion Date: {goal.completionDate === "0001-01-01T00:00:00" ? "This goal is not completed yet." : `${goal.completionDate.slice([0], [10])}`} </p>
                    
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