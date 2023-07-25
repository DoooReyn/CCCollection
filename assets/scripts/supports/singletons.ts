/*
 * @Author: DoooReyn
 * @Date: 2023-07-25 14:41:23
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-25 14:41:23
 */

import { Node, director } from 'cc';
import { AudioPlayer } from './audio-player/audio-player';
import { Ciphers } from './cipher/ciphers';
import { Randoms } from './cmm/random';
import { Device } from './device/device';
import { Events } from './event/events';
import { Logger } from './logger/logger';
import { ResLoader } from './res/res-loader';
import { Stores } from './storage';
import { Timers } from './timer/timers';
import { TimerHook } from './timer/timer-hook';
import { Utils } from './cmm/utils';
import { C_PERSIST_ROOT } from './cmm/constants';

/**
 * 单例集合
 */
export class Singletons {
  private static readonly _persistence: string = C_PERSIST_ROOT;
  public static readonly logger: Logger = new Logger();
  public static readonly device: Device = new Device();
  public static readonly random: Randoms = new Randoms();
  public static readonly stores: Stores = new Stores();
  public static readonly ciphers: Ciphers = new Ciphers();
  public static readonly res: ResLoader = new ResLoader();
  public static readonly events: Events = new Events();
  public static readonly timers: Timers = new Timers();
  public static audio: AudioPlayer = null!;
  public static time_hook: TimerHook = null!;
  public static node: Node = null!;

  /**
   * 初始化
   * - 需要将 `startup.js` 导入为插件
   */
  public static init() {
    const node = director.getScene().getChildByName(Singletons._persistence);
    Singletons.node = node;
    Singletons.audio = Utils.setupComponent(node, AudioPlayer);
    Singletons.time_hook = Utils.setupComponent(node, TimerHook);
  }
}

(window as any).Singletons = Singletons;
