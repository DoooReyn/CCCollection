/*
 * @Author: DoooReyn 
 * @Date: 2023-07-18 20:35:23 
 * @LastModifiedBy: DoooReyn 
 * @LastModifiedAt: 2023-07-18 20:35:23 
 */

import { Arch } from './arch';
import { Browser } from './browser';
import { Device } from './device';
import { Engine } from './engine';
import { OS } from './os';
import { Platform } from './platform';
import { Version } from './version';

const BOTS = [
  '\\+https:\\/\\/developers.google.com\\/\\+\\/web\\/snippet\\/',
  'googlebot',
  'baiduspider',
  'gurujibot',
  'yandexbot',
  'slurp',
  'msnbot',
  'bingbot',
  'facebookexternalhit',
  'linkedinbot',
  'twitterbot',
  'slackbot',
  'telegrambot',
  'applebot',
  'pingdom',
  'tumblr ',
];

const IS_BOT_REGEXP = new RegExp('^.*(' + BOTS.join('|') + ').*$');

/**
 * UA 解析器
 */
export class UserAgentParser {
  arch: Arch.Result;
  browser: Browser.Result;
  device: Device.Result;
  engine: Engine.Result;
  os: OS.Result;
  platform: Platform.Result;
  version: string;
  isBot: boolean;
  isDesktop: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isAndroidTablet: boolean;
  isSmartTV: boolean;
  isKindleFire: boolean;
  kindle: string;

  constructor(public ua: string) {
    this.ua = ua.replace(/^\s*/, '').replace(/\s*$/, '');
    this.arch = Arch.parse(ua);
    this.browser = Browser.parse(ua);
    this.device = Device.parse(ua);
    this.engine = Engine.parse(ua);
    this.os = OS.parse(ua);
    this.platform = Platform.parse(ua);
    this.version = Version.parse(this.browser.name, ua);

    this.isBot = false;
    this.isKindleFire = false;
    this.isDesktop = false;
    this.isMobile = false;
    this.isTablet = false;
    this.isAndroidTablet = false;
    this.isSmartTV = false;

    this.testBot();
    this.testMobile();
    this.testKindleFire();
    this.testAndroidTablet();
    this.testTablet();
    this.testSmartTV();
  }

  testMobile() {
    switch (true) {
      case this.platform.isWindows:
      case this.platform.isLinux:
      case this.platform.isMac:
      case this.os.isChromeOS:
        this.isDesktop = true;
        break;
      case this.platform.isAndroid:
      case this.platform.isSamsung:
      case this.device.isSumsungPhone:
      case this.device.isSumsungTab:
        this.isMobile = true;
        this.isDesktop = false;
        break;
      default:
    }
    switch (true) {
      case this.os.isiPad:
      case this.platform.isiPod:
      case this.os.isiPhone:
      case this.os.isBada:
      case this.platform.isBlackberry:
      case this.platform.isAndroid:
      case this.platform.isWindowsPhone:
        this.isMobile = true;
        this.isDesktop = false;
        break;
      default:
    }
    if (/mobile/i.test(this.ua)) {
      this.isMobile = true;
      this.isDesktop = false;
    }
  }

  testAndroidTablet() {
    this.isAndroidTablet = this.platform.isAndroid && !/mobile/i.test(this.ua);
  }

  testTablet() {
    switch (true) {
      case this.os.isiPad:
      case this.isAndroidTablet:
      case this.isKindleFire:
        this.isTablet = true;
        break;
    }
    if (/tablet/i.test(this.ua)) {
      this.isTablet = true;
    }
  }

  testBot() {
    this.isBot = IS_BOT_REGEXP.test(this.ua.toLowerCase());
  }

  testSmartTV() {
    this.isSmartTV = new RegExp(
      'smart-tv|smarttv|googletv|appletv|hbbtv|pov_tv|netcast.tv',
      'gi'
    ).test(this.ua.toLowerCase());
  }

  testKindleFire() {
    switch (true) {
      case /KFOT/gi.test(this.ua):
        this.isKindleFire = true;
        this.kindle = 'Kindle Fire';
        break;
      case /KFTT/gi.test(this.ua):
        this.isKindleFire = true;
        this.kindle = 'Kindle Fire HD';
        break;
      case /KFJWI/gi.test(this.ua):
        this.isKindleFire = true;
        this.kindle = 'Kindle Fire HD 8.9';
        break;
      case /KFJWA/gi.test(this.ua):
        this.isKindleFire = true;
        this.kindle = 'Kindle Fire HD 8.9 4G';
        break;
      case /KFSOWI/gi.test(this.ua):
        this.isKindleFire = true;
        this.kindle = 'Kindle Fire HD 7';
        break;
      case /KFTHWI/gi.test(this.ua):
        this.isKindleFire = true;
        this.kindle = 'Kindle Fire HDX 7';
        break;
      case /KFTHWA/gi.test(this.ua):
        this.isKindleFire = true;
        this.kindle = 'Kindle Fire HDX 7 4G';
        break;
      case /KFAPWI/gi.test(this.ua):
        this.isKindleFire = true;
        this.kindle = 'Kindle Fire HDX 8.9';
        break;
      case /KFAPWA/gi.test(this.ua):
        this.isKindleFire = true;
        this.kindle = 'Kindle Fire HDX 8.9 4G';
        break;
      default:
        this.isKindleFire = false;
        this.kindle = 'Unknown';
        break;
    }
  }
}
