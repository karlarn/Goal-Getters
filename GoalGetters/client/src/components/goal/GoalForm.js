import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { addGoal } from "../../modules/goalManager";
import { getDifficultyLevels } from "../../modules/difficultyLevelManager";

export const GoalForm = () => {
    const [dLevels, setDLevel] = useState([])
    const [goal, setGoal] = useState({
        goalToMeet: "",
        difficultyLevelId: 0,
        expectedCompletionDate: "",
        worstCaseScenario: "",
    })

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const newGoal = { ...goal }
        let selectedVal = e.target.value
        newGoal[e.target.id] = selectedVal
        setGoal(newGoal)
    }

    const handleClickSave = (e) => {
        if (goal.ExpectedCompletionDate === "" || goal.goalToMeet === "" || goal.difficultyLevelId === 0) {
            window.alert("Please fill out all fields.")
        }
        else {
            addGoal(goal).then(() => navigate(`/`))
        }
    }

    useEffect(() => {
        getDifficultyLevels()
            .then(lvl => setDLevel(lvl))
    }, [])

    return (
        <Form>
            <FormGroup>
                <Label for="goalToMeet">Goal to meet:</Label>
                <Input type="text"
                    name="goalToMeet"
                    id="goalToMeet"
                    onChange={handleInputChange}
                    value={goal.goalToMeet}
                    placeholder="What is the goal you would like to set for yourself?" />
            </FormGroup>
            <FormGroup>
                <Label for="worstCaseScenario">Worst case scenario:</Label>
                <Input type="text"
                    name="worstCaseSenario"
                    id="worstCaseScenario"
                    onChange={handleInputChange}
                    value={goal.worstCaseScenario}
                    placeholder="If you don't meet your goal, what's the worst that could happen?" />
            </FormGroup>
            <FormGroup>
                <Label for="difficultyLevelId">Difficulty level:</Label><br />
                <select value={goal.difficultyLevelId} name="difficultyLevels" id="difficultyLevelId" form="dLForm" onChange={handleInputChange}>
                    <option value="0">Select a Category</option>
                    {dLevels.map(dl => (
                        <option key={dl.id} value={dl.id}>
                            {dl.name}
                        </option>
                    ))}
                </select>
            </FormGroup>
            <FormGroup>
                <Label for="expectedCompletionDate">Expected completion date:</Label>
                <Input type="date"
                    name="expectedCompletionDate"
                    id="expectedCompletionDate"
                    onChange={handleInputChange}
                    value={goal.expectedCompletionDate}
                />
            </FormGroup>
            <FormGroup>
                <Button onClick={() => handleClickSave()}>Create New Goal </Button>
                <Button onClick={() => navigate(`/`)}>Cancel</Button>
            </FormGroup>
        </Form>
    )
}