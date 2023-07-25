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
export class Stores {
  public static readonly Memory = new Memory();
  public static readonly Local = new Local();
  public static readonly Cookie = new Cookie();
  public static readonly Session = new Session();
  public static readonly Advance = new Advance<I_AdvanceSetting>();
}
