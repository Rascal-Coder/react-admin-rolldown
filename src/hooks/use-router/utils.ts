export type LocationQueryValue = string | null;

/**
 * Normalized query object that appears in {@link RouteLocationNormalized}
 *
 * @public
 */
export type LocationQuery = Record<
  string,
  LocationQueryValue | LocationQueryValue[]
>;
export type LocationQueryValueRaw = LocationQueryValue | number | undefined;

export type LocationQueryRaw = Record<
  string | number,
  LocationQueryValueRaw | LocationQueryValueRaw[]
>;

/**
 * Transforms a queryString into a {@link LocationQuery} object. Accept both, a version with the leading `?` and without
 * Should work as URLSearchParams
 *
 * @param search - search string to parse
 * @returns a query object
 * @internal
 */

export const PLUS_RE = /\+/g; // %2B

const EQUAL_RE = /[=]/g; // %3D

const ENC_BRACKET_OPEN_RE = /%5B/g; // [
const ENC_BRACKET_CLOSE_RE = /%5D/g; // ]
const ENC_CARET_RE = /%5E/g; // ^
const ENC_BACKTICK_RE = /%60/g; // `
const ENC_CURLY_OPEN_RE = /%7B/g; // {
const ENC_PIPE_RE = /%7C/g; // |
const ENC_CURLY_CLOSE_RE = /%7D/g; // }
const ENC_SPACE_RE = /%20/g; // }
const HASH_RE = /#/g; // %23
const AMPERSAND_RE = /&/g; // %26
export function parseQuery(search: string): LocationQuery {
  const query: LocationQuery = {};
  // avoid creating an object with an empty key and empty value
  // because of split('&')
  if (search === "" || search === "?") {
    return query;
  }
  const hasLeadingIM = search[0] === "?";
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");

  for (const searchParam of searchParams) {
    // pre decode the + into space
    const decodedSearchParam = searchParam.replace(PLUS_RE, " ");
    // allow the = character
    const eqPos = decodedSearchParam.indexOf("=");
    const key = decode(
      eqPos < 0 ? decodedSearchParam : decodedSearchParam.slice(0, eqPos)
    );
    const value =
      eqPos < 0 ? null : decode(decodedSearchParam.slice(eqPos + 1));

    if (key in query) {
      // an extra variable for ts types
      let currentValue = query[key];
      if (!Array.isArray(currentValue)) {
        currentValue = [currentValue];
        query[key] = currentValue;
      }
      // we force the modification
      (currentValue as LocationQueryValue[]).push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}

/**
 * 处理单个查询值的字符串化
 * @param key - 编码后的键
 * @param v - 查询值
 * @returns 查询字符串片段
 */
function stringifyQueryValue(
  key: string,
  v: LocationQueryValueRaw | null
): string {
  if (v === null) {
    return key;
  }
  return `${key}=${v}`;
}

/**
 * 处理单个键值对的字符串化
 * @param key - 编码后的键
 * @param value - 原始查询值
 * @returns 查询字符串片段数组
 */
function stringifyKeyValuePair(
  key: string,
  value: LocationQueryValueRaw | LocationQueryValueRaw[]
): string[] {
  if (value === null) {
    return [key];
  }

  const values: (LocationQueryValueRaw | null)[] = Array.isArray(value)
    ? value.map((v) => v && encodeQueryValue(v))
    : [value && encodeQueryValue(value)];

  return values
    .filter((v) => v !== undefined)
    .map((v) => stringifyQueryValue(key, v));
}

export function stringifyQuery(query: LocationQueryRaw): string {
  const pairs: string[] = [];

  for (const [originalKey, value] of Object.entries(query)) {
    const key = encodeQueryKey(originalKey);
    const queryPairs = stringifyKeyValuePair(key, value);
    pairs.push(...queryPairs);
  }

  return pairs.join("&");
}

export function decode(text: string | number): string {
  try {
    return decodeURIComponent(`${text}`);
  } catch {
    console.warn(`Error decoding "${text}". Using original value`);
  }
  return `${text}`;
}

export function encodeQueryKey(text: string | number): string {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}

export function encodeQueryValue(text: string | number): string {
  return (
    commonEncode(text)
      // Encode the space as +, encode the + to differentiate it from the space
      .replace(PLUS_RE, "%2B")
      .replace(ENC_SPACE_RE, "+")
      .replace(HASH_RE, "%23")
      .replace(AMPERSAND_RE, "%26")
      .replace(ENC_BACKTICK_RE, "`")
      .replace(ENC_CURLY_OPEN_RE, "{")
      .replace(ENC_CURLY_CLOSE_RE, "}")
      .replace(ENC_CARET_RE, "^")
  );
}

function commonEncode(text: string | number): string {
  return encodeURI(`${text}`)
    .replace(ENC_PIPE_RE, "|")
    .replace(ENC_BRACKET_OPEN_RE, "[")
    .replace(ENC_BRACKET_CLOSE_RE, "]");
}
