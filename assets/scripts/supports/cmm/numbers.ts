/*
 * @Author: DoooReyn 
 * @Date: 2023-07-18 20:32:54 
 * @LastModifiedBy: DoooReyn 
 * @LastModifiedAt: 2023-07-18 20:32:54 
 */

/**
 * 数值辅助方法
 */
export namespace Numbers {
  const { pow: mpow, max: mmax, min: mmin, round: mround } = Math;

  /**
   * 保留小数点后几位
   * @param num 输入数值
   * @param reserve 保留小数点后的位数
   * @returns
   */
  export function reserve(num: number, reserve: number): number {
    reserve = mmax(0, reserve | 0);
    const factor = mpow(10, reserve);
    return mround(num * factor) / factor;
  }

  /**
   * 将数值限定在指定范围内
   * @param val 输入数值
   * @param min 限定数值的下限
   * @param max 限定数值的上限
   * @returns
   */
  export function clamp(val: number, min: number, max: number): number {
    return mmin(max, mmax(val, min));
  }
}
