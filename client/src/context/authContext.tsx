import React, {createContext} from 'react';

interface IContext {
    token: string | null,
    userId:string | null,
    login(jwt: string, id: string): void,
    loginAdmin(jwt: string, id: string): void,
    logout(): void,
    isAuthenticated: boolean,
    adminId: string | null,
    isAuthenticatedAdmin: boolean,
    tokenAdmin: string | null,
}

export const AuthContext: React.Context<IContext> = createContext<IContext>({
    token: null,
    userId: null,
    login:(token: string, id: string) => {},
    loginAdmin:(tokenAdmin: string, id: string) => {},
    logout:() => {},
    isAuthenticated: false,
    adminId: null,
    isAuthenticatedAdmin: false,
    tokenAdmin: null
});
