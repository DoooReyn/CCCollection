/*
 * @Author: DoooReyn
 * @Date: 2023-07-19 10:25:25
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-19 10:25:25
 */

import { KindOf } from './kindof';

/**
 * 对象辅助方法
 */
export namespace Objects {
  /**
   * 数据拷贝
   * @param data 数据
   * @param deep 是否深拷贝
   * @returns
   */
  export function copy(data: any, deep?: boolean) {
    if (KindOf.isObject(data)) {
      return deep ? deepCopy(data) : shallowCopy(data);
    } else {
      return data;
    }
  }

  /**
   * @zh
   * 有损拷贝
   * @param data 数据
   */
  export function lossyCopy(data: any) {
    return JSON.parse(JSON.stringify(data));
  }

  /**
   * @zh
   * 浅拷贝
   * @param data 数据
   */
  export function shallowCopy(data: object | any[]) {
    if (KindOf.isArray(data)) {
      return (data as any[]).slice();
    }
    return Object.assign({}, data);
  }

  /**
   * @zh
   * 深拷贝
   * @param data 数据
   */
  function deepCopy(data: object | any[]) {
    if (data instanceof Date) {
      const date = new Date();
      date.setTime(data.getTime());
      return date;
    }

    if (data instanceof Array) {
      const ret = [];
      for (let i = 0, length = data.length; i < length; i++) {
        ret[i] = copy(data[i], true);
      }
      return ret;
    }

    const ret = {};
    for (const key in data) {
      ret[key] = copy(data[key], true);
    }
    return ret;
  }

  /**
   * 从原始对象上复制未定义的项到目标对象
   * @param target 目标对象
   * @param raw 原始对象
   * @returns
   */
  export function assignUnsetKeys(target: object, raw: object) {
    let unset = false;
    for (let key in raw) {
      if (target[key] === undefined) {
        target[key] = copy(raw[key], true);
        unset = true;
      }
    }
    return unset;
  }
}
