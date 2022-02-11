import "./HabitCreation.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHabit } from "../../utils/apiCalls";
import { blankHabit } from "../../utils/miscConstants";
import { HabitType } from "../../utils/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { checkFormSubmission } from "../../utils/miscUtils";

const HabitCreation: React.FC<{userId: number, setMessage: React.Dispatch<React.SetStateAction<string>>}> = ({ userId, setMessage }) => {
    const [habitInfo, setHabitInfo] = useState<HabitType>(blankHabit)
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const clearInputs = () => {
        setHabitInfo(blankHabit)
    }

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("")
        setHabitInfo((prevState) => {
            return ({
                ...prevState,
                [e.target.name]: e.target.value
            })
        })
    }
    
    const handleStartDateChange = (date: Date | null) => {
        setError("")
        setHabitInfo((prevState) => {
            return ({
                ...prevState,
                startDate: date
            })
        })
    }

    const handleEndDateChange = (date: Date | null) => {
        setError("")
        setHabitInfo((prevState) => {
            return ({
                ...prevState,
                endDate: date
            })
        })
    }

    const setMinEndDate = () => {
        let date = new Date()
        if (!habitInfo.startDate) {
            date.setDate(date.getDate() + 1)
            return date
        }
        date.setDate(habitInfo.startDate.getDate() + 1)
        return date
    }
      
    const submitHabitInfo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const habitData = habitInfo
        habitData.userId = userId
        try {
            checkFormSubmission(habitData)
            await createHabit(habitData)
            navigate("/all-habits")
            setMessage("New Habit Created")
        } catch (err:any){
            setError(err.errors)
        }
    }

    return (
        <section className="habit-creation-page-container">
            <h2>Create A Habit</h2>
            {error && <p className="habit-creation-error">{error}</p>}
            <form className="habit-creation-box" onSubmit={e => submitHabitInfo(e)}>
                <input 
                    required
                    className="habit-creation-input"
                    type="text" 
                    name="name" 
                    placeholder="name"
                    maxLength={250}
                    value={habitInfo.name}
                    onChange={(e) => handleUserInput(e)}
                />
                <input 
                    required
                    className="habit-creation-input"
                    type="text" 
                    name="description" 
                    placeholder="description"
                    maxLength={250}
                    value={habitInfo.description}
                    onChange={(e) => handleUserInput(e)}
                />
                <DatePicker
                    required
                    className="date-picker"
                    placeholderText="start date"
                    selected={habitInfo.startDate}
                    minDate={new Date()}
                    onChange={(date) => handleStartDateChange(date)} 
                />
                <DatePicker
                    required
                    className="date-picker"
                    placeholderText="end date inclusive"
                    selected={habitInfo.endDate}
                    minDate={setMinEndDate()}
                    onChange={(date) => handleEndDateChange(date)} 
                />
                <button className="submit-habit-creation">
                    Create Habit
                </button>
            </form>
        </section>
    )
}

export default HabitCreation