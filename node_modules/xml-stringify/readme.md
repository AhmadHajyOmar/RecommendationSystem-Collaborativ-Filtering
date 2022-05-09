# xml-stringify ![test](https://github.com/1000ch/xml-stringify/actions/workflows/test.yml/badge.svg?branch=main)

Stringify AST built with [segmentio/xml-parser](https://github.com/segmentio/xml-parser).

## Usage

```javascript
import parse from 'xml-parser';
import stringify from 'xml-stringify';

const ast = parse('<foo>Foo!</foo>');
const xml = stringify(ast);

console.log(xml);
```

## License

[MIT](https://1000ch.mit-license.org) © [Shogo Sensui](https://github.com/1000ch)
