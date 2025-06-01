declare module '*.png';
declare module '*.jpg';

declare module '*.tsx';

declare type Operator = { 
    _id: string,
    name: string,
    role: string,
    code_color: string,
    email: string,
    updated_at: Date,
    created_at: Date
 };

 declare type Bread = {
    name: string,
    url: string
 };