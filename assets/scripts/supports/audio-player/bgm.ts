/*
 * @Author: DoooReyn
 * @Date: 2023-07-20 23:21:32
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-20 23:21:32
 */

import { AudioClip, AudioSource, error } from 'cc';
import { I_AssetItem } from '../cmm/interface';
import { Singletons } from '../singletons';

/**
 * 音乐播放组件
 */
export class Bgm extends AudioSource {
  /**
   * 加载音乐
   * @param options 选项
   */
  load(options: I_AssetItem & { loop?: boolean; onComplete?: Function }) {
    Singletons.res.loadOne({
      path: options.path,
      bundle: options.bundle,
      type: AudioClip,
      onBad: error,
      onOK: (clips) => {
        const clip = clips[0];

        // 如果和之前是同一份资源，则跳过
        if (this.clip && this.clip === clip && this.playing) {
          Singletons.events.audio.emit('bgm-playing');
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
      Singletons.res.releaseAsset(this.clip);
      this.clip = null;
    }
  }
}
