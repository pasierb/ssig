(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['ssig-renderer'] = {}));
}(this, function (exports) { 'use strict';

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

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

  function roundedCornersPath(ctx, x, y, width, height, r) {
    var radius = Number(r);
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
        text = _typeData$text === void 0 ? "" : _typeData$text,
        _typeData$maxLineLeng = typeData.maxLineLength,
        maxLineLength = _typeData$maxLineLeng === void 0 ? Infinity : _typeData$maxLineLeng,
        _typeData$textAlign = typeData.textAlign,
        textAlign = _typeData$textAlign === void 0 ? "left" : _typeData$textAlign;

    if (!lineHeight) {
      lineHeight = fontSize;
    }

    var rows = _toConsumableArray(text.split(/\n/).map(function (row) {
      return row.split(/\s/).reduce(function (acc, word) {
        var row = acc.pop() || "";

        if (!row) {
          acc.push(word);
          return acc;
        }

        if (row.length + word.length > maxLineLength) {
          acc.push(row, word);
        } else {
          acc.push([row, word].join(" "));
        }

        return acc;
      }, []);
    }));

    setupCanvas(canvas, function (ctx) {
      if (shadow) {
        setShadow(ctx, typeData);
      }

      ctx.textAlign = textAlign;
      ctx.fillStyle = color;
      ctx.font = "".concat(fontSize, "px ").concat(fontFamily);
      rows.forEach(function (row, index) {
        ctx.fillText(row, x, y + (index + 1) * lineHeight);
      });
    });
    return Promise.resolve(canvas);
  }

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var intrinsicScale_commonJs = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, '__esModule', { value: true });

  function fit(contains) {
  	return function (parentWidth, parentHeight, childWidth, childHeight) {
  		var doRatio = childWidth / childHeight;
  		var cRatio = parentWidth / parentHeight;
  		var width;
  		var height;

  		if (contains ? (doRatio > cRatio) : (doRatio < cRatio)) {
  			width = parentWidth;
  			height = width / doRatio;
  		} else {
  			height = parentHeight;
  			width = height * doRatio;
  		}

  		return {
  			width: width,
  			height: height,
  			x: (parentWidth - width) / 2,
  			y: (parentHeight - height) / 2
  		};
  	};
  }

  var contain = fit(true);
  var cover = fit(false);

  exports.contain = contain;
  exports.cover = cover;
  });

  unwrapExports(intrinsicScale_commonJs);
  var intrinsicScale_commonJs_1 = intrinsicScale_commonJs.contain;
  var intrinsicScale_commonJs_2 = intrinsicScale_commonJs.cover;

  function getImageRect(image, _ref) {
    var size = _ref.size,
        _ref$width = _ref.width,
        width = _ref$width === void 0 ? image.width : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? image.height : _ref$height;

    switch (size) {
      case "cover":
        {
          return intrinsicScale_commonJs_2(width, height, image.width, image.height);
        }

      case "contain":
        {
          return intrinsicScale_commonJs_1(width, height, image.width, image.height);
        }

      default:
        {
          return {
            x: 0,
            y: 0,
            width: image.width,
            height: image.height
          };
        }
    }
  }
  /**
   *
   * @param {HTMLCanvasElement} canvas
   * @param {object} layer
   * @param {Promise<HTMLImageElement>} getImage
   */


  function drawImageLayer(canvas, layer, getImage) {
    var x = layer.x,
        y = layer.y,
        typeData = layer.typeData;
    var imageUri = typeData.imageUri,
        imageData = typeData.imageData,
        repeat = typeData.repeat,
        shadow = typeData.shadow,
        _typeData$borderRadiu = typeData.borderRadius,
        borderRadius = _typeData$borderRadiu === void 0 ? 0 : _typeData$borderRadiu,
        _typeData$opacity = typeData.opacity,
        opacity = _typeData$opacity === void 0 ? 100 : _typeData$opacity;
    return getImage(imageData || imageUri).then(function (image) {
      image.name = layer.name;
      var width = typeData.width || image.width;
      var height = typeData.height || image.height;
      var rect = getImageRect(image, typeData);
      setupCanvas(canvas, function (ctx) {
        ctx.globalAlpha = Number(opacity) / 100;

        if (repeat && repeat !== "no-repeat") {
          var pattern = ctx.createPattern(image, repeat);
          ctx.fillStyle = pattern;
          ctx.fillRect(x, y, canvas.width, canvas.height);
        } else {
          roundedCornersPath(ctx, x, y, width, height, borderRadius);

          if (shadow) {
            setShadow(ctx, layer.typeData);
            ctx.fill();
          }

          ctx.clip();
          ctx.drawImage(image, x + rect.x, y + rect.y, rect.width, rect.height);
        }
      });
      return canvas;
    });
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
        shadow = typeData.shadow,
        borderRadius = typeData.borderRadius,
        _typeData$opacity = typeData.opacity,
        opacity = _typeData$opacity === void 0 ? 100 : _typeData$opacity;
    setupCanvas(canvas, function (ctx) {
      ctx.globalAlpha = Number(opacity) / 100;

      if (shadow) {
        setShadow(ctx, layer.typeData);
      }

      roundedCornersPath(ctx, x, y, width, height, borderRadius || 0);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.clip();
    });
    return Promise.resolve(canvas);
  }

  exports.drawTextLayer = drawTextLayer;
  exports.drawImageLayer = drawImageLayer;
  exports.drawRectangularLayer = drawRectangularLayer;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
