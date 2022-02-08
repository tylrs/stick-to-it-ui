import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Habit.css";
import { HabitLogType, HabitType } from "../../utils/types";
import HabitLog from "../HabitLog/HabitLog";

const Habit: React.FC<{habitInfo: HabitType, habitLogs: HabitLogType[], handleDelete: any}> = ({ habitInfo, habitLogs, handleDelete }) => {
    const allLogs = habitLogs.map((habitLogInfo) => <HabitLog habitLogInfo={habitLogInfo} key={habitLogInfo.id}/>)

    return (
        <article className="habit-container">
            <h3 className="habit-name">Habit: {habitInfo.name}</h3>
            <p>Description: {habitInfo.description}</p>
            {allLogs}
            <button className="habit-delete-button"onClick={() => {handleDelete(habitInfo.id)}}>Delete</button>
        </article>
    )
}

export default Habit