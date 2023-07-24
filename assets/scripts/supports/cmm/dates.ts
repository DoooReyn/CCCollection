/*
 * @Author: DoooReyn 
 * @Date: 2023-07-24 11:56:05 
 * @LastModifiedBy: DoooReyn 
 * @LastModifiedAt: 2023-07-24 11:56:05 
 */

import { Numbers } from './numbers';

/**
 * 日期辅助方法
 */
export namespace Dates {
  export function getDateString(): string {
    const d = new Date();
    const yy = Numbers.padStart(d.getFullYear(), 4);
    const mm = Numbers.padStart(d.getMonth(), 2);
    const dd = Numbers.padStart(d.getDate(), 2);
    const h = Numbers.padStart(d.getHours(), 2);
    const m = Numbers.padStart(d.getMinutes(), 2);
    const s = Numbers.padStart(d.getSeconds(), 2);
    const ms = d.getMilliseconds();
    return `${yy}/${mm}/${dd} ${h}:${m}:${s}.${ms}`;
  }
}
