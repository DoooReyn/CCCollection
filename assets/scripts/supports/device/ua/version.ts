/*
 * @Author: DoooReyn 
 * @Date: 2023-07-18 20:36:03 
 * @LastModifiedBy: DoooReyn 
 * @LastModifiedAt: 2023-07-18 20:36:03 
 */

/**
 * 浏览器版本
 */
export namespace Version {
  export const Edge = /Edge\/([\d\w\.\-]+)/i;
  export const EdgeChromium = /edg\/([\d\w\.\-]+)/i;
  export const Firefox = /firefox\/([\d\w\.\-]+)/i;
  export const IE = /msie\s([\d\.]+[\d])|trident\/\d+\.\d+;.*[rv:]+(\d+\.\d)/i;
  export const Chrome = /chrome\/([\d\w\.\-]+)/i;
  export const Chromium = /(?:chromium|crios)\/([\d\w\.\-]+)/i;
  export const Safari = /version\/([\d\w\.\-]+)/i;
  export const Opera = /version\/([\d\w\.\-]+)|OPR\/([\d\w\.\-]+)/i;
  export const Ps3 = /([\d\w\.\-]+)\)\s*$/i;
  export const Psp = /([\d\w\.\-]+)\)?\s*$/i;
  export const Amaya = /amaya\/([\d\w\.\-]+)/i;
  export const SeaMonkey = /seamonkey\/([\d\w\.\-]+)/i;
  export const OmniWeb = /omniweb\/v([\d\w\.\-]+)/i;
  export const Flock = /flock\/([\d\w\.\-]+)/i;
  export const Epiphany = /epiphany\/([\d\w\.\-]+)/i;
  export const WinJs = /msapphost\/([\d\w\.\-]+)/i;

  export function parse(browser: string, ua: string): string {
    let version = '0';

    switch (browser) {
      case 'Edge':
        version = Edge.exec(ua)?.[1];
        break;
      case 'EdgeChromium':
        version = EdgeChromium.exec(ua)?.[1];
        break;
      case 'Firefox':
        version = Firefox.exec(ua)?.[1];
        break;
      case 'IE':
        version = IE.exec(ua)?.[1];
        break;
      case 'Chrome':
        version = Chrome.exec(ua)?.[1];
        break;
      case 'Chromium':
        version = Chromium.exec(ua)?.[1];
        break;
      case 'Safari':
        version = Safari.exec(ua)?.[1];
        break;
      case 'Opera':
        version = Opera.exec(ua)?.[1];
        break;
      case 'Ps3':
        version = Ps3.exec(ua)?.[1];
        break;
      case 'Psp':
        version = Psp.exec(ua)?.[1];
        break;
      case 'Amaya':
        version = Amaya.exec(ua)?.[1];
        break;
      case 'SeaMonkey':
        version = SeaMonkey.exec(ua)?.[1];
        break;
      case 'OmniWeb':
        version = OmniWeb.exec(ua)?.[1];
        break;
      case 'Flock':
        version = Flock.exec(ua)?.[1];
        break;
      case 'Epiphany':
        version = Epiphany.exec(ua)?.[1];
        break;
      case 'WinJs':
        version = WinJs.exec(ua)?.[1];
        break;
    }

    return version;
  }
}
