/*
 * @Author: DoooReyn 
 * @Date: 2023-07-24 10:38:02 
 * @LastModifiedBy: DoooReyn 
 * @LastModifiedAt: 2023-07-24 10:38:02 
 */

import { EventTarget, Game, Input, game, input } from 'cc';

/**
 * 自定义事件目标
 * - 添加了一个 `name` 属性
 */
class CustomEventTarget extends EventTarget {
  public readonly name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}

/**
 * 事件管理器
 */
export class Events {
  /**
   * 用户自定义
   */
  public user: CustomEventTarget;
  /**
   * 多语言
   */
  public lang: CustomEventTarget;
  /**
   * 红点
   */
  public red: CustomEventTarget;
  /**
   * 音频播放器
   */
  public audio: CustomEventTarget;
  /**
   * 视频播放器
   */
  public video: CustomEventTarget;
  /**
   * 系统
   */
  public sys: CustomEventTarget;
  /**
   * 输入设备
   */
  private _input: Input;
  /**
   * 游戏内部
   */
  private _game: Game;

  private _onGameHide() {
    this.sys.emit('sys-hide');
  }

  private _onGameShow() {
    this.sys.emit('sys-show');
  }

  private _onGamePause() {
    this.sys.emit('sys-pause');
  }

  private _onGameResume() {
    this.sys.emit('sys-resume');
  }

  private _onGameRestart() {
    this.sys.emit('sys-restart');
  }

  private _onGameLowMemory() {
    this.sys.emit('sys-low-memory');
  }

  constructor() {
    this.user = new CustomEventTarget('user');
    this.lang = new CustomEventTarget('lang');
    this.red = new CustomEventTarget('red');
    this.audio = new CustomEventTarget('audio');
    this.video = new CustomEventTarget('video');
    this.sys = new CustomEventTarget('sys');
    this._input = input;
    this._game = game;
  }

  init() {
    this._game.on(Game.EVENT_HIDE, this._onGameHide, this);
    this._game.on(Game.EVENT_SHOW, this._onGameShow, this);
    this._game.on(Game.EVENT_PAUSE, this._onGamePause, this);
    this._game.on(Game.EVENT_RESUME, this._onGameResume, this);
    this._game.on(Game.EVENT_RESTART, this._onGameRestart, this);
    this._game.on(Game.EVENT_LOW_MEMORY, this._onGameLowMemory, this);
  }

  deinit() {
    this._game.off(Game.EVENT_HIDE, this._onGameHide, this);
    this._game.off(Game.EVENT_SHOW, this._onGameShow, this);
    this._game.off(Game.EVENT_PAUSE, this._onGamePause, this);
    this._game.off(Game.EVENT_RESUME, this._onGameResume, this);
    this._game.off(Game.EVENT_RESTART, this._onGameRestart, this);
    this._game.off(Game.EVENT_LOW_MEMORY, this._onGameLowMemory, this);
  }
}
