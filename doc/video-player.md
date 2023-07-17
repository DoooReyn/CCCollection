# 视频播放器

## 原理

1. 使用 HTML `<video>` 控制视频（播放、暂停、调整音量、静音等）
2. 播放时将视频帧绘制到后台 `Canvas` 上
3. 按帧将后台 `Canvas` 转换成 `SpriteFrame`
4. 由给定的 `Sprite` 进行展示即可

## 特征

> 由于是将视频绘制到精灵上，因此可以做任何针对精灵的操作

- 层级可控（变得非常容易，可以放在任何层级）
- 可以添加滤镜等高级效果
- 可以任意拉伸或者等比缩放
- 支持本地和远程资源
- 添加了丰富的视频事件，方便开发者控制视频
    - 视频资源加载中
    - 视频资源加载成功
    - 视频资源加载失败
    - 视频数据准备就绪
    - 视频开始播放
    - 视频暂停播放
    - 视频恢复播放
    - 视频停止播放
    - 视频完成播放
    - 视频帧切换
    - 视频时间片跳转

## 示例

<video width="432" height="240" controls>
  <source src="../screenshot/video-player-record.mp4" type="video/mp4">
</video>

https://github.com/DoooReyn/CCCollection/assets/9557233/309a5b94-1ee3-45c6-8fc7-865ad496c8ab
