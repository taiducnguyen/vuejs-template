export const UserRole = {
    Admin: 1,
    PM: 2,
    DM: 3
}

export const IsProduction = process.env.NODE_ENV === 'production';

export const TokenKey = {
    AuthToken: 'auth.token',
}