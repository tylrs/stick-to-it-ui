import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createHabit } from "../../utils/apiCalls";
import { blankHabit } from "../../utils/miscConstants";
import { HabitType } from "../../utils/types";
import "./HabitCreation.css";

const HabitCreation: React.FC<{userId: number}> = ({ userId }) => {
    const [habitInfo, setHabitInfo] = useState<HabitType>(blankHabit)

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
      
    const submitHabitInfo = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const habitData = habitInfo
        habitData.userId = userId
        try {
            await createHabit(habitData)
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
                <input 
                    required
                    className="habit-creation-input"
                    type="text" 
                    name="startDate" 
                    placeholder="startDate"
                    value={habitInfo.startDate}
                    onChange={(e) => handleUserInput(e)}
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