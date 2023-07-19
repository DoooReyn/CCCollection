/*
 * @Author: DoooReyn
 * @Date: 2023-07-18 20:29:33
 * @LastModifiedBy:   DoooReyn
 * @LastModifiedAt: 2023-07-18 20:29:33
 */

import { Method0, Method1, Method2 } from '../cmm/method';

/**
 * 存储接口
 */
export interface Store {
  // 名称（类型）
  name: string;
  // 遍历
  each: Method1<Method2<string, string, void>, void>;
  // 是否存在指定项
  has: Method1<string, boolean>;
  // 读取指定项的值
  read: Method1<string, string>;
  // 移除指定项
  remove: Method1<string, void>;
  // 向指定项写入值
  write: Method2<string, string, void>;
  // 清空所有项
  clear: Method0<void>;
}
