/*
 * @Author: DoooReyn 
 * @Date: 2023-07-18 20:34:40 
 * @LastModifiedBy: DoooReyn 
 * @LastModifiedAt: 2023-07-18 20:34:40 
 */

/**
 * 设备类型
 */
export namespace Device {
  const IpadPlaybook = /\((ipad|playbook);[\w\s\);-]+(rim|apple)/i;
  const Ipad = /applecoremedia\/[\w\.]+ \((ipad)/;
  const AppleTv = /(apple\s{0,1}tv)/i;
  const Archos = /(archos)\s(gamepad2?)/i;
  const HpTouchPad = /(hp).+(touchpad)/i;
  const Kindle = /(kindle)\/([\w\.]+)/i;
  const Nook = /(kindle)\/([\w\.]+)/i;
  const Dell = /(dell)\s(strea[kpr\s\d]*[\dko])/i;
  const KindleFireHd = /(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i;
  const FirePhone = /(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i;
  const IpodIphone = /\((ip[honed|\s\w*]+);.+(apple)/i;
  const IpodIphone2 = /\((ip[honed|\s\w*]+);/i;
  const BlackBerry = /(blackberry)[\s-]?(\w+)/i;
  const Benq = /(benq)[\s_-]?([\w-]+)*/i;
  const Palm = /(palm(?=\-))[\s_-]?([\w-]+)*/i;
  const SonyEricson = /(palm(?=\-)|sonyericsson)[\s_-]?([\w-]+)*/i;
  const Acer = /(acer)[\s_-]?([\w-]+)*/i;
  const AcerAndroid = /android\s3\.[\s\w;-]{10}(a\d{3})/i;
  const Asus = /(asus)[\s_-]?([\w-]+)*/i;
  const Huawei = /(huawei)[\s_-]?([\w-]+)*/i;
  const Meizu = /(meizu)[\s_-]?([\w-]+)*/i;
  const Motorola = /(motorola)[\s_-]?([\w-]+)*/i;
  const Polytron = /(polytron)[\s_-]?([\w-]+)*/i;
  const HpIpaq = /(hp)\s([\w\s]+\w)/i;
  const Blackberry10 = /\(bb10;\s(\w+)/i;
  const AsusTablet =
    /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7)/i;
  const Sony = /(sony)\s(tablet\s[ps])\sbuild\//i;
  const Ouya = /\s(ouya)\s/i;
  const Nintendo = /(nintendo)\s([wids3u]+)/i;
  const Nvidia = /android.+;\s(shield)\sbuild/i;
  const PlayStation = /(playstation\s[34portablevi]+)/i;
  const SprintPhones = /(sprint\s(\w+))/i;
  const LenovoTablets = /(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i;
  const Htc = /(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i;
  const Zte = /(zte)-(\w+)*/i;
  const Alcatel = /(alcatel)[_\s-]?([\w-]+)*/i;
  const GeeksPhone = /(geeksphone)[_\s-]?([\w-]+)*/i;
  const Nexian = /(nexian)[_\s-]?([\w-]+)*/i;
  const Panasonic = /(panasonic)[_\s-]?([\w-]+)*/i;
  const HtcNexus9 = /(nexus\s9)/i;
  const Xbox = /[\s\(;](xbox(?:\sone)?)[\s\);]/i;
  const Kinect = /(kin\.[onetw]{3})/i;
  const MotoMob =
    /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i;
  const MotoTab = /android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i;
  const SumsungTab = /android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i;
  const SumsungPhone = /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-n900))/i;
  const Sharp = /\(dtv[\);].+(aquos)/i;
  const Siemens = /sie-(\w+)*/i;
  const Nokia = /(maemo|nokia).*(n900|lumia\s\d+)/i;
  const LgTab = /android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i;

  export interface Result {
    isIpadPlaybook: boolean;
    isIpad: boolean;
    isAppleTv: boolean;
    isArchos: boolean;
    isHpTouchPad: boolean;
    isKindle: boolean;
    isNook: boolean;
    isDell: boolean;
    isKindleFireHd: boolean;
    isFirePhone: boolean;
    isIpodIphone: boolean;
    isIpodIphone2: boolean;
    isBlackBerry: boolean;
    isBenq: boolean;
    isPalm: boolean;
    isSonyEricson: boolean;
    isAcer: boolean;
    isAcerAndroid: boolean;
    isAsus: boolean;
    isHuawei: boolean;
    isMeizu: boolean;
    isMotorola: boolean;
    isPolytron: boolean;
    isHpIpaq: boolean;
    isBlackberry10: boolean;
    isAsusTablet: boolean;
    isSony: boolean;
    isOuya: boolean;
    isNintendo: boolean;
    isNvidia: boolean;
    isPlayStation: boolean;
    isSprintPhones: boolean;
    isLenovoTablets: boolean;
    isHtc: boolean;
    isZte: boolean;
    isAlcatel: boolean;
    isGeeksPhone: boolean;
    isNexian: boolean;
    isPanasonic: boolean;
    isHtcNexus9: boolean;
    isXbox: boolean;
    isKinect: boolean;
    isMotoMob: boolean;
    isMotoTab: boolean;
    isSumsungTab: boolean;
    isSumsungPhone: boolean;
    isSharp: boolean;
    isSiemens: boolean;
    isNokia: boolean;
    isLgTab: boolean;
    name: string;
  }

  export function parse(ua: string): Result {
    let ret: Result = {
      isIpadPlaybook: false,
      isIpad: false,
      isAppleTv: false,
      isArchos: false,
      isHpTouchPad: false,
      isKindle: false,
      isNook: false,
      isDell: false,
      isKindleFireHd: false,
      isFirePhone: false,
      isIpodIphone: false,
      isIpodIphone2: false,
      isBlackBerry: false,
      isBenq: false,
      isPalm: false,
      isSonyEricson: false,
      isAcer: false,
      isAcerAndroid: false,
      isAsus: false,
      isHuawei: false,
      isMeizu: false,
      isMotorola: false,
      isPolytron: false,
      isHpIpaq: false,
      isBlackberry10: false,
      isAsusTablet: false,
      isSony: false,
      isOuya: false,
      isNintendo: false,
      isNvidia: false,
      isPlayStation: false,
      isSprintPhones: false,
      isLenovoTablets: false,
      isHtc: false,
      isZte: false,
      isAlcatel: false,
      isGeeksPhone: false,
      isNexian: false,
      isPanasonic: false,
      isHtcNexus9: false,
      isXbox: false,
      isKinect: false,
      isMotoMob: false,
      isMotoTab: false,
      isSumsungTab: false,
      isSumsungPhone: false,
      isSharp: false,
      isSiemens: false,
      isNokia: false,
      isLgTab: false,
      name: 'Unknown',
    };

    switch (true) {
      case IpadPlaybook.test(ua):
        ret.isIpadPlaybook = true;
        ret.name = 'IpadPlaybook';
        break;
      case Ipad.test(ua):
        ret.isIpad = true;
        ret.name = 'Ipad';
        break;
      case AppleTv.test(ua):
        ret.isAppleTv = true;
        ret.name = 'AppleTv';
        break;
      case Archos.test(ua):
        ret.isArchos = true;
        ret.name = 'Archos';
        break;
      case HpTouchPad.test(ua):
        ret.isHpTouchPad = true;
        ret.name = 'HpTouchPad';
        break;
      case Kindle.test(ua):
        ret.isKindle = true;
        ret.name = 'Kindle';
        break;
      case Nook.test(ua):
        ret.isNook = true;
        ret.name = 'Nook';
        break;
      case Dell.test(ua):
        ret.isDell = true;
        ret.name = 'Dell';
        break;
      case KindleFireHd.test(ua):
        ret.isKindleFireHd = true;
        ret.name = 'KindleFireHd';
        break;
      case FirePhone.test(ua):
        ret.isFirePhone = true;
        ret.name = 'FirePhone';
        break;
      case IpodIphone.test(ua):
        ret.isIpodIphone = true;
        ret.name = 'IpodIphone';
        break;
      case IpodIphone2.test(ua):
        ret.isIpodIphone2 = true;
        ret.name = 'IpodIphone2';
        break;
      case BlackBerry.test(ua):
        ret.isBlackBerry = true;
        ret.name = 'BlackBerry';
        break;
      case Benq.test(ua):
        ret.isBenq = true;
        ret.name = 'Benq';
        break;
      case Palm.test(ua):
        ret.isPalm = true;
        ret.name = 'Palm';
        break;
      case SonyEricson.test(ua):
        ret.isSonyEricson = true;
        ret.name = 'SonyEricson';
        break;
      case Acer.test(ua):
        ret.isAcer = true;
        ret.name = 'Acer';
        break;
      case AcerAndroid.test(ua):
        ret.isAcerAndroid = true;
        ret.name = 'AcerAndroid';
        break;
      case Asus.test(ua):
        ret.isAsus = true;
        ret.name = 'Asus';
        break;
      case Huawei.test(ua):
        ret.isHuawei = true;
        ret.name = 'Huawei';
        break;
      case Meizu.test(ua):
        ret.isMeizu = true;
        ret.name = 'Meizu';
        break;
      case Motorola.test(ua):
        ret.isMotorola = true;
        ret.name = 'Motorola';
        break;
      case Polytron.test(ua):
        ret.isPolytron = true;
        ret.name = 'Polytron';
        break;
      case HpIpaq.test(ua):
        ret.isHpIpaq = true;
        ret.name = 'HpIpaq';
        break;
      case Blackberry10.test(ua):
        ret.isBlackberry10 = true;
        ret.name = 'Blackberry10';
        break;
      case AsusTablet.test(ua):
        ret.isAsusTablet = true;
        ret.name = 'AsusTablet';
        break;
      case Sony.test(ua):
        ret.isSony = true;
        ret.name = 'Sony';
        break;
      case Ouya.test(ua):
        ret.isOuya = true;
        ret.name = 'Ouya';
        break;
      case Nintendo.test(ua):
        ret.isNintendo = true;
        ret.name = 'Nintendo';
        break;
      case Nvidia.test(ua):
        ret.isNvidia = true;
        ret.name = 'Nvidia';
        break;
      case PlayStation.test(ua):
        ret.isPlayStation = true;
        ret.name = 'PlayStation';
        break;
      case SprintPhones.test(ua):
        ret.isSprintPhones = true;
        ret.name = 'SprintPhones';
        break;
      case LenovoTablets.test(ua):
        ret.isLenovoTablets = true;
        ret.name = 'LenovoTablets';
        break;
      case Htc.test(ua):
        ret.isHtc = true;
        ret.name = 'Htc';
        break;
      case Zte.test(ua):
        ret.isZte = true;
        ret.name = 'Zte';
        break;
      case Alcatel.test(ua):
        ret.isAlcatel = true;
        ret.name = 'Alcatel';
        break;
      case GeeksPhone.test(ua):
        ret.isGeeksPhone = true;
        ret.name = 'GeeksPhone';
        break;
      case Nexian.test(ua):
        ret.isNexian = true;
        ret.name = 'Nexian';
        break;
      case Panasonic.test(ua):
        ret.isPanasonic = true;
        ret.name = 'Panasonic';
        break;
      case HtcNexus9.test(ua):
        ret.isHtcNexus9 = true;
        ret.name = 'HtcNexus9';
        break;
      case Xbox.test(ua):
        ret.isXbox = true;
        ret.name = 'Xbox';
        break;
      case Kinect.test(ua):
        ret.isKinect = true;
        ret.name = 'Kinect';
        break;
      case MotoMob.test(ua):
        ret.isMotoMob = true;
        ret.name = 'MotoMob';
        break;
      case MotoTab.test(ua):
        ret.isMotoTab = true;
        ret.name = 'MotoTab';
        break;
      case SumsungTab.test(ua):
        ret.isSumsungTab = true;
        ret.name = 'SumsungTab';
        break;
      case SumsungPhone.test(ua):
        ret.isSumsungPhone = true;
        ret.name = 'SumsungPhone';
        break;
      case Sharp.test(ua):
        ret.isSharp = true;
        ret.name = 'Sharp';
        break;
      case Siemens.test(ua):
        ret.isSiemens = true;
        ret.name = 'Siemens';
        break;
      case Nokia.test(ua):
        ret.isNokia = true;
        ret.name = 'Nokia';
        break;
      case LgTab.test(ua):
        ret.isLgTab = true;
        ret.name = 'LgTab';
        break;
    }
    return ret;
  }
}
