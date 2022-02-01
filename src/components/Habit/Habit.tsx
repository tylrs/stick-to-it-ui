import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Habit.css";
import { HabitType } from "../../utils/types";

const Habit: React.FC<HabitType> = ({ name, description, startDate }) => {


    return (
        <section className="habit-container">
            <h2>{name}</h2>
            <p>{description}</p>
        </section>
    )
}

export default Habit