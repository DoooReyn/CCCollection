/*
 * @Author: DoooReyn
 * @Date: 2023-07-18 22:22:40
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-18 22:22:40
 */

import { _decorator, AudioClip, Component, error, log } from 'cc';
import { Stores } from '../../supports/storage';
import { Device } from '../../supports/device/device';
import { Ciphers } from '../../supports/cipher/ciphers';
import {
  C_HOME_PAGE,
  C_AES_KEY,
  C_AES_IV,
  C_SETTING,
} from '../../supports/cmm/constants';
import { AudioPlayer } from '../../supports/audio-player/audio-player';
const { ccclass } = _decorator;

/**
 * 音频播放器示例
 */
@ccclass('AudioPlayerCanvas')
export class AudioPlayerCanvas extends Component {
  start() {
    // 初始化需要的模块
    Device.instance.init(C_HOME_PAGE);
    Ciphers.AES.init(C_AES_KEY, C_AES_IV);
    Stores.Advance.init(C_SETTING);
    AudioPlayer.instance.init();

    // 播放音乐
    AudioPlayer.instance.playBgm({ path: 'bgm-lobby', loop: false });
    AudioPlayer.instance.node.on('bgm-ended', () => {
      log('背景音乐播放完成');
      AudioPlayer.instance.playSfx({ path: 'sfx-click' });
    });
  }
}
