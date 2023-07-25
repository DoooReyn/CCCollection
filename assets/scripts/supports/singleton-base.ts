/*
 * @Author: DoooReyn 
 * @Date: 2023-07-25 14:31:26 
 * @LastModifiedBy: DoooReyn 
 * @LastModifiedAt: 2023-07-25 14:31:26 
 */

/**
 * 单例基类
 */
export abstract class SingletonBase {
  /**
   * 获取单例
   * @param this 单例引用
   * @param args 初始化参数列表
   * @returns
   */
  public static getInstance<T extends SingletonBase>(this: new () => T, ...args: any[]): T {
      if (!(<any>this)._instance) {
          (<any>this)._instance = new this();
          (<any>this)._instance.init(...args);
      }
      return (<any>this)._instance;
  }

  /**
   * 初始化否
   */
  protected _inited: boolean = false;

  /**
   * 初始化
   * @param args 初始化参数列表
   */
  protected init(...args: any[]): void {
      if (!this._inited) {
          this.onInitialize(...args);
          this._inited = true;
      }
  }

  /**
   * 销毁单例
   */
  public destroy() {
      this._inited = false;
      this.onDestroy();
      delete (<any>this)._instance;
  }

  /**
   * 初始化回调，供重载
   */
  protected abstract onInitialize(...args: any[]): void;

  /**
   * 销毁回调，供重载
   */
  protected abstract onDestroy(): void;
}
