/*
 * @Author: DoooReyn
 * @Date: 2023-07-20 23:21:32
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-20 23:21:32
 */

import { AudioClip, AudioSource, error, log } from 'cc';
import { I_AssetItem } from '../cmm/interface';
import { ResLoader } from '../res/res-loader';
import { Events } from '../event/events';

/**
 * 音乐播放器
 */
export class Bgm extends AudioSource {
  /**
   * 加载音乐
   * @param options 选项
   */
  load(options: I_AssetItem & { loop?: boolean; onComplete?: Function }) {
    ResLoader.instance.loadOne({
      path: options.path,
      bundle: options.bundle,
      type: AudioClip,
      onBad: error,
      onOK: (clips) => {
        const clip = clips[0];

        // 如果和之前是同一份资源，则跳过
        if (this.clip && this.clip === clip && this.playing) {
          Events.instance.audio.emit('bgm-playing');
          return;
        }

        // 停止和释放前一份资源
        if (this.playing) this.stop();
        if (this.clip && this.clip !== clip) {
          this.release();
        }

        // 播放
        options.onComplete && options.onComplete(clip);
        this.clip = clip;
        this.loop = !!options.loop;
        this.play();
      },
    });
  }

  /**
   * 释放资源
   */
  release() {
    if (this.clip) {
      this.stop();
      ResLoader.instance.releaseAsset(this.clip);
      this.clip = null;
    }
  }
}
