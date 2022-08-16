import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { addGoalUpdate } from "../../modules/updateManager"

// view for the path goal/addupdate/:id
export const GoalUpdateForm = () => {
    // Empty object until useEffect
    const [update, setUpdate] = useState({
        whatHaveYouDone: "",
        goalId: 0
    })

    // Part of react router dom library
    // Goes to different paths 
    const navigate = useNavigate();

    // takes the information that has a colon and uses it to make fetch calls 
    const { id } = useParams()

    // When input fields get changed the object gets changed
    const handleInputChange = (e) => {
        const newUpdate = { ...update }
        let selectedVal = e.target.value
        newUpdate[e.target.id] = selectedVal
        setUpdate(newUpdate)
    }

    // If you filled it out all the way it should make a successful request and navigate you to the landing page. 
    const handleClickSave = (e) => {
        if (update.whatHaveYouDone === "") {
            window.alert("Please fill out all fields.")
        }
        else {
            update.goalId = id;
            addGoalUpdate(update).then(() => navigate(`/`))
        }
    }

    // Html render
    return (
        <div className="container">
            <h1>This Just In!</h1>
        <Form>
            <FormGroup>
                <Label for="whatHaveYouDone">Goal Update:</Label>
                <Input type="text"
                    name="whatHaveYouDone"
                    id="whatHaveYouDone"
                    onChange={handleInputChange}
                    value={update.whatHaveYouDone}
                    placeholder="What have you done to get closer to reaching your goal?" />
            </FormGroup>
            <FormGroup>
                <Button color="success" onClick={() => handleClickSave()}>Create Update </Button>
                <Button color="danger" onClick={() => navigate(`/`)}>Cancel</Button>
            </FormGroup>
        </Form>
        </div>
    )
}