/**
 * Url      : db://assets/scripts/base/func/automatic_value.ts
 * Author   : reyn
 * Date     : Tue Dec 06 2022 14:35:21 GMT+0800 (中国标准时间)
 * Class    : AutomaticValue
 * Desc     : 自维护的原始值
 */
export class AutomaticValue<T = string | number | boolean> {
  protected _value: T;

  public constructor(v: T) {
    this._value = v;
  }

  /**
   * 获取值
   */
  public get value() {
    return this._value;
  }

  /**
   * 设置值
   */
  public set value(v: T) {
    if (this._value !== v) {
      const prev = this._value;
      this._value = v;
      this._onValueChanged(prev, v);
    }
  }

  /**
   * 值变化回调
   * @param prev 之前值
   * @param current 当前值
   */
  protected _onValueChanged(prev: T, current: T) {}
}

/**
 * 自维护的布尔值
 */
export class AutomaticBooleanValue extends AutomaticValue<boolean> {
  /**
   * 置为真
   */
  public set() {
    this.value = true;
  }

  /**
   * 置为假
   */
  public unset() {
    this.value = false;
  }

  /**
   * 是否为真
   */
  public isset() {
    return this.value;
  }

  /**
   * 是否为假
   */
  public notset() {
    return !this.value;
  }
}
