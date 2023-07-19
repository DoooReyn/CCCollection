/*
 * @Author: DoooReyn 
 * @Date: 2023-07-19 10:22:49 
 * @LastModifiedBy: DoooReyn 
 * @LastModifiedAt: 2023-07-19 10:22:49 
 */

import { isValid } from 'cc';

/**
 * 类型判定辅助工具
 */
export namespace KindOf {
  /**
   * 是否Function类型
   * @param item 目标
   * @returns
   */
  export function isFunction(item: any) {
    return typeof item === 'function';
  }

  /**
   * 是否数值
   * @param item 目标
   * @returns
   */
  export function isNumber(item: any) {
    return typeof item === 'number' && !isNaN(item);
  }

  /**
   * 是否字符串
   * @param item 目标
   * @returns
   */
  export function isString(item: any) {
    return typeof item === 'string';
  }

  /**
   * 是否对象
   * @param item 目标
   * @returns
   */
  export function isObject(item: any) {
    return Object.prototype.toString.call(item) === '[object Object]';
  }

  /*
   * 是否数组
   * @param item 目标
   * @returns
   */
  export function isArray(item: any) {
    return item instanceof Array;
  }

  /**
   * 是否布尔值
   * @param item 目标
   * @returns
   */
  export function isBoolean(item: any) {
    return typeof item === 'boolean';
  }

  /**
   * 是否为真
   * @param item 目标
   * @returns
   */
  export function isTrue(item: any) {
    if (isBoolean(item)) {
      // 布尔值直接判定值
      return Boolean(item);
    } else {
      // null/undefined 判定为假，其他类型判定为真
      return !isNull(item);
    }
  }

  /**
   * 是否为假
   * @param item 目标
   * @returns
   */
  export function isFalse(item: any) {
    return !isTrue(item);
  }

  /**
   * 是否未定义
   * @param t 目标
   * @returns
   */
  export function isUndefined(t: any) {
    return t === undefined || t === null;
  }

  /**
   * 是否为空
   * @param item 目标
   * @returns
   */
  export function isNull(item: any) {
    return isUndefined(item) || !isValid(item);
  }

  /**
   * 是否不为空
   * @param item 目标
   * @returns
   */
  export function notNull(item: any) {
    return !isUndefined(item) && isValid(item);
  }
}
