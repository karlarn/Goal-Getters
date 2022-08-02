import { getSingleGoalById, updateGoal } from "../../modules/goalManager";
import { getDifficultyLevels } from "../../modules/difficultyLevelManager";
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export const GoalEdit = () => {
    const [dL, setDL] = useState([])
    const [goal, setGoal] = useState({
        id: 0,
        goalToMeet: "",
        worstCaseScenario: "",
        difficultyLevelId: 0,
        expectedCompletionDate: "",
        userProfileId: 0
    })

    const navigate = useNavigate()
    const { id } = useParams()

    const getDLs = () => {
        getDifficultyLevels()
            .then(dls => setDL(dls))
    }

    const getGoal = () => {
        getSingleGoalById(id)
            .then(g => setGoal(g))
    }

    const handleInputChange = (e) => {
        const updatedGoal = { ...goal }
        let selectedVal = e.target.value
        updatedGoal[e.target.id] = selectedVal
        setGoal(updatedGoal)
    }

    const handleClickUpdate = () => {
        if (goal.difficultyLevelId === 0 || goal.expectedCompletionDate === "" ||
            goal.goalToMeet === "" || goal.worstCaseScenario === "") {
            window.alert("Fill out all the fields please.")
        } else {
            updateGoal(goal)
                .then(() => navigate("/"))
        }
    }

    useEffect(() => {
        getDLs()
        getGoal()
    }, [])

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