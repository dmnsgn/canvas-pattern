/**
 * @module canvasPattern
 */

/**
 * Cache CanvasPattern by source
 *
 * @private
 */
const cacheMap = new WeakMap();

/**
 * Draw and cache a repeated pattern on a canvas context.
 * @alias module:canvasPattern
 * @param {CanvasRenderingContext2D} context The context to draw the pattern to
 * @param {CanvasImageSource} source The pattern to be drawn
 * @param {import("./types.js").CanvasPatternOptions} [options={}] The options to position the pattern and controls its repetition
 * @returns {CanvasPattern}
 */

function canvasPattern(context, source, options = {}) {
  let {
    pattern,
    repetition = "repeat",
    x = 0,
    y = 0,
    width = context.canvas.width,
    height = context.canvas.height,
    cache = true,
  } = {
    ...options,
  };

  pattern =
    pattern ||
    (cache && cacheMap.get(source)) ||
    context.createPattern(source, repetition);

  cacheMap.set(source, pattern);

  context.fillStyle = pattern;
  context.fillRect(x, y, width, height);

  return pattern;
}

export default canvasPattern;

export * from "./types.js";
