/*
 * @Author: DoooReyn 
 * @Date: 2023-07-25 15:45:45 
 * @LastModifiedBy: DoooReyn 
 * @LastModifiedAt: 2023-07-25 15:45:45 
 */

import { AudioClip, AudioSource, error } from 'cc';
import { I_AssetItem } from '../cmm/interface';
import { Singletons } from '../singletons';

/**
 * 音效播放组件
 */
export class Sfx extends AudioSource {
  private _map: Map<string, AudioClip> = new Map<string, AudioClip>();

  /**
   * 加载音效
   * @param options 选项
   * @param onComplete
   */
  load(options: I_AssetItem & { onComplete?: Function }) {
    Singletons.res.loadOne({
      path: options.path,
      bundle: options.bundle,
      type: AudioClip,
      onBad: error,
      onOK: (clips) => {
        const clip = clips[0];
        this._map.set(options.path, clip);
        this.playOneShot(clip);
        options.onComplete && options.onComplete();
      },
    });
  }

  release() {
    this.stop();
    this._map.forEach.call(this, Singletons.res.release);
    this._map.clear();
  }
}
