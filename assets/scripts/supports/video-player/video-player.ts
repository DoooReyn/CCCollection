/*
 * @Author: DoooReyn
 * @Date: 2023-07-18 20:36:56
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-20 21:12:51
 */

import {
  Component,
  Game,
  Sprite,
  SpriteFrame,
  UITransform,
  VideoClip,
  _decorator,
  error,
  game,
  warn,
} from 'cc';

import { I_AssetItem } from '../cmm/interface';
import { Numbers } from '../cmm/numbers';
import { RegExpValidator } from '../cmm/reg-exp-validator';
import { ResLoader } from '../res/res-loader';
import { Events } from '../event/events';
import { Singletons } from '../singletons';

/**
 * 视频状态
 * - Primitive  原始状态（无）
 * - Loading    资源加载中
 * - Loaded     资源加载完成
 * - DataLoaded 数据加载完成
 * - Playing    播放中
 * - Paused     已暂停
 */
export enum E_VideoState {
  Primitive = 0,
  Loading,
  Loaded,
  DataLoaded,
  Playing,
  Paused,
}

/**
 * 视频事件类型
 * - Loading    资源加载中
 * - LoadOk     资源加载完成
 * - LoadBad    资源加载失败
 * - Ready      视频准备就绪，可以播放了
 * - Play       播放
 * - Pause      暂停
 * - Resume     恢复
 * - Stop       停止
 * - Goto       跳到（时间点）
 * - Step       帧切换
 * - Ended      视频播放完成
 */
export enum E_VideoEventType {
  Loading = 'loading',
  LoadOk = 'load-ok',
  LoadBad = 'load-bad',
  Ready = 'ready',
  Play = 'play',
  Pause = 'pause',
  Resume = 'resume',
  Stop = 'stopped',
  Goto = 'goto',
  Step = 'step',
  Ended = 'ended',
}

const { ccclass, requireComponent } = _decorator;

/**
 * 自定义视频播放器
 * - 原理：
 *   使用 HTML <video> 标签在后台播放视频，将视频数据绘制到一个后台 canvas 上，
 *   然后每帧从后台 canvas 读取数据，转换成 SpriteFrame，由给定的 Sprite 进行
 *   展示即可。
 * - 优势：
 *   可以做到使用 Sprite 来播放视频，摆脱了内置 VideoPlayer 控件的层级限制（
 *   要么在最底层、要么在最高层），可控性拉满，开发者可以针对 Sprite 做更多的操
 *   作，比如添加滤镜等等。
 */
@ccclass('VideoPlayer')
@requireComponent(Sprite)
export class VideoPlayer extends Component {
  /**
   * 后台 Canvas 元素
   */
  private _canvas: HTMLCanvasElement;
  /**
   * 后台 Canvas 上下文
   */
  private _ctx: CanvasRenderingContext2D;
  /**
   * 视频元素
   */
  private _element: HTMLVideoElement;
  /**
   * 当前视频状态
   */
  private _state: E_VideoState;
  /**
   * 用于播放视频的 Sprite
   */
  private _display: Sprite;
  /**
   * 视频片段资源
   */
  private _clip: VideoClip;
  /**
   * 是否需要循环播放
   */
  private _loop: boolean = false;
  /**
   * 是否需要静音
   */
  private _muted: boolean = false;
  /**
   * 视频音量
   */
  private _volume: number = 1;
  /**
   * 视频倍速
   */
  private _speed: number = 1;
  /**
   * 视频窗口高度
   */
  private _height: number = 0;
  /**
   * 视频窗口宽度
   */
  private _width: number = 0;
  /**
   * 是否需要恢复播放
   */
  private _resumable: boolean = false;
  /**
   * 播放帧率
   */
  private _fps: number = 30;

  protected onLoad() {
    // 创建后台 Canvas 元素
    const canvas = document.createElement('canvas');
    canvas.id = `canvas_video_${Date.now()}`;
    canvas.hidden = true;
    canvas.style.visibility = 'hidden';
    canvas.style.display = 'none';
    document.body.appendChild(canvas);

    // 初始化
    this._resumable = false;
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d');
    this._display = this.getComponent(Sprite);
    this._state = E_VideoState.Primitive;
  }

  protected onEnable(): void {
    this._startLoop();
    game.on(Game.EVENT_SHOW, this._onEnterForeground, this);
    game.on(Game.EVENT_HIDE, this._onEnterBackground, this);
  }

  protected onDisable(): void {
    this._stopLoop();
    game.off(Game.EVENT_SHOW, this._onEnterForeground, this);
    game.off(Game.EVENT_HIDE, this._onEnterBackground, this);
  }

  protected onDestroy(): void {
    this.unload();
  }

