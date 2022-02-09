import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteHabit, getAllHabits } from "../../utils/apiCalls";
import "./HabitsList.css";
import { HabitsType } from "../../utils/types";
import Habit from "../Habit/Habit";
import { getLastSunday } from "../../utils/miscUtils";

const HabitsList: React.FC<{userId: number}> = ({ userId }) => {
    const [allHabits, setAllHabits] = useState<HabitsType[]>([]);

    const handleDelete = async (habitId: number) => {
        await deleteHabit(userId, habitId)
        let updatedHabits = allHabits.filter((habit) => habit.id !== habitId)
        setAllHabits(updatedHabits)
    }

    const formattedHabits = allHabits.map(habit => 
        <Habit 
            habitInfo={habit} 
            key={habit.id} 
            habitLogsInfo={habit.habit_logs} 
            handleDelete={handleDelete}
        />)

    const fetchHabits = async () => {
        try {
            const data = await getAllHabits(userId)
            if (data.length) {
                setAllHabits(data)
            } else {
                throw Error("")
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!allHabits.length && userId) {
            fetchHabits()
        }
    })

    return (
        <section className="habits-list-page-container">
            <div className="habits-list-title">
                <h2>Week Of:</h2>
                <p>{getLastSunday()}</p>
            </div>
            {formattedHabits.length ? formattedHabits : <p>No Habits Created Yet</p>}
            <Link className="create-new-habit-button" to="/create-habit">Create New Habit</Link>
        </section>
    )
}

export default HabitsList