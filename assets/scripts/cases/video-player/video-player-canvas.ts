import {
  Component,
  EventTouch,
  Label,
  NodeEventType,
  Slider,
  Toggle,
  VideoClip,
  _decorator,
} from 'cc';

import {
  VideoPlayer,
  E_VideoEventType,
} from '../../supports/video-player/video-player';
import { Numbers } from '../../supports/cmm/numbers';
import { Events } from '../../supports/event/events';

const { ccclass, property } = _decorator;

/**
 * 视频播放器示例
 * - 支持从本地和远程加载
 * - 可以拖动视频节点
 */
@ccclass('VideoPlayerCanvas')
export class VideoPlayerCanvas extends Component {
  /**
   * 视频播放器
   */
  @property({ type: VideoPlayer })
  player: VideoPlayer = null;

  /**
   * 视频播放状态提示
   */
  @property({ type: Label })
  state: Label = null;

  /**
   * 音量控制
   */
  @property({ type: Slider })
  volumeSlider: Slider = null;

  /**
   * 循环控制控件
   */
  @property({ type: Toggle })
  loopBtn: Toggle = null;

  /**
   * 静音控制控件
   */
  @property({ type: Toggle })
  muteBtn: Toggle = null;

  protected onEnable(): void {
    Events.instance.video.on(E_VideoEventType.Loading, this._onLoading, this);
    Events.instance.video.on(E_VideoEventType.LoadBad, this._onLoadBad, this);
    Events.instance.video.on(E_VideoEventType.LoadOk, this._onLoadOk, this);
    Events.instance.video.on(E_VideoEventType.Ready, this._onReady, this);
    Events.instance.video.on(E_VideoEventType.Play, this._onPlayed, this);
    Events.instance.video.on(E_VideoEventType.Pause, this._onPaused, this);
    Events.instance.video.on(E_VideoEventType.Resume, this._onResumed, this);
    Events.instance.video.on(E_VideoEventType.Stop, this._onStopped, this);
    Events.instance.video.on(E_VideoEventType.Goto, this._onGoto, this);
    Events.instance.video.on(E_VideoEventType.Step, this._onStep, this);
    Events.instance.video.on(E_VideoEventType.Ended, this._onEnded, this);
    this.player.node.on(NodeEventType.TOUCH_MOVE, this._onDrag, this);
  }

  protected onDisable(): void {
    Events.instance.video.off(E_VideoEventType.Loading, this._onLoading, this);
    Events.instance.video.off(E_VideoEventType.LoadBad, this._onLoadBad, this);
    Events.instance.video.off(E_VideoEventType.LoadOk, this._onLoadOk, this);
    Events.instance.video.off(E_VideoEventType.Ready, this._onReady, this);
    Events.instance.video.off(E_VideoEventType.Play, this._onPlayed, this);
    Events.instance.video.off(E_VideoEventType.Pause, this._onPaused, this);
    Events.instance.video.off(E_VideoEventType.Resume, this._onResumed, this);
    Events.instance.video.off(E_VideoEventType.Stop, this._onStopped, this);
    Events.instance.video.off(E_VideoEventType.Goto, this._onGoto, this);
    Events.instance.video.off(E_VideoEventType.Step, this._onStep, this);
    Events.instance.video.off(E_VideoEventType.Ended, this._onEnded, this);
    this.player.node.off(NodeEventType.TOUCH_MOVE, this._onDrag, this);
  }

  protected start() {
    const player = this.player;

    // 您可以使用以下三种方式之一来加载视频资源
    // 1. 以 resources 下的资源加载
    player.load('cocosvideo');

    // 2. 指定 bundle 下的资源加载
    // player.load({ bundle: 'resources', path: 'cocosvideo' });

    // 3. 以网络资源加载（远程资源地址）
    // this.player.load("http://127.0.0.1:8080/cocosvideo.mp4");
  }

  /**
   * 拖动视频节点
   * @param touch 触摸事件
   */
  private _onDrag(touch: EventTouch) {
    const { x, y } = touch.getDelta();
    this.player.node.setPosition(this.player.node.position.add3f(x, y, 0));
  }

  /**
   * 视频资源加载中事件
   * @param info 信息
   */
  private _onLoading(info: any) {
    this.state.string = `[Loading] ${info.asset}`;
  }

  /**
   * 视频资源加载失败
   * @param err 错误信息
   */
  private _onLoadBad(err: any) {
    this.state.string = `[LoadBad] ${err.reason}`;
  }

  /**
   * 视频资源加载成功
   * @param clip 视频片段资源
   */
  private _onLoadOk(clip: VideoClip) {
    this.state.string = '[LoadOk]';
  }

  /**
   * 视频准备就绪
   * @param video HTML 视频标签
   */
  private _onReady(video: HTMLVideoElement) {
    this.state.string = '[Ready]';
    const ratio = 1;
    const w = video.videoWidth * ratio;
    const h = video.videoHeight * ratio;
    this.player.setContentSize(w, h);
  }

  /**
   * 视频已播放事件
   */
  private _onPlayed() {
    this.state.string = '[Play]';
  }

  /**
   * 视频已暂停事件
   */
  private _onPaused() {
    this.state.string = '[Pause]';
  }

  /**
   * 视频已恢复事件
   */
  private _onResumed() {
    this.state.string = '[Resume]';
  }

  /**
   * 视频已停止事件
   */
  private _onStopped() {
    this.state.string = '[Stop]';
  }

  /**
   * 视频跳转事件
   * @param time 指定时间片
   */
  private _onGoto(time: number) {
    this.state.string = `[Goto] ${time}`;
  }

  /**
   * 视频帧切换事件
   * @param time 时间片
   */
  private _onStep(time: number) {
    this.state.string = `[Step] ${time.toFixed(1)}s`;
  }

  /**
   * 视频完成播放事件
   */
  private _onEnded() {
    this.state.string = '[Ended]';
  }

  /**
   * 播放视频
   */
  public play() {
    this.player.volume = this.volumeSlider.progress;
    this.player.loop = this.loopBtn.isChecked;
    this.player.muted = this.muteBtn.isChecked;
    this.player.play();
  }

  /**
   * 暂停视频
   */
  public pause() {
    this.player.pause();
  }

  /**
   * 恢复视频
   */
  public resume() {
    this.player.resume();
  }

  /**
   * 停止视频
   */
  public stop() {
    this.player.stop();
  }

  /**
   * 快退
   */
  public stepBackward() {
    this.player.goto(this.player.current - 5);
  }

  /**
   * 快进
   */
  public stepForward() {
    this.player.goto(this.player.current + 5);
  }

  /**
   * 控制静音
   */
  public mute() {
    this.player.muted = this.muteBtn.isChecked;
  }

  /**
   * 控制循环
   */
  public loop() {
    this.player.loop = this.loopBtn.isChecked;
  }

  /**
   * 调整音量
   */
  public volume() {
    this.player.volume = Numbers.reserve(this.volumeSlider.progress, 1);
  }
}
