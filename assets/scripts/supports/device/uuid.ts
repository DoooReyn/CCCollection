/*
 * @Author: DoooReyn
 * @Date: 2023-07-18 16:48:22
 * @LastModifiedBy: DoooReyn
 * @LastModifiedAt: 2023-07-18 16:48:22
 */

const __REGEX__ =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

const __DNS__ = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
const __URL__ = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
const BYTE_TO_HEX = [];
for (let i = 0; i < 256; ++i) {
  BYTE_TO_HEX.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (
    BYTE_TO_HEX[arr[offset + 0]] +
    BYTE_TO_HEX[arr[offset + 1]] +
    BYTE_TO_HEX[arr[offset + 2]] +
    BYTE_TO_HEX[arr[offset + 3]] +
    "-" +
    BYTE_TO_HEX[arr[offset + 4]] +
    BYTE_TO_HEX[arr[offset + 5]] +
    "-" +
    BYTE_TO_HEX[arr[offset + 6]] +
    BYTE_TO_HEX[arr[offset + 7]] +
    "-" +
    BYTE_TO_HEX[arr[offset + 8]] +
    BYTE_TO_HEX[arr[offset + 9]] +
    "-" +
    BYTE_TO_HEX[arr[offset + 10]] +
    BYTE_TO_HEX[arr[offset + 11]] +
    BYTE_TO_HEX[arr[offset + 12]] +
    BYTE_TO_HEX[arr[offset + 13]] +
    BYTE_TO_HEX[arr[offset + 14]] +
    BYTE_TO_HEX[arr[offset + 15]]
  ).toLowerCase();
}

function stringToBytes(str: string) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

function parse(uuid: string) {
  if (!validate(uuid)) {
    throw TypeError("Invalid UUID");
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = (v >>> 16) & 0xff;
  arr[2] = (v >>> 8) & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = ((v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000) & 0xff;
  arr[11] = (v / 0x100000000) & 0xff;
  arr[12] = (v >>> 24) & 0xff;
  arr[13] = (v >>> 16) & 0xff;
  arr[14] = (v >>> 8) & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

function validate(uuid: string) {
  return __REGEX__.test(uuid);
}

function version(uuid: string) {
  if (!validate(uuid)) {
    throw TypeError("Invalid UUID");
  }
  return parseInt(uuid.slice(14, 15), 16);
}

function v35(name: string, version: number, hashfunc: any) {
  function generateUUID(
    value: string | number[],
    namespace: string | Uint8Array | number[],
    buf?: number[],
    offset?: number
  ) {
    var _namespace;

    if (typeof value === "string") {
      value = stringToBytes(value);
    }

    if (typeof namespace === "string") {
      namespace = parse(namespace);
    }

    if (
      ((_namespace = namespace) === null || _namespace === void 0
        ? void 0
        : _namespace.length) !== 16
    ) {
      throw TypeError(
        "Namespace must be array-like (16 iterable integer values, 0-255)"
      );
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`

    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = (bytes[6] & 0x0f) | version;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return unsafeStringify(bytes);
  } // Function#name is not settable on some platforms (#270)

  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support

  generateUUID.DNS = __DNS__;
  generateUUID.URL = __URL__;
  return generateUUID;
}

function f(s, x, y, z) {
  switch (s) {
    case 0:
      return (x & y) ^ (~x & z);

    case 1:
      return x ^ y ^ z;

    case 2:
      return (x & y) ^ (x & z) ^ (y & z);

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return (x << n) | (x >>> (32 - n));
}

function sha1(bytes) {
  const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === "string") {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (let i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  const l = bytes.length / 4 + 2;
  const N = Math.ceil(l / 16);
  const M = new Array(N);

  for (let i = 0; i < N; ++i) {
    const arr = new Uint32Array(16);

    for (let j = 0; j < 16; ++j) {
      arr[j] =
        (bytes[i * 64 + j * 4] << 24) |
        (bytes[i * 64 + j * 4 + 1] << 16) |
        (bytes[i * 64 + j * 4 + 2] << 8) |
        bytes[i * 64 + j * 4 + 3];
    }

    M[i] = arr;
  }

  M[N - 1][14] = ((bytes.length - 1) * 8) / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = ((bytes.length - 1) * 8) & 0xffffffff;

  for (let i = 0; i < N; ++i) {
    const W = new Uint32Array(80);

    for (let t = 0; t < 16; ++t) {
      W[t] = M[i][t];
    }

    for (let t = 16; t < 80; ++t) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }

    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];

    for (let t = 0; t < 80; ++t) {
      const s = Math.floor(t / 20);
      const T = (ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t]) >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = (H[0] + a) >>> 0;
    H[1] = (H[1] + b) >>> 0;
    H[2] = (H[2] + c) >>> 0;
    H[3] = (H[3] + d) >>> 0;
    H[4] = (H[4] + e) >>> 0;
  }

  return [
    (H[0] >> 24) & 0xff,
    (H[0] >> 16) & 0xff,
    (H[0] >> 8) & 0xff,
    H[0] & 0xff,
    (H[1] >> 24) & 0xff,
    (H[1] >> 16) & 0xff,
    (H[1] >> 8) & 0xff,
    H[1] & 0xff,
    (H[2] >> 24) & 0xff,
    (H[2] >> 16) & 0xff,
    (H[2] >> 8) & 0xff,
    H[2] & 0xff,
    (H[3] >> 24) & 0xff,
    (H[3] >> 16) & 0xff,
    (H[3] >> 8) & 0xff,
    H[3] & 0xff,
    (H[4] >> 24) & 0xff,
    (H[4] >> 16) & 0xff,
    (H[4] >> 8) & 0xff,
    H[4] & 0xff,
  ];
}

const v5 = v35("v5", 0x50, sha1);

/**
 * UUID 工具
 * - 源码来自 [uuid](https://github.com/uuidjs/uuid)，集成了几个用得到的 API
 *    - v5
 *    - validate
 *    - version
 */
export { v5, validate, version };
