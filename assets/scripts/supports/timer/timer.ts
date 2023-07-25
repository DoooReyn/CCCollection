/*
 * @Author: DoooReyn
 * @Date: 2023-07-25 11:36:24
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-25 11:36:24
 */

import { game, macro, sys } from 'cc';
import { Utils } from '../cmm/utils';
import { AutoId } from '../cmm/auto-id';
import { Singletons } from '../singletons';

/**
 * 定时器状态
 * - 初始
 * - 暂停
 * - 停止
 * - 运行
 */
export enum E_TimerState {
  Raw = 0,
  Paused,
  Stopped,
  Ticking,
}

/**
 * 定时器进度表现形式
 * - 原始 —— 0.54
 * - 数字 —— "0.54"
 * - 百分比 —— "54.0%"
 * - 斜杠 —— "54/100"
 */
export enum E_TimerProgressStyle {
  Raw = 0,
  Numeric,
  Percent,
  Slash,
}

/**
 * 定时器基础信息
 */
export type T_TimerInfo = {
  /**
   * 节拍回调
   */
  onTick: (ref: Timer) => void;
  /**
   * 开始回调
   */
  onStart?: (ref: Timer) => void;
  /**
   * 暂停回调
   */
  onPause?: (ref: Timer) => void;
  /**
   * 停止回调
   */
  onStop?: (ref: Timer) => void;
  /**
   * 恢复回调
   */
  onResume?: (ref: Timer) => void;
  /**
   *  节拍周期
   */
  interval?: number;
  /**
   * 循环次数
   */
  ticks?: number;
  /**
   * 延迟时间
   */
  delay?: number;
  /**
   * 唯一标识
   */
  tag?: string;
  /**
   * 发生错误时是否暂停
   */
  stopOnError?: boolean;
  /**
   * 开始前刷新一次
   */
  refreshOnStart?: boolean;
};

/**
 * 定时器
 */
export class Timer {
  /**
   * 当前节拍数
   */
  private _current: number = 0;

  /**
   * 开始时间
   */
  private _startAt: number = 0;

  /**
   * 运行时间
   */
  private _elapse: number = 0;

  /**
   * 定时器当前状态
   */
  private _state: E_TimerState = E_TimerState.Raw;

  /**
   * 定时器基础信息
   */
  private _info: T_TimerInfo;

  /**
   * onTick 包装方法
   */
  private _wrapper: Function;

  /**
   * 自动 ID
   */
  private static _id = new AutoId();

  /**
   * 获取定时器id
   * @returns 定时器id
   */
  public static getAutoId() {
    return `timer.${Timer._id.next()}`;
  }

  /**
   * 获取一帧的时间
   * @returns 一帧的时间
   */
  public static getPieceOfFrame() {
    return 1.0 / ((game.frameRate as number) | 0);
  }

  /**
   * 获取指定帧数的时间
   * @param frames 帧数
   */
  public static timeInFrames(frames: number = 1) {
    return Math.max(0, 0 | frames) * Timer.getPieceOfFrame();
  }

  /**
   * 校正时间
   * @param time 时间
   * @returns 校正后的时间
   */
  public static correctInterval(time: number) {
    return Math.max(Timer.getPieceOfFrame(), time);
  }

  /*
   * 校正次数
   * @param calls 次数
   * @returns 校正后的次数
   */
  public static correctTicks(calls: number) {
    return (calls = calls | 0) <= 0 ? macro.REPEAT_FOREVER : calls;
  }

  /**
   * @zh
   * 延迟调用
   * @param cb 回调
   * @param delay 延迟时间
   */
  public static delayDo(cb: Function, delay?: number) {
    delay = Timer.correctInterval(delay);
    Singletons.time_hook.scheduleOnce(() => {
      Utils.runInSandbox({ onExecute: cb });
    }, delay);
  }

  /**
   * @zh
   * 循环调用
   * @param info 定时器基础信息
   */
  public static loopDo(info: T_TimerInfo) {
    let t = new Timer(info);
    t.start();
    return t;
  }

  /**
   * 定时器构造
   * @param info 定时器基础信息
   */
  constructor(info: T_TimerInfo) {
    this._info = info;
    this._info.onTick = info.onTick;
    this._info.onStart = info.onStart;
    this._info.onPause = info.onPause;
    this._info.onResume = info.onResume;
    this._info.onStop = info.onStop;
    this._info.stopOnError = 'stopOnError' in info ? info.stopOnError : true;
    this._info.interval = Timer.correctInterval(info.interval || 0);
    this._info.ticks = Timer.correctTicks(info.ticks || 0);
    this._info.delay =
      info.delay > 0 ? Timer.correctInterval(info.delay || 0) : 0;
    this._info.tag = info.tag || Timer.getAutoId();
  }

