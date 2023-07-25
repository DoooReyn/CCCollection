/*
 * @Author: DoooReyn
 * @Date: 2023-07-25 15:19:09
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-25 15:19:09
 */

cc.game.on(cc.Game.EVENT_ENGINE_INITED, () => {
  const root = new cc.Node('Root#Persistence');
  cc.director.addPersistRootNode(root);
});
