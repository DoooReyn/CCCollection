/*
 * @Author: DoooReyn 
 * @Date: 2023-07-18 20:32:18 
 * @LastModifiedBy: DoooReyn 
 * @LastModifiedAt: 2023-07-18 20:32:18 
 */

/**
 * 资源加载格式
 */
export interface I_AssetItem {
  /**
   * 资源包名称
   */
  bundle?: string;
  /**
   * 资源路径
   */
  path: string;
}

/**
 * 尺寸格式
 */
export interface I_SizeLike {
  width: number;
  height: number;
}

/**
 * 坐标格式
 */
export interface I_PointLike {
  x: number;
  y: number;
  z?: number;
}

/**
 * 矩形格式
 */
export interface I_RectLike {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * 一般对象格式
 */
export type I_ObjectLike = Record<string | number | symbol, any>;
