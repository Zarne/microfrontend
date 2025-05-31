declare module '*.png';
declare module '*.jpg';

declare module '*.tsx';

declare enum RoleOperator { admin, arhcitect, exploit }
declare var Role: typeof Operator
declare type Operator = { 
    _id: string,
    name: string,
    role: string,
    code_color: string,
    email: string,
    updated_at: Date,
    created_at: Date
 };