import "./HabitCreation.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHabit } from "../../utils/apiCalls";
import { blankHabit } from "../../utils/miscConstants";
import { HabitType } from "../../utils/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HabitCreation: React.FC<{userId: number, setMessage: React.Dispatch<React.SetStateAction<string>>}> = ({ userId, setMessage }) => {
    const [habitInfo, setHabitInfo] = useState<HabitType>(blankHabit)
    const navigate = useNavigate();

    const clearInputs = () => {
        setHabitInfo(blankHabit)
    }

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHabitInfo((prevState) => {
            return ({
                ...prevState,
                [e.target.name]: e.target.value
            })
        })
    }
    
    const handleStartDateChange = (date: Date | null) => {
         setHabitInfo((prevState) => {
            return ({
                ...prevState,
                startDate: date
            })
        })
    }

    const handleEndDateChange = (date: Date | null) => {
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
      
    const submitHabitInfo = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const habitData = habitInfo
        habitData.userId = userId
        try {
            await createHabit(habitData)
            navigate("/all-habits")
            setMessage("New Habit Created")
        } catch (err){
            console.log(err)
        }
    }

    return (
        <section className="habit-creation-page-container">
            <h2>Create A Habit</h2>
            <form className="habit-creation-box">
                <input 
                    required
                    className="habit-creation-input"
                    type="text" 
                    name="name" 
                    placeholder="name"
                    value={habitInfo.name}
                    onChange={(e) => handleUserInput(e)}
                />
                <input 
                    required
                    className="habit-creation-input"
                    type="text" 
                    name="description" 
                    placeholder="description"
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
                <button 
                    className="submit-habit-creation"
                    onClick={e => submitHabitInfo(e)}>
                    Create Habit
                </button>
            </form>
        </section>
    )
}

export default HabitCreation