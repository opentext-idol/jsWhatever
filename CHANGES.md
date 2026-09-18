# Version history

## 3.1.0 — 2026-09-15
- add new `select-locale` utility

## 3.0.0 — 2026-08-20
- **Breaking:** migrate the entire codebase from AMD (`define`) modules
  to CommonJS (`require`/`module.exports`); any consumer using RequireJS,
  AMD `shim`/`paths` config, or a `define`-based build pipeline to load
  this library breaks and must switch to a CommonJS/bundler-based build
  (webpack, browserify, etc.).

## 2.14.1 — 2026-03-06
- upgrade dependencies
- remove unused deployment-related files

## 2.14.0 — 2024-09-05
- upgrade dependencies

## 2.13.0 — 2023-10-12
- upgrade dependencies
- add `version` to `package.json`
- internal rebranding

## 2.12.4 — 2017-05-16
- update `npm-shrinkwrap.json`

## 2.12.3 — 2017-05-16
- fix the pinned version of documentation-generation plugins

## 2.12.2 — 2017-05-16

## 2.12.1 — 2017-03-14
- update jshint and relax linting criteria

## 2.12.0 — 2017-03-14
- bug fix: `base-page.js`: now only updates once it has actually been
  rendered (avoids updating an unrendered page)
- testing improvements
- general cleanup: formatting, imports

## 2.11.0 — 2016-10-28
- add `model-any-changed-attribute-listener.js`

## 2.10.1 — 2016-08-18
- bug fix (2.10.0 regression): `modal.js`: fix missing import

## 2.10.0 — 2016-08-18
- **Known issue:** this version relies on a global `underscore` import (`_`)
- `modal.js`: add events to enable/disable the primary button

## 2.9.0 — 2016-08-02
- `modal.js`: add `showFooter` option

## 2.8.0 — 2016-06-29
- **Breaking:** `list-view.js`: change method signature: `onAdd(model, collection)`
- bug fix: `modal.js`: fix missing import
  becomes `onAdd(model)`
- `list-view.js`: add `maxSize` option

## 2.7.0 — 2016-05-25
- **Known issue:** this version relies on a global `underscore` import (`_`)
- upgrade testing dependencies

## 2.6.0 — 2016-05-19
- **Known issue:** this version relies on a global `underscore` import (`_`)
- lock down non-deterministic dependency versions
- update contact emails and README URLs

## 2.5.0 — 2016-02-04
- **Known issue:** this version relies on a global `underscore` import (`_`)
- add `modal.js` and `modal.html`

## 2.4.0 — 2016-01-25
- `abstract-pages.js`: add support for `defaultPage`
- `escape-with-links.js`: rework implementation

## 2.3.0 — 2015-08-19
- add `escape-hod-identifier.js`

## 2.2.3 — 2015-03-12
- testing changes

## 2.2.2 — 2015-03-11
- general cleanup: code style

## 2.2.1 — 2015-03-09
- `list-view.js`: improve error handling

## 2.2.0 — 2015-02-19
- `list-view.js`: add `footerHtml` option
- `list-view.js`: improve error handling
  exception when a collection `sort` event fires before render

## 2.1.3 — 2015-02-09

## 2.1.2 — 2015-02-09
- `list-view.js`: improve error handling

## 2.1.1 — 2015-02-04
- **Breaking:** `list-view.js`: now replaces contents of `$el` rather than appending to existing content
- `list-view.js`: add `headerHtml` option

## 2.1.0 — 2015-01-19
- `list-view.js`: add `proxyEvents` option
- `list-view.js`: add `collectionChangeEvents` option
- bug fix: `list-view.js`: don't leak listeners on removed views

## 2.0.0 — 2015-01-19
- **Breaking:** `list-view.js`:
  - remove options: `itemFilter`, `itemTemplate`, `itemTemplateOptions`
  - remove `filter` method
  - add options: `ItemView`, `itemOptions`, `useCollectionChange`
- add `filtering-collection.js`

## 1.1.0 — 2016-05-19
- lock down non-deterministic dependency versions
- add `npm-shrinkwrap.json`

## 1.0.18 — 2015-12-09
- `escape-with-links.js`: escape additional characters, URI-encode `href` attribute
