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

- 支持加、解密与自定义数据模板的本地存储方案 [Advance][1]
- 资源管理器 [ResLoader][2]
  - 支持加载进度、完成、成功、失败回调
  - 加载接口统一：
    - `loadBundle`
    - `loadOne`
    - `loadDir`
    - `loadRemote`
  - 释放接口统一：
    - `release`
    - `releaseAsset`
    - `releaseBundle`
    - `releaseAll`
- [视频播放器][3]
  - 区别于 `cc.VideoPlayer` 只能放在最顶层或最底层，该方案可以实现层级自由调整
  - 可以对画面做丰富的定制，比如移动、旋转、缩放、滤镜等
- 音频播放器 [AudioPlayer][4]
  - 支持分别对音效和音乐操作
  - 支持开关控制、音量调节

## 计划中

[1]: ./assets/scripts/supports/storage/advance.ts
[2]: ./assets/scripts/supports/res/res-loader.ts
[3]: ./doc/video-player.md
[4]: ./assets/scripts/supports/audio-player/audio-player.ts
