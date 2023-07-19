/*
 * @Author: DoooReyn 
 * @Date: 2023-07-18 20:34:53 
 * @LastModifiedBy: DoooReyn 
 * @LastModifiedAt: 2023-07-18 20:34:53 
 */

/**
 * 平台
 */
export namespace Platform {
  const Windows = /windows nt/i;
  const WindowsPhone = /windows phone/i;
  const Mac = /macintosh/i;
  const Linux = /linux/i;
  const Wii = /wii/i;
  const Playstation = /playstation/i;
  const iPad = /ipad/i;
  const iPod = /ipod/i;
  const iPhone = /iphone/i;
  const Android = /android/i;
  const Blackberry = /blackberry/i;
  const Samsung = /samsung/i;
  const Curl = /curl/i;
  const Wechat = /micromessenger/i;

  export interface Result {
    isWindows: boolean;
    isWindowsPhone: boolean;
    isMac: boolean;
    isLinux: boolean;
    isWii: boolean;
    isPlaystation: boolean;
    isiPad: boolean;
    isiPod: boolean;
    isiPhone: boolean;
    isAndroid: boolean;
    isBlackberry: boolean;
    isSamsung: boolean;
    isCurl: boolean;
    isWechat: boolean;
    name: string;
  }

  export function parse(ua: string): Result {
    let ret: Result = {
      isWindows: false,
      isWindowsPhone: false,
      isMac: false,
      isLinux: false,
      isWii: false,
      isPlaystation: false,
      isiPad: false,
      isiPod: false,
      isiPhone: false,
      isAndroid: false,
      isBlackberry: false,
      isSamsung: false,
      isCurl: false,
      isWechat: false,
      name: 'Unknown',
    };

    switch (true) {
      case Windows.test(ua):
        ret.isWindows = true;
        ret.name = 'Windows';
        break;
      case WindowsPhone.test(ua):
        ret.isWindowsPhone = true;
        ret.name = 'WindowsPhone';
        break;
      case Mac.test(ua):
        ret.isMac = true;
        ret.name = 'Mac';
        break;
      case Linux.test(ua):
        ret.isLinux = true;
        ret.name = 'Linux';
        break;
      case Wii.test(ua):
        ret.isWii = true;
        ret.name = 'Wii';
        break;
      case Playstation.test(ua):
        ret.isPlaystation = true;
        ret.name = 'Playstation';
        break;
      case iPad.test(ua):
        ret.isiPad = true;
        ret.name = 'iPad';
        break;
      case iPod.test(ua):
        ret.isiPod = true;
        ret.name = 'iPod';
        break;
      case iPhone.test(ua):
        ret.isiPhone = true;
        ret.name = 'iPhone';
        break;
      case Android.test(ua):
        ret.isAndroid = true;
        ret.name = 'Android';
        break;
      case Blackberry.test(ua):
        ret.isBlackberry = true;
        ret.name = 'Blackberry';
        break;
      case Samsung.test(ua):
        ret.isSamsung = true;
        ret.name = 'Samsung';
        break;
      case Curl.test(ua):
        ret.isCurl = true;
        ret.name = 'Curl';
        break;
      case Wechat.test(ua):
        ret.isWechat = true;
        ret.name = 'Wechat';
        break;
    }

    return ret;
  }
}
