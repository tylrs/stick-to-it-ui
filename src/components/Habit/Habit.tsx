import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Habit.css";
import { HabitLogType, HabitType } from "../../utils/types";
import HabitLog from "../HabitLog/HabitLog";
import { componentsOfWeek } from "../../utils/miscConstants";

const Habit: React.FC<{habitInfo: HabitType, habitLogsInfo: HabitLogType[], handleDelete: any}> = ({ habitInfo, habitLogsInfo, handleDelete }) => {
    const allLogs = habitLogsInfo.reduce((acc, currentLog) => {
        const day = new Date(currentLog.scheduled_at).getDay()
        acc[day] = <HabitLog habitLogInfo={currentLog} userId={habitInfo.userId} dayNum={day} key={day}/>
        return acc
    }, componentsOfWeek)

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