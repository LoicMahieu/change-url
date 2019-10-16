import querystring from 'querystring';
import { parse, format, UrlWithStringQuery } from 'url';
import omit from 'lodash/omit';

interface Url
  extends Omit<
    UrlWithStringQuery,
    'query' | 'host' | 'path' | 'href' | 'search'
  > {
  query?: querystring.ParsedUrlQuery;
}

export const changeUrl = (uri: string, change: (url: Url) => Url) => {
  const parsed = parse(uri);
  const url = {
    ...omit(parsed, 'query', 'host', 'path', 'href', 'search'),
    query: parsed.query ? querystring.parse(parsed.query) : undefined,
  };
  const changed = change(url);
  return format(changed);
};

export default changeUrl;
