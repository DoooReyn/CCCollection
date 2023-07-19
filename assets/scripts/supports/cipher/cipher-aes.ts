/*
 * @Author: DoooReyn 
 * @Date: 2023-07-19 11:24:45 
 * @LastModifiedBy: DoooReyn 
 * @LastModifiedAt: 2023-07-19 11:24:45 
 */

import CryptoES from 'crypto-es';
import { CipherCfg, Format } from 'crypto-es/lib/cipher-core';
import { BaseCipher } from './cipher-base';

/**
 * AES 加密/解密
 * - 使用之前需要先设置密钥
 */
export class AesCipher implements BaseCipher {
  // 加密的 key
  private _key: string = null!;
  // 加密的 iv
  private _iv: CryptoES.lib.WordArray = null!;
  // 是否已初始化
  private _inited: boolean = false;
  // 默认加密、解密时使用的格式化工具
  public static DefaultFormatter: Format = {
    stringify(params: any) {
      const json: any = {
        ct: params.ciphertext.toString(CryptoES.enc.Base64),
      };
      if (params.iv) json.iv = params.iv.toString();
      if (params.salt) json.s = params.salt.toString();
      return JSON.stringify(json);
    },
    parse(str: any) {
      const json = JSON.parse(str);
      const cipherParams = CryptoES.lib.CipherParams.create({
        ciphertext: CryptoES.enc.Base64.parse(json.ct),
      });
      if (json.iv) cipherParams.iv = CryptoES.enc.Hex.parse(json.iv);
      if (json.s) cipherParams.salt = CryptoES.enc.Hex.parse(json.s);
      return cipherParams;
    },
  };
  // 当前加密、解密时使用的格式化工具
  private _formatter: Format;

  /**
   * 获取加解密配置
   */
  private get _cfg() {
    let cfg: CipherCfg = { iv: this._iv };
    if (this._formatter) cfg.format = this._formatter;
    return cfg;
  }

  /**
   * 检查是否已初始化
   */
  private _checkInited() {
    if (!this._inited) throw new Error('Device not initialized.');
  }

  /**
   * 是否已初始化
   */
  get inited() {
    return this._inited;
  }

  /**
   * 初始化密钥
   * @param key 加密的 key
   * @param iv 加密的 iv
   * @param formatter 加密、解密时使用的格式化工具（默认使用 AesCipher.formatter）
   */
  init(
    key: string,
    iv: string,
    formatter: Format = AesCipher.DefaultFormatter
  ) {
    if (this._inited) throw new Error('AES not initialized.');

    this._inited = true;
    this._key = key;
    this._iv = CryptoES.enc.Hex.parse(iv);
    formatter && (this._formatter = formatter);
  }

  encrypt(msg: string): string {
    this._checkInited();
    return CryptoES.AES.encrypt(msg, this._key, this._cfg).toString();
  }

  decrypt(str: string): string {
    this._checkInited();
    return CryptoES.AES.decrypt(str, this._key, this._cfg).toString(
      CryptoES.enc.Utf8
    );
  }
}
