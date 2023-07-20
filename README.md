# Cocos Creator Collection

> **Cocos Creator Collection** 集合了诸多功能的实现和示例为开发者提供参考，你可以从中借鉴或者直接使用。

## 基础功能

- 设备信息工具
  - CPU 类型
  - 浏览器类型
  - 操作系统
  - 显卡信息
  - 设备 UUID
  - ...
- UUID v5 支持
  - 生成
  - 验证
- 加密/解密工具
  - MD5
  - Base64
  - AES
- 多种存储方案
  - Memory
  - LocalStorage
  - Cookie
  - Session

## 已完成

- 支持加、解密与自定义数据模板的本地存储方案 [Advance](./assets/scripts/supports/storage/advance.ts)
- [视频播放器](./doc/video-player.md)
  - 区别于 `cc.VideoPlayer` 只能放在最顶层或最底层，该方案可以实现层级自由调整
  - 可以对画面做丰富的定制，比如移动、旋转、缩放、滤镜等

## 计划中

- 资源管理器
- 音频播放器
