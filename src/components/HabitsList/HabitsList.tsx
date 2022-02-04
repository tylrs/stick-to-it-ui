import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteHabit, getAllHabits, login } from "../../utils/apiCalls";
import "./HabitsList.css";
import { HabitsType, UserType } from "../../utils/types";
import Habit from "../Habit/Habit";

const HabitsList: React.FC<{userId: number}> = ({ userId }) => {
    const [allHabits, setAllHabits] = useState<HabitsType>([]);

    const handleDelete = async (habitId: number) => {
        await deleteHabit(userId, habitId)
        let updatedHabits = allHabits.filter((habit) => habit.id !== habitId)
        setAllHabits(updatedHabits)
    }

    const formattedHabits = allHabits.map(habit => <Habit habit={habit} key={habit.id} handleDelete={handleDelete}/>)

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
            <div className="habits-list-title"><h2>Habits List</h2></div>
            {formattedHabits.length ? formattedHabits : <p>No Habits Created Yet</p>}
            <Link className="create-new-habit-button" to="/create-habit"><button>Create New Habit</button></Link>
        </section>
    )
}

export default HabitsList