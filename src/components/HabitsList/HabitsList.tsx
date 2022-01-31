import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../utils/apiCalls";
import "./HabitsList.css";
import { UserType } from "../../utils/types";

const HabitsList = () => {

    return (
        <section className="habits-list-page-container">
            <h2>HabitsList</h2>
            <Link to="/create-habit"><button>Create New Habit</button></Link>
        </section>
    )
}

export default HabitsList