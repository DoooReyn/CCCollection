/*
 * @Author: DoooReyn
 * @Date: 2023-07-19 11:21:16
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-19 11:21:16
 */

import CryptoES from 'crypto-es';
import { BaseCipher } from './cipher-base';

/**
 * MD5 加密
 */
export class Md5Cipher implements BaseCipher {
  encrypt(msg: string): string {
    return CryptoES.MD5(msg).toString();
  }

  decrypt(str: string): string {
    throw new Error('MD5 is irreversible.');
  }
}
