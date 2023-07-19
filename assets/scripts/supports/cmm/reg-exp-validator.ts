/*
 * @Author: DoooReyn
 * @Date: 2023-07-18 17:12:59
 * @LastModifiedBy:   DoooReyn
 * @LastModifiedAt: 2023-07-18 17:12:59
 */

/**
 * 正则验证器
 */
export namespace RegExpValidator {
  const URL =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;

  /**
   * 是否有效的网址
   * @param url 输入网址
   * @returns
   */
  export function isUrl(url: string) {
    return URL.test(url);
  }
}
