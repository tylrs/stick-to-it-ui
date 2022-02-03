import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Habit.css";
import { HabitType } from "../../utils/types";

const Habit: React.FC<{habit: HabitType, handleDelete: any}> = ({ habit, handleDelete }) => {

    return (
        <article className="habit-container">
            <h3 className="habit-name">Habit: {habit.name}</h3>
            <p>Description: {habit.description}</p>
            <button className="habit-delete-button"onClick={() => {handleDelete(habit.id)}}>Delete</button>
        </article>
    )
}

export default Habit