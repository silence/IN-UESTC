module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1561468592197, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapFunction;

function _helperFunctionName() {
  const data = _interopRequireDefault(require("@babel/helper-function-name"));

  _helperFunctionName = function () {
    return data;
  };

  return data;
}

function _template() {
  const data = _interopRequireDefault(require("@babel/template"));

  _template = function () {
    return data;
  };

  return data;
}

function t() {
  const data = _interopRequireWildcard(require("@babel/types"));

  t = function () {
    return data;
  };

  return data;
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildAnonymousExpressionWrapper = _template().default.expression(`
  (function () {
    var REF = FUNCTION;
    return function NAME(PARAMS) {
      return REF.apply(this, arguments);
    };
  })()
`);

const buildNamedExpressionWrapper = _template().default.expression(`
  (function () {
    var REF = FUNCTION;
    function NAME(PARAMS) {
      return REF.apply(this, arguments);
    }
    return NAME;
  })()
`);

const buildDeclarationWrapper = (0, _template().default)(`
  function NAME(PARAMS) { return REF.apply(this, arguments); }
  function REF() {
    REF = FUNCTION;
    return REF.apply(this, arguments);
  }
`);

function classOrObjectMethod(path, callId) {
  const node = path.node;
  const body = node.body;
  const container = t().functionExpression(null, [], t().blockStatement(body.body), true);
  body.body = [t().returnStatement(t().callExpression(t().callExpression(callId, [container]), []))];
  node.async = false;
  node.generator = false;
  path.get("body.body.0.argument.callee.arguments.0").unwrapFunctionEnvironment();
}

function plainFunction(path, callId) {
  const node = path.node;
  const isDeclaration = path.isFunctionDeclaration();
  const functionId = node.id;
  const wrapper = isDeclaration ? buildDeclarationWrapper : functionId ? buildNamedExpressionWrapper : buildAnonymousExpressionWrapper;

  if (path.isArrowFunctionExpression()) {
    path.arrowFunctionToExpression();
  }

  node.id = null;

  if (isDeclaration) {
    node.type = "FunctionExpression";
  }

  const built = t().callExpression(callId, [node]);
  const container = wrapper({
    NAME: functionId || null,
    REF: path.scope.generateUidIdentifier(functionId ? functionId.name : "ref"),
    FUNCTION: built,
    PARAMS: node.params.reduce((acc, param) => {
      acc.done = acc.done || t().isAssignmentPattern(param) || t().isRestElement(param);

      if (!acc.done) {
        acc.params.push(path.scope.generateUidIdentifier("x"));
      }

      return acc;
    }, {
      params: [],
      done: false
    }).params
  });

  if (isDeclaration) {
    path.replaceWith(container[0]);
    path.insertAfter(container[1]);
  } else {
    const retFunction = container.callee.body.body[1].argument;

    if (!functionId) {
      (0, _helperFunctionName().default)({
        node: retFunction,
        parent: path.parent,
        scope: path.scope
      });
    }

    if (!retFunction || retFunction.id || node.params.length) {
      path.replaceWith(container);
    } else {
      path.replaceWith(built);
    }
  }
}

function wrapFunction(path, callId) {
  if (path.isClassMethod() || path.isObjectMethod()) {
    classOrObjectMethod(path, callId);
  } else {
    plainFunction(path, callId);
  }
}
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1561468592197);
})()
//# sourceMappingURL=index.js.map