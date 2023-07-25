# Cocos Creator Collection

> **Cocos Creator Collection** 集合了诸多功能的实现和示例为开发者提供参考，你可以从中借鉴或者直接使用。

## 已完成

- 多种存储方案 [Stores][6]
  - Memory
  - LocalStorage
  - Cookie
  - Session
  - 支持加、解密与自定义数据模板的本地存储方案 [Advance][1]

- 资源管理器 [ResLoader][2]

- [视频播放器][3]
  - 区别于 `cc.VideoPlayer` 只能放在最顶层或最底层，该方案可以实现层级自由调整
  - 可以对画面做丰富的定制，比如移动、旋转、缩放、滤镜等

- 音频播放器 [AudioPlayer][4]
  - 支持分别对音效和音乐操作
  - 支持开关控制、音量调节

- 全局事件管理器 [Events][5]

- 日志管理器 [Logger][7]

- 随机数管理器 [Randoms][8]

- 设备信息工具 [Device][9]

- UUID v5 支持 [uuid][10]

- 加密/解密工具 (MD5/Base64/AES) [Ciphers][11]

- 定时器 [Timers][12]

## 计划中


[1]: ./assets/scripts/supports/storage/advance.ts
[2]: ./assets/scripts/supports/res/res-loader.ts
[3]: ./doc/video-player.md
[4]: ./assets/scripts/supports/audio-player/audio-player.ts
[5]: ./assets/scripts/support/event/events.ts
[6]: ./assets/scripts/supports/storage/index.ts
[7]: ./assets/scripts/supports/logger/logger.ts
[8]: ./assets/scripts/supports/cmm/random.ts
[9]: ./assets/scripts/supports/device/device.ts
[10]: ./assets/scripts/supports/device/uuid.ts
[11]: ./assets/scripts/supports/cipher/ciphers.ts
[12]: ./assets/scripts/supports/timer/timers.ts
