export interface RegisterUser {
    firstName: string
    lastName: string
    phone: string
    password: string
    confirmPassword: string
}

export interface LoginUser {
    phone: string
    password: string
}