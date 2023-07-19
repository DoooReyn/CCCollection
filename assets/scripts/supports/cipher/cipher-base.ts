/*
 * @Author: DoooReyn 
 * @Date: 2023-07-19 11:20:28 
 * @LastModifiedBy: DoooReyn 
 * @LastModifiedAt: 2023-07-19 11:20:28 
 */

/**
 * 加密器接口
 */
export interface BaseCipher {
  /**
   * 加密
   * @param msg 需加密的内容
   */
  encrypt(msg: string): string;
  /**
   * 解密
   * @param str 待解密的内容
   */
  decrypt(str: string): string;
}
