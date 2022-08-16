import { getSingleGoalById, updateGoal } from "../../modules/goalManager";
import { getDifficultyLevels } from "../../modules/difficultyLevelManager";
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

// renders the edit/:id url request
export const GoalEdit = () => {
    // The use state is set to an empty array until the useEffect takes effect
    const [dL, setDL] = useState([])
    // The useState is set to an empty object before the useEffect
    const [goal, setGoal] = useState({
        id: 0,
        goalToMeet: "",
        worstCaseScenario: "",
        difficultyLevelId: 0,
        expectedCompletionDate: "",
        userProfileId: 0
    })
    // navigates to different views of the page 
    const navigate = useNavigate()
    // gets the id out of the Url. The colon in the path in application views is the trigger. 
    const { id } = useParams()

    // Calls a fetch method in difficultyLevelManager to return an array of Levels
    const getDLs = () => {
        getDifficultyLevels()
            .then(dls => setDL(dls))
    }

    // Uses the useParams to make a fetch call in goalManager that returns a specific object then sets the useState of the goal
    const getGoal = () => {
        getSingleGoalById(id)
            .then(g => setGoal(g))
    }

    // Method to the onChange for each input. updatedGoal is whatever is in the useState. selectedValue is the information in the input at the time. updated goal gets changed where the name of the value matches the name of the id in the input. You set the useState of the goal to the modified object. 
    const handleInputChange = (e) => {
        const updatedGoal = { ...goal }
        let selectedVal = e.target.value
        updatedGoal[e.target.id] = selectedVal
        setGoal(updatedGoal)
    }

    // Method for the onClick of a specific button if everything is filled out then itll update using the updateGoal in goalManager. otherwise you get an alert. 
    const handleClickUpdate = () => {
        if (goal.difficultyLevelId === 0 || goal.expectedCompletionDate === "" ||
            goal.goalToMeet === "" || goal.worstCaseScenario === "") {
            window.alert("Fill out all the fields please.")
        } else {
            updateGoal(goal)
                .then(() => navigate("/"))
        }
    }
    // This could me one call in a useEffect, I'll fix it later. 
    useEffect(() => {
        getDLs()
        getGoal()
    }, [])

    // Html 
    return (
        <div className="container">
            <Form>
                <h3>Edit Your Goal</h3>
                <FormGroup>
                    <Label for="goalToMeet">Goal To Meet</Label>
                    <Input
                        id="goalToMeet"
                        type="text"
                        onChange={handleInputChange}
                        value={goal.goalToMeet}
                    />
                    <Label for="worstCaseScenario">Worst Case Scenario</Label>
                    <Input
                        id="worstCaseScenario"
                        type="text"
                        onChange={handleInputChange}
                        value={goal.worstCaseScenario}
                    />
                    <Label for="expectedCompletionDate">Expected Completion Date</Label>
                    <Input
                        id="expectedCompletionDate"
                        type="date"
                        onChange={handleInputChange}
                        value={goal.expectedCompletionDate.slice([0], [10])}
                    />
                    <Label for="difficultyLevelId">Difficulty Level</Label><br />
                    <select value={goal.difficultyLevelId}
                        name="difficultyLevel"
                        id="difficultyLevelId"
                        onChange={handleInputChange}>
                        <option value="0">Select A Difficulty Level</option>
                        {dL.map(d => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </FormGroup>
                <FormGroup>
                    <Button
                        color="success" onClick={() => handleClickUpdate()}>Update
                    </Button>
                    <Button
                        color="danger" onClick={() => navigate("/")}>Cancel
                    </Button>
                </FormGroup>
            </Form>
        </div>
    )
}