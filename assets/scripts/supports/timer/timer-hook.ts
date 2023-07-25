/*
 * @Author: DoooReyn 
 * @Date: 2023-07-25 16:38:09 
 * @LastModifiedBy: DoooReyn 
 * @LastModifiedAt: 2023-07-25 16:38:09 
 */

import { _decorator, game, Game } from 'cc';
import { Gossip } from '../cmm/gossip';
const { ccclass } = _decorator;

/**
 * 定时器执行组件
 */
@ccclass('TimerHook')
export class TimerHook extends Gossip {
  onPause: Function = null;
  onResume: Function = null;

  onEnable() {
    game.on(Game.EVENT_HIDE, this.pause, this);
    game.on(Game.EVENT_SHOW, this.resume, this);
  }

  onDisable() {
    game.off(Game.EVENT_HIDE, this.pause, this);
    game.off(Game.EVENT_SHOW, this.resume, this);
  }

  pause() {
    this.onPause && this.onPause();
  }

  resume() {
    this.onResume && this.onResume();
  }
}
