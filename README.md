# canvas-pattern

[![npm version](https://img.shields.io/npm/v/canvas-pattern)](https://www.npmjs.com/package/canvas-pattern)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://www.npmjs.com/package/canvas-pattern)
[![npm minzipped size](https://img.shields.io/bundlephobia/minzip/canvas-pattern)](https://www.npmjs.com/package/canvas-pattern)
[![dependencies](https://img.shields.io/librariesio/release/npm/canvas-pattern)](https://github.com/dmnsgn/canvas-pattern/blob/main/package.json)
[![types](https://img.shields.io/npm/types/canvas-pattern)](https://github.com/microsoft/TypeScript)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-fa6673.svg)](https://conventionalcommits.org)
[![styled with prettier](https://img.shields.io/badge/styled_with-Prettier-f8bc45.svg?logo=prettier)](https://github.com/prettier/prettier)
[![linted with eslint](https://img.shields.io/badge/linted_with-ES_Lint-4B32C3.svg?logo=eslint)](https://github.com/eslint/eslint)
[![license](https://img.shields.io/github/license/dmnsgn/canvas-pattern)](https://github.com/dmnsgn/canvas-pattern/blob/main/LICENSE.md)

Draw and cache a repeated pattern on a canvas context.

[![paypal](https://img.shields.io/badge/donate-paypal-informational?logo=paypal)](https://paypal.me/dmnsgn)
[![coinbase](https://img.shields.io/badge/donate-coinbase-informational?logo=coinbase)](https://commerce.coinbase.com/checkout/56cbdf28-e323-48d8-9c98-7019e72c97f3)
[![twitter](https://img.shields.io/twitter/follow/dmnsgn?style=social)](https://twitter.com/dmnsgn)

![](https://raw.githubusercontent.com/dmnsgn/canvas-pattern/main/screenshot.png)

## Installation

```bash
npm install canvas-pattern
```

## Usage

```js
import canvasPattern from "canvas-pattern";
import createCanvasContext from "canvas-context";

const { context } = createCanvasContext("2d");

const pattern = new Image();
pattern.src = "pattern.png";

drawImagePattern(context, pattern);
```

## API

<!-- api-start -->

## Modules

<dl>
<dt><a href="#module_canvasPattern">canvasPattern</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#CanvasPatternRepetition">CanvasPatternRepetition</a> : <code>&quot;repeat&quot;</code> | <code>&quot;repeat-x&quot;</code> | <code>&quot;repeat-y&quot;</code> | <code>&quot;no-repeat&quot;</code></dt>
<dd></dd>
<dt><a href="#CanvasPatternOptions">CanvasPatternOptions</a> : <code>Object</code></dt>
<dd><p>Options to draw. All optional.</p>
</dd>
</dl>

<a name="module_canvasPattern"></a>

## canvasPattern

<a name="exp_module_canvasPattern--canvasPattern"></a>

### canvasPattern(context, source, [options]) ⇒ <code>CanvasPattern</code> ⏏

Draw and cache a repeated pattern on a canvas context.

**Kind**: Exported function

| Param     | Type                                                       | Default         | Description                                                     |
| --------- | ---------------------------------------------------------- | --------------- | --------------------------------------------------------------- |
| context   | <code>CanvasRenderingContext2D</code>                      |                 | The context to draw the pattern to                              |
| source    | <code>CanvasImageSource</code>                             |                 | The pattern to be drawn                                         |
| [options] | [<code>CanvasPatternOptions</code>](#CanvasPatternOptions) | <code>{}</code> | The options to position the pattern and controls its repetition |

<a name="CanvasPatternRepetition"></a>

## CanvasPatternRepetition : <code>&quot;repeat&quot;</code> \| <code>&quot;repeat-x&quot;</code> \| <code>&quot;repeat-y&quot;</code> \| <code>&quot;no-repeat&quot;</code>

**Kind**: global typedef  
<a name="CanvasPatternOptions"></a>

## CanvasPatternOptions : <code>Object</code>

Options to draw. All optional.

**Kind**: global typedef  
**Properties**

| Name         | Type                                                             | Description                                                                |
| ------------ | ---------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [pattern]    | <code>CanvasPattern</code>                                       | The CanvasPattern to draw. Created and returned by the function for reuse. |
| [repetition] | [<code>CanvasPatternRepetition</code>](#CanvasPatternRepetition) | A DOMString indicating how to repeat the pattern's image.                  |
| [x]          | <code>number</code>                                              |                                                                            |
| [y]          | <code>number</code>                                              |                                                                            |
| [width]      | <code>number</code>                                              |                                                                            |
| [height]     | <code>number</code>                                              |                                                                            |

<!-- api-end -->

## License

MIT. See [license file](https://github.com/dmnsgn/canvas-pattern/blob/main/LICENSE.md).
