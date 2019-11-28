import querystring, { ParsedUrlQuery, ParsedUrlQueryInput } from 'querystring';
import { parse, format, UrlWithParsedQuery, UrlObject } from 'url';
import omit from 'lodash/omit';

interface Url
  extends Omit<
    UrlWithParsedQuery,
    'query' | 'host' | 'path' | 'href' | 'search'
  > {
  query?: ParsedUrlQuery | ParsedUrlQueryInput;
}

export const changeUrl = (
  uri: string | UrlObject,
  change: (url: Url) => Url
) => {
  const parsed = typeof uri === 'object' ? uri : parse(uri);
  const url: Url = {
    ...omit(parsed, ['query', 'host', 'path', 'href', 'search']),
    port: parsed.port ? `${parsed.port}` : undefined,
    query: parsed.query
      ? typeof parsed.query === 'object'
        ? parsed.query
        : querystring.parse(parsed.query)
      : undefined,
  };
  const changed = change(url);
  return format(changed);
};

export default changeUrl;
