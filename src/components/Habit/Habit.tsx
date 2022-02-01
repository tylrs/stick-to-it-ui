import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Habit.css";
import { HabitType } from "../../utils/types";

const Habit: React.FC<{habit: HabitType}> = ({ habit }) => {


    return (
        <article className="habit-container">
            <h3>Habit: {habit.name}</h3>
            <p>Description: {habit.description}</p>
        </article>
    )
}

export default Habit