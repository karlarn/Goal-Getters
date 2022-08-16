import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { addGoal } from "../../modules/goalManager";
import { getDifficultyLevels } from "../../modules/difficultyLevelManager";

// create path exported to ApplicationView
export const GoalForm = () => {

    // An array and an object to be filled with a useEffect
    const [dLevels, setDLevel] = useState([])
    const [goal, setGoal] = useState({
        goalToMeet: "",
        difficultyLevelId: 0,
        expectedCompletionDate: "",
        worstCaseScenario: "",
    })

    // Navigates to different paths 
    const navigate = useNavigate();

    // When change happens in an input field the goal object is updated where the value and the id match and set to a new state. 
    const handleInputChange = (e) => {
        const newGoal = { ...goal }
        let selectedVal = e.target.value
        newGoal[e.target.id] = selectedVal
        setGoal(newGoal)
    }

    // Specific button is clicked. As long as everything is filled out the addGoal method is called in the goalManager. Once there is a response you navigate the the "/" path. 
    const handleClickSave = (e) => {
        if (goal.ExpectedCompletionDate === "" || goal.goalToMeet === "" || goal.difficultyLevelId === 0) {
            window.alert("Please fill out all fields.")
        }
        else {
            addGoal(goal).then(() => navigate(`/`))
        }
    }

    // when the view first loads the method in difficultyLevelManager is called and its set to the useState. Prolly refactor.
    useEffect(() => {
        getDifficultyLevels()
            .then(lvl => setDLevel(lvl))
    }, [])
    // Html view
    return (
        <div className="container">
            <h1>Make That Goal!</h1>
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
                    {/* useState of dLevels mapped out */}
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
                <Button color="success" onClick={() => handleClickSave()}>Create New Goal </Button>
                <Button color="danger" onClick={() => navigate(`/`)}>Cancel</Button>
            </FormGroup>
        </Form>
        </div>
    )
}