export interface User {
    email: string;
    password: string;
    userName?: string;
    linkedinLink?: string;
    weeklyLimitImages?: number;
    weeklyConnectionTotals?: number[];
}

export interface ResetToken {
  id: string;
  email: string;
}