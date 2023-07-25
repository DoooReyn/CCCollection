/*
 * @Author: DoooReyn
 * @Date: 2023-07-25 14:39:49
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-25 14:39:49
 */

import { Component, Constructor, _decorator } from 'cc';
import { Utils } from './utils';

const { ccclass } = _decorator;

/**
 * 基础组件
 */
@ccclass('Gossip')
export class Gossip extends Component {
  /**
   * 在节点上部署组件
   * @param component 组件
   * @returns
   */
  public setupComponent<T extends Component>(component: Constructor<T>): T {
    return Utils.setupComponent(this, component);
  }
}
