import { changeUrl } from '../src';

describe('change-url', () => {
  it('works without change', () => {
    const test = (v: string) => expect(changeUrl(v, url => url)).toEqual(v);

    test('/');
    test('/abc');
    test('/abc/');
    test('/abc/123');
    test('/abc/123#1234');
    test('/abc/123?bim=bar');
    test('http://localhost/abc/123?bim=bar');
    test('https://localhost/abc/123?bim=bar');
    test('https://localhost:1234/abc/123?bim=bar');
    test('https://bar@localhost:1234/abc/123?bim=bar');
    test('https://bar:foo@localhost:1234/abc/123?bim=bar');
    test('abc');
    test('abc/');
  });

  it('works when change query', () => {
    expect(
      changeUrl('/abc', url => ({
        ...url,
        query: {
          ...url.query,
          added: 'baz',
        },
      }))
    ).toEqual('/abc?added=baz');

    expect(
      changeUrl('/abc?foo=biz', url => ({
        ...url,
        query: {
          ...url.query,
          added: 'baz',
        },
      }))
    ).toEqual('/abc?foo=biz&added=baz');

    expect(
      changeUrl('/abc?added=baz', url => ({
        ...url,
        query: {
          ...url.query,
          added: 'overwrite',
        },
      }))
    ).toEqual('/abc?added=overwrite');
  });

  it('works when change protocol', () => {
    expect(
      changeUrl('http://localhost/abc/123?bim=bar', url => ({
        ...url,
        protocol: 'https',
      }))
    ).toEqual('https://localhost/abc/123?bim=bar');
  });

  it('works when change pathname', () => {
    expect(
      changeUrl('http://localhost/abc/123?bim=bar', url => ({
        ...url,
        pathname: '/overwrite',
      }))
    ).toEqual('http://localhost/overwrite?bim=bar');
  });

  it('works with url object', () => {
    expect(
      changeUrl(
        {
          pathname: '/bim',
          query: {
            foo: 'bizz',
          },
        },
        url => ({
          ...url,
          query: {
            ...url.query,
            added: 'overwrite',
          },
        })
      )
    ).toEqual('/bim?foo=bizz&added=overwrite');
  });
});
