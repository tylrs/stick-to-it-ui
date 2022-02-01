import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Habit.css";
import { HabitType } from "../../utils/types";

const Habit: React.FC<{habit: HabitType}> = ({ habit }) => {


    return (
        <article className="habit-container">
            <h3>{habit.name}</h3>
            <p>{habit.description}</p>
        </article>
    )
}

export default Habit