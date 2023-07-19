/*
 * @Author: DoooReyn 
 * @Date: 2023-07-18 20:33:47 
 * @LastModifiedBy: DoooReyn 
 * @LastModifiedAt: 2023-07-18 20:33:47 
 */

/**
 * 浏览器类型
 */
export namespace Browser {
  const Edge = /edge/i;
  const EdgeChromium = /edg/i;
  const Amaya = /amaya/i;
  const Konqueror = /konqueror/i;
  const Epiphany = /epiphany/i;
  const SeaMonkey = /seamonkey/i;
  const Flock = /flock/i;
  const OmniWeb = /omniweb/i;
  const Chromium = /chromium|crios/i;
  const Chrome = /chrome/i;
  const Safari = /safari/i;
  const IE = /msie|trident/i;
  const Opera = /opera|OPR/i;
  const PS3 = /playstation 3/i;
  const PSP = /playstation portable/i;
  const Firefox = /firefox/i;
  const WinJs = /msapphost/i;
  const Wechat = /wechat/i;

  export interface Result {
    isEdge: boolean;
    isEdgeChromium: boolean;
    isAmaya: boolean;
    isKonqueror: boolean;
    isEpiphany: boolean;
    isSeaMonkey: boolean;
    isFlock: boolean;
    isOmniWeb: boolean;
    isChromium: boolean;
    isChrome: boolean;
    isSafari: boolean;
    isIE: boolean;
    isOpera: boolean;
    isPS3: boolean;
    isPSP: boolean;
    isFirefox: boolean;
    isWinJs: boolean;
    isWechat: boolean;
    name: string;
  }

  export function parse(ua: string): Result {
    let ret: Result = {
      isEdge: false,
      isEdgeChromium: false,
      isAmaya: false,
      isKonqueror: false,
      isEpiphany: false,
      isSeaMonkey: false,
      isFlock: false,
      isOmniWeb: false,
      isChromium: false,
      isChrome: false,
      isSafari: false,
      isIE: false,
      isOpera: false,
      isPS3: false,
      isPSP: false,
      isFirefox: false,
      isWinJs: false,
      isWechat: false,
      name: 'Unknown',
    };

    switch (true) {
      case Edge.test(ua):
        ret.isEdge = true;
        ret.name = 'Edge';
        break;
      case EdgeChromium.test(ua):
        ret.isEdgeChromium = true;
        ret.name = 'EdgeChromium';
        break;
      case Amaya.test(ua):
        ret.isAmaya = true;
        ret.name = 'Amaya';
        break;
      case Konqueror.test(ua):
        ret.isKonqueror = true;
        ret.name = 'Konqueror';
        break;
      case Epiphany.test(ua):
        ret.isEpiphany = true;
        ret.name = 'Epiphany';
        break;
      case SeaMonkey.test(ua):
        ret.isSeaMonkey = true;
        ret.name = 'SeaMonkey';
        break;
      case Flock.test(ua):
        ret.isFlock = true;
        ret.name = 'Flock';
        break;
      case OmniWeb.test(ua):
        ret.isOmniWeb = true;
        ret.name = 'OmniWeb';
        break;
      case Chromium.test(ua):
        ret.isChromium = true;
        ret.name = 'Chromium';
        break;
      case Chrome.test(ua):
        ret.isChrome = true;
        ret.name = 'Chrome';
        break;
      case Safari.test(ua):
        ret.isSafari = true;
        ret.name = 'Safari';
        break;
      case IE.test(ua):
        ret.isIE = true;
        ret.name = 'IE';
        break;
      case Opera.test(ua):
        ret.isOpera = true;
        ret.name = 'Opera';
        break;
      case PS3.test(ua):
        ret.isPS3 = true;
        ret.name = 'PS3';
        break;
      case PSP.test(ua):
        ret.isPSP = true;
        ret.name = 'PSP';
        break;
      case Firefox.test(ua):
        ret.isFirefox = true;
        ret.name = 'Firefox';
        break;
      case WinJs.test(ua):
        ret.isWinJs = true;
        ret.name = 'WinJs';
        break;
      case Wechat.test(ua):
        ret.isWechat = true;
        ret.name = 'Wechat';
        break;
    }

    return ret;
  }
}
