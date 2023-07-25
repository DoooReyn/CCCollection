/*
 * @Author: DoooReyn
 * @Date: 2023-07-25 10:24:39
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-25 10:24:39
 */

/**
 * 随机数管理器
 * - 依赖于 [seedrandom](https://github.com/davidbau/seedrandom)
 * - 需要将 `seedrandom.min.js` 导入为插件
 */
export class Randoms {
  public static readonly instance: Randoms = new Randoms();

  /**
   * 随机数种子
   */
  private _seed: number = 0;

  /**
   * 随机方法
   */
  private _random: () => number = Math.random;

  /**
   * 获取随机数种子
   */
  get seed() {
    return this._seed;
  }

  /**
   * 设置随机数种子
   */
  set seed(n: number) {
    if (this._seed !== n) {
      this._seed = n;
      if ('seedrandom' in Math) {
        // @ts-ignore
        this._random = new Math.seedrandom(n);
      }
    }
  }

  /**
   * 随机布尔值
   * @returns
   */
  randomBool() {
    return this.randomFloat() > 0.5;
  }

  /**
   * 生成指定范围的随机整数
   * @param min 最小值
   * @param max 最大值
   * @param type 类型
   * @param type 0 [min, max]
   * @param type 1 [min, max)
   * @param type 2 (min, max)
   */
  randomInt(min: number, max: number, type: 0 | 1 | 2 = 0) {
    min = (min + 0.5) | 0;
    max = max | 0;
    switch (type) {
      case 0:
        return ((this._random() * (max - min + 1)) | 0) + min;
      case 1:
        return ((this._random() * (max - min)) | 0) + min;
      case 2:
        return ((this._random() * (max - min + 1)) | 0) + min + 1;
    }
  }

  /**
   * 生成指定范围的随机浮点数
   * @param min 最小值
   * @param max 最大值
   * @returns
   */
  randomFloat(min: number = 0, max: number = 1) {
    return this._random() * (max - min) + min;
  }

  /**
   * 从数组中随机取n个元素
   * @param array 指定数组
   * @param num 个数
   */
  randomArray<T>(array: T[], num: number): T[] | undefined {
    const len = array.length;
    if (len === 0) return undefined;

    num = Math.max(0, Math.min(len, num | 0));
    let result: T[] = [];
    let random = this.randomInt.bind(this);
    for (let i = 0; i < num; i++) {
      result[i] = array[random(0, len, 1)];
    }

    return result;
  }

  /**
   * 从数组中随机取1个元素
   * @param array 指定数组
   * @returns
   */
  randomOne<T>(array: T[]): T | undefined {
    const r = this.randomArray(array, 1);
    return r ? r[0] : undefined;
  }
}
