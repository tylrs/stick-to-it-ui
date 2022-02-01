import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllHabits, login } from "../../utils/apiCalls";
import "./HabitsList.css";
import { UserType } from "../../utils/types";

const HabitsList: React.FC<{userId: number}> = ({ userId }) => {

    useEffect(() => {
        getAllHabits(userId)
    })

    return (
        <section className="habits-list-page-container">
            <h2>Habits List</h2>
            <Link to="/create-habit"><button>Create New Habit</button></Link>
        </section>
    )
}

export default HabitsList