/*
 * @Author: DoooReyn 
 * @Date: 2023-07-19 09:59:42 
 * @LastModifiedBy: DoooReyn 
 * @LastModifiedAt: 2023-07-19 09:59:42 
 */

import { AdvancePreset } from '../storage/advance';

/**
 * 设置选项格式
 */
export interface Setting extends AdvancePreset {
  bgm_on: boolean;
  sfx_on: boolean;
  bgm_volume: number;
  sfx_volume: number;
}
