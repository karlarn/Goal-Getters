import React from "react";
import { Card, CardBody, Button } from "reactstrap";

const CommunityGoal = ({goal}) => {
    

    return (
        <>
        <Card>
            <CardBody>
                <p>Goal: {goal.goalToMeet}</p>
                <p>Expected completion date: {goal.expectedCompletionDate.slice([0],[10])}</p>
                <p>Worst Case: {goal.worstCaseScenario}</p>
                <p>Created on: {goal.dateCreated.slice([0],[10 ])}</p>
                <Button>I Feel You</Button>
            </CardBody>
        </Card>
        </>
    )
}

export default CommunityGoal;