/*
 * @Author: DoooReyn 
 * @Date: 2023-07-18 20:32:04 
 * @LastModifiedBy: DoooReyn 
 * @LastModifiedAt: 2023-07-18 20:32:04 
 */

/**
 * 此文件定义了各种常用的方法泛型
 */

// Definition for any function that returns void
export type Method = (...args: any[]) => void;
export type AsyncMethod = (...args: any[]) => Promise<void>;

// Definition for any method which returns a specified value
export type MethodOf<T> = (...args: any[]) => T;
export type AsyncMethodOf<T> = (...args: any[]) => Promise<T>;

// Definition for any method which with no arguments
export type Method0<T> = () => T;
export type AsyncMethod0<T> = () => Promise<T>;

// Definition for any method which with one argument
export type Method1<A, T> = (arg: A) => T;
export type AsyncMethod1<A, T> = (arg: A) => Promise<T>;

// Definition for any method which with two arguments
export type Method2<A1, A2, T> = (arg1: A1, arg2: A2) => T;
export type AsyncMethod2<A1, A2, T> = (arg1: A1, arg2: A2) => Promise<T>;

// Definition for any method which with three arguments
export type Method3<A1, A2, A3, T> = (arg1: A1, arg2: A2, arg3: A3) => T;
export type AsyncMethod3<A1, A2, A3, T> = (
  arg1: A1,
  arg2: A2,
  arg3: A3
) => Promise<T>;

// Definition for any method which with four arguments
export type Method4<A1, A2, A3, A4, T> = (
  arg1: A1,
  arg2: A2,
  arg3: A3,
  arg4: A4
) => T;
export type AsyncMethod4<A1, A2, A3, A4, T> = (
  arg1: A1,
  arg2: A2,
  arg3: A3,
  arg4: A4
) => Promise<T>;

// Definition for any method which with no parameters and returns any
export type MethodAny = MethodOf<any>;
export type AsyncMethodAny = AsyncMethodOf<any>;

// Definition for any method which with no parameters and returns any
export type MethodUnknown = MethodOf<unknown>;
export type AsyncMethodUnknown = AsyncMethodOf<unknown>;

// Definition for any method which with no parameters and returns void
export type MethodVoid = Method0<void>;
export type AsyncMethodVoid = AsyncMethod0<void>;

// Definition for constructor of specified class
export type Constructor<T> = { new (...args: any): T };

// Definition for constructor of any class
export type ConstructorAny = Constructor<any>;

// Definition for constructor with no arguments
export type Constructor0<T> = { new (): T };

// Definition for constructor with one argument
export type Constructor1<A, T> = { new (arg: A): T };

// Definition for constructor with two arguments
export type Constructor2<A1, A2, T> = { new (arg1: A1, arg2: A2): T };

// Definition for constructor with three arguments
export type Constructor3<A1, A2, A3, T> = {
  new (arg1: A1, arg2: A2, arg3: A3): T;
};

// Definition for constructor with four arguments
export type Constructor4<A1, A2, A3, A4, T> = {
  new (arg1: A1, arg2: A2, arg3: A3, arg4: A4): T;
};