  /**
   * 定时器进度
   * @returns 定时器进度
   */
  progress(style: E_TimerProgressStyle = E_TimerProgressStyle.Slash) {
    let ret = undefined;
    switch (style) {
      case E_TimerProgressStyle.Numeric:
        ret = (this.current / this.ticks).toFixed(2);
        break;
      case E_TimerProgressStyle.Percent:
        ret = `${((this.current / this.ticks) * 100).toFixed(1)}%`;
        break;
      case E_TimerProgressStyle.Slash:
        ret = `${this.current}/${this.ticks}`;
        break;
      default:
        ret = this.current / this.ticks;
        break;
    }
    return ret;
  }

  /**
   * 定时器唯一标识
   * @returns 定时器唯一标识
   */
  public get tag(): string {
    return this._info.tag;
  }

  /**
   * 定时器延迟时间
   * @returns 定时器延迟时间
   */
  public get delay(): number {
    return this._info.delay;
  }

  /**
   * 定时器节拍周期
   * @returns 定时器节拍周期
   */
  public get interval(): number {
    return this._info.interval;
  }

  /**
   * 定时器循环次数
   * @returns 定时器循环次数
   */
  public get ticks(): number {
    return this._info.ticks;
  }

  /**
   * 定时器当前节拍数
   * @returns 定时器当前节拍数
   */
  public get current(): number {
    return this._current;
  }

  /**
   * 定时器发生错误时是否停止
   * @returns 定时器发生错误时是否停止
   */
  public get stopOnError() {
    return this._info.stopOnError;
  }

  /**
   * 定时器当前状态
   * @returns 定时器当前状态
   */
  public get state() {
    return this._state;
  }

  /**
   * 定时器是否处于暂停状态
   * @returns 定时器是否处于暂停状态
   */
  public get paused() {
    return this._state === E_TimerState.Paused;
  }

  /**
   * 定时器是否处于停止状态
   * @returns 定时器是否处于停止状态
   */
  public get stopped() {
    return this._state === E_TimerState.Stopped;
  }

  /**
   * 定时器是否处于运行状态
   * @returns 定时器是否处于运行状态
   */
  public get ticking() {
    return this._state === E_TimerState.Ticking;
  }

  /**
   * 定时器节拍回调
   */
  private _onTick() {
    if (this._state < E_TimerState.Ticking) return;

    const self = this;
    Utils.runInSandbox({
      onExecute() {
        self._increaseElapseTime();
        self._current++;
        self._info.onTick(self);
        if (self.current >= self.ticks) self.stop();
      },
      onError(msg, stack) {
        Singletons.logger.error(self, msg, stack);
        self.stopOnError && self.stop();
      },
    });
  }

  /**
   * 增加计时
   */
  private _increaseElapseTime() {
    const current = sys.now();
    this._elapse += current - this._startAt;
    this._startAt = current;
  }

  /**
   * 获得计时
   */
  public get elapse() {
    return this._elapse / 1000;
  }

  /**
   * 运行定时器
   */
  public start() {
    if (this._state === E_TimerState.Raw) {
      this._state = E_TimerState.Ticking;
      this._current = 0;
      this._elapse = 0;
      this._startAt = sys.now();
      this._info.onStart && this._info.onStart(this);
      this._info.refreshOnStart && this._info.onTick && this._info.onTick(this);
      this._wrapper = () => this._onTick();
      Singletons.time_hook.schedule(
        this._wrapper,
        this.interval,
        macro.REPEAT_FOREVER,
        this.delay
      );
    } else if (this.stopped) {
      this.restart();
    }
  }

  /**
   * 暂停定时器
   */
  public pause() {
    if (this.ticking) {
      this._increaseElapseTime();
      Singletons.time_hook.unschedule(this._wrapper);
      this._wrapper = null;
      this._state = E_TimerState.Paused;
      this._info.onPause && this._info.onPause(this);
    }
  }

  /**
   * 恢复定时器
   */
  public resume() {
    if (this.paused) {
      this._startAt = sys.now();
      this._state = E_TimerState.Ticking;
      this._info.onResume && this._info.onResume(this);
      this._wrapper = () => {
        this._onTick();
      };
      Singletons.time_hook.schedule(
        this._wrapper,
        this.interval,
        macro.REPEAT_FOREVER
      );
    }
  }

  /**
   * 暂停定时器
   * @param force 是否强制停止，默认非强制
   */
  public stop(force: boolean = false) {
    if (force || this.paused || this.ticking) {
      this._increaseElapseTime();
      Singletons.time_hook.unschedule(this._wrapper);
      this._wrapper = null;
      this._state = E_TimerState.Stopped;
      this._info.onStop && this._info.onStop(this);
    }
  }

  /**
   * 重新运行定时器
   * @param force 是否强制重开，默认非强制
   */
  public restart(force: boolean = false) {
    if (force || this.stopped) {
      this.reset();
      this.start();
    }
  }

  /**
   * 重置
   */
  public reset() {
    this.stop(true);
    this._state = E_TimerState.Raw;
    this._current = 0;
    this._elapse = 0;
  }
}
