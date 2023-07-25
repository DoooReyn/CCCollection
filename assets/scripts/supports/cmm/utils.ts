/*
 * @Author: DoooReyn
 * @Date: 2023-07-25 11:40:25
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-25 11:40:25
 */

import { Component, Node, __private } from 'cc';

/**
 * 通用辅助工具
 */
export namespace Utils {
  /**
   * 安全地调用方法
   * @param handler 调用参数格式
   */
  export function runInSandbox(handler: {
    onExecute: Function;
    onError?: (msg: string, stack: string) => void;
    onFinal?: Function;
  }) {
    if (handler.onExecute) {
      try {
        handler.onExecute();
      } catch (err) {
        handler.onError && handler.onError(err.message, err.stack);
      } finally {
        handler.onFinal && handler.onFinal();
      }
    }
  }

  /**
   * 在节点上部署组件
   * @param source 源组件
   * @param target 目标组件
   * @returns
   */
  export function setupComponent<T extends Component>(
    source: Component | Node,
    target: __private._types_globals__Constructor<T>
  ): T {
    if (source instanceof Node) {
      return source.getComponent<T>(target) || source.addComponent(target);
    }
    return source.getComponent<T>(target) || source.addComponent<T>(target);
  }
}
