/*
 * @Author: DoooReyn
 * @Date: 2023-07-18 17:06:01
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-18 17:06:01
 */

import { Setting } from "./setting";

// 该文件为系统需要的常量，你可以根据需要修改对应值，或者通过配置文件生成

/**
 * 产品网址
 */
export const C_HOME_PAGE = 'https://github.com/DoooReyn/CCCollection';

/**
 * AES 加解密的 key
 */
export const C_AES_KEY = '000102030405060708090a0b0c0d0e0f';

/**
 * AES 加解密的 iv
 * - 实际情况应该从服务器获得，这里为了方便仅用于示例
 */
export const C_AES_IV = '101112131415161718191a1b1c1d1e1f';

/**
 * 设置选项
 */
export const C_SETTING: Setting = {
    bgm_on: true,
    sfx_on: true,
    bgm_volume: 1.0,
    sfx_volume: 1.0,
  };