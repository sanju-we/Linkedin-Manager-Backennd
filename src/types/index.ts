export interface User {
    email: string;
    password: string;
    userName?: string;
    linkedinLink?: string;
    weeklyLimitImages?: number;
    weeklyConnectionTotals?: number[];
}

export interface Userauth {
    id: string;
    name: string;
    role: string;
}
export interface AdminAuth {
    id: string;
    name: string;
    role: string;
}