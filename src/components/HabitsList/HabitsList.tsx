import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllHabits, login } from "../../utils/apiCalls";
import "./HabitsList.css";
import { HabitsType, UserType } from "../../utils/types";
import Habit from "../Habit/Habit";

const HabitsList: React.FC<{userId: number}> = ({ userId }) => {
    const [allHabits, setAllHabits] = useState<HabitsType>([]);

    const formattedHabits = allHabits
        ? allHabits.map(habit => <Habit habit={habit} key={habit.id}/>)
        : []

    const fetchHabits = async () => {
        try {
            const data = await getAllHabits(userId)
            setAllHabits(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (userId) {
            fetchHabits()
        }
    }, [])

    return (
        <section className="habits-list-page-container">
            <h2>Habits List</h2>
            {formattedHabits.length ? formattedHabits : <p>No Habits Created Yet</p>}
            <Link to="/create-habit"><button>Create New Habit</button></Link>
        </section>
    )
}

export default HabitsList