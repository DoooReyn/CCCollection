/*
 * @Author: DoooReyn
 * @Date: 2023-07-18 15:01:31
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-18 15:01:31
 */

import { UserAgentParser } from './ua/user-agent';
import { RegExpValidator } from '../cmm/reg-exp-validator';
import { v5 } from './uuid';
import { Numbers } from '../cmm/numbers';

/**
 * 设备概要信息
 */
export interface DeviceBriefInfo {
  isHDR: boolean;
  cookieEnabled: boolean;
  vibrateEnabled: boolean;
  indexedDBEnabled: boolean;
  localStorageEnabled: boolean;
  sessionStorageEnabled: boolean;
  colorDepth: number;
  pixelDepth: number;
  resolutionWidth: number;
  resolutionHeight: number;
  devicePixelRatio: number;
  hardwareConcurrency: number;
  os: string;
  arch: string;
  device: string;
  engine: string;
  version: string;
  browser: string;
  platform: string;
  language: string;
  videoCardVendor: string;
  videoCardRenderer: string;
}

/**
 * 获取显卡信息
 * @returns {{renderer : string, vendor : string} | undefined}
 */
function getVideoCardInfo(): { renderer: string; vendor: string } | undefined {
  const canvas = document.createElement('canvas');
  const gl =
    canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl');
  if (gl && 'getExtension' in gl) {
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    if (info) {
      const {
        UNMASKED_VENDOR_WEBGL: vendor,
        UNMASKED_RENDERER_WEBGL: renderer,
      } = info;
      return {
        vendor: (gl.getParameter(vendor) || 'Unknown').toString(),
        renderer: (gl.getParameter(renderer) || 'Unknown').toString(),
      };
    }
  }
}

/**
 * 是否高分屏
 * @returns {boolean}
 */
function isHDR(): boolean {
  function doesMatch(value: string) {
    return matchMedia(`(dynamic-range: ${value})`).matches;
  }

  if (doesMatch('high')) {
    return true;
  } else if (doesMatch('standard')) {
    return false;
  }

  return false;
}

/**
 * 设备信息工具
 */
export class Device {
  static readonly instance: Device = new Device();

  /**
   * 是否已初始化
   */
  private _inited: boolean = false;

  /**
   * 设备 uuid
   * - 使用前请先初始化
   */
  uuid: string = null!;

  /**
   * 设备 UserAgent
   * - 使用前请先初始化
   */
  ua: UserAgentParser = null!;

  /**
   * 设备概要信息
   * - 使用前请先初始化
   */
  brief: DeviceBriefInfo = null!;

  /**
   * 检查是否已初始化
   */
  private _checkInited() {    
    if (!this._inited) throw new Error("Device not initialized.");
  }
  
  /**
   * 是否已初始化
   */
  get inited() {
    return this._inited;
  }

  /**
   * 初始化
   * @param homepage 产品网址
   */
  init(homepage: string) {
    if (this.inited) throw new Error("Device initialized.");

    const hdr = isHDR();
    const vc = getVideoCardInfo();
    const ua = new UserAgentParser(navigator.userAgent);
    const brief = {
      isHDR: hdr,
      vibrateEnabled: !!navigator.vibrate,
      indexedDBEnabled: !!window.indexedDB,
      cookieEnabled: navigator.cookieEnabled,
      localStorageEnabled: !!window.localStorage,
      sessionStorageEnabled: !!window.sessionStorage,
      colorDepth: screen.colorDepth,
      pixelDepth: screen.pixelDepth,
      resolutionWidth: screen.width,
      resolutionHeight: screen.height,
      devicePixelRatio: Numbers.reserve(window.devicePixelRatio, 2) || 1,
      hardwareConcurrency: navigator.hardwareConcurrency || 0,
      os: ua.os.name,
      arch: ua.arch.name,
      version: ua.version,
      device: ua.device.name,
      engine: ua.engine.name,
      browser: ua.browser.name,
      platform: ua.platform.name,
      language: navigator.language,
      videoCardVendor: (vc && vc.vendor) || 'Unknown',
      videoCardRenderer: (vc && vc.renderer) || 'Unknown',
    };
    const uuid = v5(JSON.stringify(brief), v5(homepage, v5.URL)).toString();

    this.ua = ua;
    this.uuid = uuid;
    this.brief = brief;
  }

  

  /**
   * 振动
   * @param duration 振动时长
   */
  vibrate(duration: number) {
    this._checkInited();
    this.brief.vibrateEnabled && navigator.vibrate(duration);
  }

  /**
   * 打开网页
   * @param url 网址
   */
  openURL(url: string) {
    this._checkInited();
    RegExpValidator.isUrl(url) && window?.open(url);
  }
}
