/*
 * @Author: DoooReyn 
 * @Date: 2023-07-18 20:34:29 
 * @LastModifiedBy: DoooReyn 
 * @LastModifiedAt: 2023-07-18 20:34:29 
 */

/**
 * 操作系统
 */
export namespace OS {
  const Windows10 = /windows nt 10\.0/i;
  const Windows81 = /windows nt 6\.3/i;
  const Windows8 = /windows nt 6\.2/i;
  const Windows7 = /windows nt 6\.1/i;
  const UnknownWindows = /windows nt 6\.\d+/i;
  const WindowsVista = /windows nt 6\.0/i;
  const Windows2003 = /windows nt 5\.2/i;
  const WindowsXP = /windows nt 5\.1/i;
  const Windows2000 = /windows nt 5\.0/i;
  const WindowsPhone8 = /windows phone 8\./;
  const OSXCheetah = /os x 10[._]0/i;
  const OSXPuma = /os x 10[._]1(\D|$)/i;
  const OSXJaguar = /os x 10[._]2/i;
  const OSXPanther = /os x 10[._]3/i;
  const OSXTiger = /os x 10[._]4/i;
  const OSXLeopard = /os x 10[._]5/i;
  const OSXSnowLeopard = /os x 10[._]6/i;
  const OSXLion = /os x 10[._]7/i;
  const OSXMountainLion = /os x 10[._]8/i;
  const OSXMavericks = /os x 10[._]9/i;
  const OSXYosemite = /os x 10[._]10/i;
  const OSXElCapitan = /os x 10[._]11/i;
  const Mac = /os x/i;
  const Linux = /linux/i;
  const Linux64 = /linux x86\_64/i;
  const ChromeOS = /cros/i;
  const Wii = /wii/i;
  const PS3 = /playstation 3/i;
  const PSP = /playstation portable/i;
  const iPad = /\(iPad.*os (\d+)[._](\d+)/i;
  const iPhone = /\(iPhone.*os (\d+)[._](\d+)/i;
  const Bada = /Bada\/(\d+)\.(\d+)/i;
  const Curl = /curl\/(\d+)\.(\d+)\.(\d+)/i;
  const Unix = /(unix)\s?([\w\.]+)*/i;
  const Aix = /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i;
  const Haiku = /(haiku)\s(\w+)/i;
  const OpenSolaris = /((?:open)?solaris)[\/\s-]?([\w\.]+)*/i;
  const Solaris = /(sunos)\s?([\w\.]+\d)*/i;
  const Bsd = /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i;
  const FirefoxOs = /mozilla.+\(mobile;.+gecko.+firefox/i;
  const Tizen = /(tizen)[\/\s]([\w\.]+)/i;
  const Salfish = /linux;.+(sailfish);/i;
  const Symbian = /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i;

  export interface Result {
    isWindows10: boolean;
    isWindows81: boolean;
    isWindows8: boolean;
    isWindows7: boolean;
    isUnknownWindows: boolean;
    isWindowsVista: boolean;
    isWindows2003: boolean;
    isWindowsXP: boolean;
    isWindows2000: boolean;
    isWindowsPhone8: boolean;
    isOSXCheetah: boolean;
    isOSXPuma: boolean;
    isOSXJaguar: boolean;
    isOSXPanther: boolean;
    isOSXTiger: boolean;
    isOSXLeopard: boolean;
    isOSXSnowLeopard: boolean;
    isOSXLion: boolean;
    isOSXMountainLion: boolean;
    isOSXMavericks: boolean;
    isOSXYosemite: boolean;
    isOSXElCapitan: boolean;
    isMac: boolean;
    isLinux: boolean;
    isLinux64: boolean;
    isChromeOS: boolean;
    isWii: boolean;
    isPS3: boolean;
    isPSP: boolean;
    isiPad: boolean;
    isiPhone: boolean;
    isBada: boolean;
    isCurl: boolean;
    isUnix: boolean;
    isAix: boolean;
    isHaiku: boolean;
    isOpenSolaris: boolean;
    isSolaris: boolean;
    isBsd: boolean;
    isFirefoxOs: boolean;
    isTizen: boolean;
    isSalfish: boolean;
    isSymbian: boolean;
    name: string;
  }

  export function parse(ua: string): Result {
    let ret: Result = {
      isWindows10: false,
      isWindows81: false,
      isWindows8: false,
      isWindows7: false,
      isUnknownWindows: false,
      isWindowsVista: false,
      isWindows2003: false,
      isWindowsXP: false,
      isWindows2000: false,
      isWindowsPhone8: false,
      isOSXCheetah: false,
      isOSXPuma: false,
      isOSXJaguar: false,
      isOSXPanther: false,
      isOSXTiger: false,
      isOSXLeopard: false,
      isOSXSnowLeopard: false,
      isOSXLion: false,
      isOSXMountainLion: false,
      isOSXMavericks: false,
      isOSXYosemite: false,
      isOSXElCapitan: false,
      isMac: false,
      isLinux: false,
      isLinux64: false,
      isChromeOS: false,
      isWii: false,
      isPS3: false,
      isPSP: false,
      isiPad: false,
      isiPhone: false,
      isBada: false,
      isCurl: false,
      isUnix: false,
      isAix: false,
      isHaiku: false,
      isOpenSolaris: false,
      isSolaris: false,
      isBsd: false,
      isFirefoxOs: false,
      isTizen: false,
      isSalfish: false,
      isSymbian: false,
      name: 'Unknown',
    };

    switch (true) {
      case Windows10.test(ua):
        ret.isWindows10 = true;
        ret.name = 'Windows10';
        break;
      case Windows81.test(ua):
        ret.isWindows81 = true;
        ret.name = 'Windows81';
        break;
      case Windows8.test(ua):
        ret.isWindows8 = true;
        ret.name = 'Windows8';
        break;
      case Windows7.test(ua):
        ret.isWindows7 = true;
        ret.name = 'Windows7';
        break;
      case UnknownWindows.test(ua):
        ret.isUnknownWindows = true;
        ret.name = 'UnknownWindows';
        break;
      case WindowsVista.test(ua):
        ret.isWindowsVista = true;
        ret.name = 'WindowsVista';
        break;
      case Windows2003.test(ua):
        ret.isWindows2003 = true;
        ret.name = 'Windows2003';
        break;
      case WindowsXP.test(ua):
        ret.isWindowsXP = true;
        ret.name = 'WindowsXP';
        break;
      case Windows2000.test(ua):
        ret.isWindows2000 = true;
        ret.name = 'Windows2000';
        break;
      case WindowsPhone8.test(ua):
        ret.isWindowsPhone8 = true;
        ret.name = 'WindowsPhone8';
        break;
      case OSXCheetah.test(ua):
        ret.isOSXCheetah = true;
        ret.name = 'OSXCheetah';
        break;
      case OSXPuma.test(ua):
        ret.isOSXPuma = true;
        ret.name = 'OSXPuma';
        break;
      case OSXJaguar.test(ua):
        ret.isOSXJaguar = true;
        ret.name = 'OSXJaguar';
        break;
      case OSXPanther.test(ua):
        ret.isOSXPanther = true;
        ret.name = 'OSXPanther';
        break;
      case OSXTiger.test(ua):
        ret.isOSXTiger = true;
        ret.name = 'OSXTiger';
        break;
      case OSXLeopard.test(ua):
        ret.isOSXLeopard = true;
        ret.name = 'OSXLeopard';
        break;
      case OSXSnowLeopard.test(ua):
        ret.isOSXSnowLeopard = true;
        ret.name = 'OSXSnowLeopard';
        break;
      case OSXLion.test(ua):
        ret.isOSXLion = true;
        ret.name = 'OSXLion';
        break;
      case OSXMountainLion.test(ua):
        ret.isOSXMountainLion = true;
        ret.name = 'OSXMountainLion';
        break;
      case OSXMavericks.test(ua):
        ret.isOSXMavericks = true;
        ret.name = 'OSXMavericks';
        break;
      case OSXYosemite.test(ua):
        ret.isOSXYosemite = true;
        ret.name = 'OSXYosemite';
        break;
      case OSXElCapitan.test(ua):
        ret.isOSXElCapitan = true;
        ret.name = 'OSXElCapitan';
        break;
      case Mac.test(ua):
        ret.isMac = true;
        ret.name = 'Mac';
        break;
      case Linux.test(ua):
        ret.isLinux = true;
        ret.name = 'Linux';
        break;
      case Linux64.test(ua):
        ret.isLinux64 = true;
        ret.name = 'Linux64';
        break;
      case ChromeOS.test(ua):
        ret.isChromeOS = true;
        ret.name = 'ChromeOS';
        break;
      case Wii.test(ua):
        ret.isWii = true;
        ret.name = 'Wii';
        break;
      case PS3.test(ua):
        ret.isPS3 = true;
        ret.name = 'PS3';
        break;
      case PSP.test(ua):
        ret.isPSP = true;
        ret.name = 'PSP';
        break;
      case iPad.test(ua):
        ret.isiPad = true;
        ret.name = 'iPad';
        break;
      case iPhone.test(ua):
        ret.isiPhone = true;
        ret.name = 'iPhone';
        break;
      case Bada.test(ua):
        ret.isBada = true;
        ret.name = 'Bada';
        break;
      case Curl.test(ua):
        ret.isCurl = true;
        ret.name = 'Curl';
        break;
      case Unix.test(ua):
        ret.isUnix = true;
        ret.name = 'Unix';
        break;
      case Aix.test(ua):
        ret.isAix = true;
        ret.name = 'Aix';
        break;
      case Haiku.test(ua):
        ret.isHaiku = true;
        ret.name = 'Haiku';
        break;
      case OpenSolaris.test(ua):
        ret.isOpenSolaris = true;
        ret.name = 'OpenSolaris';
        break;
      case Solaris.test(ua):
        ret.isSolaris = true;
        ret.name = 'Solaris';
        break;
      case Bsd.test(ua):
        ret.isBsd = true;
        ret.name = 'Bsd';
        break;
      case FirefoxOs.test(ua):
        ret.isFirefoxOs = true;
        ret.name = 'FirefoxOs';
        break;
      case Tizen.test(ua):
        ret.isTizen = true;
        ret.name = 'Tizen';
        break;
      case Salfish.test(ua):
        ret.isSalfish = true;
        ret.name = 'Salfish';
        break;
      case Symbian.test(ua):
        ret.isSymbian = true;
        ret.name = 'Symbian';
        break;
    }

    return ret;
  }
}
