import React, { useEffect, useState } from "react";
import { getSingleGoalWithUpdatesById, deleteGoal, updateCompletion } from "../../modules/goalManager"
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";

export default function UserGoalUpdateList() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [goal, setGoal] = useState();

    const removeGoal = (id) => {
        deleteGoal(id)
            .then(() => navigate("/"))

    }

    const completeGoal = (goal) => {
        updateCompletion(goal)
            .then(() => window.location.reload())
    }



    const getUserGoalWithUpdates = () => {
        getSingleGoalWithUpdatesById(id).then(res => setGoal(res));
    }

    useEffect(() => {
        getUserGoalWithUpdates()

    }, [])

    return (
        <>
            
            <div className="container">
            {goal?.completionDate === "0001-01-01T00:00:00" ? <Button color="warning" onClick={() => navigate(`/goal/addupdate/${goal.id}`)}>Add Update</Button> : <h1>You Met This Goal!</h1>}
                <div>
                    <Card>
                        <CardBody>
                            <p>Your goal: {goal?.goalToMeet}</p>
                            <p>Expected completion date: {goal?.expectedCompletionDate.slice([0], [10])}</p>
                            <p>Worst Case: {goal?.worstCaseScenario}</p>
                            <p>Created on: {goal?.dateCreated.slice([0], [10])}</p>

                            {goal?.completionDate === "0001-01-01T00:00:00" ? <>
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
                        <CardBody>
                            {goal?.goalUpdates === null ? <p>There are no updates for this goal.</p> : <><h3>Update:</h3>
                            <p>___________________________</p>
                                {
                                    goal?.goalUpdates.map(update => (
                                        <div key={update.id}>
                                            <p>Updated: {update.timestamp.slice([0], [10])}</p>
                                            <p>{update.whatHaveYouDone}</p>
                                            <p>___________________________</p>
                                        </div>
                                    ))
                                }
                            </>
                            }
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    )
}