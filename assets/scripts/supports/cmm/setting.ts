/*
 * @Author: DoooReyn
 * @Date: 2023-07-19 09:59:42
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-19 09:59:42
 */

import { I_AdvancePreset } from '../storage/advance';

/**
 * 设置选项格式
 */
export interface I_AdvanceSetting extends I_AdvancePreset {
  bgm_on: boolean;
  sfx_on: boolean;
  bgm_volume: number;
  sfx_volume: number;
}

/**
 * 设置选项枚举
 */
export enum E_AdvanceSetting {
  bgm_on = 'bgm_on',
  sfx_on = 'sfx_on',
  bgm_volume = 'bgm_volume',
  sfx_volume = 'sfx_volume',
}
