/*
 * @Author: DoooReyn 
 * @Date: 2023-07-18 20:34:33 
 * @LastModifiedBy: DoooReyn 
 * @LastModifiedAt: 2023-07-18 20:34:33 
 */

/**
 * 浏览器内核
 */
export namespace Engine {
  const Edge = /windows.+\sedge\/([\w\.]+)/i;
  const Presto = /(presto)\/([\w\.]+)/i;
  const Gecko = /rv\:([\w\.]+).*(gecko)/i;
  const Tasman = /(tasman)[\/\s]\(?([\w\.]+)/i;
  const Khtml = /(khtml)[\/\s]\(?([\w\.]+)/i;
  const Links = /(links)[\/\s]\(?([\w\.]+)/i;
  const Webkit = /(webkit)\/([\w\.]+)/i;
  const Trident = /(trident)\/([\w\.]+)/i;
  const Netfront = /(netfront)\/([\w\.]+)/i;
  const Netsurf = /(netsurf)\/([\w\.]+)/i;
  const Amaya = /(amaya)\/([\w\.]+)/i;
  const Lynx = /(lynx)\/([\w\.]+)/i;
  const W3m = /(w3m)\/([\w\.]+)/i;
  const Icab = /(icab)[\/\s]([23]\.[\d\.]+)/i;

  export interface Result {
    isEdge: boolean;
    isPresto: boolean;
    isGecko: boolean;
    isTasman: boolean;
    isKhtml: boolean;
    isLinks: boolean;
    isWebkit: boolean;
    isTrident: boolean;
    isNetfront: boolean;
    isNetsurf: boolean;
    isAmaya: boolean;
    isLynx: boolean;
    isW3m: boolean;
    isIcab: boolean;
    name: string;
  }

  export function parse(ua: string): Result {
    let ret: Result = {
      isEdge: false,
      isPresto: false,
      isGecko: false,
      isTasman: false,
      isKhtml: false,
      isLinks: false,
      isWebkit: false,
      isTrident: false,
      isNetfront: false,
      isNetsurf: false,
      isAmaya: false,
      isLynx: false,
      isW3m: false,
      isIcab: false,
      name: 'Unknown',
    };

    switch (true) {
      case Edge.test(ua):
        ret.isEdge = true;
        ret.name = 'Edge';
        break;
      case Presto.test(ua):
        ret.isPresto = true;
        ret.name = 'Presto';
        break;
      case Gecko.test(ua):
        ret.isGecko = true;
        ret.name = 'Gecko';
        break;
      case Tasman.test(ua):
        ret.isTasman = true;
        ret.name = 'Tasman';
        break;
      case Khtml.test(ua):
        ret.isKhtml = true;
        ret.name = 'Khtml';
        break;
      case Links.test(ua):
        ret.isLinks = true;
        ret.name = 'Links';
        break;
      case Webkit.test(ua):
        ret.isWebkit = true;
        ret.name = 'Webkit';
        break;
      case Trident.test(ua):
        ret.isTrident = true;
        ret.name = 'Trident';
        break;
      case Netfront.test(ua):
        ret.isNetfront = true;
        ret.name = 'Netfront';
        break;
      case Netsurf.test(ua):
        ret.isNetsurf = true;
        ret.name = 'Netsurf';
        break;
      case Amaya.test(ua):
        ret.isAmaya = true;
        ret.name = 'Amaya';
        break;
      case Lynx.test(ua):
        ret.isLynx = true;
        ret.name = 'Lynx';
        break;
      case W3m.test(ua):
        ret.isW3m = true;
        ret.name = 'W3m';
        break;
      case Icab.test(ua):
        ret.isIcab = true;
        ret.name = 'Icab';
        break;
    }

    return ret;
  }
}
