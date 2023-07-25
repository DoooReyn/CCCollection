/*
 * @Author: DoooReyn
 * @Date: 2023-07-18 20:36:38
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-18 20:36:38
 */

import { _decorator, AudioSource, Component } from 'cc';
import { Bgm } from './bgm';
import { Sfx } from './sfx';
import { Stores } from '../storage';
import { E_AdvanceSetting } from '../cmm/setting';
import { I_AssetItem } from '../cmm/interface';
import { Numbers } from '../cmm/numbers';
import { Singletons } from '../singletons';
const { ccclass } = _decorator;

/**
 * 音频事件类型
 */
export enum E_BgmEventType {
  Playing = 'bgm-playing',
  Start = 'bgm-started',
  Ended = 'bgm-ended',
}

/**
 * 音频播放器
 */
@ccclass('AudioPlayer')
export class AudioPlayer extends Component {
  static readonly instance: AudioPlayer = new AudioPlayer('AudioPlayer');

  private _bgm!: Bgm;
  private _sfx!: Sfx;

  /**
   * 背景音乐开始播放回调
   * - 如果设置成循环，是不会调用的
   * @param source 音源
   */
  private _onBgmStart(source: AudioSource) {
    if (source === this._bgm) {
      Singletons.events.audio.emit(E_BgmEventType.Start, {
        name: this._bgm.name,
        uuid: this._bgm.uuid,
        loop: this._bgm.loop,
        volume: this._bgm.volume,
        sampleRate: this._bgm.getSampleRate(),
        duration: this._bgm.duration,
      });
    }
  }

  /**
   * 背景音乐结束播放回调
   * - 如果设置成循环，是不会调用的
   * @param source 音源
   */
  private _onBgmComplete(source: AudioSource) {
    if (source === this._bgm) {
      Singletons.events.audio.emit(E_BgmEventType.Ended, {
        name: this._bgm.name,
        uuid: this._bgm.uuid,
      });
    }
  }

  /**
   * 初始化
   * - 使用之前请先初始化
   */
  init() {
    this._bgm = this.getComponent(Bgm) || this.addComponent(Bgm);
    this._sfx = this.getComponent(Sfx) || this.addComponent(Sfx);
    this._bgm.volume = this.bgmVolume;
    this._sfx.volume = this.sfxVolume;
    this.node.on(AudioSource.EventType.STARTED, this._onBgmStart, this);
    this.node.on(AudioSource.EventType.ENDED, this._onBgmComplete, this);
  }

  /**
   * 背景音乐是否正在播放
   */
  get isBgmPlaying() {
    return this._bgm.playing;
  }

  /**
   * 播放音乐
   * @param options 选项
   * @param options.loop 默认开启循环
   */
  playBgm(options: I_AssetItem & { loop?: boolean; onComplete?: Function }) {
    if (options.loop === undefined) options.loop = true;
    this.bgmOn && this._bgm.load(options);
  }

  /**
   * 播放音效
   * @param options 选项
   */
  playSfx(options: I_AssetItem & { onComplete?: Function }) {
    this.sfxOn && this._sfx.load(options);
  }

  /**
   * 音乐开关
   */
  get bgmOn() {
    return Stores.Advance.read(E_AdvanceSetting.bgm_on);
  }

  /**
   * 设置音乐开关
   */
  set bgmOn(v: boolean) {
    Stores.Advance.write(E_AdvanceSetting.bgm_on, v);
    if (v === false) this._bgm.stop();
  }

  /**
   * 音效开关
   */
  get sfxOn() {
    return Stores.Advance.read(E_AdvanceSetting.sfx_on);
  }

  /**
   * 设置音效开关
   */
  set sfxOn(v: boolean) {
    Stores.Advance.write(E_AdvanceSetting.sfx_on, v);
    if (v === false) this._sfx.stop();
  }

  /**
   * 音乐音量
   */
  get bgmVolume() {
    return Stores.Advance.read(E_AdvanceSetting.bgm_volume);
  }

  /**
   * 设置音乐音量
   */
  set bgmVolume(v: number) {
    this._bgm.volume = v = Numbers.clamp(Numbers.reserve(v, 2), 0, 1);
    Stores.Advance.write(E_AdvanceSetting.bgm_volume, v);
  }

  /**
   * 音效音量
   */
  get sfxVolume() {
    return Stores.Advance.read(E_AdvanceSetting.sfx_volume);
  }

  /**
   * 设置音效音量
   */
  set sfxVolume(v: number) {
    this._sfx.volume = v = Numbers.clamp(Numbers.reserve(v, 2), 0, 1);
    Stores.Advance.write(E_AdvanceSetting.sfx_volume, v);
  }

  /**
   * 暂停全部音频
   */
  pauseAll() {
    this._bgm.pause();
    this._sfx.pause();
  }

  /**
   * 恢复全部音频
   */
  resumeAll() {
    this._bgm.play();
    this._sfx.play();
  }

  /**
   * 停止全部音频
   */
  stopAll() {
    this._bgm.stop();
    this._sfx.stop();
  }

  /**
   * 释放所有音频资源
   */
  releaseAll() {
    this._bgm.release();
    this._sfx.release();
  }
}
