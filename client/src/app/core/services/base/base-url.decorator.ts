import { BaseApiService } from '@app/core/services';

const fixSlash = (key: string) => {
  const [slash] = key;
  if (slash === '/') {
    return key;
  } else {
    return '/' + key;
  }
};

/**
 * Добавляет к хосту основного роута до API указанный маршрут
 *
 * @example
 * \ @RestRoute('project')
 *
 * @returns
 * BaseApiService.url + key
 */
export function ApiRoute(key: string) {
  return function (constructor: Function) {
    const base = constructor.prototype as unknown;

    if (!(base instanceof BaseApiService)) {
      throw new Error('ApiRoute can be use only of class extended BaseApiService');
    }

    const proto = Object.getPrototypeOf(base);
    const getUrl = Object.getOwnPropertyDescriptor(proto, 'url');

    const route = fixSlash(key);

    Object.defineProperty(base, 'url', {
      get() {
        return getUrl!.get?.apply(this) + route;
      }
    });
  };
}
