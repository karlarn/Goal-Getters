import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { addGoalUpdate } from "../../modules/updateManager"

export const GoalUpdateForm = () => {
    const [update, setUpdate] = useState({
        whatHaveYouDone: "",
        goalId: 0
    })

    const navigate = useNavigate();
    const { id } = useParams()

    const handleInputChange = (e) => {
        const newUpdate = { ...update }
        let selectedVal = e.target.value
        newUpdate[e.target.id] = selectedVal
        setUpdate(newUpdate)
    }

    const handleClickSave = (e) => {
        if (update.whatHaveYouDone === "") {
            window.alert("Please fill out all fields.")
        }
        else {
            update.goalId = id;
            addGoalUpdate(update).then(() => navigate(`/`))
        }
    }

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