  /**
   * 启动视频刷新循环
   */
  protected _startLoop() {
    this._stopLoop();
    this.schedule(this._updateTexture, 1 / this._fps);
  }

  /**
   * 停止视频刷新循环
   */
  protected _stopLoop() {
    this.unschedule(this._updateTexture);
  }

  /**
   * 视频进入后台
   * - 进入后台时暂停播放
   */
  protected _onEnterBackground() {
    if (this.isPlaying) {
      this.pause();
      this._resumable = true;
    }
  }

  /**
   * 视频进入前台
   * - 回到前台时恢复播放
   */
  protected _onEnterForeground() {
    if (this.isPaused && this._resumable) {
      this._resumable = false;
      this.resume();
    }
  }

  /**
   * 更新视频帧画面
   */
  protected _updateTexture(): void {
    this.isPlaying && this._render();
  }

  /**
   * 从本地 Bundle 加载视频片段资源
   * @param bundle 本地资源包
   * @param path 视频资源路径
   */
  private _loadFromBundle(bundle: string, path: string) {
    Singletons.res.loadOne({
      path,
      bundle,
      type: VideoClip,
      onOK: (clips) => this._loadClip(clips[0]),
      onBad: (err) => {
        this._state = E_VideoState.Primitive;
        Singletons.events.video.emit(E_VideoEventType.LoadBad, {
          bundle,
          path,
          reason: err.toString(),
        });
        return error(`视频加载失败 ${bundle}/${path}`);
      },
    });
  }

  /**
   * 从远程记载视频片段资源
   * @param url 视频网址
   */
  private _loadFromRemote(url: string) {
    Singletons.res.loadRemote({
      url,
      type: VideoClip,
      onOK: (clip) => this._loadClip(clip),
      onBad: (err) => {
        this._state = E_VideoState.Primitive;
        Singletons.events.video.emit(E_VideoEventType.LoadBad, {
          url,
          reason: err.toString(),
        });
        return error(`视频加载失败 ${url}`);
      },
    });
  }

  /**
   * 视频片段资源加载
   * @param clip 视频片段资源
   */
  private _loadClip(clip: VideoClip) {
    const video = (<any>clip)._video as HTMLVideoElement;
    video.controls = false;
    video.hidden = true;
    video.crossOrigin = 'anonymous';
    video.style.visibility = 'hidden';
    video.style.display = 'none';
    video.addEventListener('loadeddata', () => {
      if (this.isDataLoaded) return;
      this._state = E_VideoState.Loaded;
      Singletons.events.video.emit(E_VideoEventType.Ready, video);
    });
    video.addEventListener('ended', () => {
      Singletons.events.video.emit(E_VideoEventType.Ended);
      if (this.loop) {
        this.current = 0;
        this.play();
      } else {
        this._state = E_VideoState.Loaded;
      }
    });
    document.body.appendChild(video);

    this._element = video;
    this._state = E_VideoState.Loaded;
    Singletons.events.video.emit(E_VideoEventType.LoadOk, clip);
  }

  /**
   * 渲染视频帧画面
   */
  private _render() {
    const { _ctx, _display, _canvas, _element, _width, _height } = this;
    _display.spriteFrame &&
    Singletons.res.releaseAsset(_display.spriteFrame);
    _ctx.clearRect(0, 0, _width, _height);
    _ctx.drawImage(_element, 0, 0, _width, _height);
    _display.spriteFrame = SpriteFrame.createWithImage(_canvas);
    Singletons.events.video.emit(E_VideoEventType.Step, _element.currentTime);
  }

  /**
   * 设置视频播放窗口尺寸
   * @param w 视频窗口宽度
   * @param h 视频窗口高度
   */
  public setContentSize(w: number, h: number) {
    const trans = this._display.getComponent(UITransform);
    this._height = this._canvas.height = trans.height = h | 0;
    this._width = this._canvas.width = trans.width = w | 0;
  }

  /**
   * 获取视频播放窗口尺寸
   * @returns
   */
  public getContentSize() {
    return { width: this._width, height: this._height };
  }

  /**
   * 获取原始视频尺寸
   */
  public get videoFrameSize() {
    let width = 0,
      height = 0;
    if (this.isLoaded) {
      width = this._element.videoWidth;
      height = this._element.videoHeight;
    }
    return { width, height };
  }

  /**
   * 加载视频资源
   * @param asset 视频资源
   * @returns
   */
  public load(asset: string | I_AssetItem | VideoClip) {
    if (!this.isPrimitive) {
      return warn('视频加载中或已加载.');
    }

    this._state = E_VideoState.Loading;
    Singletons.events.video.emit(E_VideoEventType.Loading, { asset });

    if (asset instanceof VideoClip) {
      this._loadClip(asset);
    } else if (typeof asset === 'string') {
      RegExpValidator.isUrl(asset)
        ? this._loadFromRemote(asset)
        : this._loadFromBundle('resources', asset);
    } else {
      this._loadFromBundle(asset.bundle, asset.path);
    }
  }

