# change-url

Tiny module to modify any part of an URL:

```
changeUrl('/abc?foo=biz', url => ({
  ...url,
  query: {
    ...url.query,
    added: 'baz',
  },
}))
// ==> abc?foo=biz&added=baz
```

## Install

```
npm install change-url
```
