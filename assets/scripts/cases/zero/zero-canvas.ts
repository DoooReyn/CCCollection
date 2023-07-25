/*
 * @Author: DoooReyn
 * @Date: 2023-07-25 16:33:40
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-25 16:33:40
 */

import { _decorator, Component } from 'cc';
import { Arrays } from '../../supports/cmm/arrays';
import { Singletons } from '../../supports/singletons';
import { T_TimerInfo, Timer } from '../../supports/timer/timer';
const { ccclass, property } = _decorator;

/**
 * 测试示例
 */
@ccclass('ZeroCanvas')
export class zero_canvas extends Component {
  start() {
    const str =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const chars = str.split('');

    // 初始化单例集合
    Singletons.init();

    // 设置随机数种子
    Singletons.random.seed = 1690255693042;

    // Array.shuffle
    Singletons.logger.info(Arrays.shuffle(chars));

    // 定时器
    Singletons.logger.info('等待5秒钟');
    Singletons.timers.delayDo(() => {
      Singletons.logger.info('[延时] 5秒钟已结束');
    }, 5);
    const cfg: T_TimerInfo = {
      tag: '节拍',
      interval: 1,
      ticks: 5,
      refreshOnStart: true,
      onStop(ref: Timer) {
        Singletons.logger.info(`[${ref.tag}] 5秒钟已结束`);
      },
      onTick(ref: Timer) {
        Singletons.logger.debug(`[${ref.tag}] 已过去${ref.current}秒钟`);
      },
    };
    const timer = Singletons.timers.loopDo(cfg);
    Singletons.logger.info(timer);
  }
}
