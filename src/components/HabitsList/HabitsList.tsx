import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllHabits, login } from "../../utils/apiCalls";
import "./HabitsList.css";
import { HabitsType, UserType } from "../../utils/types";
import { json } from "stream/consumers";

const HabitsList: React.FC<{userId: number}> = ({ userId }) => {
    const [allHabits, setAllHabits] = useState<HabitsType>([]);

    const fetchHabits = async () => {
        try {
            const data = await getAllHabits(userId)
            setAllHabits(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!allHabits.length && userId) {
            fetchHabits()
        }
    }, [allHabits])

    return (
        <section className="habits-list-page-container">
            <h2>Habits List</h2>
            <Link to="/create-habit"><button>Create New Habit</button></Link>
        </section>
    )
}

export default HabitsList