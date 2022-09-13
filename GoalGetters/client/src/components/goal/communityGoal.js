import React, {useEffect, useState} from "react";
import { Card, CardBody, Button, Row, Col } from "reactstrap";
import { addLike, removeLike } from "../../modules/iFeelYouManager";
import { DateRestructure } from "../Utils";

// Card for rendering goals in the community board with a singular goal object and a current user interger. 
const CommunityGoal = ({userLike, goal, count }) => {
    const [ youLike, setYouLike ] = useState()
    const [likeCount, setLikeCount] = useState()

    // Calls the addLike method in the goalManager using the goal object's id. If there is no error, the page will reload.  
    const addTheFeels = (id) => {
        addLike(id)
            .then(() => {
                setLikeCount(likeCount+1)
                setYouLike(true)
            })
    }

    // Calls the removeLike method in the goalManager using goal object's id. If there is no error the page will reload. 
    const removeTheFeels = (id) => {
        removeLike(id)
            .then(() =>{
                setLikeCount(likeCount-1)
                setYouLike(false)
            })
            
    }

    const setState = () => {
        setLikeCount(count)
        setYouLike(userLike)            
    }

    useEffect(()=>{
        setState()
    }, [])
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
                            {DateRestructure(goal.dateCreated)}</p>
                            <p><b>Expected Completion Date:</b> {DateRestructure(goal.expectedCompletionDate)}</p>
                            <p><b>Completion Date:</b> {goal.completionDate === "0001-01-01T00:00:00" ? "This goal is not completed yet." : `${DateRestructure(goal.completionDate)}`} </p>
                        </Col>
                    </Row>
                    {/* checks if the current logged in user is in an array of likes. If this is true an "Unfeel" button is rendered. If this is false an "I Feel You" button is rendered. */}
                    {youLike ? <Button color="secondary" onClick={() => removeTheFeels(goal.id)}>{`Unfeel (${likeCount})`}</Button> : <Button color="primary" onClick={( ) => addTheFeels(goal.id)}>{`I Feel You (${likeCount})`}</Button>}
                </CardBody>
            </Card>
        </>
    )
}

export default CommunityGoal;