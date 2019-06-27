module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1561468592132, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = Plugin;
Object.defineProperty(exports, "File", {
  enumerable: true,
  get: function () {
    return _file.default;
  }
});
Object.defineProperty(exports, "buildExternalHelpers", {
  enumerable: true,
  get: function () {
    return _buildExternalHelpers.default;
  }
});
Object.defineProperty(exports, "resolvePlugin", {
  enumerable: true,
  get: function () {
    return _files.resolvePlugin;
  }
});
Object.defineProperty(exports, "resolvePreset", {
  enumerable: true,
  get: function () {
    return _files.resolvePreset;
  }
});
Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function () {
    return _package.version;
  }
});
Object.defineProperty(exports, "getEnv", {
  enumerable: true,
  get: function () {
    return _environment.getEnv;
  }
});
Object.defineProperty(exports, "tokTypes", {
  enumerable: true,
  get: function () {
    return _parser().tokTypes;
  }
});
Object.defineProperty(exports, "traverse", {
  enumerable: true,
  get: function () {
    return _traverse().default;
  }
});
Object.defineProperty(exports, "template", {
  enumerable: true,
  get: function () {
    return _template().default;
  }
});
Object.defineProperty(exports, "createConfigItem", {
  enumerable: true,
  get: function () {
    return _item.createConfigItem;
  }
});
Object.defineProperty(exports, "loadPartialConfig", {
  enumerable: true,
  get: function () {
    return _config.loadPartialConfig;
  }
});
Object.defineProperty(exports, "loadOptions", {
  enumerable: true,
  get: function () {
    return _config.loadOptions;
  }
});
Object.defineProperty(exports, "transform", {
  enumerable: true,
  get: function () {
    return _transform.transform;
  }
});
Object.defineProperty(exports, "transformSync", {
  enumerable: true,
  get: function () {
    return _transform.transformSync;
  }
});
Object.defineProperty(exports, "transformAsync", {
  enumerable: true,
  get: function () {
    return _transform.transformAsync;
  }
});
Object.defineProperty(exports, "transformFile", {
  enumerable: true,
  get: function () {
    return _transformFile.transformFile;
  }
});
Object.defineProperty(exports, "transformFileSync", {
  enumerable: true,
  get: function () {
    return _transformFile.transformFileSync;
  }
});
Object.defineProperty(exports, "transformFileAsync", {
  enumerable: true,
  get: function () {
    return _transformFile.transformFileAsync;
  }
});
Object.defineProperty(exports, "transformFromAst", {
  enumerable: true,
  get: function () {
    return _transformAst.transformFromAst;
  }
});
Object.defineProperty(exports, "transformFromAstSync", {
  enumerable: true,
  get: function () {
    return _transformAst.transformFromAstSync;
  }
});
Object.defineProperty(exports, "transformFromAstAsync", {
  enumerable: true,
  get: function () {
    return _transformAst.transformFromAstAsync;
  }
});
Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function () {
    return _parse.parse;
  }
});
Object.defineProperty(exports, "parseSync", {
  enumerable: true,
  get: function () {
    return _parse.parseSync;
  }
});
Object.defineProperty(exports, "parseAsync", {
  enumerable: true,
  get: function () {
    return _parse.parseAsync;
  }
});
exports.types = exports.OptionManager = exports.DEFAULT_EXTENSIONS = void 0;

var _file = _interopRequireDefault(require("./transformation/file/file"));

var _buildExternalHelpers = _interopRequireDefault(require("./tools/build-external-helpers"));

var _files = require("./config/files");

var _package = require("../package.json");

var _environment = require("./config/helpers/environment");

function _types() {
  const data = _interopRequireWildcard(require("@babel/types"));

  _types = function () {
    return data;
  };

  return data;
}

Object.defineProperty(exports, "types", {
  enumerable: true,
  get: function () {
    return _types();
  }
});

function _parser() {
  const data = require("@babel/parser");

  _parser = function () {
    return data;
  };

  return data;
}

