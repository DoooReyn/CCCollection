/*
 * @Author: DoooReyn
 * @Date: 2023-07-18 17:37:51
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-18 17:37:51
 */

import { Store } from "./store";

let source: Record<string, string> = {};

/**
 * 内存存储
 */
export class Memory implements Store {
  public name: string = "memory-storage";

  static isValid() {
    return true;
  }

  public clear(): void {
    source = {};
  }

  public each(arg: (arg1: string, arg2: string) => void): void {
    for (let key in source) {
      if (this.has(key)) {
        arg(this.read(key), key);
      }
    }
  }

  public has(arg: string): boolean {
    return source.hasOwnProperty(arg);
  }

  public read(arg: string): string {
    return source[arg];
  }

  public remove(arg: string): void {
    delete source[arg];
  }

  public write(arg1: string, arg2: string): void {
    source[arg1] = arg2;
  }
}
