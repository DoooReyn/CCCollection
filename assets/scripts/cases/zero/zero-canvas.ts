import { _decorator, Component, Node } from 'cc';
import { Arrays } from '../../supports/cmm/arrays';
import { Logger } from '../../supports/logger/logger';
import { Randoms } from '../../supports/cmm/random';
const { ccclass, property } = _decorator;

@ccclass('ZeroCanvas')
export class zero_canvas extends Component {
  start() {
    const str =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const chars = str.split('');

    // 设置随机数种子
    Randoms.instance.seed = 1690255693042;

    // Array.shuffle
    Logger.instance.info(Arrays.shuffle(chars));
  }

  update(deltaTime: number) {}
}
