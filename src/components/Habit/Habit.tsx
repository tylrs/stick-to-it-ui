import React, { useEffect, useState } from "react";
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
            <div className="habit-info-container">
                <h3 className="habit-name">{habitInfo.name}</h3>
                <p className="habit-description">{habitInfo.description}</p>
                <button className="habit-delete-button"onClick={() => {handleDelete(habitInfo.id)}}>Delete</button>
            </div>
            <div className="habit-logs-container">
                {allLogs}
            </div>
        </article>
    )
}

export default Habit