import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Goal = ({goal}) => {
    const navigate = useNavigate();
    return (
        <>
        <Card>
            <CardBody>
                <p>Goal: {goal.goalToMeet}</p>
                <p>Expected completion date: {goal.expectedCompletionDate.slice([0],[10])}</p>
                <p>Worst Case: {goal.worstCaseScenario}</p>
                <p>Created on: {goal.dateCreated.slice([0],[10 ])}</p>
                <Button  onClick={() => navigate(`/goal/edit/${goal.id}`)}>
                    View Updates
                </Button>
                <Button  onClick={() => navigate(`/goal/edit/${goal.id}`)}>
                    Add Update
                </Button>
                <Button  onClick={() => navigate(`/goal/edit/${goal.id}`)}>
                    Edit Goal
                </Button>
                <Button  onClick={() => navigate(`/goal/edit/${goal.id}`)}>
                    Accomplish Goal
                </Button>
                <Button  onClick={() => navigate(`/goal/edit/${goal.id}`)}>
                    Delete Goal
                </Button>
            </CardBody>
        </Card>
        </>
    )
}

export default Goal;