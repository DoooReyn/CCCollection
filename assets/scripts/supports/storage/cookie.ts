/*
 * @Author: DoooReyn
 * @Date: 2023-07-18 17:33:49
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-18 17:33:49
 */

import { Store } from "./store";

const EXPIRES_YES = "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
const EXPIRES_NO = "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
const COOKIE_ITEM = /((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g;
const COOKIE_KEY = /\s*(?:\=[^;]*)?;\s*/;

/**
 * Cookie 存储
 */
export class Cookie implements Store {
  public readonly name: string = "cookie-storage";

  static isValid() {
    return navigator.cookieEnabled;
  }

  public clear(): void {
    this.each((_, key) => {
      this.remove(key);
    });
  }

  public each(arg: (arg1: string, arg2: string) => void): void {
    const cookies = document.cookie.replace(COOKIE_ITEM, "").split(COOKIE_KEY);
    const l = cookies.length;
    for (let i = l - 1; i >= 0; i--) {
      const key = decodeURIComponent(cookies[i]);
      arg(this.read(key), key);
    }
  }

  public has(arg: string): boolean {
    const pattern = [
      "(?:^|;\\s*)",
      encodeURIComponent(arg).replace(/[-.+*]/g, "\\$&"),
      "\\s*\\=",
    ].join("");
    return new RegExp(pattern).test(document.cookie);
  }

  public read(arg: string): string {
    const pattern = [
      "(?:(?:^|.*;)\\s*",
      encodeURIComponent(arg).replace(/[-.+*]/g, "\\$&"),
      "\\s*\\=\\s*([^;]*).*$)|^.*$",
    ].join("");
    const val = document.cookie.replace(new RegExp(pattern), "$1");
    return decodeURIComponent(val) || null;
  }

  public remove(arg: string): void {
    if (this.has(arg)) {
      document.cookie = encodeURIComponent(arg) + EXPIRES_YES;
    }
  }

  public write(arg1: string, arg2: string, expires?: string): void {
    expires = expires || EXPIRES_NO;
    document.cookie = [
      encodeURIComponent(arg1),
      "=",
      encodeURIComponent(arg2),
      expires,
    ].join("");
  }
}
