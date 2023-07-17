/**
 * 正则验证器
 */
export namespace RegExpValidator {
  const VALID_URL =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;

  /**
   * 是否有效的网址
   * @param url 输入网址
   * @returns
   */
  export function isUrl(url: string) {
    return VALID_URL.test(url);
  }
}
