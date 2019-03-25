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
  function getAbsolutePosition(_ref) {
    var value = _ref.value,
        _ref$size = _ref.size,
        size = _ref$size === void 0 ? 0 : _ref$size,
        scale = _ref.scale,
        unit = _ref.unit;

    switch (unit) {
      case "percentage":
        {
          return scale * (value / 100) - size / 2;
        }

      default:
        {
          return value;
        }
    }
  }
  function getAbsoluteSize(_ref2) {
    var value = _ref2.value,
        scale = _ref2.scale,
        unit = _ref2.unit;

    switch (unit) {
      case "percentage":
        {
          return scale * (value / 100);
        }

      default:
        {
          return value;
        }
    }
  }

  /**
   *
   * @param {HTMLCanvasElement} canvas
   * @param {object} layer
   */

  function drawTextLayer(canvas, layer) {
    var x = layer.x,
        xUnit = layer.xUnit,
        y = layer.y,
        yUnit = layer.yUnit,
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

    var rows = text.split(/\n/).map(function (row) {
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
    }).reduce(function (acc, row) {
      return acc.concat(row);
    }, []);
    setupCanvas(canvas, function (ctx) {
      var xAbs = getAbsolutePosition({
        value: x,
        scale: ctx.canvas.width,
        unit: xUnit
      });
      var yAbs = getAbsolutePosition({
        value: y,
        scale: ctx.canvas.height,
        unit: yUnit
      });

      if (shadow) {
        setShadow(ctx, typeData);
      }

      ctx.textAlign = textAlign;
      ctx.fillStyle = color;
      ctx.font = "".concat(fontSize, "px ").concat(fontFamily);
      rows.forEach(function (row, index) {
        ctx.fillText(row, xAbs, yAbs + (index + 1) * lineHeight);
      });
    });
    return Promise.resolve(canvas);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
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
        xUnit = layer.xUnit,
        y = layer.y,
        yUnit = layer.yUnit,
        typeData = layer.typeData;
    var imageUri = typeData.imageUri,
        imageData = typeData.imageData,
        repeat = typeData.repeat,
        shadow = typeData.shadow,
        widthUnit = typeData.widthUnit,
        heightUnit = typeData.heightUnit,
        _typeData$borderRadiu = typeData.borderRadius,
        borderRadius = _typeData$borderRadiu === void 0 ? 0 : _typeData$borderRadiu,
        _typeData$opacity = typeData.opacity,
        opacity = _typeData$opacity === void 0 ? 100 : _typeData$opacity;
    return getImage(imageData || imageUri).then(function (image) {
      image.name = layer.name;
      var width = typeData.width || image.width;
      var height = typeData.height || image.height;
      var absWidth = typeData.width !== undefined ? getAbsoluteSize({
        value: typeData.width,
        scale: canvas.width,
        unit: widthUnit
      }) : image.width;
      var absHeight = typeData.height !== undefined ? getAbsoluteSize({
        value: typeData.height,
        scale: canvas.height,
        unit: heightUnit
      }) : image.width;
      var rect = getImageRect(image, _objectSpread({}, typeData, {
        width: absWidth,
        height: absHeight
      }));
      setupCanvas(canvas, function (ctx) {
        ctx.globalAlpha = Number(opacity) / 100;
        var absX = getAbsolutePosition({
          value: x,
          size: width,
          scale: ctx.canvas.width,
          unit: xUnit
        });
        var absY = getAbsolutePosition({
          value: y,
          size: height,
          scale: ctx.canvas.height,
          unit: yUnit
        });

        if (repeat && repeat !== "no-repeat") {
          var pattern = ctx.createPattern(image, repeat);
          ctx.fillStyle = pattern;
          ctx.fillRect(absX, absY, canvas.width, canvas.height);
        } else {
          // roundedCornersPath(ctx, x, y, width, height, borderRadius);
          // roundedCornersPath(ctx, absX, absY, width, height, borderRadius);
          roundedCornersPath(ctx, absX, absY, absWidth, absHeight, borderRadius);

          if (shadow) {
            setShadow(ctx, layer.typeData);
            ctx.fill();
          }

          ctx.clip();
          ctx.drawImage(image, absX + rect.x, absY + rect.y, rect.width, rect.height);
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
        xUnit = layer.xUnit,
        y = layer.y,
        yUnit = layer.yUnit,
        typeData = layer.typeData;
    var width = typeData.width,
        widthUnit = typeData.widthUnit,
        height = typeData.height,
        heightUnit = typeData.heightUnit,
        color = typeData.color,
        shadow = typeData.shadow,
        _typeData$borderRadiu = typeData.borderRadius,
        borderRadius = _typeData$borderRadiu === void 0 ? 0 : _typeData$borderRadiu,
        _typeData$opacity = typeData.opacity,
        opacity = _typeData$opacity === void 0 ? 100 : _typeData$opacity;
    setupCanvas(canvas, function (ctx) {
      ctx.globalAlpha = Number(opacity) / 100;

      if (shadow) {
        setShadow(ctx, layer.typeData);
      }

      var absWidth = getAbsoluteSize({
        value: width,
        scale: ctx.canvas.width,
        unit: widthUnit
      });
      var absHeight = getAbsoluteSize({
        value: height,
        scale: ctx.canvas.height,
        unit: heightUnit
      });
      var absX = getAbsolutePosition({
        value: x,
        size: absWidth,
        scale: ctx.canvas.width,
        unit: xUnit
      });
      var absY = getAbsolutePosition({
        value: y,
        size: absHeight,
        scale: ctx.canvas.height,
        unit: yUnit
      });
      roundedCornersPath(ctx, absX, absY, absWidth, absHeight, borderRadius);
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
