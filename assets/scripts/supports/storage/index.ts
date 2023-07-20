/*
 * @Author: DoooReyn
 * @Date: 2023-07-18 17:35:04
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-18 17:35:04
 */

import { Memory } from './memory';
import { Local } from './local';
import { Cookie } from './cookie';
import { Session } from './session';
import { Advance } from './advance';
import { I_AdvanceSetting } from '../cmm/setting';

/**
 * 存储工具
 */
export const Stores = {
  Memory: new Memory(),
  Local: new Local(),
  Cookie: new Cookie(),
  Session: new Session(),
  Advance: new Advance<I_AdvanceSetting>(),
};
