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
        <>
            <Card>
                <CardBody>
                    <p>Your goal: {goal.goalToMeet}</p>
                    <p>Expected completion date: {goal.expectedCompletionDate.slice([0], [10])}</p>
                    <p>Worst Case: {goal.worstCaseScenario}</p>
                    <p>Created on: {goal.dateCreated.slice([0], [10])}</p>
                    <Button onClick={() => navigate(`/goalwithupdates/${goal.id}`)}>
                        View Updates
                    </Button>
                    {goal.completionDate === "0001-01-01T00:00:00" ? <> <Button onClick={() => navigate(`/goal/addupdate/${goal.id}`)}>
                        Add Update
                    </Button>
                        <Button onClick={() => navigate(`/edit/${goal.id}`)}>
                            Edit Goal
                        </Button>
                        <Button onClick={() => completeGoal(goal.id)}>
                            Accomplish Goal
                        </Button> </> : ""}
                    <Button onClick={() =>
                        removeGoal(goal.id)}>
                        Delete Goal
                    </Button>
                </CardBody>
            </Card>
        </>
    )
}

export default Goal;