/*
 * @Author: DoooReyn 
 * @Date: 2023-07-18 20:33:09 
 * @LastModifiedBy: DoooReyn 
 * @LastModifiedAt: 2023-07-18 20:33:09 
 */

/**
 * CPU 架构
 */
export namespace Arch {
  const Amd64 = /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i;
  const Ia32 = /(ia32(?=;))/i;
  const Ia3386 = /((?:i[346]|x)86)[;\)]/i;
  const PowerPc = /(sun4\w)[;\)]/i;
  const Arm64mips =
    /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i;

  export function parse(ua: string): Result {
    let ret: Result = {
      isAmd64: false,
      isIa32: false,
      isIa3386: false,
      isPowerPc: false,
      isArm64mips: false,
      name: 'Unknown',
    };
    switch (true) {
      case Amd64.test(ua):
        ret.isAmd64 = true;
        ret.name = 'Amd64';
        break;
      case Ia32.test(ua):
        ret.isIa32 = true;
        ret.name = 'Ia32';
        break;
      case Ia3386.test(ua):
        ret.isIa3386 = true;
        ret.name = 'Ia3386';
        break;
      case PowerPc.test(ua):
        ret.isPowerPc = true;
        ret.name = 'PowerPc';
        break;
      case Arm64mips.test(ua):
        ret.isArm64mips = true;
        ret.name = 'Arm64mips';
        break;
    }
    return ret;
  }

  export interface Result {
    isAmd64: boolean;
    isIa32: boolean;
    isIa3386: boolean;
    isPowerPc: boolean;
    isArm64mips: boolean;
    name: string;
  }
}
