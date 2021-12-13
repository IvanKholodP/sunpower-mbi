import React, {createContext} from 'react';

interface IContext {
    token: string | null,
    userId:string | null,
    login(jwt: string, id: string): void,
    logout(): void,
    isAuthenticated: boolean,
    admin: boolean,
}

export const AuthContext: React.Context<IContext> = createContext<IContext>({
    token: null,
    userId: null,
    login:(token: string, id: string) => {},
    logout:() => {},
    isAuthenticated: false,
    admin: false,
});
