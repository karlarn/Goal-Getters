import React, { useEffect, useState } from "react";
import { getSingleGoalWithUpdatesById, deleteGoal, updateCompletion } from "../../modules/goalManager"
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { DateRestructure } from "../Utils";


// exported to application views 
export default function UserGoalUpdateList() {
    
    //Part of react router dom library 
    const navigate = useNavigate();

    // Same
    const { id } = useParams();

    // Empty receptical for an object until useEffect 
    const [goal, setGoal] = useState();

    // Attached to a button's onClick Imported from goalManager, fetch call for deleting a single goal then once the request comes back you change the UrL
    const removeGoal = (id) => {
        deleteGoal(id)
            .then(() => navigate("/"))

    }

    // Called in an onClick. Updates a single key. Reloads page, try to figure out how to not make the page jump  
    const completeGoal = (goal) => {
        updateCompletion(goal)
            .then(() => window.location.reload())
    }


    // Fetches a specific goal object with a list of update objects nested in
    const getUserGoalWithUpdates = () => {
        getSingleGoalWithUpdatesById(id).then(res => setGoal(res));
    }

    // From the react library
    useEffect(() => {
        getUserGoalWithUpdates()

    }, [])

    // HTML with reactstrap
    return (
        <>
            
            <div className="container">
            {goal?.completionDate === "0001-01-01T00:00:00" ? <Button color="warning" onClick={() => navigate(`/goal/addupdate/${goal.id}`)}>Add Update</Button> : <h1>You Met This Goal!</h1>}
                <div>
                    <Card color="light">
                        <CardBody>
                            <Row>
                                <Col>
                            <b>Your goal:</b><p> {goal?.goalToMeet}</p>
                            <b>Worst Case Scenario:</b><p> {goal?.worstCaseScenario}</p>
                            </Col>
                            <Col>
                            <p><b>Created:</b> {goal?.dateCreated?DateRestructure(goal.dateCreated):""}</p>
                            <p><b>Expected completion date:</b> {goal?.expectedCompletionDate?DateRestructure(goal.expectedCompletionDate):""}</p>
                            </Col>
                            </Row>
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
                            {goal?.goalUpdates === null ? <p>There are no updates for this goal.</p> : <>
                            <p>___________________________</p>
                                {
                                    goal?.goalUpdates.map(update => (
                                        <div key={update.id}>
                                            <p><b>Updated:</b> {DateRestructure(update.timestamp)}</p>
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