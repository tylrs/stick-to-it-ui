import HabitLog from "../components/HabitLog/HabitLog"

export const emptyUser = {
    id: 0,
    name: "",
    username: "",
    email: ""
}

export const blankAccount = {
    name: "", 
    username: "", 
    email: "", 
    password: "", 
    passwordConfirmation: ""
}

export const blankHabit = {
    name: "", 
    description: "", 
    startDate: null,
    endDate: null
}

export const blankLogs = [
    {
        id: 0,
        habit_id: 0,
        scheduled_at: "",
        completed_at: ""
    }
]

export const blankHabits = [
    {
        habitInfo: blankHabit,
        logs: blankLogs
    }
]

export const daysOfWeek = ["s", "m", "t", "w", "th", "f", "s"]

export const componentsOfWeek = [...Array(7)].map((item, index) => <HabitLog habitLogInfo={null} dayNum={index} key={index}/>)

