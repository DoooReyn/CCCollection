/*
 * @Author: DoooReyn
 * @Date: 2023-07-18 17:37:41
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-18 17:37:41
 */

import { Store } from './store';

/**
 * LocalStorage 存储
 */
export class Local implements Store {
  public readonly name: string = 'local-storage';

  static isValid() {
    return !!window.localStorage;
  }

  public clear(): void {
    if (!Local.isValid()) return;

    localStorage.clear();
  }

  public each(arg: (arg1: string, arg2: string) => void): void {
    if (!Local.isValid()) return;

    const l = localStorage.length;
    for (let i = l - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      arg(this.read(key), key);
    }
  }

  public has(arg: string): boolean {
    if (!Local.isValid()) return false;

    return this.read(arg) !== null;
  }

  public read(arg: string): string {
    if (!Local.isValid()) return null;

    return localStorage.getItem(arg);
  }

  public remove(arg: string): void {
    if (!Local.isValid()) return;

    localStorage.removeItem(arg);
  }

  public write(arg1: string, arg2: string): void {
    if (!Local.isValid()) return;

    localStorage.setItem(arg1, arg2);
  }
}
