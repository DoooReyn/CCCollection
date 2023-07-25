/*
 * @Author: DoooReyn
 * @Date: 2023-07-25 11:17:14
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-25 11:17:14
 */

import { Singletons } from '../singletons';
import { Randoms } from './random';

/**
 * 数组辅助工具
 */
export namespace Arrays {
  /**
   * 数组随机乱序
   * @param arr 输入数组
   * - Fisher–Yates shuffle
   */
  export function shuffle<T>(arr: T[]) {
    for (let i = arr.length - 1; i >= 0; i--) {
      let r = Singletons.random.randomInt(0, i + 1, 1);
      [arr[r], arr[i]] = [arr[i], arr[r]];
    }
    return arr;
  }
}
