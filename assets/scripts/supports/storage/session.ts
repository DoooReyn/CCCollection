/*
 * @Author: DoooReyn
 * @Date: 2023-07-18 17:33:35
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-18 17:33:35
 */

import { Store } from "./store";

/**
 * Session 存储
 */
export class Session implements Store {
  public readonly name: string = "session-storage";

  static isValid() {
    return !!window.sessionStorage;
  }

  public clear(): void {
    if (!Session.isValid()) return;

    sessionStorage.clear();
  }

  public each(arg: (arg1: string, arg2: string) => void): void {
    if (!Session.isValid()) return;

    const l = sessionStorage.length;
    for (let i = l - 1; i >= 0; i--) {
      const key = sessionStorage.key(i);
      arg(this.read(key), key);
    }
  }

  public has(arg: string): boolean {
    if (!Session.isValid()) return false;

    return this.read(arg) !== null;
  }

  public read(arg: string): string {
    if (!Session.isValid()) return null;

    return sessionStorage.getItem(arg);
  }

  public remove(arg: string): void {
    if (!Session.isValid()) return;

    sessionStorage.removeItem(arg);
  }

  public write(arg1: string, arg2: string): void {
    if (!Session.isValid()) return;

    sessionStorage.setItem(arg1, arg2);
  }
}
