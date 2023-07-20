/*
 * @Author: DoooReyn
 * @Date: 2023-07-19 15:39:48
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-19 15:39:48
 */

import { Asset, AssetManager, Constructor, assetManager, __private, log } from 'cc';
import { Method1, Method2 } from '../cmm/method';

/**
 * 资源类型
 */
type T_AssetType<T = Asset> = Constructor<T>;

/**
 * 资源加载进度方法
 */
type T_LoadProgress = (
  finished?: number,
  total?: number,
  item?: AssetManager.RequestItem
) => void;

/**
 * 资源加载基础格式
 */
interface I_BaseResOptions<T extends Asset> {
  type: T_AssetType<T>;
  onBad?: Method1<Error, void>;
}

/**
 * 同类型资源加载格式
 */
interface I_OneResOptions<T extends Asset> extends I_BaseResOptions<T> {
  bundle?: string;
  path: string | string[];
  onProgress?: T_LoadProgress;
  onOK?: Method1<T[], void>;
  onDone?: Method2<T[], number, void>;
}

/**
 * 目录下同类型资源加载格式
 */
interface I_DirResOptions<T extends Asset> extends I_BaseResOptions<T> {
  bundle?: string;
  dir: string;
  type: T_AssetType<T>;
  onProgress?: T_LoadProgress;
  onOK?: Method1<T[], void>;
  onDone?: Method1<T[], void>;
}

/**
 * 远程资源加载格式
 */
interface I_RemoteResOptions<T extends Asset> extends I_BaseResOptions<T> {
  url: string;
  onOK?: Method1<T, void>;
  onDone?: Method1<T, void>;
  remote?: {
    ext?: string;
    [k: string]: any;
  } | null;
}

/**
 * 资源包加载格式
 */
interface I_BundleResOptions {
  bundle: string;
  version?: string;
  onBad?: Method1<Error, void>;
  onOK?: Method1<AssetManager.Bundle, void>;
  onDone?: Method1<AssetManager.Bundle, void>;
  [k: string]: any;
}

/**
 * 资源管理器
 */
export class ResLoader {
  static readonly instance: ResLoader = new ResLoader();

  /**
   * 加载资源包
   * @param options 资源包加载格式
   * @returns
   */
  loadBundle(options: I_BundleResOptions) {
    const data = assetManager.getBundle(options.bundle);
    if (data) return options?.onDone(data);

    assetManager.loadBundle(options.bundle, options, (err, data) => {
      if (err) options.onBad && options.onBad(err);
      data && options.onOK && options.onOK(data);
      options.onDone && options.onDone(data);
    });
  }

  /**
   * 加载同类型资源
   * @param options 资源加载格式
   * @returns
   */
  loadOne<T extends Asset>(options: I_OneResOptions<T>) {
    if (!Array.isArray(options.path)) {
      options.path = [options.path];
    }
    const count = options.path.length;
    if (count <= 0) return;

    this.loadBundle({
      bundle: options.bundle || 'resources',
      onBad: (err) => options?.onBad(err),
      onDone: (bundle) => {
        bundle.load(
          options.path as string[],
          options.type,
          (finished, total, item) => {
            options.onProgress && options.onProgress(finished, total, item);
          },
          (err, data) => {
            if (err) options.onBad && options.onBad(err);
            data.length === count && options.onOK && options.onOK(data);
            options.onDone && options.onDone(data, data.length / count);
          }
        );
      },
    });
  }

  /**
   * 加载目录下同类型资源
   * @param options 目录下资源加载格式
   */
  loadDir<T extends Asset>(options: I_DirResOptions<T>) {
    this.loadBundle({
      bundle: options.bundle || 'resources',
      onBad: (err) => options?.onBad(err),
      onDone: (bundle) => {
        bundle.loadDir(
          options.dir,
          options.type,
          (finished, total, item) => {
            options.onProgress && options.onProgress(finished, total, item);
          },
          (err, data) => {
            if (err) options?.onBad && options.onBad(err);
            data && options.onOK && options.onOK(data);
            options.onDone && options.onDone(data);
          }
        );
      },
    });
  }

  /**
   * 加载远程资源
   * @param options 远程资源加载格式
   */
  loadRemote<T extends Asset>(options: I_RemoteResOptions<T>) {
    assetManager.loadRemote<T>(
      options.url,
      options.remote || null,
      (err, data) => {
        if (err) options?.onBad && options.onBad(err);
        data && options.onOK && options.onOK(data);
        options.onDone && options.onDone(data);
      }
    );
  }

  /**
   * 卸载资源
   * @param path 资源路径
   * @param bundleName 资源包名称
   * @param type 资源类型
   */
  release<T extends Asset>(
    path: string,
    bundleName?: string,
    type?: T_AssetType<T>
  ) {
    bundleName = bundleName || 'resources';
    const bundle = assetManager.getBundle(bundleName);
    bundle && bundle.release(path, type);
  }

  /**
   * 卸载资源
   * @param asset 资源
   */
  releaseAsset(asset: Asset) {
    assetManager.releaseAsset(asset);
  }

  /**
   * 卸载资源包
   * @param bundleName 资源包名称
   */
  releaseBundle(bundleName: string) {
    const bundle = assetManager.getBundle(bundleName);
    if (bundle) {
      bundle.releaseAll();
      assetManager.removeBundle(bundle);
    }
  }

  /**
   * 卸载全部资源
   */
  releaseAll() {
    assetManager.releaseAll();
  }

  /**
   * 输出当前资源列表信息
   */
  dump() {
    log('当前资源列表');
    assetManager.assets.forEach(log.bind(log, '#'));
    log(`当前资源总数:${assetManager.assets.count}`);
  }
}
