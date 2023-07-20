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
import { E_AdvanceSetting } from '../../supports/cmm/setting';
const { ccclass } = _decorator;

/**
 * 音频播放器示例
 */
@ccclass('AudioPlayerCanvas')
export class AudioPlayerCanvas extends Component {
  start() {
    Device.instance.init(C_HOME_PAGE);
    Ciphers.AES.init(C_AES_KEY, C_AES_IV);
    Stores.Advance.init(C_SETTING);
    log(Stores.Advance.toJson());
    Stores.Advance.write(E_AdvanceSetting.bgm_on, true);
    AudioPlayer.instance.init();
    setTimeout(() => {
      AudioPlayer.instance.playBgm({ path: 'bgm-lobby', loop: false });
      AudioPlayer.instance.node.on('bgm-ended', () => {
        AudioPlayer.instance.playSfx({ path: 'sfx-click' });
      });
    }, 2000);
  }
}