  /**
   * 卸载视频资源
   * @returns
   */
  public unload() {
    if (this._state <= E_VideoState.Primitive) return;

    if (this.isLoaded) {
      this._element.pause();
      this._element.removeAttribute('src');
      this._element.remove();
      const frame = this._display.spriteFrame;
      this._display.spriteFrame = null;
      frame && Singletons.res.releaseAsset(frame);
      Singletons.res.releaseAsset(this._clip);
    }
    this._canvas.remove();
    this._clip = null;
    this._element = null;
    this._canvas = null;
    this._ctx = null;
    this._state = E_VideoState.Primitive;
  }

  /**
   * 播放视频
   */
  public play() {
    if (this.isLoaded && !this.isPlaying) {
      this._element.loop = this.loop;
      this._element.playbackRate = this.speed;
      this._element.volume = this.volume;
      this._element.muted = this.muted;
      this._element.play();
      this._state = E_VideoState.Playing;
      Singletons.events.video.emit(E_VideoEventType.Play);
    }
  }

  /**
   * 跳转到某个指定时间切片
   */
  public goto(timePiece: number) {
    if (this.isLoaded) {
      const to = Numbers.reserve(Numbers.clamp(timePiece, 0, this.duration), 1);
      this._element.currentTime = to;
      Singletons.events.video.emit(E_VideoEventType.Goto, to);
      this._render();
    }
  }

  /**
   * 暂停播放视频
   */
  public pause() {
    if (this.isPlaying) {
      this._element.pause();
      this._state = E_VideoState.Paused;
      Singletons.events.video.emit(E_VideoEventType.Pause);
    }
  }

  /**
   * 恢复播放视频
   */
  public resume() {
    if (this.isPaused) {
      this._element.play();
      this._state = E_VideoState.Playing;
      Singletons.events.video.emit(E_VideoEventType.Resume);
    }
  }

  /**
   * 停止播放视频
   */
  public stop() {
    if (this.isLoaded) {
      this._element.pause();
      this._element.load();
      this._render();
      this._state = E_VideoState.Loaded;
      Singletons.events.video.emit(E_VideoEventType.Stop);
    }
  }

  /**
   * 视频音量
   */
  public get volume() {
    return this._volume;
  }

  /**
   * 设置视频音量
   */
  public set volume(v: number) {
    v = Numbers.clamp(v, 0, 1);
    this._volume = v;
    if (this.isLoaded) {
      this._element.volume = v;
    }
  }

  /**
   * 是否静音
   */
  public get muted() {
    return this._muted;
  }

  /**
   * 设置静音播放
   */
  public set muted(v: boolean) {
    this._muted = v;
    if (this.isLoaded) {
      this._element.muted = v;
    }
  }

  /**
   * 是否循环播放
   */
  public get loop() {
    return this._loop;
  }

  /**
   * 设置循环播放
   */
  public set loop(v: boolean) {
    this._loop = v;
    if (this.isLoaded) {
      this._element.loop = v;
    }
  }

  /**
   * 当前时间
   */
  public get current() {
    return this.isLoaded ? this._element.currentTime : -1;
  }

  /**
   * 设置当前时间
   */
  public set current(v: number) {
    this.goto(v);
  }

  /**
   * 视频倍速
   */
  public get speed() {
    return this._speed;
  }

  /**
   * 设置视频倍速
   */
  public set speed(v: number) {
    // 限定在0.5~2倍速
    v = Numbers.reserve(Numbers.clamp(v, 0.5, 2), 1);
    this._speed = v;
    if (this.isLoaded) {
      this._element.playbackRate = v;
    }
  }

  /**
   * 视频长度
   */
  public get duration() {
    return this.isLoaded ? this._element.duration : -1;
  }

  /**
   * 视频状态
   */
  public get state() {
    return this._state;
  }

  /**
   * 是否初始状态
   */
  public get isPrimitive() {
    return this._state === E_VideoState.Primitive;
  }

  /**
   * 是否加载中状态
   */
  public get isLoading() {
    return this._state === E_VideoState.Loading;
  }

  /**
   * 是否加载完成状态
   */
  public get isLoaded() {
    return this._state >= E_VideoState.Loaded;
  }

  /**
   * 是否数据加载完成状态
   */
  public get isDataLoaded() {
    return this._state >= E_VideoState.DataLoaded;
  }

  /**
   * 是否正在播放中状态
   */
  public get isPlaying() {
    return this._state === E_VideoState.Playing;
  }

  /**
   * 是否暂停状态
   */
  public get isPaused() {
    return this._state === E_VideoState.Paused;
  }
}
