/*
 * @Author: DoooReyn
 * @Date: 2023-07-18 14:23:22
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-18 14:23:22
 */

import { Base64Cipher } from './cipher-base64';
import { Md5Cipher } from './cipher-md5';
import { AesCipher } from './cipher-aes';

/**
 * 加密/解密工具
 * - 依赖第三方库 [CryptoES](https://github.com/entronad/crypto-es)
 * - 目前集成了：
 *   - MD5
 *   - Base64
 *   - AES
 */
export class Ciphers {
  public static readonly Base64 = new Base64Cipher();
  public static readonly MD5 = new Md5Cipher();
  public static readonly AES = new AesCipher();
}
