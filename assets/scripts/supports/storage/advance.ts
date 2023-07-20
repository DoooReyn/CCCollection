/*
 * @Author: DoooReyn
 * @Date: 2023-07-18 17:59:30
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-18 17:59:30
 */

import { sys } from 'cc';
import { Ciphers } from '../cipher/ciphers';
import { Device } from '../device/device';
import { Objects } from '../cmm/objects';
import { I_BaseCipher } from '../cipher/cipher-base';

/**
 * 高级存储数据模板
 */
export interface I_AdvancePreset {
  [key: string]: string | number | boolean;
}

/**
 * 高级存储
 * - 支持自定义数据模板
 * - 支持自定义加、解密方案
 */
export class Advance<P extends I_AdvancePreset> {
  public readonly name: string = 'advance-storage';
  private _key: string = null!;
  private _cipher: I_BaseCipher = null!;
  private _preset: P;
  private _data: P;
  private _inited: boolean = false;

  /**
   * 解析本地数据，还原到内存
   */
  private _parse() {
    if (this.existed) {
      const str = this._cipher.decrypt(sys.localStorage.getItem(this._key));
      try {
        const json = JSON.parse(str);
        Objects.assignUnsetKeys(json, this._preset);
        this._data = json;
      } catch {
        this._data = Objects.copy(this._preset);
      }
    } else {
      this._data = Objects.copy(this._preset);
    }
    this.save();
  }

  /**
   * 检查是否已初始化
   */
  private _checkInited() {
    if (!this._inited) throw new Error('Advance-storage not initialized.');
  }

  /**
   * 是否已初始化
   */
  get inited() {
    return this._inited;
  }

  /**
   * 初始化
   * @param preset 预设值
   * @param cipher 加解密方案-默认为 Ciphers.AES
   */
  init(preset: P, cipher: I_BaseCipher = Ciphers.AES) {
    if (this._inited) throw new Error('Advance-storage initialized.');

    this._inited = true;
    this._key = Device.instance.uuid;
    this._cipher = cipher;
    this._preset = Object.assign(Object.create(null), preset);
    this._parse();
  }

  /**
   * 数据是否存在
   */
  get existed() {
    this._checkInited();
    return !!sys.localStorage.getItem(this._key);
  }

  /**
   * 读取指定项数据
   * @param key 存储项
   * @returns
   */
  read<K extends keyof P>(key: K): P[K] {
    this._checkInited();
    return this._data[key];
  }

  /**
   * 向指定项写入数据
   * @param key 存储项
   * @param val 数据
   */
  write<K extends keyof P>(key: K, val: P[K]) {
    this._checkInited();
    this._data[key] = val;
  }

  /**
   * 保存数据到本地
   * - 存储器优先更改内存中的数据，以此来加快访问速度，
   *   开发者应该主动调用此接口以持久化数据（从性能上
   *   看，频繁调用加密接口会很消耗 CPU 资源，因此选
   *   择适当的保存时机很重要。
   */
  save() {
    this._checkInited();
    const str = this._cipher.encrypt(JSON.stringify(this._data));
    sys.localStorage.setItem(this._key, str);
  }

  /**
   * 转换为 Json 字符串
   * @returns
   */
  toJson() {
    this._checkInited();
    return JSON.stringify(this._data, null, 0);
  }

  /**
   * 重置
   */
  reset() {
    this._checkInited();
    this._data = Objects.copy(this._preset);
    this.save();
  }
}
