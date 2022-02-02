export interface UserType {
    id: number,
    name: string,
    username: string,
    email: string, 
}

export interface AccountType {
    name: string, 
    username: string, 
    email: string, 
    password: string, 
    passwordConfirmation: string
}

export interface HabitType {
    id?: number,
    name: string, 
    description: string, 
    startDate: string,
    userId?: number
}

export interface HabitsType extends Array<HabitType>{}