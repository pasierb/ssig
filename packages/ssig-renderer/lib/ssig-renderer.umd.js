(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['ssig-renderer'] = {}));
}(this, function (exports) { 'use strict';

  /**
   *
   * @callback setupCanvasCallback
   * @param {CanvasRenderingContext2D} ctx
   */

  /**
   * Sets up canvas and restores it's state afterwards
   *
   * @param {HTMLCanvasElement} canvas HTMLCanvasElement
   * @param {setupCanvasCallback} callback callback function
   */
  function setupCanvas(canvas, callback) {
    var ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("2D Context not available");
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    callback(ctx);
    ctx.restore();
  }
  /**
   * Sets context shadow
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {object} attrs
   * @param {number} attrs.shadowBlur
   * @param {string} attrs.shadowColor
   * @param {number} attrs.shadowOffsetX
   * @param {number} attrs.shadowOffsetY
   */

  function setShadow(ctx, attrs) {
    var _attrs$shadowBlur = attrs.shadowBlur,
        shadowBlur = _attrs$shadowBlur === void 0 ? 0 : _attrs$shadowBlur,
        _attrs$shadowColor = attrs.shadowColor,
        shadowColor = _attrs$shadowColor === void 0 ? "#000" : _attrs$shadowColor,
        _attrs$shadowOffsetX = attrs.shadowOffsetX,
        shadowOffsetX = _attrs$shadowOffsetX === void 0 ? 0 : _attrs$shadowOffsetX,
        _attrs$shadowOffsetY = attrs.shadowOffsetY,
        shadowOffsetY = _attrs$shadowOffsetY === void 0 ? 0 : _attrs$shadowOffsetY;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {number} radius
   */

  function roundedCornersPath(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  /**
   * 
   * @param {HTMLCanvasElement} canvas 
   * @param {object} layer 
   */

  function drawTextLayer(canvas, layer) {
    var breakCharCount = 20;
    var x = layer.x,
        y = layer.y,
        typeData = layer.typeData;
    var lineHeight = typeData.lineHeight;
    var _typeData$fontSize = typeData.fontSize,
        fontSize = _typeData$fontSize === void 0 ? "14" : _typeData$fontSize,
        fontFamily = typeData.fontFamily,
        _typeData$color = typeData.color,
        color = _typeData$color === void 0 ? "#000" : _typeData$color,
        shadow = typeData.shadow,
        _typeData$text = typeData.text,
        text = _typeData$text === void 0 ? "" : _typeData$text;

    if (!lineHeight) {
      lineHeight = fontSize;
    }

    var rows = text.split(/\s/).reduce(function (acc, word) {
      var row = acc.pop() || "";

      if (!row) {
        acc.push(word);
        return acc;
      }

      if (row.length + word.length > breakCharCount) {
        acc.push(row, word);
      } else {
        acc.push([row, word].join(" "));
      }

      return acc;
    }, []);
    setupCanvas(canvas, function (ctx) {
      if (shadow) {
        setShadow(ctx, typeData);
      }

      ctx.fillStyle = color;
      ctx.font = "".concat(fontSize, "px ").concat(fontFamily);
      rows.forEach(function (row, index) {
        ctx.fillText(row, x, y + (index + 1) * lineHeight);
      });
    });
    return canvas;
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  /**
   *
   * @param {HTMLCanvasElement} canvas
   * @param {object} layer
   * @param {Promise<HTMLImageElement>} getImage
   */

  function drawImageLayer(_x, _x2, _x3) {
    return _drawImageLayer.apply(this, arguments);
  }

  function _drawImageLayer() {
    _drawImageLayer = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(canvas, layer, getImage) {
      var x, y, typeData, imageUri, imageData, repeat, shadow, borderRadius, image, width, height;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              x = layer.x, y = layer.y, typeData = layer.typeData;
              imageUri = typeData.imageUri, imageData = typeData.imageData, repeat = typeData.repeat, shadow = typeData.shadow, borderRadius = typeData.borderRadius;
              _context.next = 4;
              return getImage(imageData || imageUri);

            case 4:
              image = _context.sent;
              // TODO
              image.name = layer.name;
              width = typeData.width || image.width;
              height = typeData.height || image.height;
              setupCanvas(canvas, function (ctx) {
                if (repeat && repeat !== "no-repeat") {
                  var pattern = ctx.createPattern(image, repeat);
                  ctx.fillStyle = pattern;
                  ctx.fillRect(x, y, canvas.width, canvas.height);
                } else {
                  if (borderRadius) {
                    roundedCornersPath(ctx, x, y, width, height, borderRadius);
                  }

                  if (shadow) {
                    setShadow(ctx, layer);
                    ctx.fill();
                  }

                  if (borderRadius) {
                    ctx.clip();
                  }

                  ctx.drawImage(image, x, y, width, height);
                }
              });
              return _context.abrupt("return", canvas);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));
    return _drawImageLayer.apply(this, arguments);
  }

  /**
   * 
   * @param {HTMLCanvasElement} canvas 
   * @param {object} layer 
   */

  function drawRectangularLayer(canvas, layer) {
    var x = layer.x,
        y = layer.y,
        typeData = layer.typeData;
    var width = typeData.width,
        height = typeData.height,
        color = typeData.color,
        shadow = typeData.shadow;
    setupCanvas(canvas, function (ctx) {
      if (shadow) {
        setShadow(ctx, layer);
      }

      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
    });
    return canvas;
  }

  exports.drawTextLayer = drawTextLayer;
  exports.drawImageLayer = drawImageLayer;
  exports.drawRectangularLayer = drawRectangularLayer;

  Object.defineProperty(exports, '__esModule', { value: true });

}));