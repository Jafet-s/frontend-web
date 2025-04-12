// src/types.ts
export interface UserBase {
    email: string;
    full_name: string;
  }
  
  export interface UserCreate extends UserBase {
    password: string;
  }
  
  export interface UserUpdate extends UserBase {
    password?: string;
  }
  
  export interface User extends UserBase {
    id: number;
    is_active?: boolean;
  }