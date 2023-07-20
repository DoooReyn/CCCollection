/*
 * @Author: DoooReyn
 * @Date: 2023-07-18 20:36:38
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-18 20:36:38
 */

import { _decorator, Component } from 'cc';
import { Bgm } from './bgm';
import { Sfx } from './sfx';
import { Stores } from '../storage';
import { E_AdvanceSetting } from '../cmm/setting';
const { ccclass } = _decorator;

@ccclass('AudioPlayer')
export class AudioPlayer extends Component {
  private _bgm!: Bgm;
  private _sfx!: Sfx;

  init() {
    this._bgm = this.getComponent(Bgm) || this.addComponent(Bgm);
    this._sfx = this.getComponent(Sfx) || this.addComponent(Sfx);
    Stores.Advance.read(E_AdvanceSetting.bgm_on)
  }

  update(deltaTime: number) {}
}