function _traverse() {
  const data = _interopRequireDefault(require("@babel/traverse"));

  _traverse = function () {
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

var _item = require("./config/item");

var _config = require("./config");

var _transform = require("./transform");

var _transformFile = require("./transform-file");

var _transformAst = require("./transform-ast");

var _parse = require("./parse");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_EXTENSIONS = Object.freeze([".js", ".jsx", ".es6", ".es", ".mjs"]);
exports.DEFAULT_EXTENSIONS = DEFAULT_EXTENSIONS;

class OptionManager {
  init(opts) {
    return (0, _config.loadOptions)(opts);
  }

}

exports.OptionManager = OptionManager;

function Plugin(alias) {
  throw new Error(`The (${alias}) Babel 5 plugin is being run with an unsupported Babel version.`);
}
}, function(modId) {var map = {"./transformation/file/file":1561468592133,"./tools/build-external-helpers":1561468592134,"./config/files":1561468592135,"../package.json":1561468592143,"./config/helpers/environment":1561468592144,"./config/item":1561468592145,"./config":1561468592147,"./transform":1561468592157,"./transform-file":1561468592166,"./transform-ast":1561468592167,"./parse":1561468592168}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592133, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function helpers() {
  const data = _interopRequireWildcard(require("@babel/helpers"));

  helpers = function () {
    return data;
  };

  return data;
}

function _traverse() {
  const data = _interopRequireWildcard(require("@babel/traverse"));

  _traverse = function () {
    return data;
  };

  return data;
}

function _codeFrame() {
  const data = require("@babel/code-frame");

  _codeFrame = function () {
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

function _semver() {
  const data = _interopRequireDefault(require("semver"));

  _semver = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const errorVisitor = {
  enter(path, state) {
    const loc = path.node.loc;

    if (loc) {
      state.loc = loc;
      path.stop();
    }
  }

};

class File {
  constructor(options, {
    code,
    ast,
    inputMap
  }) {
    this._map = new Map();
    this.declarations = {};
    this.path = null;
    this.ast = {};
    this.metadata = {};
    this.code = "";
    this.inputMap = null;
    this.hub = {
      file: this,
      getCode: () => this.code,
      getScope: () => this.scope,
      addHelper: this.addHelper.bind(this),
      buildError: this.buildCodeFrameError.bind(this)
    };
    this.opts = options;
    this.code = code;
    this.ast = ast;
    this.inputMap = inputMap;
    this.path = _traverse().NodePath.get({
      hub: this.hub,
      parentPath: null,
      parent: this.ast,
      container: this.ast,
      key: "program"
    }).setContext();
    this.scope = this.path.scope;
  }

  get shebang() {
    const {
      interpreter
    } = this.path.node;
    return interpreter ? interpreter.value : "";
  }

  set shebang(value) {
    if (value) {
      this.path.get("interpreter").replaceWith(t().interpreterDirective(value));
    } else {
      this.path.get("interpreter").remove();
    }
  }

  set(key, val) {
    if (key === "helpersNamespace") {
      throw new Error("Babel 7.0.0-beta.56 has dropped support for the 'helpersNamespace' utility." + "If you are using @babel/plugin-external-helpers you will need to use a newer " + "version than the one you currently have installed. " + "If you have your own implementation, you'll want to explore using 'helperGenerator' " + "alongside 'file.availableHelper()'.");
    }

    this._map.set(key, val);
  }

  get(key) {
    return this._map.get(key);
  }

  has(key) {
    return this._map.has(key);
  }

  getModuleName() {
    const {
      filename,
      filenameRelative = filename,
      moduleId,
      moduleIds = !!moduleId,
      getModuleId,
      sourceRoot: sourceRootTmp,
      moduleRoot = sourceRootTmp,
      sourceRoot = moduleRoot
    } = this.opts;
    if (!moduleIds) return null;

    if (moduleId != null && !getModuleId) {
      return moduleId;
    }

    let moduleName = moduleRoot != null ? moduleRoot + "/" : "";

    if (filenameRelative) {
      const sourceRootReplacer = sourceRoot != null ? new RegExp("^" + sourceRoot + "/?") : "";
      moduleName += filenameRelative.replace(sourceRootReplacer, "").replace(/\.(\w*?)$/, "");
    }

    moduleName = moduleName.replace(/\\/g, "/");

    if (getModuleId) {
      return getModuleId(moduleName) || moduleName;
    } else {
      return moduleName;
    }
  }

  addImport() {
    throw new Error("This API has been removed. If you're looking for this " + "functionality in Babel 7, you should import the " + "'@babel/helper-module-imports' module and use the functions exposed " + " from that module, such as 'addNamed' or 'addDefault'.");
  }

  availableHelper(name, versionRange) {
    let minVersion;

    try {
      minVersion = helpers().minVersion(name);
    } catch (err) {
      if (err.code !== "BABEL_HELPER_UNKNOWN") throw err;
      return false;
    }

    if (typeof versionRange !== "string") return true;
    if (_semver().default.valid(versionRange)) versionRange = `^${versionRange}`;
    return !_semver().default.intersects(`<${minVersion}`, versionRange) && !_semver().default.intersects(`>=8.0.0`, versionRange);
  }

  addHelper(name) {
    const declar = this.declarations[name];
    if (declar) return t().cloneNode(declar);
    const generator = this.get("helperGenerator");

    if (generator) {
      const res = generator(name);
      if (res) return res;
    }

    const uid = this.declarations[name] = this.scope.generateUidIdentifier(name);
    const dependencies = {};

    for (const dep of helpers().getDependencies(name)) {
      dependencies[dep] = this.addHelper(dep);
    }

    const {
      nodes,
      globals
    } = helpers().get(name, dep => dependencies[dep], uid, Object.keys(this.scope.getAllBindings()));
    globals.forEach(name => {
      if (this.path.scope.hasBinding(name, true)) {
        this.path.scope.rename(name);
      }
    });
    nodes.forEach(node => {
      node._compact = true;
    });
    this.path.unshiftContainer("body", nodes);
    this.path.get("body").forEach(path => {
      if (nodes.indexOf(path.node) === -1) return;
      if (path.isVariableDeclaration()) this.scope.registerDeclaration(path);
    });
    return uid;
  }

  addTemplateObject() {
    throw new Error("This function has been moved into the template literal transform itself.");
  }

  buildCodeFrameError(node, msg, Error = SyntaxError) {
    let loc = node && (node.loc || node._loc);
    msg = `${this.opts.filename}: ${msg}`;

    if (!loc && node) {
      const state = {
        loc: null
      };
      (0, _traverse().default)(node, errorVisitor, this.scope, state);
      loc = state.loc;
      let txt = "This is an error on an internal node. Probably an internal error.";
      if (loc) txt += " Location has been estimated.";
      msg += ` (${txt})`;
    }

    if (loc) {
      const {
        highlightCode = true
      } = this.opts;
      msg += "\n" + (0, _codeFrame().codeFrameColumns)(this.code, {
        start: {
          line: loc.start.line,
          column: loc.start.column + 1
        }
      }, {
        highlightCode
      });
    }

    return new Error(msg);
  }

}

exports.default = File;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592134, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function helpers() {
  const data = _interopRequireWildcard(require("@babel/helpers"));

  helpers = function () {
    return data;
  };

  return data;
}

function _generator() {
  const data = _interopRequireDefault(require("@babel/generator"));

  _generator = function () {
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const buildUmdWrapper = replacements => _template().default`
    (function (root, factory) {
      if (typeof define === "function" && define.amd) {
        define(AMD_ARGUMENTS, factory);
      } else if (typeof exports === "object") {
        factory(COMMON_ARGUMENTS);
      } else {
        factory(BROWSER_ARGUMENTS);
      }
    })(UMD_ROOT, function (FACTORY_PARAMETERS) {
      FACTORY_BODY
    });
  `(replacements);

function buildGlobal(whitelist) {
  const namespace = t().identifier("babelHelpers");
  const body = [];
  const container = t().functionExpression(null, [t().identifier("global")], t().blockStatement(body));
  const tree = t().program([t().expressionStatement(t().callExpression(container, [t().conditionalExpression(t().binaryExpression("===", t().unaryExpression("typeof", t().identifier("global")), t().stringLiteral("undefined")), t().identifier("self"), t().identifier("global"))]))]);
  body.push(t().variableDeclaration("var", [t().variableDeclarator(namespace, t().assignmentExpression("=", t().memberExpression(t().identifier("global"), namespace), t().objectExpression([])))]));
  buildHelpers(body, namespace, whitelist);
  return tree;
}

function buildModule(whitelist) {
  const body = [];
  const refs = buildHelpers(body, null, whitelist);
  body.unshift(t().exportNamedDeclaration(null, Object.keys(refs).map(name => {
    return t().exportSpecifier(t().cloneNode(refs[name]), t().identifier(name));
  })));
  return t().program(body, [], "module");
}

function buildUmd(whitelist) {
  const namespace = t().identifier("babelHelpers");
  const body = [];
  body.push(t().variableDeclaration("var", [t().variableDeclarator(namespace, t().identifier("global"))]));
  buildHelpers(body, namespace, whitelist);
  return t().program([buildUmdWrapper({
    FACTORY_PARAMETERS: t().identifier("global"),
    BROWSER_ARGUMENTS: t().assignmentExpression("=", t().memberExpression(t().identifier("root"), namespace), t().objectExpression([])),
    COMMON_ARGUMENTS: t().identifier("exports"),
    AMD_ARGUMENTS: t().arrayExpression([t().stringLiteral("exports")]),
    FACTORY_BODY: body,
    UMD_ROOT: t().identifier("this")
  })]);
}

function buildVar(whitelist) {
  const namespace = t().identifier("babelHelpers");
  const body = [];
  body.push(t().variableDeclaration("var", [t().variableDeclarator(namespace, t().objectExpression([]))]));
  const tree = t().program(body);
  buildHelpers(body, namespace, whitelist);
  body.push(t().expressionStatement(namespace));
  return tree;
}

function buildHelpers(body, namespace, whitelist) {
  const getHelperReference = name => {
    return namespace ? t().memberExpression(namespace, t().identifier(name)) : t().identifier(`_${name}`);
  };

  const refs = {};
  helpers().list.forEach(function (name) {
    if (whitelist && whitelist.indexOf(name) < 0) return;
    const ref = refs[name] = getHelperReference(name);
    const {
      nodes
    } = helpers().get(name, getHelperReference, ref);
    body.push(...nodes);
  });
  return refs;
}

function _default(whitelist, outputType = "global") {
  let tree;
  const build = {
    global: buildGlobal,
    module: buildModule,
    umd: buildUmd,
    var: buildVar
  }[outputType];

  if (build) {
    tree = build(whitelist);
  } else {
    throw new Error(`Unsupported output type ${outputType}`);
  }

  return (0, _generator().default)(tree).code;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592135, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "findPackageData", {
  enumerable: true,
  get: function () {
    return _package.findPackageData;
  }
});
Object.defineProperty(exports, "findConfigUpwards", {
  enumerable: true,
  get: function () {
    return _configuration.findConfigUpwards;
  }
});
Object.defineProperty(exports, "findRelativeConfig", {
  enumerable: true,
  get: function () {
    return _configuration.findRelativeConfig;
  }
});
Object.defineProperty(exports, "findRootConfig", {
  enumerable: true,
  get: function () {
    return _configuration.findRootConfig;
  }
});
Object.defineProperty(exports, "loadConfig", {
  enumerable: true,
  get: function () {
    return _configuration.loadConfig;
  }
});
Object.defineProperty(exports, "resolvePlugin", {
  enumerable: true,
  get: function () {
    return _plugins.resolvePlugin;
  }
});
Object.defineProperty(exports, "resolvePreset", {
  enumerable: true,
  get: function () {
    return _plugins.resolvePreset;
  }
});
Object.defineProperty(exports, "loadPlugin", {
  enumerable: true,
  get: function () {
    return _plugins.loadPlugin;
  }
});
Object.defineProperty(exports, "loadPreset", {
  enumerable: true,
  get: function () {
    return _plugins.loadPreset;
  }
});

var _package = require("./package");

var _configuration = require("./configuration");

var _plugins = require("./plugins");

({});
}, function(modId) { var map = {"./package":1561468592136,"./configuration":1561468592139,"./plugins":1561468592142}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592136, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findPackageData = findPackageData;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PACKAGE_FILENAME = "package.json";

function findPackageData(filepath) {
  let pkg = null;
  const directories = [];
  let isPackage = true;

  let dirname = _path().default.dirname(filepath);

  while (!pkg && _path().default.basename(dirname) !== "node_modules") {
    directories.push(dirname);
    pkg = readConfigPackage(_path().default.join(dirname, PACKAGE_FILENAME));

    const nextLoc = _path().default.dirname(dirname);

    if (dirname === nextLoc) {
      isPackage = false;
      break;
    }

    dirname = nextLoc;
  }

  return {
    filepath,
    directories,
    pkg,
    isPackage
  };
}

const readConfigPackage = (0, _utils.makeStaticFileCache)((filepath, content) => {
  let options;

  try {
    options = JSON.parse(content);
  } catch (err) {
    err.message = `${filepath}: Error while parsing JSON - ${err.message}`;
    throw err;
  }

  if (typeof options !== "object") {
    throw new Error(`${filepath}: Config returned typeof ${typeof options}`);
  }

  if (Array.isArray(options)) {
    throw new Error(`${filepath}: Expected config object but found array`);
  }

  return {
    filepath,
    dirname: _path().default.dirname(filepath),
    options
  };
});
}, function(modId) { var map = {"./utils":1561468592137}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592137, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeStaticFileCache = makeStaticFileCache;

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function () {
    return data;
  };

  return data;
}

var _caching = require("../caching");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeStaticFileCache(fn) {
  return (0, _caching.makeStrongCache)((filepath, cache) => {
    if (cache.invalidate(() => fileMtime(filepath)) === null) {
      cache.forever();
      return null;
    }

    return fn(filepath, _fs().default.readFileSync(filepath, "utf8"));
  });
}

function fileMtime(filepath) {
  try {
    return +_fs().default.statSync(filepath).mtime;
  } catch (e) {
    if (e.code !== "ENOENT" && e.code !== "ENOTDIR") throw e;
  }

  return null;
}
}, function(modId) { var map = {"../caching":1561468592138}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592138, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeStrongCache = makeStrongCache;
exports.makeWeakCache = makeWeakCache;
exports.assertSimpleType = assertSimpleType;

function makeStrongCache(handler) {
  return makeCachedFunction(new Map(), handler);
}

function makeWeakCache(handler) {
  return makeCachedFunction(new WeakMap(), handler);
}

function makeCachedFunction(callCache, handler) {
  return function cachedFunction(arg, data) {
    let cachedValue = callCache.get(arg);

    if (cachedValue) {
      for (const _ref of cachedValue) {
        const {
          value,
          valid
        } = _ref;
        if (valid(data)) return value;
      }
    }

    const cache = new CacheConfigurator(data);
    const value = handler(arg, cache);
    if (!cache.configured()) cache.forever();
    cache.deactivate();

    switch (cache.mode()) {
      case "forever":
        cachedValue = [{
          value,
          valid: () => true
        }];
        callCache.set(arg, cachedValue);
        break;

      case "invalidate":
        cachedValue = [{
          value,
          valid: cache.validator()
        }];
        callCache.set(arg, cachedValue);
        break;

      case "valid":
        if (cachedValue) {
          cachedValue.push({
            value,
            valid: cache.validator()
          });
        } else {
          cachedValue = [{
            value,
            valid: cache.validator()
          }];
          callCache.set(arg, cachedValue);
        }

    }

    return value;
  };
}

class CacheConfigurator {
  constructor(data) {
    this._active = true;
    this._never = false;
    this._forever = false;
    this._invalidate = false;
    this._configured = false;
    this._pairs = [];
    this._data = data;
  }

  simple() {
    return makeSimpleConfigurator(this);
  }

  mode() {
    if (this._never) return "never";
    if (this._forever) return "forever";
    if (this._invalidate) return "invalidate";
    return "valid";
  }

  forever() {
    if (!this._active) {
      throw new Error("Cannot change caching after evaluation has completed.");
    }

    if (this._never) {
      throw new Error("Caching has already been configured with .never()");
    }

    this._forever = true;
    this._configured = true;
  }

  never() {
    if (!this._active) {
      throw new Error("Cannot change caching after evaluation has completed.");
    }

    if (this._forever) {
      throw new Error("Caching has already been configured with .forever()");
    }

    this._never = true;
    this._configured = true;
  }

  using(handler) {
    if (!this._active) {
      throw new Error("Cannot change caching after evaluation has completed.");
    }

    if (this._never || this._forever) {
      throw new Error("Caching has already been configured with .never or .forever()");
    }

    this._configured = true;
    const key = handler(this._data);

    this._pairs.push([key, handler]);

    return key;
  }

  invalidate(handler) {
    if (!this._active) {
      throw new Error("Cannot change caching after evaluation has completed.");
    }

    if (this._never || this._forever) {
      throw new Error("Caching has already been configured with .never or .forever()");
    }

    this._invalidate = true;
    this._configured = true;
    const key = handler(this._data);

    this._pairs.push([key, handler]);

    return key;
  }

  validator() {
    const pairs = this._pairs;
    return data => pairs.every(([key, fn]) => key === fn(data));
  }

  deactivate() {
    this._active = false;
  }

  configured() {
    return this._configured;
  }

}

function makeSimpleConfigurator(cache) {
  function cacheFn(val) {
    if (typeof val === "boolean") {
      if (val) cache.forever();else cache.never();
      return;
    }

    return cache.using(() => assertSimpleType(val()));
  }

  cacheFn.forever = () => cache.forever();

  cacheFn.never = () => cache.never();

  cacheFn.using = cb => cache.using(() => assertSimpleType(cb()));

  cacheFn.invalidate = cb => cache.invalidate(() => assertSimpleType(cb()));

  return cacheFn;
}

function assertSimpleType(value) {
  if (value != null && typeof value !== "string" && typeof value !== "boolean" && typeof value !== "number") {
    throw new Error("Cache keys must be either string, boolean, number, null, or undefined.");
  }

  return value;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592139, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findConfigUpwards = findConfigUpwards;
exports.findRelativeConfig = findRelativeConfig;
exports.findRootConfig = findRootConfig;
exports.loadConfig = loadConfig;

function _debug() {
  const data = _interopRequireDefault(require("debug"));

  _debug = function () {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function () {
    return data;
  };

  return data;
}

function _json() {
  const data = _interopRequireDefault(require("json5"));

  _json = function () {
    return data;
  };

  return data;
}

function _resolve() {
  const data = _interopRequireDefault(require("resolve"));

  _resolve = function () {
    return data;
  };

  return data;
}

var _caching = require("../caching");

var _configApi = _interopRequireDefault(require("../helpers/config-api"));

var _utils = require("./utils");

var _patternToRegex = _interopRequireDefault(require("../pattern-to-regex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug().default)("babel:config:loading:files:configuration");
const BABEL_CONFIG_JS_FILENAME = "babel.config.js";
const BABELRC_FILENAME = ".babelrc";
const BABELRC_JS_FILENAME = ".babelrc.js";
const BABELIGNORE_FILENAME = ".babelignore";

function findConfigUpwards(rootDir) {
  let dirname = rootDir;

  while (true) {
    if (_fs().default.existsSync(_path().default.join(dirname, BABEL_CONFIG_JS_FILENAME))) {
      return dirname;
    }

    const nextDir = _path().default.dirname(dirname);

    if (dirname === nextDir) break;
    dirname = nextDir;
  }

  return null;
}

function findRelativeConfig(packageData, envName, caller) {
  let config = null;
  let ignore = null;

  const dirname = _path().default.dirname(packageData.filepath);

  for (const loc of packageData.directories) {
    if (!config) {
      config = [BABELRC_FILENAME, BABELRC_JS_FILENAME].reduce((previousConfig, name) => {
        const filepath = _path().default.join(loc, name);

        const config = readConfig(filepath, envName, caller);

        if (config && previousConfig) {
          throw new Error(`Multiple configuration files found. Please remove one:\n` + ` - ${_path().default.basename(previousConfig.filepath)}\n` + ` - ${name}\n` + `from ${loc}`);
        }

        return config || previousConfig;
      }, null);
      const pkgConfig = packageData.pkg && packageData.pkg.dirname === loc ? packageToBabelConfig(packageData.pkg) : null;

      if (pkgConfig) {
        if (config) {
          throw new Error(`Multiple configuration files found. Please remove one:\n` + ` - ${_path().default.basename(pkgConfig.filepath)}#babel\n` + ` - ${_path().default.basename(config.filepath)}\n` + `from ${loc}`);
        }

        config = pkgConfig;
      }

      if (config) {
        debug("Found configuration %o from %o.", config.filepath, dirname);
      }
    }

    if (!ignore) {
      const ignoreLoc = _path().default.join(loc, BABELIGNORE_FILENAME);

      ignore = readIgnoreConfig(ignoreLoc);

      if (ignore) {
        debug("Found ignore %o from %o.", ignore.filepath, dirname);
      }
    }
  }

  return {
    config,
    ignore
  };
}

function findRootConfig(dirname, envName, caller) {
  const filepath = _path().default.resolve(dirname, BABEL_CONFIG_JS_FILENAME);

  const conf = readConfig(filepath, envName, caller);

  if (conf) {
    debug("Found root config %o in $o.", BABEL_CONFIG_JS_FILENAME, dirname);
  }

  return conf;
}

function loadConfig(name, dirname, envName, caller) {
  const filepath = _resolve().default.sync(name, {
    basedir: dirname
  });

  const conf = readConfig(filepath, envName, caller);

  if (!conf) {
    throw new Error(`Config file ${filepath} contains no configuration data`);
  }

  debug("Loaded config %o from $o.", name, dirname);
  return conf;
}

function readConfig(filepath, envName, caller) {
  return _path().default.extname(filepath) === ".js" ? readConfigJS(filepath, {
    envName,
    caller
  }) : readConfigJSON5(filepath);
}

const LOADING_CONFIGS = new Set();
const readConfigJS = (0, _caching.makeStrongCache)((filepath, cache) => {
  if (!_fs().default.existsSync(filepath)) {
    cache.forever();
    return null;
  }

  if (LOADING_CONFIGS.has(filepath)) {
    cache.never();
    debug("Auto-ignoring usage of config %o.", filepath);
    return {
      filepath,
      dirname: _path().default.dirname(filepath),
      options: {}
    };
  }

  let options;

  try {
    LOADING_CONFIGS.add(filepath);

    const configModule = require(filepath);

    options = configModule && configModule.__esModule ? configModule.default || undefined : configModule;
  } catch (err) {
    err.message = `${filepath}: Error while loading config - ${err.message}`;
    throw err;
  } finally {
    LOADING_CONFIGS.delete(filepath);
  }

  if (typeof options === "function") {
    options = options((0, _configApi.default)(cache));
    if (!cache.configured()) throwConfigError();
  }

  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new Error(`${filepath}: Configuration should be an exported JavaScript object.`);
  }

  if (typeof options.then === "function") {
    throw new Error(`You appear to be using an async configuration, ` + `which your current version of Babel does not support. ` + `We may add support for this in the future, ` + `but if you're on the most recent version of @babel/core and still ` + `seeing this error, then you'll need to synchronously return your config.`);
  }

  return {
    filepath,
    dirname: _path().default.dirname(filepath),
    options
  };
});
const packageToBabelConfig = (0, _caching.makeWeakCache)(file => {
  const babel = file.options["babel"];
  if (typeof babel === "undefined") return null;

  if (typeof babel !== "object" || Array.isArray(babel) || babel === null) {
    throw new Error(`${file.filepath}: .babel property must be an object`);
  }

  return {
    filepath: file.filepath,
    dirname: file.dirname,
    options: babel
  };
});
const readConfigJSON5 = (0, _utils.makeStaticFileCache)((filepath, content) => {
  let options;

  try {
    options = _json().default.parse(content);
  } catch (err) {
    err.message = `${filepath}: Error while parsing config - ${err.message}`;
    throw err;
  }

  if (!options) throw new Error(`${filepath}: No config detected`);

  if (typeof options !== "object") {
    throw new Error(`${filepath}: Config returned typeof ${typeof options}`);
  }

  if (Array.isArray(options)) {
    throw new Error(`${filepath}: Expected config object but found array`);
  }

  return {
    filepath,
    dirname: _path().default.dirname(filepath),
    options
  };
});
const readIgnoreConfig = (0, _utils.makeStaticFileCache)((filepath, content) => {
  const ignoreDir = _path().default.dirname(filepath);

  const ignorePatterns = content.split("\n").map(line => line.replace(/#(.*?)$/, "").trim()).filter(line => !!line);

  for (const pattern of ignorePatterns) {
    if (pattern[0] === "!") {
      throw new Error(`Negation of file paths is not supported.`);
    }
  }

  return {
    filepath,
    dirname: _path().default.dirname(filepath),
    ignore: ignorePatterns.map(pattern => (0, _patternToRegex.default)(pattern, ignoreDir))
  };
});

function throwConfigError() {
  throw new Error(`\
Caching was left unconfigured. Babel's plugins, presets, and .babelrc.js files can be configured
for various types of caching, using the first param of their handler functions:

module.exports = function(api) {
  // The API exposes the following:

  // Cache the returned value forever and don't call this function again.
  api.cache(true);

  // Don't cache at all. Not recommended because it will be very slow.
  api.cache(false);

  // Cached based on the value of some function. If this function returns a value different from
  // a previously-encountered value, the plugins will re-evaluate.
  var env = api.cache(() => process.env.NODE_ENV);

  // If testing for a specific env, we recommend specifics to avoid instantiating a plugin for
  // any possible NODE_ENV value that might come up during plugin execution.
  var isProd = api.cache(() => process.env.NODE_ENV === "production");

  // .cache(fn) will perform a linear search though instances to find the matching plugin based
  // based on previous instantiated plugins. If you want to recreate the plugin and discard the
  // previous instance whenever something changes, you may use:
  var isProd = api.cache.invalidate(() => process.env.NODE_ENV === "production");

  // Note, we also expose the following more-verbose versions of the above examples:
  api.cache.forever(); // api.cache(true)
  api.cache.never();   // api.cache(false)
  api.cache.using(fn); // api.cache(fn)

  // Return the value that will be cached.
  return { };
};`);
}
}, function(modId) { var map = {"../caching":1561468592138,"../helpers/config-api":1561468592140,"./utils":1561468592137,"../pattern-to-regex":1561468592141}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592140, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeAPI;

function _semver() {
  const data = _interopRequireDefault(require("semver"));

  _semver = function () {
    return data;
  };

  return data;
}

var _ = require("../../");

var _caching = require("../caching");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeAPI(cache) {
  const env = value => cache.using(data => {
    if (typeof value === "undefined") return data.envName;

    if (typeof value === "function") {
      return (0, _caching.assertSimpleType)(value(data.envName));
    }

    if (!Array.isArray(value)) value = [value];
    return value.some(entry => {
      if (typeof entry !== "string") {
        throw new Error("Unexpected non-string value");
      }

      return entry === data.envName;
    });
  });

  const caller = cb => cache.using(data => (0, _caching.assertSimpleType)(cb(data.caller)));

  return {
    version: _.version,
    cache: cache.simple(),
    env,
    async: () => false,
    caller,
    assertVersion,
    tokTypes: undefined
  };
}

function assertVersion(range) {
  if (typeof range === "number") {
    if (!Number.isInteger(range)) {
      throw new Error("Expected string or integer value.");
    }

    range = `^${range}.0.0-0`;
  }

  if (typeof range !== "string") {
    throw new Error("Expected string or integer value.");
  }

  if (_semver().default.satisfies(_.version, range)) return;
  const limit = Error.stackTraceLimit;

  if (typeof limit === "number" && limit < 25) {
    Error.stackTraceLimit = 25;
  }

  const err = new Error(`Requires Babel "${range}", but was loaded with "${_.version}". ` + `If you are sure you have a compatible version of @babel/core, ` + `it is likely that something in your build process is loading the ` + `wrong version. Inspect the stack trace of this error to look for ` + `the first entry that doesn't mention "@babel/core" or "babel-core" ` + `to see what is calling Babel.`);

  if (typeof limit === "number") {
    Error.stackTraceLimit = limit;
  }

  throw Object.assign(err, {
    code: "BABEL_VERSION_UNSUPPORTED",
    version: _.version,
    range
  });
}
}, function(modId) { var map = {"../../":1561468592132,"../caching":1561468592138}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592141, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pathToPattern;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _escapeRegExp() {
  const data = _interopRequireDefault(require("lodash/escapeRegExp"));

  _escapeRegExp = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sep = `\\${_path().default.sep}`;
const endSep = `(?:${sep}|$)`;
const substitution = `[^${sep}]+`;
const starPat = `(?:${substitution}${sep})`;
const starPatLast = `(?:${substitution}${endSep})`;
const starStarPat = `${starPat}*?`;
const starStarPatLast = `${starPat}*?${starPatLast}?`;

function pathToPattern(pattern, dirname) {
  const parts = _path().default.resolve(dirname, pattern).split(_path().default.sep);

  return new RegExp(["^", ...parts.map((part, i) => {
    const last = i === parts.length - 1;
    if (part === "**") return last ? starStarPatLast : starStarPat;
    if (part === "*") return last ? starPatLast : starPat;

    if (part.indexOf("*.") === 0) {
      return substitution + (0, _escapeRegExp().default)(part.slice(1)) + (last ? endSep : sep);
    }

    return (0, _escapeRegExp().default)(part) + (last ? endSep : sep);
  })].join(""));
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592142, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvePlugin = resolvePlugin;
exports.resolvePreset = resolvePreset;
exports.loadPlugin = loadPlugin;
exports.loadPreset = loadPreset;

function _debug() {
  const data = _interopRequireDefault(require("debug"));

  _debug = function () {
    return data;
  };

  return data;
}

function _resolve() {
  const data = _interopRequireDefault(require("resolve"));

  _resolve = function () {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug().default)("babel:config:loading:files:plugins");
const EXACT_RE = /^module:/;
const BABEL_PLUGIN_PREFIX_RE = /^(?!@|module:|[^/]+\/|babel-plugin-)/;
const BABEL_PRESET_PREFIX_RE = /^(?!@|module:|[^/]+\/|babel-preset-)/;
const BABEL_PLUGIN_ORG_RE = /^(@babel\/)(?!plugin-|[^/]+\/)/;
const BABEL_PRESET_ORG_RE = /^(@babel\/)(?!preset-|[^/]+\/)/;
const OTHER_PLUGIN_ORG_RE = /^(@(?!babel\/)[^/]+\/)(?![^/]*babel-plugin(?:-|\/|$)|[^/]+\/)/;
const OTHER_PRESET_ORG_RE = /^(@(?!babel\/)[^/]+\/)(?![^/]*babel-preset(?:-|\/|$)|[^/]+\/)/;
const OTHER_ORG_DEFAULT_RE = /^(@(?!babel$)[^/]+)$/;

function resolvePlugin(name, dirname) {
  return resolveStandardizedName("plugin", name, dirname);
}

function resolvePreset(name, dirname) {
  return resolveStandardizedName("preset", name, dirname);
}

function loadPlugin(name, dirname) {
  const filepath = resolvePlugin(name, dirname);

  if (!filepath) {
    throw new Error(`Plugin ${name} not found relative to ${dirname}`);
  }

  const value = requireModule("plugin", filepath);
  debug("Loaded plugin %o from %o.", name, dirname);
  return {
    filepath,
    value
  };
}

function loadPreset(name, dirname) {
  const filepath = resolvePreset(name, dirname);

  if (!filepath) {
    throw new Error(`Preset ${name} not found relative to ${dirname}`);
  }

  const value = requireModule("preset", filepath);
  debug("Loaded preset %o from %o.", name, dirname);
  return {
    filepath,
    value
  };
}

function standardizeName(type, name) {
  if (_path().default.isAbsolute(name)) return name;
  const isPreset = type === "preset";
  return name.replace(isPreset ? BABEL_PRESET_PREFIX_RE : BABEL_PLUGIN_PREFIX_RE, `babel-${type}-`).replace(isPreset ? BABEL_PRESET_ORG_RE : BABEL_PLUGIN_ORG_RE, `$1${type}-`).replace(isPreset ? OTHER_PRESET_ORG_RE : OTHER_PLUGIN_ORG_RE, `$1babel-${type}-`).replace(OTHER_ORG_DEFAULT_RE, `$1/babel-${type}`).replace(EXACT_RE, "");
}

function resolveStandardizedName(type, name, dirname = process.cwd()) {
  const standardizedName = standardizeName(type, name);

  try {
    return _resolve().default.sync(standardizedName, {
      basedir: dirname
    });
  } catch (e) {
    if (e.code !== "MODULE_NOT_FOUND") throw e;

    if (standardizedName !== name) {
      let resolvedOriginal = false;

      try {
        _resolve().default.sync(name, {
          basedir: dirname
        });

        resolvedOriginal = true;
      } catch (e2) {}

      if (resolvedOriginal) {
        e.message += `\n- If you want to resolve "${name}", use "module:${name}"`;
      }
    }

    let resolvedBabel = false;

    try {
      _resolve().default.sync(standardizeName(type, "@babel/" + name), {
        basedir: dirname
      });

      resolvedBabel = true;
    } catch (e2) {}

    if (resolvedBabel) {
      e.message += `\n- Did you mean "@babel/${name}"?`;
    }

    let resolvedOppositeType = false;
    const oppositeType = type === "preset" ? "plugin" : "preset";

    try {
      _resolve().default.sync(standardizeName(oppositeType, name), {
        basedir: dirname
      });

      resolvedOppositeType = true;
    } catch (e2) {}

    if (resolvedOppositeType) {
      e.message += `\n- Did you accidentally pass a ${oppositeType} as a ${type}?`;
    }

    throw e;
  }
}

const LOADING_MODULES = new Set();

function requireModule(type, name) {
  if (LOADING_MODULES.has(name)) {
    throw new Error(`Reentrant ${type} detected trying to load "${name}". This module is not ignored ` + "and is trying to load itself while compiling itself, leading to a dependency cycle. " + 'We recommend adding it to your "ignore" list in your babelrc, or to a .babelignore.');
  }

  try {
    LOADING_MODULES.add(name);
    return require(name);
  } finally {
    LOADING_MODULES.delete(name);
  }
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592143, function(require, module, exports) {
module.exports = {
  "name": "@babel/core",
  "version": "7.4.5",
  "description": "Babel compiler core.",
  "main": "lib/index.js",
  "author": "Sebastian McKenzie <sebmck@gmail.com>",
  "homepage": "https://babeljs.io/",
  "license": "MIT",
  "publishConfig": {
    "access": "public"
  },
  "repository": "https://github.com/babel/babel/tree/master/packages/babel-core",
  "keywords": [
    "6to5",
    "babel",
    "classes",
    "const",
    "es6",
    "harmony",
    "let",
    "modules",
    "transpile",
    "transpiler",
    "var",
    "babel-core",
    "compiler"
  ],
  "engines": {
    "node": ">=6.9.0"
  },
  "browser": {
    "./lib/config/files/index.js": "./lib/config/files/index-browser.js",
    "./lib/transform-file.js": "./lib/transform-file-browser.js"
  },
  "dependencies": {
    "@babel/code-frame": "^7.0.0",
    "@babel/generator": "^7.4.4",
    "@babel/helpers": "^7.4.4",
    "@babel/parser": "^7.4.5",
    "@babel/template": "^7.4.4",
    "@babel/traverse": "^7.4.5",
    "@babel/types": "^7.4.4",
    "convert-source-map": "^1.1.0",
    "debug": "^4.1.0",
    "json5": "^2.1.0",
    "lodash": "^4.17.11",
    "resolve": "^1.3.2",
    "semver": "^5.4.1",
    "source-map": "^0.5.0"
  },
  "devDependencies": {
    "@babel/helper-transform-fixture-test-runner": "^7.4.4",
    "@babel/register": "^7.4.4"
  },
  "gitHead": "33ab4f166117e2380de3955a0842985f578b01b8"
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592144, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEnv = getEnv;

function getEnv(defaultValue = "development") {
  return process.env.BABEL_ENV || process.env.NODE_ENV || defaultValue;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592145, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createItemFromDescriptor = createItemFromDescriptor;
exports.createConfigItem = createConfigItem;
exports.getItemDescriptor = getItemDescriptor;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

var _configDescriptors = require("./config-descriptors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createItemFromDescriptor(desc) {
  return new ConfigItem(desc);
}

function createConfigItem(value, {
  dirname = ".",
  type
} = {}) {
  const descriptor = (0, _configDescriptors.createDescriptor)(value, _path().default.resolve(dirname), {
    type,
    alias: "programmatic item"
  });
  return createItemFromDescriptor(descriptor);
}

function getItemDescriptor(item) {
  if (item instanceof ConfigItem) {
    return item._descriptor;
  }

  return undefined;
}

class ConfigItem {
  constructor(descriptor) {
    this._descriptor = descriptor;
    Object.defineProperty(this, "_descriptor", {
      enumerable: false
    });
    this.value = this._descriptor.value;
    this.options = this._descriptor.options;
    this.dirname = this._descriptor.dirname;
    this.name = this._descriptor.name;
    this.file = this._descriptor.file ? {
      request: this._descriptor.file.request,
      resolved: this._descriptor.file.resolved
    } : undefined;
    Object.freeze(this);
  }

}

Object.freeze(ConfigItem.prototype);
}, function(modId) { var map = {"./config-descriptors":1561468592146}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592146, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCachedDescriptors = createCachedDescriptors;
exports.createUncachedDescriptors = createUncachedDescriptors;
exports.createDescriptor = createDescriptor;

var _files = require("./files");

var _item = require("./item");

var _caching = require("./caching");

function isEqualDescriptor(a, b) {
  return a.name === b.name && a.value === b.value && a.options === b.options && a.dirname === b.dirname && a.alias === b.alias && a.ownPass === b.ownPass && (a.file && a.file.request) === (b.file && b.file.request) && (a.file && a.file.resolved) === (b.file && b.file.resolved);
}

function createCachedDescriptors(dirname, options, alias) {
  const {
    plugins,
    presets,
    passPerPreset
  } = options;
  return {
    options,
    plugins: plugins ? () => createCachedPluginDescriptors(plugins, dirname)(alias) : () => [],
    presets: presets ? () => createCachedPresetDescriptors(presets, dirname)(alias)(!!passPerPreset) : () => []
  };
}

function createUncachedDescriptors(dirname, options, alias) {
  let plugins;
  let presets;
  return {
    options,
    plugins: () => {
      if (!plugins) {
        plugins = createPluginDescriptors(options.plugins || [], dirname, alias);
      }

      return plugins;
    },
    presets: () => {
      if (!presets) {
        presets = createPresetDescriptors(options.presets || [], dirname, alias, !!options.passPerPreset);
      }

      return presets;
    }
  };
}

const PRESET_DESCRIPTOR_CACHE = new WeakMap();
const createCachedPresetDescriptors = (0, _caching.makeWeakCache)((items, cache) => {
  const dirname = cache.using(dir => dir);
  return (0, _caching.makeStrongCache)(alias => (0, _caching.makeStrongCache)(passPerPreset => createPresetDescriptors(items, dirname, alias, passPerPreset).map(desc => loadCachedDescriptor(PRESET_DESCRIPTOR_CACHE, desc))));
});
const PLUGIN_DESCRIPTOR_CACHE = new WeakMap();
const createCachedPluginDescriptors = (0, _caching.makeWeakCache)((items, cache) => {
  const dirname = cache.using(dir => dir);
  return (0, _caching.makeStrongCache)(alias => createPluginDescriptors(items, dirname, alias).map(desc => loadCachedDescriptor(PLUGIN_DESCRIPTOR_CACHE, desc)));
});
const DEFAULT_OPTIONS = {};

function loadCachedDescriptor(cache, desc) {
  const {
    value,
    options = DEFAULT_OPTIONS
  } = desc;
  if (options === false) return desc;
  let cacheByOptions = cache.get(value);

  if (!cacheByOptions) {
    cacheByOptions = new WeakMap();
    cache.set(value, cacheByOptions);
  }

  let possibilities = cacheByOptions.get(options);

  if (!possibilities) {
    possibilities = [];
    cacheByOptions.set(options, possibilities);
  }

  if (possibilities.indexOf(desc) === -1) {
    const matches = possibilities.filter(possibility => isEqualDescriptor(possibility, desc));

    if (matches.length > 0) {
      return matches[0];
    }

    possibilities.push(desc);
  }

  return desc;
}

function createPresetDescriptors(items, dirname, alias, passPerPreset) {
  return createDescriptors("preset", items, dirname, alias, passPerPreset);
}

function createPluginDescriptors(items, dirname, alias) {
  return createDescriptors("plugin", items, dirname, alias);
}

function createDescriptors(type, items, dirname, alias, ownPass) {
  const descriptors = items.map((item, index) => createDescriptor(item, dirname, {
    type,
    alias: `${alias}$${index}`,
    ownPass: !!ownPass
  }));
  assertNoDuplicates(descriptors);
  return descriptors;
}

function createDescriptor(pair, dirname, {
  type,
  alias,
  ownPass
}) {
  const desc = (0, _item.getItemDescriptor)(pair);

  if (desc) {
    return desc;
  }

  let name;
  let options;
  let value = pair;

  if (Array.isArray(value)) {
    if (value.length === 3) {
      [value, options, name] = value;
    } else {
      [value, options] = value;
    }
  }

  let file = undefined;
  let filepath = null;

  if (typeof value === "string") {
    if (typeof type !== "string") {
      throw new Error("To resolve a string-based item, the type of item must be given");
    }

    const resolver = type === "plugin" ? _files.loadPlugin : _files.loadPreset;
    const request = value;
    ({
      filepath,
      value
    } = resolver(value, dirname));
    file = {
      request,
      resolved: filepath
    };
  }

  if (!value) {
    throw new Error(`Unexpected falsy value: ${String(value)}`);
  }

  if (typeof value === "object" && value.__esModule) {
    if (value.default) {
      value = value.default;
    } else {
      throw new Error("Must export a default export when using ES6 modules.");
    }
  }

  if (typeof value !== "object" && typeof value !== "function") {
    throw new Error(`Unsupported format: ${typeof value}. Expected an object or a function.`);
  }

  if (filepath !== null && typeof value === "object" && value) {
    throw new Error(`Plugin/Preset files are not allowed to export objects, only functions. In ${filepath}`);
  }

  return {
    name,
    alias: filepath || alias,
    value,
    options,
    dirname,
    ownPass,
    file
  };
}

function assertNoDuplicates(items) {
  const map = new Map();

  for (const item of items) {
    if (typeof item.value !== "function") continue;
    let nameMap = map.get(item.value);

    if (!nameMap) {
      nameMap = new Set();
      map.set(item.value, nameMap);
    }

    if (nameMap.has(item.name)) {
      throw new Error([`Duplicate plugin/preset detected.`, `If you'd like to use two separate instances of a plugin,`, `they need separate names, e.g.`, ``, `  plugins: [`, `    ['some-plugin', {}],`, `    ['some-plugin', {}, 'some unique name'],`, `  ]`].join("\n"));
    }

    nameMap.add(item.name);
  }
}
}, function(modId) { var map = {"./files":1561468592135,"./item":1561468592145,"./caching":1561468592138}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592147, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadOptions = loadOptions;
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _full.default;
  }
});
Object.defineProperty(exports, "loadPartialConfig", {
  enumerable: true,
  get: function () {
    return _partial.loadPartialConfig;
  }
});

var _full = _interopRequireDefault(require("./full"));

var _partial = require("./partial");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadOptions(opts) {
  const config = (0, _full.default)(opts);
  return config ? config.options : null;
}
}, function(modId) { var map = {"./full":1561468592148,"./partial":1561468592156}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592148, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadFullConfig;

var _util = require("./util");

var context = _interopRequireWildcard(require("../index"));

var _plugin = _interopRequireDefault(require("./plugin"));

var _item = require("./item");

var _configChain = require("./config-chain");

function _traverse() {
  const data = _interopRequireDefault(require("@babel/traverse"));

  _traverse = function () {
    return data;
  };

  return data;
}

var _caching = require("./caching");

var _options = require("./validation/options");

var _plugins = require("./validation/plugins");

var _configApi = _interopRequireDefault(require("./helpers/config-api"));

var _partial = _interopRequireDefault(require("./partial"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function loadFullConfig(inputOpts) {
  const result = (0, _partial.default)(inputOpts);

  if (!result) {
    return null;
  }

  const {
    options,
    context
  } = result;
  const optionDefaults = {};
  const passes = [[]];

  try {
    const {
      plugins,
      presets
    } = options;

    if (!plugins || !presets) {
      throw new Error("Assertion failure - plugins and presets exist");
    }

    const ignored = function recurseDescriptors(config, pass) {
      const plugins = config.plugins.reduce((acc, descriptor) => {
        if (descriptor.options !== false) {
          acc.push(loadPluginDescriptor(descriptor, context));
        }

        return acc;
      }, []);
      const presets = config.presets.reduce((acc, descriptor) => {
        if (descriptor.options !== false) {
          acc.push({
            preset: loadPresetDescriptor(descriptor, context),
            pass: descriptor.ownPass ? [] : pass
          });
        }

        return acc;
      }, []);

      if (presets.length > 0) {
        passes.splice(1, 0, ...presets.map(o => o.pass).filter(p => p !== pass));

        for (const _ref of presets) {
          const {
            preset,
            pass
          } = _ref;
          if (!preset) return true;
          const ignored = recurseDescriptors({
            plugins: preset.plugins,
            presets: preset.presets
          }, pass);
          if (ignored) return true;
          preset.options.forEach(opts => {
            (0, _util.mergeOptions)(optionDefaults, opts);
          });
        }
      }

      if (plugins.length > 0) {
        pass.unshift(...plugins);
      }
    }({
      plugins: plugins.map(item => {
        const desc = (0, _item.getItemDescriptor)(item);

        if (!desc) {
          throw new Error("Assertion failure - must be config item");
        }

        return desc;
      }),
      presets: presets.map(item => {
        const desc = (0, _item.getItemDescriptor)(item);

        if (!desc) {
          throw new Error("Assertion failure - must be config item");
        }

        return desc;
      })
    }, passes[0]);

    if (ignored) return null;
  } catch (e) {
    if (!/^\[BABEL\]/.test(e.message)) {
      e.message = `[BABEL] ${context.filename || "unknown"}: ${e.message}`;
    }

    throw e;
  }

  const opts = optionDefaults;
  (0, _util.mergeOptions)(opts, options);
  opts.plugins = passes[0];
  opts.presets = passes.slice(1).filter(plugins => plugins.length > 0).map(plugins => ({
    plugins
  }));
  opts.passPerPreset = opts.presets.length > 0;
  return {
    options: opts,
    passes: passes
  };
}

const loadDescriptor = (0, _caching.makeWeakCache)(({
  value,
  options,
  dirname,
  alias
}, cache) => {
  if (options === false) throw new Error("Assertion failure");
  options = options || {};
  let item = value;

  if (typeof value === "function") {
    const api = Object.assign({}, context, (0, _configApi.default)(cache));

    try {
      item = value(api, options, dirname);
    } catch (e) {
      if (alias) {
        e.message += ` (While processing: ${JSON.stringify(alias)})`;
      }

      throw e;
    }
  }

  if (!item || typeof item !== "object") {
    throw new Error("Plugin/Preset did not return an object.");
  }

  if (typeof item.then === "function") {
    throw new Error(`You appear to be using an async plugin, ` + `which your current version of Babel does not support. ` + `If you're using a published plugin, ` + `you may need to upgrade your @babel/core version.`);
  }

  return {
    value: item,
    options,
    dirname,
    alias
  };
});

function loadPluginDescriptor(descriptor, context) {
  if (descriptor.value instanceof _plugin.default) {
    if (descriptor.options) {
      throw new Error("Passed options to an existing Plugin instance will not work.");
    }

    return descriptor.value;
  }

  return instantiatePlugin(loadDescriptor(descriptor, context), context);
}

const instantiatePlugin = (0, _caching.makeWeakCache)(({
  value,
  options,
  dirname,
  alias
}, cache) => {
  const pluginObj = (0, _plugins.validatePluginObject)(value);
  const plugin = Object.assign({}, pluginObj);

  if (plugin.visitor) {
    plugin.visitor = _traverse().default.explode(Object.assign({}, plugin.visitor));
  }

  if (plugin.inherits) {
    const inheritsDescriptor = {
      name: undefined,
      alias: `${alias}$inherits`,
      value: plugin.inherits,
      options,
      dirname
    };
    const inherits = cache.invalidate(data => loadPluginDescriptor(inheritsDescriptor, data));
    plugin.pre = chain(inherits.pre, plugin.pre);
    plugin.post = chain(inherits.post, plugin.post);
    plugin.manipulateOptions = chain(inherits.manipulateOptions, plugin.manipulateOptions);
    plugin.visitor = _traverse().default.visitors.merge([inherits.visitor || {}, plugin.visitor || {}]);
  }

  return new _plugin.default(plugin, options, alias);
});

const loadPresetDescriptor = (descriptor, context) => {
  return (0, _configChain.buildPresetChain)(instantiatePreset(loadDescriptor(descriptor, context)), context);
};

const instantiatePreset = (0, _caching.makeWeakCache)(({
  value,
  dirname,
  alias
}) => {
  return {
    options: (0, _options.validate)("preset", value),
    alias,
    dirname
  };
});

function chain(a, b) {
  const fns = [a, b].filter(Boolean);
  if (fns.length <= 1) return fns[0];
  return function (...args) {
    for (const fn of fns) {
      fn.apply(this, args);
    }
  };
}
}, function(modId) { var map = {"./util":1561468592149,"../index":1561468592132,"./plugin":1561468592150,"./item":1561468592145,"./config-chain":1561468592151,"./caching":1561468592138,"./validation/options":1561468592152,"./validation/plugins":1561468592155,"./helpers/config-api":1561468592140,"./partial":1561468592156}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592149, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeOptions = mergeOptions;

function mergeOptions(target, source) {
  for (const k of Object.keys(source)) {
    if (k === "parserOpts" && source.parserOpts) {
      const parserOpts = source.parserOpts;
      const targetObj = target.parserOpts = target.parserOpts || {};
      mergeDefaultFields(targetObj, parserOpts);
    } else if (k === "generatorOpts" && source.generatorOpts) {
      const generatorOpts = source.generatorOpts;
      const targetObj = target.generatorOpts = target.generatorOpts || {};
      mergeDefaultFields(targetObj, generatorOpts);
    } else {
      const val = source[k];
      if (val !== undefined) target[k] = val;
    }
  }
}

function mergeDefaultFields(target, source) {
  for (const k of Object.keys(source)) {
    const val = source[k];
    if (val !== undefined) target[k] = val;
  }
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592150, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Plugin {
  constructor(plugin, options, key) {
    this.key = plugin.name || key;
    this.manipulateOptions = plugin.manipulateOptions;
    this.post = plugin.post;
    this.pre = plugin.pre;
    this.visitor = plugin.visitor || {};
    this.parserOverride = plugin.parserOverride;
    this.generatorOverride = plugin.generatorOverride;
    this.options = options;
  }

}

exports.default = Plugin;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592151, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildPresetChain = buildPresetChain;
exports.buildRootChain = buildRootChain;
exports.buildPresetChainWalker = void 0;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _debug() {
  const data = _interopRequireDefault(require("debug"));

  _debug = function () {
    return data;
  };

  return data;
}

var _options = require("./validation/options");

var _patternToRegex = _interopRequireDefault(require("./pattern-to-regex"));

var _files = require("./files");

var _caching = require("./caching");

var _configDescriptors = require("./config-descriptors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug().default)("babel:config:config-chain");

function buildPresetChain(arg, context) {
  const chain = buildPresetChainWalker(arg, context);
  if (!chain) return null;
  return {
    plugins: dedupDescriptors(chain.plugins),
    presets: dedupDescriptors(chain.presets),
    options: chain.options.map(o => normalizeOptions(o))
  };
}

const buildPresetChainWalker = makeChainWalker({
  init: arg => arg,
  root: preset => loadPresetDescriptors(preset),
  env: (preset, envName) => loadPresetEnvDescriptors(preset)(envName),
  overrides: (preset, index) => loadPresetOverridesDescriptors(preset)(index),
  overridesEnv: (preset, index, envName) => loadPresetOverridesEnvDescriptors(preset)(index)(envName)
});
exports.buildPresetChainWalker = buildPresetChainWalker;
const loadPresetDescriptors = (0, _caching.makeWeakCache)(preset => buildRootDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors));
const loadPresetEnvDescriptors = (0, _caching.makeWeakCache)(preset => (0, _caching.makeStrongCache)(envName => buildEnvDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors, envName)));
const loadPresetOverridesDescriptors = (0, _caching.makeWeakCache)(preset => (0, _caching.makeStrongCache)(index => buildOverrideDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors, index)));
const loadPresetOverridesEnvDescriptors = (0, _caching.makeWeakCache)(preset => (0, _caching.makeStrongCache)(index => (0, _caching.makeStrongCache)(envName => buildOverrideEnvDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors, index, envName))));

function buildRootChain(opts, context) {
  const programmaticChain = loadProgrammaticChain({
    options: opts,
    dirname: context.cwd
  }, context);
  if (!programmaticChain) return null;
  let configFile;

  if (typeof opts.configFile === "string") {
    configFile = (0, _files.loadConfig)(opts.configFile, context.cwd, context.envName, context.caller);
  } else if (opts.configFile !== false) {
    configFile = (0, _files.findRootConfig)(context.root, context.envName, context.caller);
  }

  let {
    babelrc,
    babelrcRoots
  } = opts;
  let babelrcRootsDirectory = context.cwd;
  const configFileChain = emptyChain();

  if (configFile) {
    const validatedFile = validateConfigFile(configFile);
    const result = loadFileChain(validatedFile, context);
    if (!result) return null;

    if (babelrc === undefined) {
      babelrc = validatedFile.options.babelrc;
    }

    if (babelrcRoots === undefined) {
      babelrcRootsDirectory = validatedFile.dirname;
      babelrcRoots = validatedFile.options.babelrcRoots;
    }

    mergeChain(configFileChain, result);
  }

  const pkgData = typeof context.filename === "string" ? (0, _files.findPackageData)(context.filename) : null;
  let ignoreFile, babelrcFile;
  const fileChain = emptyChain();

  if ((babelrc === true || babelrc === undefined) && pkgData && babelrcLoadEnabled(context, pkgData, babelrcRoots, babelrcRootsDirectory)) {
    ({
      ignore: ignoreFile,
      config: babelrcFile
    } = (0, _files.findRelativeConfig)(pkgData, context.envName, context.caller));

    if (ignoreFile && shouldIgnore(context, ignoreFile.ignore, null, ignoreFile.dirname)) {
      return null;
    }

    if (babelrcFile) {
      const result = loadFileChain(validateBabelrcFile(babelrcFile), context);
      if (!result) return null;
      mergeChain(fileChain, result);
    }
  }

  const chain = mergeChain(mergeChain(mergeChain(emptyChain(), configFileChain), fileChain), programmaticChain);
  return {
    plugins: dedupDescriptors(chain.plugins),
    presets: dedupDescriptors(chain.presets),
    options: chain.options.map(o => normalizeOptions(o)),
    ignore: ignoreFile || undefined,
    babelrc: babelrcFile || undefined,
    config: configFile || undefined
  };
}

function babelrcLoadEnabled(context, pkgData, babelrcRoots, babelrcRootsDirectory) {
  if (typeof babelrcRoots === "boolean") return babelrcRoots;
  const absoluteRoot = context.root;

  if (babelrcRoots === undefined) {
    return pkgData.directories.indexOf(absoluteRoot) !== -1;
  }

  let babelrcPatterns = babelrcRoots;
  if (!Array.isArray(babelrcPatterns)) babelrcPatterns = [babelrcPatterns];
  babelrcPatterns = babelrcPatterns.map(pat => {
    return typeof pat === "string" ? _path().default.resolve(babelrcRootsDirectory, pat) : pat;
  });

  if (babelrcPatterns.length === 1 && babelrcPatterns[0] === absoluteRoot) {
    return pkgData.directories.indexOf(absoluteRoot) !== -1;
  }

  return babelrcPatterns.some(pat => {
    if (typeof pat === "string") {
      pat = (0, _patternToRegex.default)(pat, babelrcRootsDirectory);
    }

    return pkgData.directories.some(directory => {
      return matchPattern(pat, babelrcRootsDirectory, directory, context);
    });
  });
}

const validateConfigFile = (0, _caching.makeWeakCache)(file => ({
  filepath: file.filepath,
  dirname: file.dirname,
  options: (0, _options.validate)("configfile", file.options)
}));
const validateBabelrcFile = (0, _caching.makeWeakCache)(file => ({
  filepath: file.filepath,
  dirname: file.dirname,
  options: (0, _options.validate)("babelrcfile", file.options)
}));
const validateExtendFile = (0, _caching.makeWeakCache)(file => ({
  filepath: file.filepath,
  dirname: file.dirname,
  options: (0, _options.validate)("extendsfile", file.options)
}));
const loadProgrammaticChain = makeChainWalker({
  root: input => buildRootDescriptors(input, "base", _configDescriptors.createCachedDescriptors),
  env: (input, envName) => buildEnvDescriptors(input, "base", _configDescriptors.createCachedDescriptors, envName),
  overrides: (input, index) => buildOverrideDescriptors(input, "base", _configDescriptors.createCachedDescriptors, index),
  overridesEnv: (input, index, envName) => buildOverrideEnvDescriptors(input, "base", _configDescriptors.createCachedDescriptors, index, envName)
});
const loadFileChain = makeChainWalker({
  root: file => loadFileDescriptors(file),
  env: (file, envName) => loadFileEnvDescriptors(file)(envName),
  overrides: (file, index) => loadFileOverridesDescriptors(file)(index),
  overridesEnv: (file, index, envName) => loadFileOverridesEnvDescriptors(file)(index)(envName)
});
const loadFileDescriptors = (0, _caching.makeWeakCache)(file => buildRootDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors));
const loadFileEnvDescriptors = (0, _caching.makeWeakCache)(file => (0, _caching.makeStrongCache)(envName => buildEnvDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors, envName)));
const loadFileOverridesDescriptors = (0, _caching.makeWeakCache)(file => (0, _caching.makeStrongCache)(index => buildOverrideDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors, index)));
const loadFileOverridesEnvDescriptors = (0, _caching.makeWeakCache)(file => (0, _caching.makeStrongCache)(index => (0, _caching.makeStrongCache)(envName => buildOverrideEnvDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors, index, envName))));

function buildRootDescriptors({
  dirname,
  options
}, alias, descriptors) {
  return descriptors(dirname, options, alias);
}

function buildEnvDescriptors({
  dirname,
  options
}, alias, descriptors, envName) {
  const opts = options.env && options.env[envName];
  return opts ? descriptors(dirname, opts, `${alias}.env["${envName}"]`) : null;
}

function buildOverrideDescriptors({
  dirname,
  options
}, alias, descriptors, index) {
  const opts = options.overrides && options.overrides[index];
  if (!opts) throw new Error("Assertion failure - missing override");
  return descriptors(dirname, opts, `${alias}.overrides[${index}]`);
}

function buildOverrideEnvDescriptors({
  dirname,
  options
}, alias, descriptors, index, envName) {
  const override = options.overrides && options.overrides[index];
  if (!override) throw new Error("Assertion failure - missing override");
  const opts = override.env && override.env[envName];
  return opts ? descriptors(dirname, opts, `${alias}.overrides[${index}].env["${envName}"]`) : null;
}

function makeChainWalker({
  root,
  env,
  overrides,
  overridesEnv
}) {
  return (input, context, files = new Set()) => {
    const {
      dirname
    } = input;
    const flattenedConfigs = [];
    const rootOpts = root(input);

    if (configIsApplicable(rootOpts, dirname, context)) {
      flattenedConfigs.push(rootOpts);
      const envOpts = env(input, context.envName);

      if (envOpts && configIsApplicable(envOpts, dirname, context)) {
        flattenedConfigs.push(envOpts);
      }

      (rootOpts.options.overrides || []).forEach((_, index) => {
        const overrideOps = overrides(input, index);

        if (configIsApplicable(overrideOps, dirname, context)) {
          flattenedConfigs.push(overrideOps);
          const overrideEnvOpts = overridesEnv(input, index, context.envName);

          if (overrideEnvOpts && configIsApplicable(overrideEnvOpts, dirname, context)) {
            flattenedConfigs.push(overrideEnvOpts);
          }
        }
      });
    }

    if (flattenedConfigs.some(({
      options: {
        ignore,
        only
      }
    }) => shouldIgnore(context, ignore, only, dirname))) {
      return null;
    }

    const chain = emptyChain();

    for (const op of flattenedConfigs) {
      if (!mergeExtendsChain(chain, op.options, dirname, context, files)) {
        return null;
      }

      mergeChainOpts(chain, op);
    }

    return chain;
  };
}

function mergeExtendsChain(chain, opts, dirname, context, files) {
  if (opts.extends === undefined) return true;
  const file = (0, _files.loadConfig)(opts.extends, dirname, context.envName, context.caller);

  if (files.has(file)) {
    throw new Error(`Configuration cycle detected loading ${file.filepath}.\n` + `File already loaded following the config chain:\n` + Array.from(files, file => ` - ${file.filepath}`).join("\n"));
  }

  files.add(file);
  const fileChain = loadFileChain(validateExtendFile(file), context, files);
  files.delete(file);
  if (!fileChain) return false;
  mergeChain(chain, fileChain);
  return true;
}

function mergeChain(target, source) {
  target.options.push(...source.options);
  target.plugins.push(...source.plugins);
  target.presets.push(...source.presets);
  return target;
}

function mergeChainOpts(target, {
  options,
  plugins,
  presets
}) {
  target.options.push(options);
  target.plugins.push(...plugins());
  target.presets.push(...presets());
  return target;
}

function emptyChain() {
  return {
    options: [],
    presets: [],
    plugins: []
  };
}

function normalizeOptions(opts) {
  const options = Object.assign({}, opts);
  delete options.extends;
  delete options.env;
  delete options.overrides;
  delete options.plugins;
  delete options.presets;
  delete options.passPerPreset;
  delete options.ignore;
  delete options.only;
  delete options.test;
  delete options.include;
  delete options.exclude;

  if (options.hasOwnProperty("sourceMap")) {
    options.sourceMaps = options.sourceMap;
    delete options.sourceMap;
  }

  return options;
}

function dedupDescriptors(items) {
  const map = new Map();
  const descriptors = [];

  for (const item of items) {
    if (typeof item.value === "function") {
      const fnKey = item.value;
      let nameMap = map.get(fnKey);

      if (!nameMap) {
        nameMap = new Map();
        map.set(fnKey, nameMap);
      }

      let desc = nameMap.get(item.name);

      if (!desc) {
        desc = {
          value: item
        };
        descriptors.push(desc);
        if (!item.ownPass) nameMap.set(item.name, desc);
      } else {
        desc.value = item;
      }
    } else {
      descriptors.push({
        value: item
      });
    }
  }

  return descriptors.reduce((acc, desc) => {
    acc.push(desc.value);
    return acc;
  }, []);
}

function configIsApplicable({
  options
}, dirname, context) {
  return (options.test === undefined || configFieldIsApplicable(context, options.test, dirname)) && (options.include === undefined || configFieldIsApplicable(context, options.include, dirname)) && (options.exclude === undefined || !configFieldIsApplicable(context, options.exclude, dirname));
}

function configFieldIsApplicable(context, test, dirname) {
  const patterns = Array.isArray(test) ? test : [test];
  return matchesPatterns(context, patterns, dirname);
}

function shouldIgnore(context, ignore, only, dirname) {
  if (ignore && matchesPatterns(context, ignore, dirname)) {
    debug("Ignored %o because it matched one of %O from %o", context.filename, ignore, dirname);
    return true;
  }

  if (only && !matchesPatterns(context, only, dirname)) {
    debug("Ignored %o because it failed to match one of %O from %o", context.filename, only, dirname);
    return true;
  }

  return false;
}

function matchesPatterns(context, patterns, dirname) {
  return patterns.some(pattern => matchPattern(pattern, dirname, context.filename, context));
}

function matchPattern(pattern, dirname, pathToTest, context) {
  if (typeof pattern === "function") {
    return !!pattern(pathToTest, {
      dirname,
      envName: context.envName,
      caller: context.caller
    });
  }

  if (typeof pathToTest !== "string") {
    throw new Error(`Configuration contains string/RegExp pattern, but no filename was passed to Babel`);
  }

  if (typeof pattern === "string") {
    pattern = (0, _patternToRegex.default)(pattern, dirname);
  }

  return pattern.test(pathToTest);
}
}, function(modId) { var map = {"./validation/options":1561468592152,"./pattern-to-regex":1561468592141,"./files":1561468592135,"./caching":1561468592138,"./config-descriptors":1561468592146}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592152, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = validate;

var _plugin = _interopRequireDefault(require("../plugin"));

var _removed = _interopRequireDefault(require("./removed"));

var _optionAssertions = require("./option-assertions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ROOT_VALIDATORS = {
  cwd: _optionAssertions.assertString,
  root: _optionAssertions.assertString,
  rootMode: _optionAssertions.assertRootMode,
  configFile: _optionAssertions.assertConfigFileSearch,
  caller: _optionAssertions.assertCallerMetadata,
  filename: _optionAssertions.assertString,
  filenameRelative: _optionAssertions.assertString,
  code: _optionAssertions.assertBoolean,
  ast: _optionAssertions.assertBoolean,
  envName: _optionAssertions.assertString
};
const BABELRC_VALIDATORS = {
  babelrc: _optionAssertions.assertBoolean,
  babelrcRoots: _optionAssertions.assertBabelrcSearch
};
const NONPRESET_VALIDATORS = {
  extends: _optionAssertions.assertString,
  ignore: _optionAssertions.assertIgnoreList,
  only: _optionAssertions.assertIgnoreList
};
const COMMON_VALIDATORS = {
  inputSourceMap: _optionAssertions.assertInputSourceMap,
  presets: _optionAssertions.assertPluginList,
  plugins: _optionAssertions.assertPluginList,
  passPerPreset: _optionAssertions.assertBoolean,
  env: assertEnvSet,
  overrides: assertOverridesList,
  test: _optionAssertions.assertConfigApplicableTest,
  include: _optionAssertions.assertConfigApplicableTest,
  exclude: _optionAssertions.assertConfigApplicableTest,
  retainLines: _optionAssertions.assertBoolean,
  comments: _optionAssertions.assertBoolean,
  shouldPrintComment: _optionAssertions.assertFunction,
  compact: _optionAssertions.assertCompact,
  minified: _optionAssertions.assertBoolean,
  auxiliaryCommentBefore: _optionAssertions.assertString,
  auxiliaryCommentAfter: _optionAssertions.assertString,
  sourceType: _optionAssertions.assertSourceType,
  wrapPluginVisitorMethod: _optionAssertions.assertFunction,
  highlightCode: _optionAssertions.assertBoolean,
  sourceMaps: _optionAssertions.assertSourceMaps,
  sourceMap: _optionAssertions.assertSourceMaps,
  sourceFileName: _optionAssertions.assertString,
  sourceRoot: _optionAssertions.assertString,
  getModuleId: _optionAssertions.assertFunction,
  moduleRoot: _optionAssertions.assertString,
  moduleIds: _optionAssertions.assertBoolean,
  moduleId: _optionAssertions.assertString,
  parserOpts: _optionAssertions.assertObject,
  generatorOpts: _optionAssertions.assertObject
};

function getSource(loc) {
  return loc.type === "root" ? loc.source : getSource(loc.parent);
}

function validate(type, opts) {
  return validateNested({
    type: "root",
    source: type
  }, opts);
}

function validateNested(loc, opts) {
  const type = getSource(loc);
  assertNoDuplicateSourcemap(opts);
  Object.keys(opts).forEach(key => {
    const optLoc = {
      type: "option",
      name: key,
      parent: loc
    };

    if (type === "preset" && NONPRESET_VALIDATORS[key]) {
      throw new Error(`${(0, _optionAssertions.msg)(optLoc)} is not allowed in preset options`);
    }

    if (type !== "arguments" && ROOT_VALIDATORS[key]) {
      throw new Error(`${(0, _optionAssertions.msg)(optLoc)} is only allowed in root programmatic options`);
    }

    if (type !== "arguments" && type !== "configfile" && BABELRC_VALIDATORS[key]) {
      if (type === "babelrcfile" || type === "extendsfile") {
        throw new Error(`${(0, _optionAssertions.msg)(optLoc)} is not allowed in .babelrc or "extends"ed files, only in root programmatic options, ` + `or babel.config.js/config file options`);
      }

      throw new Error(`${(0, _optionAssertions.msg)(optLoc)} is only allowed in root programmatic options, or babel.config.js/config file options`);
    }

    const validator = COMMON_VALIDATORS[key] || NONPRESET_VALIDATORS[key] || BABELRC_VALIDATORS[key] || ROOT_VALIDATORS[key] || throwUnknownError;
    validator(optLoc, opts[key]);
  });
  return opts;
}

function throwUnknownError(loc) {
  const key = loc.name;

  if (_removed.default[key]) {
    const {
      message,
      version = 5
    } = _removed.default[key];
    throw new ReferenceError(`Using removed Babel ${version} option: ${(0, _optionAssertions.msg)(loc)} - ${message}`);
  } else {
    const unknownOptErr = `Unknown option: ${(0, _optionAssertions.msg)(loc)}. Check out https://babeljs.io/docs/en/babel-core/#options for more information about options.`;
    throw new ReferenceError(unknownOptErr);
  }
}

function has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function assertNoDuplicateSourcemap(opts) {
  if (has(opts, "sourceMap") && has(opts, "sourceMaps")) {
    throw new Error(".sourceMap is an alias for .sourceMaps, cannot use both");
  }
}

function assertEnvSet(loc, value) {
  if (loc.parent.type === "env") {
    throw new Error(`${(0, _optionAssertions.msg)(loc)} is not allowed inside of another .env block`);
  }

  const parent = loc.parent;
  const obj = (0, _optionAssertions.assertObject)(loc, value);

  if (obj) {
    for (const envName of Object.keys(obj)) {
      const env = (0, _optionAssertions.assertObject)((0, _optionAssertions.access)(loc, envName), obj[envName]);
      if (!env) continue;
      const envLoc = {
        type: "env",
        name: envName,
        parent
      };
      validateNested(envLoc, env);
    }
  }

  return obj;
}

function assertOverridesList(loc, value) {
  if (loc.parent.type === "env") {
    throw new Error(`${(0, _optionAssertions.msg)(loc)} is not allowed inside an .env block`);
  }

  if (loc.parent.type === "overrides") {
    throw new Error(`${(0, _optionAssertions.msg)(loc)} is not allowed inside an .overrides block`);
  }

  const parent = loc.parent;
  const arr = (0, _optionAssertions.assertArray)(loc, value);

  if (arr) {
    for (const [index, item] of arr.entries()) {
      const objLoc = (0, _optionAssertions.access)(loc, index);
      const env = (0, _optionAssertions.assertObject)(objLoc, item);
      if (!env) throw new Error(`${(0, _optionAssertions.msg)(objLoc)} must be an object`);
      const overridesLoc = {
        type: "overrides",
        index,
        parent
      };
      validateNested(overridesLoc, env);
    }
  }

  return arr;
}
}, function(modId) { var map = {"../plugin":1561468592150,"./removed":1561468592153,"./option-assertions":1561468592154}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592153, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  auxiliaryComment: {
    message: "Use `auxiliaryCommentBefore` or `auxiliaryCommentAfter`"
  },
  blacklist: {
    message: "Put the specific transforms you want in the `plugins` option"
  },
  breakConfig: {
    message: "This is not a necessary option in Babel 6"
  },
  experimental: {
    message: "Put the specific transforms you want in the `plugins` option"
  },
  externalHelpers: {
    message: "Use the `external-helpers` plugin instead. " + "Check out http://babeljs.io/docs/plugins/external-helpers/"
  },
  extra: {
    message: ""
  },
  jsxPragma: {
    message: "use the `pragma` option in the `react-jsx` plugin. " + "Check out http://babeljs.io/docs/plugins/transform-react-jsx/"
  },
  loose: {
    message: "Specify the `loose` option for the relevant plugin you are using " + "or use a preset that sets the option."
  },
  metadataUsedHelpers: {
    message: "Not required anymore as this is enabled by default"
  },
  modules: {
    message: "Use the corresponding module transform plugin in the `plugins` option. " + "Check out http://babeljs.io/docs/plugins/#modules"
  },
  nonStandard: {
    message: "Use the `react-jsx` and `flow-strip-types` plugins to support JSX and Flow. " + "Also check out the react preset http://babeljs.io/docs/plugins/preset-react/"
  },
  optional: {
    message: "Put the specific transforms you want in the `plugins` option"
  },
  sourceMapName: {
    message: "The `sourceMapName` option has been removed because it makes more sense for the " + "tooling that calls Babel to assign `map.file` themselves."
  },
  stage: {
    message: "Check out the corresponding stage-x presets http://babeljs.io/docs/plugins/#presets"
  },
  whitelist: {
    message: "Put the specific transforms you want in the `plugins` option"
  },
  resolveModuleSource: {
    version: 6,
    message: "Use `babel-plugin-module-resolver@3`'s 'resolvePath' options"
  },
  metadata: {
    version: 6,
    message: "Generated plugin metadata is always included in the output result"
  },
  sourceMapTarget: {
    version: 6,
    message: "The `sourceMapTarget` option has been removed because it makes more sense for the tooling " + "that calls Babel to assign `map.file` themselves."
  }
};
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592154, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.msg = msg;
exports.access = access;
exports.assertRootMode = assertRootMode;
exports.assertSourceMaps = assertSourceMaps;
exports.assertCompact = assertCompact;
exports.assertSourceType = assertSourceType;
exports.assertCallerMetadata = assertCallerMetadata;
exports.assertInputSourceMap = assertInputSourceMap;
exports.assertString = assertString;
exports.assertFunction = assertFunction;
exports.assertBoolean = assertBoolean;
exports.assertObject = assertObject;
exports.assertArray = assertArray;
exports.assertIgnoreList = assertIgnoreList;
exports.assertConfigApplicableTest = assertConfigApplicableTest;
exports.assertConfigFileSearch = assertConfigFileSearch;
exports.assertBabelrcSearch = assertBabelrcSearch;
exports.assertPluginList = assertPluginList;

function msg(loc) {
  switch (loc.type) {
    case "root":
      return ``;

    case "env":
      return `${msg(loc.parent)}.env["${loc.name}"]`;

    case "overrides":
      return `${msg(loc.parent)}.overrides[${loc.index}]`;

    case "option":
      return `${msg(loc.parent)}.${loc.name}`;

    case "access":
      return `${msg(loc.parent)}[${JSON.stringify(loc.name)}]`;

    default:
      throw new Error(`Assertion failure: Unknown type ${loc.type}`);
  }
}

function access(loc, name) {
  return {
    type: "access",
    name,
    parent: loc
  };
}

function assertRootMode(loc, value) {
  if (value !== undefined && value !== "root" && value !== "upward" && value !== "upward-optional") {
    throw new Error(`${msg(loc)} must be a "root", "upward", "upward-optional" or undefined`);
  }

  return value;
}

function assertSourceMaps(loc, value) {
  if (value !== undefined && typeof value !== "boolean" && value !== "inline" && value !== "both") {
    throw new Error(`${msg(loc)} must be a boolean, "inline", "both", or undefined`);
  }

  return value;
}

function assertCompact(loc, value) {
  if (value !== undefined && typeof value !== "boolean" && value !== "auto") {
    throw new Error(`${msg(loc)} must be a boolean, "auto", or undefined`);
  }

  return value;
}

function assertSourceType(loc, value) {
  if (value !== undefined && value !== "module" && value !== "script" && value !== "unambiguous") {
    throw new Error(`${msg(loc)} must be "module", "script", "unambiguous", or undefined`);
  }

  return value;
}

function assertCallerMetadata(loc, value) {
  const obj = assertObject(loc, value);

  if (obj) {
    if (typeof obj["name"] !== "string") {
      throw new Error(`${msg(loc)} set but does not contain "name" property string`);
    }

    for (const prop of Object.keys(obj)) {
      const propLoc = access(loc, prop);
      const value = obj[prop];

      if (value != null && typeof value !== "boolean" && typeof value !== "string" && typeof value !== "number") {
        throw new Error(`${msg(propLoc)} must be null, undefined, a boolean, a string, or a number.`);
      }
    }
  }

  return value;
}

function assertInputSourceMap(loc, value) {
  if (value !== undefined && typeof value !== "boolean" && (typeof value !== "object" || !value)) {
    throw new Error(`${msg(loc)} must be a boolean, object, or undefined`);
  }

  return value;
}

function assertString(loc, value) {
  if (value !== undefined && typeof value !== "string") {
    throw new Error(`${msg(loc)} must be a string, or undefined`);
  }

  return value;
}

function assertFunction(loc, value) {
  if (value !== undefined && typeof value !== "function") {
    throw new Error(`${msg(loc)} must be a function, or undefined`);
  }

  return value;
}

function assertBoolean(loc, value) {
  if (value !== undefined && typeof value !== "boolean") {
    throw new Error(`${msg(loc)} must be a boolean, or undefined`);
  }

  return value;
}

function assertObject(loc, value) {
  if (value !== undefined && (typeof value !== "object" || Array.isArray(value) || !value)) {
    throw new Error(`${msg(loc)} must be an object, or undefined`);
  }

  return value;
}

function assertArray(loc, value) {
  if (value != null && !Array.isArray(value)) {
    throw new Error(`${msg(loc)} must be an array, or undefined`);
  }

  return value;
}

function assertIgnoreList(loc, value) {
  const arr = assertArray(loc, value);

  if (arr) {
    arr.forEach((item, i) => assertIgnoreItem(access(loc, i), item));
  }

  return arr;
}

function assertIgnoreItem(loc, value) {
  if (typeof value !== "string" && typeof value !== "function" && !(value instanceof RegExp)) {
    throw new Error(`${msg(loc)} must be an array of string/Funtion/RegExp values, or undefined`);
  }

  return value;
}

function assertConfigApplicableTest(loc, value) {
  if (value === undefined) return value;

  if (Array.isArray(value)) {
    value.forEach((item, i) => {
      if (!checkValidTest(item)) {
        throw new Error(`${msg(access(loc, i))} must be a string/Function/RegExp.`);
      }
    });
  } else if (!checkValidTest(value)) {
    throw new Error(`${msg(loc)} must be a string/Function/RegExp, or an array of those`);
  }

  return value;
}

function checkValidTest(value) {
  return typeof value === "string" || typeof value === "function" || value instanceof RegExp;
}

function assertConfigFileSearch(loc, value) {
  if (value !== undefined && typeof value !== "boolean" && typeof value !== "string") {
    throw new Error(`${msg(loc)} must be a undefined, a boolean, a string, ` + `got ${JSON.stringify(value)}`);
  }

  return value;
}

function assertBabelrcSearch(loc, value) {
  if (value === undefined || typeof value === "boolean") return value;

  if (Array.isArray(value)) {
    value.forEach((item, i) => {
      if (!checkValidTest(item)) {
        throw new Error(`${msg(access(loc, i))} must be a string/Function/RegExp.`);
      }
    });
  } else if (!checkValidTest(value)) {
    throw new Error(`${msg(loc)} must be a undefined, a boolean, a string/Function/RegExp ` + `or an array of those, got ${JSON.stringify(value)}`);
  }

  return value;
}

function assertPluginList(loc, value) {
  const arr = assertArray(loc, value);

  if (arr) {
    arr.forEach((item, i) => assertPluginItem(access(loc, i), item));
  }

  return arr;
}

function assertPluginItem(loc, value) {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      throw new Error(`${msg(loc)} must include an object`);
    }

    if (value.length > 3) {
      throw new Error(`${msg(loc)} may only be a two-tuple or three-tuple`);
    }

    assertPluginTarget(access(loc, 0), value[0]);

    if (value.length > 1) {
      const opts = value[1];

      if (opts !== undefined && opts !== false && (typeof opts !== "object" || Array.isArray(opts) || opts === null)) {
        throw new Error(`${msg(access(loc, 1))} must be an object, false, or undefined`);
      }
    }

    if (value.length === 3) {
      const name = value[2];

      if (name !== undefined && typeof name !== "string") {
        throw new Error(`${msg(access(loc, 2))} must be a string, or undefined`);
      }
    }
  } else {
    assertPluginTarget(loc, value);
  }

  return value;
}

function assertPluginTarget(loc, value) {
  if ((typeof value !== "object" || !value) && typeof value !== "string" && typeof value !== "function") {
    throw new Error(`${msg(loc)} must be a string, object, function`);
  }

  return value;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592155, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePluginObject = validatePluginObject;

var _optionAssertions = require("./option-assertions");

const VALIDATORS = {
  name: _optionAssertions.assertString,
  manipulateOptions: _optionAssertions.assertFunction,
  pre: _optionAssertions.assertFunction,
  post: _optionAssertions.assertFunction,
  inherits: _optionAssertions.assertFunction,
  visitor: assertVisitorMap,
  parserOverride: _optionAssertions.assertFunction,
  generatorOverride: _optionAssertions.assertFunction
};

function assertVisitorMap(key, value) {
  const obj = (0, _optionAssertions.assertObject)(key, value);

  if (obj) {
    Object.keys(obj).forEach(prop => assertVisitorHandler(prop, obj[prop]));

    if (obj.enter || obj.exit) {
      throw new Error(`.${key} cannot contain catch-all "enter" or "exit" handlers. Please target individual nodes.`);
    }
  }

  return obj;
}

function assertVisitorHandler(key, value) {
  if (value && typeof value === "object") {
    Object.keys(value).forEach(handler => {
      if (handler !== "enter" && handler !== "exit") {
        throw new Error(`.visitor["${key}"] may only have .enter and/or .exit handlers.`);
      }
    });
  } else if (typeof value !== "function") {
    throw new Error(`.visitor["${key}"] must be a function`);
  }

  return value;
}

function validatePluginObject(obj) {
  Object.keys(obj).forEach(key => {
    const validator = VALIDATORS[key];
    if (validator) validator(key, obj[key]);else throw new Error(`.${key} is not a valid Plugin property`);
  });
  return obj;
}
}, function(modId) { var map = {"./option-assertions":1561468592154}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592156, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadPrivatePartialConfig;
exports.loadPartialConfig = loadPartialConfig;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

var _plugin = _interopRequireDefault(require("./plugin"));

var _util = require("./util");

var _item = require("./item");

var _configChain = require("./config-chain");

var _environment = require("./helpers/environment");

var _options = require("./validation/options");

var _files = require("./files");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveRootMode(rootDir, rootMode) {
  switch (rootMode) {
    case "root":
      return rootDir;

    case "upward-optional":
      {
        const upwardRootDir = (0, _files.findConfigUpwards)(rootDir);
        return upwardRootDir === null ? rootDir : upwardRootDir;
      }

    case "upward":
      {
        const upwardRootDir = (0, _files.findConfigUpwards)(rootDir);
        if (upwardRootDir !== null) return upwardRootDir;
        throw Object.assign(new Error(`Babel was run with rootMode:"upward" but a root could not ` + `be found when searching upward from "${rootDir}"`), {
          code: "BABEL_ROOT_NOT_FOUND",
          dirname: rootDir
        });
      }

    default:
      throw new Error(`Assertion failure - unknown rootMode value`);
  }
}

function loadPrivatePartialConfig(inputOpts) {
  if (inputOpts != null && (typeof inputOpts !== "object" || Array.isArray(inputOpts))) {
    throw new Error("Babel options must be an object, null, or undefined");
  }

  const args = inputOpts ? (0, _options.validate)("arguments", inputOpts) : {};
  const {
    envName = (0, _environment.getEnv)(),
    cwd = ".",
    root: rootDir = ".",
    rootMode = "root",
    caller
  } = args;

  const absoluteCwd = _path().default.resolve(cwd);

  const absoluteRootDir = resolveRootMode(_path().default.resolve(absoluteCwd, rootDir), rootMode);
  const context = {
    filename: typeof args.filename === "string" ? _path().default.resolve(cwd, args.filename) : undefined,
    cwd: absoluteCwd,
    root: absoluteRootDir,
    envName,
    caller
  };
  const configChain = (0, _configChain.buildRootChain)(args, context);
  if (!configChain) return null;
  const options = {};
  configChain.options.forEach(opts => {
    (0, _util.mergeOptions)(options, opts);
  });
  options.babelrc = false;
  options.configFile = false;
  options.passPerPreset = false;
  options.envName = context.envName;
  options.cwd = context.cwd;
  options.root = context.root;
  options.filename = typeof context.filename === "string" ? context.filename : undefined;
  options.plugins = configChain.plugins.map(descriptor => (0, _item.createItemFromDescriptor)(descriptor));
  options.presets = configChain.presets.map(descriptor => (0, _item.createItemFromDescriptor)(descriptor));
  return {
    options,
    context,
    ignore: configChain.ignore,
    babelrc: configChain.babelrc,
    config: configChain.config
  };
}

function loadPartialConfig(inputOpts) {
  const result = loadPrivatePartialConfig(inputOpts);
  if (!result) return null;
  const {
    options,
    babelrc,
    ignore,
    config
  } = result;
  (options.plugins || []).forEach(item => {
    if (item.value instanceof _plugin.default) {
      throw new Error("Passing cached plugin instances is not supported in " + "babel.loadPartialConfig()");
    }
  });
  return new PartialConfig(options, babelrc ? babelrc.filepath : undefined, ignore ? ignore.filepath : undefined, config ? config.filepath : undefined);
}

class PartialConfig {
  constructor(options, babelrc, ignore, config) {
    this.options = options;
    this.babelignore = ignore;
    this.babelrc = babelrc;
    this.config = config;
    Object.freeze(this);
  }

  hasFilesystemConfig() {
    return this.babelrc !== undefined || this.config !== undefined;
  }

}

Object.freeze(PartialConfig.prototype);
}, function(modId) { var map = {"./plugin":1561468592150,"./util":1561468592149,"./item":1561468592145,"./config-chain":1561468592151,"./helpers/environment":1561468592144,"./validation/options":1561468592152,"./files":1561468592135}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592157, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformSync = transformSync;
exports.transformAsync = transformAsync;
exports.transform = void 0;

var _config = _interopRequireDefault(require("./config"));

var _transformation = require("./transformation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const transform = function transform(code, opts, callback) {
  if (typeof opts === "function") {
    callback = opts;
    opts = undefined;
  }

  if (callback === undefined) return transformSync(code, opts);
  const cb = callback;
  process.nextTick(() => {
    let cfg;

    try {
      cfg = (0, _config.default)(opts);
      if (cfg === null) return cb(null, null);
    } catch (err) {
      return cb(err);
    }

    (0, _transformation.runAsync)(cfg, code, null, cb);
  });
};

exports.transform = transform;

function transformSync(code, opts) {
  const config = (0, _config.default)(opts);
  if (config === null) return null;
  return (0, _transformation.runSync)(config, code);
}

function transformAsync(code, opts) {
  return new Promise((res, rej) => {
    transform(code, opts, (err, result) => {
      if (err == null) res(result);else rej(err);
    });
  });
}
}, function(modId) { var map = {"./config":1561468592147,"./transformation":1561468592158}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592158, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runAsync = runAsync;
exports.runSync = runSync;

function _traverse() {
  const data = _interopRequireDefault(require("@babel/traverse"));

  _traverse = function () {
    return data;
  };

  return data;
}

var _pluginPass = _interopRequireDefault(require("./plugin-pass"));

var _blockHoistPlugin = _interopRequireDefault(require("./block-hoist-plugin"));

var _normalizeOpts = _interopRequireDefault(require("./normalize-opts"));

var _normalizeFile = _interopRequireDefault(require("./normalize-file"));

var _generate = _interopRequireDefault(require("./file/generate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function runAsync(config, code, ast, callback) {
  let result;

  try {
    result = runSync(config, code, ast);
  } catch (err) {
    return callback(err);
  }

  return callback(null, result);
}

function runSync(config, code, ast) {
  const file = (0, _normalizeFile.default)(config.passes, (0, _normalizeOpts.default)(config), code, ast);
  transformFile(file, config.passes);
  const opts = file.opts;
  const {
    outputCode,
    outputMap
  } = opts.code !== false ? (0, _generate.default)(config.passes, file) : {};
  return {
    metadata: file.metadata,
    options: opts,
    ast: opts.ast === true ? file.ast : null,
    code: outputCode === undefined ? null : outputCode,
    map: outputMap === undefined ? null : outputMap,
    sourceType: file.ast.program.sourceType
  };
}

function transformFile(file, pluginPasses) {
  for (const pluginPairs of pluginPasses) {
    const passPairs = [];
    const passes = [];
    const visitors = [];

    for (const plugin of pluginPairs.concat([(0, _blockHoistPlugin.default)()])) {
      const pass = new _pluginPass.default(file, plugin.key, plugin.options);
      passPairs.push([plugin, pass]);
      passes.push(pass);
      visitors.push(plugin.visitor);
    }

    for (const [plugin, pass] of passPairs) {
      const fn = plugin.pre;

      if (fn) {
        const result = fn.call(pass, file);

        if (isThenable(result)) {
          throw new Error(`You appear to be using an plugin with an async .pre, ` + `which your current version of Babel does not support. ` + `If you're using a published plugin, you may need to upgrade ` + `your @babel/core version.`);
        }
      }
    }

    const visitor = _traverse().default.visitors.merge(visitors, passes, file.opts.wrapPluginVisitorMethod);

    (0, _traverse().default)(file.ast, visitor, file.scope);

    for (const [plugin, pass] of passPairs) {
      const fn = plugin.post;

      if (fn) {
        const result = fn.call(pass, file);

        if (isThenable(result)) {
          throw new Error(`You appear to be using an plugin with an async .post, ` + `which your current version of Babel does not support. ` + `If you're using a published plugin, you may need to upgrade ` + `your @babel/core version.`);
        }
      }
    }
  }
}

function isThenable(val) {
  return !!val && (typeof val === "object" || typeof val === "function") && !!val.then && typeof val.then === "function";
}
}, function(modId) { var map = {"./plugin-pass":1561468592159,"./block-hoist-plugin":1561468592160,"./normalize-opts":1561468592161,"./normalize-file":1561468592162,"./file/generate":1561468592164}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592159, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class PluginPass {
  constructor(file, key, options) {
    this._map = new Map();
    this.key = key;
    this.file = file;
    this.opts = options || {};
    this.cwd = file.opts.cwd;
    this.filename = file.opts.filename;
  }

  set(key, val) {
    this._map.set(key, val);
  }

  get(key) {
    return this._map.get(key);
  }

  availableHelper(name, versionRange) {
    return this.file.availableHelper(name, versionRange);
  }

  addHelper(name) {
    return this.file.addHelper(name);
  }

  addImport() {
    return this.file.addImport();
  }

  getModuleName() {
    return this.file.getModuleName();
  }

  buildCodeFrameError(node, msg, Error) {
    return this.file.buildCodeFrameError(node, msg, Error);
  }

}

exports.default = PluginPass;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592160, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadBlockHoistPlugin;

function _sortBy() {
  const data = _interopRequireDefault(require("lodash/sortBy"));

  _sortBy = function () {
    return data;
  };

  return data;
}

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let LOADED_PLUGIN;

function loadBlockHoistPlugin() {
  if (!LOADED_PLUGIN) {
    const config = (0, _config.default)({
      babelrc: false,
      configFile: false,
      plugins: [blockHoistPlugin]
    });
    LOADED_PLUGIN = config ? config.passes[0][0] : undefined;
    if (!LOADED_PLUGIN) throw new Error("Assertion failure");
  }

  return LOADED_PLUGIN;
}

const blockHoistPlugin = {
  name: "internal.blockHoist",
  visitor: {
    Block: {
      exit({
        node
      }) {
        let hasChange = false;

        for (let i = 0; i < node.body.length; i++) {
          const bodyNode = node.body[i];

          if (bodyNode && bodyNode._blockHoist != null) {
            hasChange = true;
            break;
          }
        }

        if (!hasChange) return;
        node.body = (0, _sortBy().default)(node.body, function (bodyNode) {
          let priority = bodyNode && bodyNode._blockHoist;
          if (priority == null) priority = 1;
          if (priority === true) priority = 2;
          return -1 * priority;
        });
      }

    }
  }
};
}, function(modId) { var map = {"../config":1561468592147}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592161, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalizeOptions;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function normalizeOptions(config) {
  const {
    filename,
    cwd,
    filenameRelative = typeof filename === "string" ? _path().default.relative(cwd, filename) : "unknown",
    sourceType = "module",
    inputSourceMap,
    sourceMaps = !!inputSourceMap,
    moduleRoot,
    sourceRoot = moduleRoot,
    sourceFileName = _path().default.basename(filenameRelative),
    comments = true,
    compact = "auto"
  } = config.options;
  const opts = config.options;
  const options = Object.assign({}, opts, {
    parserOpts: Object.assign({
      sourceType: _path().default.extname(filenameRelative) === ".mjs" ? "module" : sourceType,
      sourceFileName: filename,
      plugins: []
    }, opts.parserOpts),
    generatorOpts: Object.assign({
      filename,
      auxiliaryCommentBefore: opts.auxiliaryCommentBefore,
      auxiliaryCommentAfter: opts.auxiliaryCommentAfter,
      retainLines: opts.retainLines,
      comments,
      shouldPrintComment: opts.shouldPrintComment,
      compact,
      minified: opts.minified,
      sourceMaps,
      sourceRoot,
      sourceFileName
    }, opts.generatorOpts)
  });

  for (const plugins of config.passes) {
    for (const plugin of plugins) {
      if (plugin.manipulateOptions) {
        plugin.manipulateOptions(options, options.parserOpts);
      }
    }
  }

  return options;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592162, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalizeFile;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _debug() {
  const data = _interopRequireDefault(require("debug"));

  _debug = function () {
    return data;
  };

  return data;
}

function _cloneDeep() {
  const data = _interopRequireDefault(require("lodash/cloneDeep"));

  _cloneDeep = function () {
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

function _convertSourceMap() {
  const data = _interopRequireDefault(require("convert-source-map"));

  _convertSourceMap = function () {
    return data;
  };

  return data;
}

function _parser() {
  const data = require("@babel/parser");

  _parser = function () {
    return data;
  };

  return data;
}

function _codeFrame() {
  const data = require("@babel/code-frame");

  _codeFrame = function () {
    return data;
  };

  return data;
}

var _file = _interopRequireDefault(require("./file/file"));

var _missingPluginHelper = _interopRequireDefault(require("./util/missing-plugin-helper"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug().default)("babel:transform:file");

function normalizeFile(pluginPasses, options, code, ast) {
  code = `${code || ""}`;
  let inputMap = null;

  if (options.inputSourceMap !== false) {
    if (typeof options.inputSourceMap === "object") {
      inputMap = _convertSourceMap().default.fromObject(options.inputSourceMap);
    }

    if (!inputMap) {
      try {
        inputMap = _convertSourceMap().default.fromSource(code);

        if (inputMap) {
          code = _convertSourceMap().default.removeComments(code);
        }
      } catch (err) {
        debug("discarding unknown inline input sourcemap", err);
        code = _convertSourceMap().default.removeComments(code);
      }
    }

    if (!inputMap) {
      if (typeof options.filename === "string") {
        try {
          inputMap = _convertSourceMap().default.fromMapFileSource(code, _path().default.dirname(options.filename));

          if (inputMap) {
            code = _convertSourceMap().default.removeMapFileComments(code);
          }
        } catch (err) {
          debug("discarding unknown file input sourcemap", err);
          code = _convertSourceMap().default.removeMapFileComments(code);
        }
      } else {
        debug("discarding un-loadable file input sourcemap");
        code = _convertSourceMap().default.removeMapFileComments(code);
      }
    }
  }

  if (ast) {
    if (ast.type === "Program") {
      ast = t().file(ast, [], []);
    } else if (ast.type !== "File") {
      throw new Error("AST root must be a Program or File node");
    }

    ast = (0, _cloneDeep().default)(ast);
  } else {
    ast = parser(pluginPasses, options, code);
  }

  return new _file.default(options, {
    code,
    ast,
    inputMap
  });
}

function parser(pluginPasses, {
  parserOpts,
  highlightCode = true,
  filename = "unknown"
}, code) {
  try {
    const results = [];

    for (const plugins of pluginPasses) {
      for (const plugin of plugins) {
        const {
          parserOverride
        } = plugin;

        if (parserOverride) {
          const ast = parserOverride(code, parserOpts, _parser().parse);
          if (ast !== undefined) results.push(ast);
        }
      }
    }

    if (results.length === 0) {
      return (0, _parser().parse)(code, parserOpts);
    } else if (results.length === 1) {
      if (typeof results[0].then === "function") {
        throw new Error(`You appear to be using an async codegen plugin, ` + `which your current version of Babel does not support. ` + `If you're using a published plugin, you may need to upgrade ` + `your @babel/core version.`);
      }

      return results[0];
    }

    throw new Error("More than one plugin attempted to override parsing.");
  } catch (err) {
    if (err.code === "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED") {
      err.message += "\nConsider renaming the file to '.mjs', or setting sourceType:module " + "or sourceType:unambiguous in your Babel config for this file.";
    }

    const {
      loc,
      missingPlugin
    } = err;

    if (loc) {
      const codeFrame = (0, _codeFrame().codeFrameColumns)(code, {
        start: {
          line: loc.line,
          column: loc.column + 1
        }
      }, {
        highlightCode
      });

      if (missingPlugin) {
        err.message = `${filename}: ` + (0, _missingPluginHelper.default)(missingPlugin[0], loc, codeFrame);
      } else {
        err.message = `${filename}: ${err.message}\n\n` + codeFrame;
      }

      err.code = "BABEL_PARSE_ERROR";
    }

    throw err;
  }
}
}, function(modId) { var map = {"./file/file":1561468592133,"./util/missing-plugin-helper":1561468592163}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592163, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateMissingPluginMessage;
const pluginNameMap = {
  classProperties: {
    syntax: {
      name: "@babel/plugin-syntax-class-properties",
      url: "https://git.io/vb4yQ"
    },
    transform: {
      name: "@babel/plugin-proposal-class-properties",
      url: "https://git.io/vb4SL"
    }
  },
  decorators: {
    syntax: {
      name: "@babel/plugin-syntax-decorators",
      url: "https://git.io/vb4y9"
    },
    transform: {
      name: "@babel/plugin-proposal-decorators",
      url: "https://git.io/vb4ST"
    }
  },
  doExpressions: {
    syntax: {
      name: "@babel/plugin-syntax-do-expressions",
      url: "https://git.io/vb4yh"
    },
    transform: {
      name: "@babel/plugin-proposal-do-expressions",
      url: "https://git.io/vb4S3"
    }
  },
  dynamicImport: {
    syntax: {
      name: "@babel/plugin-syntax-dynamic-import",
      url: "https://git.io/vb4Sv"
    }
  },
  exportDefaultFrom: {
    syntax: {
      name: "@babel/plugin-syntax-export-default-from",
      url: "https://git.io/vb4SO"
    },
    transform: {
      name: "@babel/plugin-proposal-export-default-from",
      url: "https://git.io/vb4yH"
    }
  },
  exportNamespaceFrom: {
    syntax: {
      name: "@babel/plugin-syntax-export-namespace-from",
      url: "https://git.io/vb4Sf"
    },
    transform: {
      name: "@babel/plugin-proposal-export-namespace-from",
      url: "https://git.io/vb4SG"
    }
  },
  flow: {
    syntax: {
      name: "@babel/plugin-syntax-flow",
      url: "https://git.io/vb4yb"
    },
    transform: {
      name: "@babel/plugin-transform-flow-strip-types",
      url: "https://git.io/vb49g"
    }
  },
  functionBind: {
    syntax: {
      name: "@babel/plugin-syntax-function-bind",
      url: "https://git.io/vb4y7"
    },
    transform: {
      name: "@babel/plugin-proposal-function-bind",
      url: "https://git.io/vb4St"
    }
  },
  functionSent: {
    syntax: {
      name: "@babel/plugin-syntax-function-sent",
      url: "https://git.io/vb4yN"
    },
    transform: {
      name: "@babel/plugin-proposal-function-sent",
      url: "https://git.io/vb4SZ"
    }
  },
  importMeta: {
    syntax: {
      name: "@babel/plugin-syntax-import-meta",
      url: "https://git.io/vbKK6"
    }
  },
  jsx: {
    syntax: {
      name: "@babel/plugin-syntax-jsx",
      url: "https://git.io/vb4yA"
    },
    transform: {
      name: "@babel/plugin-transform-react-jsx",
      url: "https://git.io/vb4yd"
    }
  },
  logicalAssignment: {
    syntax: {
      name: "@babel/plugin-syntax-logical-assignment-operators",
      url: "https://git.io/vAlBp"
    },
    transform: {
      name: "@babel/plugin-proposal-logical-assignment-operators",
      url: "https://git.io/vAlRe"
    }
  },
  nullishCoalescingOperator: {
    syntax: {
      name: "@babel/plugin-syntax-nullish-coalescing-operator",
      url: "https://git.io/vb4yx"
    },
    transform: {
      name: "@babel/plugin-proposal-nullish-coalescing-operator",
      url: "https://git.io/vb4Se"
    }
  },
  numericSeparator: {
    syntax: {
      name: "@babel/plugin-syntax-numeric-separator",
      url: "https://git.io/vb4Sq"
    },
    transform: {
      name: "@babel/plugin-proposal-numeric-separator",
      url: "https://git.io/vb4yS"
    }
  },
  optionalChaining: {
    syntax: {
      name: "@babel/plugin-syntax-optional-chaining",
      url: "https://git.io/vb4Sc"
    },
    transform: {
      name: "@babel/plugin-proposal-optional-chaining",
      url: "https://git.io/vb4Sk"
    }
  },
  pipelineOperator: {
    syntax: {
      name: "@babel/plugin-syntax-pipeline-operator",
      url: "https://git.io/vb4yj"
    },
    transform: {
      name: "@babel/plugin-proposal-pipeline-operator",
      url: "https://git.io/vb4SU"
    }
  },
  throwExpressions: {
    syntax: {
      name: "@babel/plugin-syntax-throw-expressions",
      url: "https://git.io/vb4SJ"
    },
    transform: {
      name: "@babel/plugin-proposal-throw-expressions",
      url: "https://git.io/vb4yF"
    }
  },
  typescript: {
    syntax: {
      name: "@babel/plugin-syntax-typescript",
      url: "https://git.io/vb4SC"
    },
    transform: {
      name: "@babel/plugin-transform-typescript",
      url: "https://git.io/vb4Sm"
    }
  },
  asyncGenerators: {
    syntax: {
      name: "@babel/plugin-syntax-async-generators",
      url: "https://git.io/vb4SY"
    },
    transform: {
      name: "@babel/plugin-proposal-async-generator-functions",
      url: "https://git.io/vb4yp"
    }
  },
  objectRestSpread: {
    syntax: {
      name: "@babel/plugin-syntax-object-rest-spread",
      url: "https://git.io/vb4y5"
    },
    transform: {
      name: "@babel/plugin-proposal-object-rest-spread",
      url: "https://git.io/vb4Ss"
    }
  },
  optionalCatchBinding: {
    syntax: {
      name: "@babel/plugin-syntax-optional-catch-binding",
      url: "https://git.io/vb4Sn"
    },
    transform: {
      name: "@babel/plugin-proposal-optional-catch-binding",
      url: "https://git.io/vb4SI"
    }
  }
};

const getNameURLCombination = ({
  name,
  url
}) => `${name} (${url})`;

function generateMissingPluginMessage(missingPluginName, loc, codeFrame) {
  let helpMessage = `Support for the experimental syntax '${missingPluginName}' isn't currently enabled ` + `(${loc.line}:${loc.column + 1}):\n\n` + codeFrame;
  const pluginInfo = pluginNameMap[missingPluginName];

  if (pluginInfo) {
    const {
      syntax: syntaxPlugin,
      transform: transformPlugin
    } = pluginInfo;

    if (syntaxPlugin) {
      if (transformPlugin) {
        const transformPluginInfo = getNameURLCombination(transformPlugin);
        helpMessage += `\n\nAdd ${transformPluginInfo} to the 'plugins' section of your Babel config ` + `to enable transformation.`;
      } else {
        const syntaxPluginInfo = getNameURLCombination(syntaxPlugin);
        helpMessage += `\n\nAdd ${syntaxPluginInfo} to the 'plugins' section of your Babel config ` + `to enable parsing.`;
      }
    }
  }

  return helpMessage;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592164, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateCode;

function _convertSourceMap() {
  const data = _interopRequireDefault(require("convert-source-map"));

  _convertSourceMap = function () {
    return data;
  };

  return data;
}

function _generator() {
  const data = _interopRequireDefault(require("@babel/generator"));

  _generator = function () {
    return data;
  };

  return data;
}

var _mergeMap = _interopRequireDefault(require("./merge-map"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateCode(pluginPasses, file) {
  const {
    opts,
    ast,
    code,
    inputMap
  } = file;
  const results = [];

  for (const plugins of pluginPasses) {
    for (const plugin of plugins) {
      const {
        generatorOverride
      } = plugin;

      if (generatorOverride) {
        const result = generatorOverride(ast, opts.generatorOpts, code, _generator().default);
        if (result !== undefined) results.push(result);
      }
    }
  }

  let result;

  if (results.length === 0) {
    result = (0, _generator().default)(ast, opts.generatorOpts, code);
  } else if (results.length === 1) {
    result = results[0];

    if (typeof result.then === "function") {
      throw new Error(`You appear to be using an async parser plugin, ` + `which your current version of Babel does not support. ` + `If you're using a published plugin, ` + `you may need to upgrade your @babel/core version.`);
    }
  } else {
    throw new Error("More than one plugin attempted to override codegen.");
  }

  let {
    code: outputCode,
    map: outputMap
  } = result;

  if (outputMap && inputMap) {
    outputMap = (0, _mergeMap.default)(inputMap.toObject(), outputMap);
  }

  if (opts.sourceMaps === "inline" || opts.sourceMaps === "both") {
    outputCode += "\n" + _convertSourceMap().default.fromObject(outputMap).toComment();
  }

  if (opts.sourceMaps === "inline") {
    outputMap = null;
  }

  return {
    outputCode,
    outputMap
  };
}
}, function(modId) { var map = {"./merge-map":1561468592165}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592165, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergeSourceMap;

function _sourceMap() {
  const data = _interopRequireDefault(require("source-map"));

  _sourceMap = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mergeSourceMap(inputMap, map) {
  const input = buildMappingData(inputMap);
  const output = buildMappingData(map);
  const mergedGenerator = new (_sourceMap().default.SourceMapGenerator)();

  for (const _ref of input.sources) {
    const {
      source
    } = _ref;

    if (typeof source.content === "string") {
      mergedGenerator.setSourceContent(source.path, source.content);
    }
  }

  if (output.sources.length === 1) {
    const defaultSource = output.sources[0];
    const insertedMappings = new Map();
    eachInputGeneratedRange(input, (generated, original, source) => {
      eachOverlappingGeneratedOutputRange(defaultSource, generated, item => {
        const key = makeMappingKey(item);
        if (insertedMappings.has(key)) return;
        insertedMappings.set(key, item);
        mergedGenerator.addMapping({
          source: source.path,
          original: {
            line: original.line,
            column: original.columnStart
          },
          generated: {
            line: item.line,
            column: item.columnStart
          },
          name: original.name
        });
      });
    });

    for (const item of insertedMappings.values()) {
      if (item.columnEnd === Infinity) {
        continue;
      }

      const clearItem = {
        line: item.line,
        columnStart: item.columnEnd
      };
      const key = makeMappingKey(clearItem);

      if (insertedMappings.has(key)) {
        continue;
      }

      mergedGenerator.addMapping({
        generated: {
          line: clearItem.line,
          column: clearItem.columnStart
        }
      });
    }
  }

  const result = mergedGenerator.toJSON();

  if (typeof input.sourceRoot === "string") {
    result.sourceRoot = input.sourceRoot;
  }

  return result;
}

function makeMappingKey(item) {
  return `${item.line}/${item.columnStart}`;
}

function eachOverlappingGeneratedOutputRange(outputFile, inputGeneratedRange, callback) {
  const overlappingOriginal = filterApplicableOriginalRanges(outputFile, inputGeneratedRange);

  for (const _ref2 of overlappingOriginal) {
    const {
      generated
    } = _ref2;

    for (const item of generated) {
      callback(item);
    }
  }
}

function filterApplicableOriginalRanges({
  mappings
}, {
  line,
  columnStart,
  columnEnd
}) {
  return filterSortedArray(mappings, ({
    original: outOriginal
  }) => {
    if (line > outOriginal.line) return -1;
    if (line < outOriginal.line) return 1;
    if (columnStart >= outOriginal.columnEnd) return -1;
    if (columnEnd <= outOriginal.columnStart) return 1;
    return 0;
  });
}

function eachInputGeneratedRange(map, callback) {
  for (const _ref3 of map.sources) {
    const {
      source,
      mappings
    } = _ref3;

    for (const _ref4 of mappings) {
      const {
        original,
        generated
      } = _ref4;

      for (const item of generated) {
        callback(item, original, source);
      }
    }
  }
}

function buildMappingData(map) {
  const consumer = new (_sourceMap().default.SourceMapConsumer)(Object.assign({}, map, {
    sourceRoot: null
  }));
  const sources = new Map();
  const mappings = new Map();
  let last = null;
  consumer.computeColumnSpans();
  consumer.eachMapping(m => {
    if (m.originalLine === null) return;
    let source = sources.get(m.source);

    if (!source) {
      source = {
        path: m.source,
        content: consumer.sourceContentFor(m.source, true)
      };
      sources.set(m.source, source);
    }

    let sourceData = mappings.get(source);

    if (!sourceData) {
      sourceData = {
        source,
        mappings: []
      };
      mappings.set(source, sourceData);
    }

    const obj = {
      line: m.originalLine,
      columnStart: m.originalColumn,
      columnEnd: Infinity,
      name: m.name
    };

    if (last && last.source === source && last.mapping.line === m.originalLine) {
      last.mapping.columnEnd = m.originalColumn;
    }

    last = {
      source,
      mapping: obj
    };
    sourceData.mappings.push({
      original: obj,
      generated: consumer.allGeneratedPositionsFor({
        source: m.source,
        line: m.originalLine,
        column: m.originalColumn
      }).map(item => ({
        line: item.line,
        columnStart: item.column,
        columnEnd: item.lastColumn + 1
      }))
    });
  }, null, _sourceMap().default.SourceMapConsumer.ORIGINAL_ORDER);
  return {
    file: map.file,
    sourceRoot: map.sourceRoot,
    sources: Array.from(mappings.values())
  };
}

function findInsertionLocation(array, callback) {
  let left = 0;
  let right = array.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const item = array[mid];
    const result = callback(item);

    if (result === 0) {
      left = mid;
      break;
    }

    if (result >= 0) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  let i = left;

  if (i < array.length) {
    while (i >= 0 && callback(array[i]) >= 0) {
      i--;
    }

    return i + 1;
  }

  return i;
}

function filterSortedArray(array, callback) {
  const start = findInsertionLocation(array, callback);
  const results = [];

  for (let i = start; i < array.length && callback(array[i]) === 0; i++) {
    results.push(array[i]);
  }

  return results;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592166, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformFileSync = transformFileSync;
exports.transformFileAsync = transformFileAsync;
exports.transformFile = void 0;

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function () {
    return data;
  };

  return data;
}

var _config = _interopRequireDefault(require("./config"));

var _transformation = require("./transformation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

({});

const transformFile = function transformFile(filename, opts, callback) {
  let options;

  if (typeof opts === "function") {
    callback = opts;
    opts = undefined;
  }

  if (opts == null) {
    options = {
      filename
    };
  } else if (opts && typeof opts === "object") {
    options = Object.assign({}, opts, {
      filename
    });
  }

  process.nextTick(() => {
    let cfg;

    try {
      cfg = (0, _config.default)(options);
      if (cfg === null) return callback(null, null);
    } catch (err) {
      return callback(err);
    }

    const config = cfg;

    _fs().default.readFile(filename, "utf8", function (err, code) {
      if (err) return callback(err, null);
      (0, _transformation.runAsync)(config, code, null, callback);
    });
  });
};

exports.transformFile = transformFile;

function transformFileSync(filename, opts) {
  let options;

  if (opts == null) {
    options = {
      filename
    };
  } else if (opts && typeof opts === "object") {
    options = Object.assign({}, opts, {
      filename
    });
  }

  const config = (0, _config.default)(options);
  if (config === null) return null;
  return (0, _transformation.runSync)(config, _fs().default.readFileSync(filename, "utf8"));
}

function transformFileAsync(filename, opts) {
  return new Promise((res, rej) => {
    transformFile(filename, opts, (err, result) => {
      if (err == null) res(result);else rej(err);
    });
  });
}
}, function(modId) { var map = {"./config":1561468592147,"./transformation":1561468592158}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592167, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformFromAstSync = transformFromAstSync;
exports.transformFromAstAsync = transformFromAstAsync;
exports.transformFromAst = void 0;

var _config = _interopRequireDefault(require("./config"));

var _transformation = require("./transformation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const transformFromAst = function transformFromAst(ast, code, opts, callback) {
  if (typeof opts === "function") {
    callback = opts;
    opts = undefined;
  }

  if (callback === undefined) return transformFromAstSync(ast, code, opts);
  const cb = callback;
  process.nextTick(() => {
    let cfg;

    try {
      cfg = (0, _config.default)(opts);
      if (cfg === null) return cb(null, null);
    } catch (err) {
      return cb(err);
    }

    if (!ast) return cb(new Error("No AST given"));
    (0, _transformation.runAsync)(cfg, code, ast, cb);
  });
};

exports.transformFromAst = transformFromAst;

function transformFromAstSync(ast, code, opts) {
  const config = (0, _config.default)(opts);
  if (config === null) return null;
  if (!ast) throw new Error("No AST given");
  return (0, _transformation.runSync)(config, code, ast);
}

function transformFromAstAsync(ast, code, opts) {
  return new Promise((res, rej) => {
    transformFromAst(ast, code, opts, (err, result) => {
      if (err == null) res(result);else rej(err);
    });
  });
}
}, function(modId) { var map = {"./config":1561468592147,"./transformation":1561468592158}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592168, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseSync = parseSync;
exports.parseAsync = parseAsync;
exports.parse = void 0;

var _config = _interopRequireDefault(require("./config"));

var _normalizeFile = _interopRequireDefault(require("./transformation/normalize-file"));

var _normalizeOpts = _interopRequireDefault(require("./transformation/normalize-opts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const parse = function parse(code, opts, callback) {
  if (typeof opts === "function") {
    callback = opts;
    opts = undefined;
  }

  if (callback === undefined) return parseSync(code, opts);
  const config = (0, _config.default)(opts);

  if (config === null) {
    return null;
  }

  const cb = callback;
  process.nextTick(() => {
    let ast = null;

    try {
      const cfg = (0, _config.default)(opts);
      if (cfg === null) return cb(null, null);
      ast = (0, _normalizeFile.default)(cfg.passes, (0, _normalizeOpts.default)(cfg), code).ast;
    } catch (err) {
      return cb(err);
    }

    cb(null, ast);
  });
};

exports.parse = parse;

function parseSync(code, opts) {
  const config = (0, _config.default)(opts);

  if (config === null) {
    return null;
  }

  return (0, _normalizeFile.default)(config.passes, (0, _normalizeOpts.default)(config), code).ast;
}

function parseAsync(code, opts) {
  return new Promise((res, rej) => {
    parse(code, opts, (err, result) => {
      if (err == null) res(result);else rej(err);
    });
  });
}
}, function(modId) { var map = {"./config":1561468592147,"./transformation/normalize-file":1561468592162,"./transformation/normalize-opts":1561468592161}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1561468592132);
})()
//# sourceMappingURL=index.js.map