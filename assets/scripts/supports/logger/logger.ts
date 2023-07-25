/*
 * @Author: DoooReyn
 * @Date: 2023-07-24 10:38:24
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-24 10:38:24
 */

import { Dates } from '../cmm/dates';

/**
 * 日志方法类型
 */
type T_LogTag = 'debug' | 'info' | 'warn' | 'error';

/**
 * 日志方法与输出颜色对照表
 */
const METHOD_COLOR_MAP: { [method: string]: string } = {
  debug: `#7f8c8d`, // Gray
  info: `#2ecc71`, // Green
  warn: `#f39c12`, // Yellow
  error: `#c0392b`, // Red
};

/**
 * 获取错误信息
 * @param index 错误栈深度
 * @returns
 */
function GetStack(index: number): string {
  let e = new Error();
  let lines = e.stack!.split('\n');
  let result: Array<any> = [];
  lines.forEach((line) => {
    line = line.substring(7);
    let lineBreak = line.split(' ');
    if (lineBreak.length < 2) {
      result.push(lineBreak[0]);
    } else {
      result.push({ [lineBreak[0]]: lineBreak[1] });
    }
  });

  let list: string[] = [];
  if (index < result.length - 1) {
    let value: string;
    for (let a in result[index]) {
      let splitList = a.split('.');
      if (splitList.length == 2) {
        list = splitList.concat();
      } else {
        value = result[index][a];
        let start = value!.lastIndexOf('/');
        let end = value!.lastIndexOf('.');
        if (start > -1 && end > -1) {
          let r = value!.substring(start + 1, end);
          list.push(r);
        } else {
          list.push(value);
        }
      }
    }
  }

  if (list.length == 1) {
    return list[0] + '.ts';
  } else if (list.length == 2) {
    return list[0] + '.ts->' + list[1];
  }
  return '';
}

/**
 * 日志管理器
 */
export class Logger {
  /**
   * 是否开启
   */
  private _enabled: boolean = true;

  /**
   * 输出日志
   * @param tag 日志方法类型
   * @param args 输入参数
   * @returns
   */
  private _print(tag: T_LogTag, ...args: any[]) {
    if (!this._enabled) return;

    const date = Dates.getDateString();
    const stack = GetStack(4);
    const fmt = `%c${date} ${stack}`;
    const styles = [
      `background: ${METHOD_COLOR_MAP[tag]}`,
      `border-radius: 0.5em`,
      `color: white`,
      `font-weight: bold`,
      `padding: 2px 0.5em`,
    ];
    console[tag](fmt, styles.join(';'), '\n', ...args);
  }

  /**
   * 是否开启
   */
  get enabled() {
    return this._enabled;
  }

  /**
   * 开启/关闭日志
   */
  set enabled(v: boolean) {
    this._enabled = v;
  }

  /**
   * 输出调试
   * @param args 输入参数
   */
  debug(...args: any[]) {
    this._print('debug', ...args);
  }

  /**
   * 输出信息
   * @param args 输入参数
   */
  info(...args: any[]) {
    this._print('info', ...args);
  }

  /**
   * 输出警告
   * @param args 输入参数
   */
  warn(...args: any[]) {
    this._print('warn', ...args);
  }

  /**
   * 输出错误
   * @param args 输入参数
   */
  error(...args: any[]) {
    this._print('error', ...args);
  }
}
