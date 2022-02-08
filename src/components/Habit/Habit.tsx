import React, { useEffect, useState } from "react";
import "./Habit.css";
import { HabitLogType, HabitType } from "../../utils/types";
import HabitLog from "../HabitLog/HabitLog";

const Habit: React.FC<{habitInfo: HabitType, habitLogsInfo: HabitLogType[], handleDelete: any}> = ({ habitInfo, habitLogsInfo, handleDelete }) => {    
    const componentsOfWeek = [...Array(7)]
                            .map((item, index) => 
                                <HabitLog 
                                habitLogInfo={null} 
                                userId={0} 
                                dayNum={index} 
                                key={index}
                            />)
    const allLogs = habitLogsInfo.reduce((acc, currentLog) => {
        const dayNum = new Date(currentLog.scheduled_at.replaceAll("-", "/").slice(0, 10)).getDay()
        acc[dayNum] = <HabitLog habitLogInfo={currentLog} userId={habitInfo.userId} dayNum={dayNum} key={dayNum}/>
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