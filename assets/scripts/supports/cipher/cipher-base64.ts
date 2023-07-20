/*
 * @Author: DoooReyn 
 * @Date: 2023-07-19 11:24:53 
 * @LastModifiedBy: DoooReyn 
 * @LastModifiedAt: 2023-07-19 11:24:53 
 */

import CryptoES from 'crypto-es';
import { I_BaseCipher } from './cipher-base';

/**
 * Base64 加密/解密
 */
export class Base64Cipher implements I_BaseCipher {
  encrypt(msg: string): string {
    return CryptoES.enc.Base64.stringify(
      CryptoES.enc.Utf8.parse(msg)
    ).toString();
  }
  decrypt(str: string): string {
    return CryptoES.enc.Base64.parse(str).toString(CryptoES.enc.Utf8);
  }
}
