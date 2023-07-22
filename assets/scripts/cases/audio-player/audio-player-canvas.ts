/*
 * @Author: DoooReyn
 * @Date: 2023-07-18 22:22:40
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-18 22:22:40
 */

import { _decorator, Component, Label, log, misc, Slider, Toggle } from 'cc';
import { Stores } from '../../supports/storage';
import { Device } from '../../supports/device/device';
import { Ciphers } from '../../supports/cipher/ciphers';
import {
  C_HOME_PAGE,
  C_AES_KEY,
  C_AES_IV,
  C_SETTING,
} from '../../supports/cmm/constants';
import {
  AudioPlayer,
  E_BgmEventType,
} from '../../supports/audio-player/audio-player';
import { E_AdvanceSetting } from '../../supports/cmm/setting';
import { Numbers } from '../../supports/cmm/numbers';
import { Events } from '../../supports/event/events';
const { ccclass, property } = _decorator;

/**
 * 音频播放器示例
 */
@ccclass('AudioPlayerCanvas')
export class AudioPlayerCanvas extends Component {
  @property({ type: Label })
  labState: Label;

  @property({ type: Label })
  labBgmVolume: Label;

  @property({ type: Label })
  labSfxVolume: Label;

  @property({ type: Slider })
  sliderBgm: Slider;

  @property({ type: Slider })
  sliderSfx: Slider;

  @property({ type: Toggle })
  toggleBgm: Toggle;

  @property({ type: Toggle })
  toggleSfx: Toggle;

  private _tid: number = -1;

  start() {
    // 初始化需要的模块
    Device.instance.init(C_HOME_PAGE);
    Ciphers.AES.init(C_AES_KEY, C_AES_IV);
    Stores.Advance.init(C_SETTING);
    Events.instance.init();
    AudioPlayer.instance.init();

    // 同步本地数据
    const bgm_on = Stores.Advance.read(E_AdvanceSetting.bgm_on);
    const sfx_on = Stores.Advance.read(E_AdvanceSetting.sfx_on);
    const bgm_volume = Stores.Advance.read(E_AdvanceSetting.bgm_volume);
    const sfx_volume = Stores.Advance.read(E_AdvanceSetting.sfx_volume);
    this.labBgmVolume.string = `${bgm_volume}`;
    this.labSfxVolume.string = `${sfx_volume}`;
    this.sliderBgm.progress = bgm_volume;
    this.sliderSfx.progress = sfx_volume;
    this.toggleBgm.isChecked = bgm_on;
    this.toggleSfx.isChecked = sfx_on;

    // 监听音乐事件
    Events.instance.audio.on(E_BgmEventType.Start, () => {
      this._setState('背景音乐开始播放');
    });
    Events.instance.audio.on(E_BgmEventType.Playing, () => {
      this._setState('当前背景音乐正在播放');
    });
    Events.instance.audio.on(E_BgmEventType.Ended, () => {
      this._setState('背景音乐结束播放');
    });
  }

  private _setState(msg: string) {
    this.labState.string = msg;
    clearTimeout(this._tid);
    this._tid = setTimeout(() => {
      this.labState.string = '';
    }, 2000);
  }

  onToggleBgmChecked() {
    const on = (AudioPlayer.instance.bgmOn = !this.toggleBgm.isChecked);
    Stores.Advance.save();
    this._setState(`音乐 ${on ? '开' : '关'}`);
  }

  onToggleSfxChecked() {
    const on = (AudioPlayer.instance.sfxOn = !this.toggleSfx.isChecked);
    Stores.Advance.save();
    this._setState(`音效 ${on ? '开' : '关'}`);
  }

  onSliderBgmChanged() {
    AudioPlayer.instance.bgmVolume = this.sliderBgm.progress;
    this.labBgmVolume.string = AudioPlayer.instance.bgmVolume.toString();
    Stores.Advance.save();
  }

  onSliderSfxChanged() {
    AudioPlayer.instance.sfxVolume = this.sliderSfx.progress;
    this.labSfxVolume.string = AudioPlayer.instance.sfxVolume.toString();
    Stores.Advance.save();
  }

  onPlayBgm() {
    AudioPlayer.instance.playBgm({ path: 'bgm-lobby', loop: false });
  }

  onPlaySfx() {
    AudioPlayer.instance.playSfx({ path: 'sfx-click' });
  }

  onStopAll() {
    AudioPlayer.instance.stopAll();
  }
}
