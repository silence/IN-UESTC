module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1561468592478, function(require, module, exports) {
;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var types_1 = __importDefault(require("./lib/types"));
var parser_1 = require("./lib/parser");
var printer_1 = require("./lib/printer");
function print(node, options) {
    return new printer_1.Printer(options).print(node);
}
function prettyPrint(node, options) {
    return new printer_1.Printer(options).printGenerically(node);
}
function run(transformer, options) {
    return runFile(process.argv[2], transformer, options);
}
function runFile(path, transformer, options) {
    fs_1.default.readFile(path, "utf-8", function (err, code) {
        if (err) {
            console.error(err);
            return;
        }
        runString(code, transformer, options);
    });
}
function defaultWriteback(output) {
    process.stdout.write(output);
}
function runString(code, transformer, options) {
    var writeback = options && options.writeback || defaultWriteback;
    transformer(parser_1.parse(code, options), function (node) {
        writeback(print(node, options).code);
    });
}
var main = {};
Object.defineProperties(main, {
    /**
     * Parse a string of code into an augmented syntax tree suitable for
     * arbitrary modification and reprinting.
     */
    parse: {
        enumerable: true,
        value: parser_1.parse
    },
    /**
     * Traverse and potentially modify an abstract syntax tree using a
     * convenient visitor syntax:
     *
     *   recast.visit(ast, {
     *     names: [],
     *     visitIdentifier: function(path) {
     *       var node = path.value;
     *       this.visitor.names.push(node.name);
     *       this.traverse(path);
     *     }
     *   });
     */
    visit: {
        enumerable: true,
        value: types_1.default.visit
    },
    /**
     * Reprint a modified syntax tree using as much of the original source
     * code as possible.
     */
    print: {
        enumerable: true,
        value: print
    },
    /**
     * Print without attempting to reuse any original source code.
     */
    prettyPrint: {
        enumerable: false,
        value: prettyPrint
    },
    /**
     * Customized version of require("ast-types").
     */
    types: {
        enumerable: false,
        value: types_1.default
    },
    /**
     * Convenient command-line interface (see e.g. example/add-braces).
     */
    run: {
        enumerable: false,
        value: run
    }
});
exports.default = main;
module.exports = exports["default"];

}, function(modId) {var map = {"./lib/types":1561468592479,"./lib/parser":1561468592480,"./lib/printer":1561468592487}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592479, function(require, module, exports) {
;
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// This module was originally created so that Recast could add its own
// custom types to the AST type system (in particular, the File type), but
// those types are now incorporated into ast-types, so this module doesn't
// have much to do anymore. Still, it might prove useful in the future.
var ast_types_1 = __importDefault(require("ast-types"));
exports.default = ast_types_1.default;
__export(require("ast-types"));
module.exports = exports["default"];

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592480, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var types_1 = __importDefault(require("./types"));
var b = types_1.default.builders;
var isObject = types_1.default.builtInTypes.object;
var isArray = types_1.default.builtInTypes.array;
var options_1 = require("./options");
var lines_1 = require("./lines");
var comments_1 = require("./comments");
var util = __importStar(require("./util"));
function parse(source, options) {
    options = options_1.normalize(options);
    var lines = lines_1.fromString(source, options);
    var sourceWithoutTabs = lines.toString({
        tabWidth: options.tabWidth,
        reuseWhitespace: false,
        useTabs: false
    });
    var comments = [];
    var ast = options.parser.parse(sourceWithoutTabs, {
        jsx: true,
        loc: true,
        locations: true,
        range: options.range,
        comment: true,
        onComment: comments,
        tolerant: util.getOption(options, "tolerant", true),
        ecmaVersion: 6,
        sourceType: util.getOption(options, "sourceType", "module")
    });
    // Use ast.tokens if possible, and otherwise fall back to the Esprima
    // tokenizer. All the preconfigured ../parsers/* expose ast.tokens
    // automatically, but custom parsers might need additional configuration
    // to avoid this fallback.
    var tokens = Array.isArray(ast.tokens)
        ? ast.tokens
        : require("esprima").tokenize(sourceWithoutTabs, {
            loc: true
        });
    // We will reattach the tokens array to the file object below.
    delete ast.tokens;
    // Make sure every token has a token.value string.
    tokens.forEach(function (token) {
        if (typeof token.value !== "string") {
            token.value = lines.sliceString(token.loc.start, token.loc.end);
        }
    });
    if (Array.isArray(ast.comments)) {
        comments = ast.comments;
        delete ast.comments;
    }
    if (ast.loc) {
        // If the source was empty, some parsers give loc.{start,end}.line
        // values of 0, instead of the minimum of 1.
        util.fixFaultyLocations(ast, lines);
    }
    else {
        ast.loc = {
            start: lines.firstPos(),
            end: lines.lastPos()
        };
    }
    ast.loc.lines = lines;
    ast.loc.indent = 0;
    var file;
    var program;
    if (ast.type === "Program") {
        program = ast;
        // In order to ensure we reprint leading and trailing program
        // comments, wrap the original Program node with a File node. Only
        // ESTree parsers (Acorn and Esprima) return a Program as the root AST
        // node. Most other (Babylon-like) parsers return a File.
        file = b.file(ast, options.sourceFileName || null);
        file.loc = {
            start: lines.firstPos(),
            end: lines.lastPos(),
            lines: lines,
            indent: 0
        };
    }
    else if (ast.type === "File") {
        file = ast;
        program = file.program;
    }
    // Expose file.tokens unless the caller passed false for options.tokens.
    if (options.tokens) {
        file.tokens = tokens;
    }
    // Expand the Program's .loc to include all comments (not just those
    // attached to the Program node, as its children may have comments as
    // well), since sometimes program.loc.{start,end} will coincide with the
    // .loc.{start,end} of the first and last *statements*, mistakenly
    // excluding comments that fall outside that region.
    var trueProgramLoc = util.getTrueLoc({
        type: program.type,
        loc: program.loc,
        body: [],
        comments: comments
    }, lines);
    program.loc.start = trueProgramLoc.start;
    program.loc.end = trueProgramLoc.end;
    // Passing file.program here instead of just file means that initial
    // comments will be attached to program.body[0] instead of program.
    comments_1.attach(comments, program.body.length ? file.program : file, lines);
    // Return a copy of the original AST so that any changes made may be
    // compared to the original.
    return new TreeCopier(lines, tokens).copy(file);
}
exports.parse = parse;
;
var TreeCopier = function TreeCopier(lines, tokens) {
    assert_1.default.ok(this instanceof TreeCopier);
    this.lines = lines;
    this.tokens = tokens;
    this.startTokenIndex = 0;
    this.endTokenIndex = tokens.length;
    this.indent = 0;
    this.seen = new Map;
};
var TCp = TreeCopier.prototype;
TCp.copy = function (node) {
    if (this.seen.has(node)) {
        return this.seen.get(node);
    }
    if (isArray.check(node)) {
        var copy = new Array(node.length);
        this.seen.set(node, copy);
        node.forEach(function (item, i) {
            copy[i] = this.copy(item);
        }, this);
        return copy;
    }
    if (!isObject.check(node)) {
        return node;
    }
    util.fixFaultyLocations(node, this.lines);
    var copy = Object.create(Object.getPrototypeOf(node), {
        original: {
            value: node,
            configurable: false,
            enumerable: false,
            writable: true
        }
    });
    this.seen.set(node, copy);
    var loc = node.loc;
    var oldIndent = this.indent;
    var newIndent = oldIndent;
    var oldStartTokenIndex = this.startTokenIndex;
    var oldEndTokenIndex = this.endTokenIndex;
    if (loc) {
        // When node is a comment, we set node.loc.indent to
        // node.loc.start.column so that, when/if we print the comment by
        // itself, we can strip that much whitespace from the left margin of
        // the comment. This only really matters for multiline Block comments,
        // but it doesn't hurt for Line comments.
        if (node.type === "Block" || node.type === "Line" ||
            node.type === "CommentBlock" || node.type === "CommentLine" ||
            this.lines.isPrecededOnlyByWhitespace(loc.start)) {
            newIndent = this.indent = loc.start.column;
        }
        // Every node.loc has a reference to the original source lines as well
        // as a complete list of source tokens.
        loc.lines = this.lines;
        loc.tokens = this.tokens;
        loc.indent = newIndent;
        // Set loc.start.token and loc.end.token such that
        // loc.tokens.slice(loc.start.token, loc.end.token) returns a list of
        // all the tokens that make up this node.
        this.findTokenRange(loc);
    }
    var keys = Object.keys(node);
    var keyCount = keys.length;
    for (var i = 0; i < keyCount; ++i) {
        var key = keys[i];
        if (key === "loc") {
            copy[key] = node[key];
        }
        else if (key === "tokens" &&
            node.type === "File") {
            // Preserve file.tokens (uncopied) in case client code cares about
            // it, even though Recast ignores it when reprinting.
            copy[key] = node[key];
        }
        else {
            copy[key] = this.copy(node[key]);
        }
    }
    this.indent = oldIndent;
    this.startTokenIndex = oldStartTokenIndex;
    this.endTokenIndex = oldEndTokenIndex;
    return copy;
};
// If we didn't have any idea where in loc.tokens to look for tokens
// contained by this loc, a binary search would be appropriate, but
// because we maintain this.startTokenIndex and this.endTokenIndex as we
// traverse the AST, we only need to make small (linear) adjustments to
// those indexes with each recursive iteration.
TCp.findTokenRange = function (loc) {
    // In the unlikely event that loc.tokens[this.startTokenIndex] starts
    // *after* loc.start, we need to rewind this.startTokenIndex first.
    while (this.startTokenIndex > 0) {
        var token = loc.tokens[this.startTokenIndex];
        if (util.comparePos(loc.start, token.loc.start) < 0) {
            --this.startTokenIndex;
        }
        else
            break;
    }
    // In the unlikely event that loc.tokens[this.endTokenIndex - 1] ends
    // *before* loc.end, we need to fast-forward this.endTokenIndex first.
    while (this.endTokenIndex < loc.tokens.length) {
        var token = loc.tokens[this.endTokenIndex];
        if (util.comparePos(token.loc.end, loc.end) < 0) {
            ++this.endTokenIndex;
        }
        else
            break;
    }
    // Increment this.startTokenIndex until we've found the first token
    // contained by this node.
    while (this.startTokenIndex < this.endTokenIndex) {
        var token = loc.tokens[this.startTokenIndex];
        if (util.comparePos(token.loc.start, loc.start) < 0) {
            ++this.startTokenIndex;
        }
        else
            break;
    }
    // Index into loc.tokens of the first token within this node.
    loc.start.token = this.startTokenIndex;
    // Decrement this.endTokenIndex until we've found the first token after
    // this node (not contained by the node).
    while (this.endTokenIndex > this.startTokenIndex) {
        var token = loc.tokens[this.endTokenIndex - 1];
        if (util.comparePos(loc.end, token.loc.end) < 0) {
            --this.endTokenIndex;
        }
        else
            break;
    }
    // Index into loc.tokens of the first token *after* this node.
    // If loc.start.token === loc.end.token, the node contains no tokens,
    // and the index is that of the next token following this node.
    loc.end.token = this.endTokenIndex;
};

}, function(modId) { var map = {"./types":1561468592479,"./options":1561468592481,"./lines":1561468592484,"./comments":1561468592486,"./util":1561468592483}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592481, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var defaults = {
    parser: require("../parsers/esprima"),
    tabWidth: 4,
    useTabs: false,
    reuseWhitespace: true,
    lineTerminator: require("os").EOL || "\n",
    wrapColumn: 74,
    sourceFileName: null,
    sourceMapName: null,
    sourceRoot: null,
    inputSourceMap: null,
    range: false,
    tolerant: true,
    quote: null,
    trailingComma: false,
    arrayBracketSpacing: false,
    objectCurlySpacing: true,
    arrowParensAlways: false,
    flowObjectCommas: true,
    tokens: true
}, hasOwn = defaults.hasOwnProperty;
// Copy options and fill in default values.
function normalize(opts) {
    var options = opts || defaults;
    function get(key) {
        return hasOwn.call(options, key)
            ? options[key]
            : defaults[key];
    }
    return {
        tabWidth: +get("tabWidth"),
        useTabs: !!get("useTabs"),
        reuseWhitespace: !!get("reuseWhitespace"),
        lineTerminator: get("lineTerminator"),
        wrapColumn: Math.max(get("wrapColumn"), 0),
        sourceFileName: get("sourceFileName"),
        sourceMapName: get("sourceMapName"),
        sourceRoot: get("sourceRoot"),
        inputSourceMap: get("inputSourceMap"),
        parser: get("esprima") || get("parser"),
        range: get("range"),
        tolerant: get("tolerant"),
        quote: get("quote"),
        trailingComma: get("trailingComma"),
        arrayBracketSpacing: get("arrayBracketSpacing"),
        objectCurlySpacing: get("objectCurlySpacing"),
        arrowParensAlways: get("arrowParensAlways"),
        flowObjectCommas: get("flowObjectCommas"),
        tokens: !!get("tokens")
    };
}
exports.normalize = normalize;
;

}, function(modId) { var map = {"../parsers/esprima":1561468592482}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592482, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
// This module is suitable for passing as options.parser when calling
// recast.parse to process ECMAScript code with Esprima:
//
//   const ast = recast.parse(source, {
//     parser: require("recast/parsers/esprima")
//   });
//
var util_1 = require("../lib/util");
function parse(source, options) {
    var comments = [];
    var ast = require("esprima").parse(source, {
        loc: true,
        locations: true,
        comment: true,
        onComment: comments,
        range: util_1.getOption(options, "range", false),
        tolerant: util_1.getOption(options, "tolerant", true),
        tokens: true
    });
    if (!Array.isArray(ast.comments)) {
        ast.comments = comments;
    }
    return ast;
}
exports.parse = parse;
;

}, function(modId) { var map = {"../lib/util":1561468592483,"esprima":1561468592482}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592483, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var types_1 = __importDefault(require("./types"));
var n = types_1.default.namedTypes;
var source_map_1 = __importDefault(require("source-map"));
var SourceMapConsumer = source_map_1.default.SourceMapConsumer;
var SourceMapGenerator = source_map_1.default.SourceMapGenerator;
var hasOwn = Object.prototype.hasOwnProperty;
function getOption(options, key, defaultValue) {
    if (options && hasOwn.call(options, key)) {
        return options[key];
    }
    return defaultValue;
}
exports.getOption = getOption;
function getUnionOfKeys() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var result = {};
    var argc = args.length;
    for (var i = 0; i < argc; ++i) {
        var keys = Object.keys(args[i]);
        var keyCount = keys.length;
        for (var j = 0; j < keyCount; ++j) {
            result[keys[j]] = true;
        }
    }
    return result;
}
exports.getUnionOfKeys = getUnionOfKeys;
function comparePos(pos1, pos2) {
    return (pos1.line - pos2.line) || (pos1.column - pos2.column);
}
exports.comparePos = comparePos;
function copyPos(pos) {
    return {
        line: pos.line,
        column: pos.column
    };
}
exports.copyPos = copyPos;
function composeSourceMaps(formerMap, latterMap) {
    if (formerMap) {
        if (!latterMap) {
            return formerMap;
        }
    }
    else {
        return latterMap || null;
    }
    var smcFormer = new SourceMapConsumer(formerMap);
    var smcLatter = new SourceMapConsumer(latterMap);
    var smg = new SourceMapGenerator({
        file: latterMap.file,
        sourceRoot: latterMap.sourceRoot
    });
    var sourcesToContents = {};
    smcLatter.eachMapping(function (mapping) {
        var origPos = smcFormer.originalPositionFor({
            line: mapping.originalLine,
            column: mapping.originalColumn
        });
        var sourceName = origPos.source;
        if (sourceName === null) {
            return;
        }
        smg.addMapping({
            source: sourceName,
            original: copyPos(origPos),
            generated: {
                line: mapping.generatedLine,
                column: mapping.generatedColumn
            },
            name: mapping.name
        });
        var sourceContent = smcFormer.sourceContentFor(sourceName);
        if (sourceContent && !hasOwn.call(sourcesToContents, sourceName)) {
            sourcesToContents[sourceName] = sourceContent;
            smg.setSourceContent(sourceName, sourceContent);
        }
    });
    return smg.toJSON();
}
exports.composeSourceMaps = composeSourceMaps;
;
function getTrueLoc(node, lines) {
    // It's possible that node is newly-created (not parsed by Esprima),
    // in which case it probably won't have a .loc property (or an
    // .original property for that matter). That's fine; we'll just
    // pretty-print it as usual.
    if (!node.loc) {
        return null;
    }
    var result = {
        start: node.loc.start,
        end: node.loc.end
    };
    function include(node) {
        expandLoc(result, node.loc);
    }
    // If the node is an export declaration and its .declaration has any
    // decorators, their locations might contribute to the true start/end
    // positions of the export declaration node.
    if (node.declaration &&
        node.declaration.decorators &&
        isExportDeclaration(node)) {
        node.declaration.decorators.forEach(include);
    }
    if (comparePos(result.start, result.end) < 0) {
        // Trim leading whitespace.
        result.start = copyPos(result.start);
        lines.skipSpaces(result.start, false, true);
        if (comparePos(result.start, result.end) < 0) {
            // Trim trailing whitespace, if the end location is not already the
            // same as the start location.
            result.end = copyPos(result.end);
            lines.skipSpaces(result.end, true, true);
        }
    }
    // If the node has any comments, their locations might contribute to
    // the true start/end positions of the node.
    if (node.comments) {
        node.comments.forEach(include);
    }
    return result;
}
exports.getTrueLoc = getTrueLoc;
;
function expandLoc(parentLoc, childLoc) {
    if (parentLoc && childLoc) {
        if (comparePos(childLoc.start, parentLoc.start) < 0) {
            parentLoc.start = childLoc.start;
        }
        if (comparePos(parentLoc.end, childLoc.end) < 0) {
            parentLoc.end = childLoc.end;
        }
    }
}
function fixFaultyLocations(node, lines) {
    var loc = node.loc;
    if (loc) {
        if (loc.start.line < 1) {
            loc.start.line = 1;
        }
        if (loc.end.line < 1) {
            loc.end.line = 1;
        }
    }
    if (node.type === "File") {
        // Babylon returns File nodes whose .loc.{start,end} do not include
        // leading or trailing whitespace.
        loc.start = lines.firstPos();
        loc.end = lines.lastPos();
    }
    fixForLoopHead(node, lines);
    fixTemplateLiteral(node, lines);
    if (loc && node.decorators) {
        // Expand the .loc of the node responsible for printing the decorators
        // (here, the decorated node) so that it includes node.decorators.
        node.decorators.forEach(function (decorator) {
            expandLoc(loc, decorator.loc);
        });
    }
    else if (node.declaration && isExportDeclaration(node)) {
        // Nullify .loc information for the child declaration so that we never
        // try to reprint it without also reprinting the export declaration.
        node.declaration.loc = null;
        // Expand the .loc of the node responsible for printing the decorators
        // (here, the export declaration) so that it includes node.decorators.
        var decorators = node.declaration.decorators;
        if (decorators) {
            decorators.forEach(function (decorator) {
                expandLoc(loc, decorator.loc);
            });
        }
    }
    else if ((n.MethodDefinition && n.MethodDefinition.check(node)) ||
        (n.Property.check(node) && (node.method || node.shorthand))) {
        // If the node is a MethodDefinition or a .method or .shorthand
        // Property, then the location information stored in
        // node.value.loc is very likely untrustworthy (just the {body}
        // part of a method, or nothing in the case of shorthand
        // properties), so we null out that information to prevent
        // accidental reuse of bogus source code during reprinting.
        node.value.loc = null;
        if (n.FunctionExpression.check(node.value)) {
            // FunctionExpression method values should be anonymous,
            // because their .id fields are ignored anyway.
            node.value.id = null;
        }
    }
    else if (node.type === "ObjectTypeProperty") {
        var loc = node.loc;
        var end = loc && loc.end;
        if (end) {
            end = copyPos(end);
            if (lines.prevPos(end) &&
                lines.charAt(end) === ",") {
                // Some parsers accidentally include trailing commas in the
                // .loc.end information for ObjectTypeProperty nodes.
                if ((end = lines.skipSpaces(end, true, true))) {
                    loc.end = end;
                }
            }
        }
    }
}
exports.fixFaultyLocations = fixFaultyLocations;
;
function fixForLoopHead(node, lines) {
    if (node.type !== "ForStatement") {
        return;
    }
    function fix(child) {
        var loc = child && child.loc;
        var start = loc && loc.start;
        var end = loc && copyPos(loc.end);
        while (start && end && comparePos(start, end) < 0) {
            lines.prevPos(end);
            if (lines.charAt(end) === ";") {
                // Update child.loc.end to *exclude* the ';' character.
                loc.end.line = end.line;
                loc.end.column = end.column;
            }
            else {
                break;
            }
        }
    }
    fix(node.init);
    fix(node.test);
    fix(node.update);
}
function fixTemplateLiteral(node, lines) {
    if (node.type !== "TemplateLiteral") {
        return;
    }
    if (node.quasis.length === 0) {
        // If there are no quasi elements, then there is nothing to fix.
        return;
    }
    // node.loc is not present when using export default with a template literal
    if (node.loc) {
        // First we need to exclude the opening ` from the .loc of the first
        // quasi element, in case the parser accidentally decided to include it.
        var afterLeftBackTickPos = copyPos(node.loc.start);
        assert_1.default.strictEqual(lines.charAt(afterLeftBackTickPos), "`");
        assert_1.default.ok(lines.nextPos(afterLeftBackTickPos));
        var firstQuasi = node.quasis[0];
        if (comparePos(firstQuasi.loc.start, afterLeftBackTickPos) < 0) {
            firstQuasi.loc.start = afterLeftBackTickPos;
        }
        // Next we need to exclude the closing ` from the .loc of the last quasi
        // element, in case the parser accidentally decided to include it.
        var rightBackTickPos = copyPos(node.loc.end);
        assert_1.default.ok(lines.prevPos(rightBackTickPos));
        assert_1.default.strictEqual(lines.charAt(rightBackTickPos), "`");
        var lastQuasi = node.quasis[node.quasis.length - 1];
        if (comparePos(rightBackTickPos, lastQuasi.loc.end) < 0) {
            lastQuasi.loc.end = rightBackTickPos;
        }
    }
    // Now we need to exclude ${ and } characters from the .loc's of all
    // quasi elements, since some parsers accidentally include them.
    node.expressions.forEach(function (expr, i) {
        // Rewind from expr.loc.start over any whitespace and the ${ that
        // precedes the expression. The position of the $ should be the same
        // as the .loc.end of the preceding quasi element, but some parsers
        // accidentally include the ${ in the .loc of the quasi element.
        var dollarCurlyPos = lines.skipSpaces(expr.loc.start, true, false);
        if (lines.prevPos(dollarCurlyPos) &&
            lines.charAt(dollarCurlyPos) === "{" &&
            lines.prevPos(dollarCurlyPos) &&
            lines.charAt(dollarCurlyPos) === "$") {
            var quasiBefore = node.quasis[i];
            if (comparePos(dollarCurlyPos, quasiBefore.loc.end) < 0) {
                quasiBefore.loc.end = dollarCurlyPos;
            }
        }
        // Likewise, some parsers accidentally include the } that follows
        // the expression in the .loc of the following quasi element.
        var rightCurlyPos = lines.skipSpaces(expr.loc.end, false, false);
        if (lines.charAt(rightCurlyPos) === "}") {
            assert_1.default.ok(lines.nextPos(rightCurlyPos));
            // Now rightCurlyPos is technically the position just after the }.
            var quasiAfter = node.quasis[i + 1];
            if (comparePos(quasiAfter.loc.start, rightCurlyPos) < 0) {
                quasiAfter.loc.start = rightCurlyPos;
            }
        }
    });
}
function isExportDeclaration(node) {
    if (node)
        switch (node.type) {
            case "ExportDeclaration":
            case "ExportDefaultDeclaration":
            case "ExportDefaultSpecifier":
            case "DeclareExportDeclaration":
            case "ExportNamedDeclaration":
            case "ExportAllDeclaration":
                return true;
        }
    return false;
}
exports.isExportDeclaration = isExportDeclaration;
;
function getParentExportDeclaration(path) {
    var parentNode = path.getParentNode();
    if (path.getName() === "declaration" &&
        isExportDeclaration(parentNode)) {
        return parentNode;
    }
    return null;
}
exports.getParentExportDeclaration = getParentExportDeclaration;
;
function isTrailingCommaEnabled(options, context) {
    var trailingComma = options.trailingComma;
    if (typeof trailingComma === "object") {
        return !!trailingComma[context];
    }
    return !!trailingComma;
}
exports.isTrailingCommaEnabled = isTrailingCommaEnabled;
;

}, function(modId) { var map = {"./types":1561468592479}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592484, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var source_map_1 = __importDefault(require("source-map"));
var options_1 = require("./options");
var util_1 = require("./util");
var mapping_1 = __importDefault(require("./mapping"));
var Lines = /** @class */ (function () {
    function Lines(infos, sourceFileName) {
        if (sourceFileName === void 0) { sourceFileName = null; }
        this.infos = infos;
        this.mappings = [];
        this.cachedSourceMap = null;
        this.cachedTabWidth = void 0;
        assert_1.default.ok(infos.length > 0);
        this.length = infos.length;
        this.name = sourceFileName || null;
        if (this.name) {
            this.mappings.push(new mapping_1.default(this, {
                start: this.firstPos(),
                end: this.lastPos(),
            }));
        }
    }
    Lines.prototype.toString = function (options) {
        return this.sliceString(this.firstPos(), this.lastPos(), options);
    };
    Lines.prototype.getSourceMap = function (sourceMapName, sourceRoot) {
        if (!sourceMapName) {
            // Although we could make up a name or generate an anonymous
            // source map, instead we assume that any consumer who does not
            // provide a name does not actually want a source map.
            return null;
        }
        var targetLines = this;
        function updateJSON(json) {
            json = json || {};
            json.file = sourceMapName;
            if (sourceRoot) {
                json.sourceRoot = sourceRoot;
            }
            return json;
        }
        if (targetLines.cachedSourceMap) {
            // Since Lines objects are immutable, we can reuse any source map
            // that was previously generated. Nevertheless, we return a new
            // JSON object here to protect the cached source map from outside
            // modification.
            return updateJSON(targetLines.cachedSourceMap.toJSON());
        }
        var smg = new source_map_1.default.SourceMapGenerator(updateJSON());
        var sourcesToContents = {};
        targetLines.mappings.forEach(function (mapping) {
            var sourceCursor = mapping.sourceLines.skipSpaces(mapping.sourceLoc.start) || mapping.sourceLines.lastPos();
            var targetCursor = targetLines.skipSpaces(mapping.targetLoc.start) || targetLines.lastPos();
            while (util_1.comparePos(sourceCursor, mapping.sourceLoc.end) < 0 &&
                util_1.comparePos(targetCursor, mapping.targetLoc.end) < 0) {
                var sourceChar = mapping.sourceLines.charAt(sourceCursor);
                var targetChar = targetLines.charAt(targetCursor);
                assert_1.default.strictEqual(sourceChar, targetChar);
                var sourceName = mapping.sourceLines.name;
                // Add mappings one character at a time for maximum resolution.
                smg.addMapping({
                    source: sourceName,
                    original: { line: sourceCursor.line,
                        column: sourceCursor.column },
                    generated: { line: targetCursor.line,
                        column: targetCursor.column }
                });
                if (!hasOwn.call(sourcesToContents, sourceName)) {
                    var sourceContent = mapping.sourceLines.toString();
                    smg.setSourceContent(sourceName, sourceContent);
                    sourcesToContents[sourceName] = sourceContent;
                }
                targetLines.nextPos(targetCursor, true);
                mapping.sourceLines.nextPos(sourceCursor, true);
            }
        });
        targetLines.cachedSourceMap = smg;
        return smg.toJSON();
    };
    Lines.prototype.bootstrapCharAt = function (pos) {
        assert_1.default.strictEqual(typeof pos, "object");
        assert_1.default.strictEqual(typeof pos.line, "number");
        assert_1.default.strictEqual(typeof pos.column, "number");
        var line = pos.line, column = pos.column, strings = this.toString().split(lineTerminatorSeqExp), string = strings[line - 1];
        if (typeof string === "undefined")
            return "";
        if (column === string.length &&
            line < strings.length)
            return "\n";
        if (column >= string.length)
            return "";
        return string.charAt(column);
    };
    Lines.prototype.charAt = function (pos) {
        assert_1.default.strictEqual(typeof pos, "object");
        assert_1.default.strictEqual(typeof pos.line, "number");
        assert_1.default.strictEqual(typeof pos.column, "number");
        var line = pos.line, column = pos.column, secret = this, infos = secret.infos, info = infos[line - 1], c = column;
        if (typeof info === "undefined" || c < 0)
            return "";
        var indent = this.getIndentAt(line);
        if (c < indent)
            return " ";
        c += info.sliceStart - indent;
        if (c === info.sliceEnd &&
            line < this.length)
            return "\n";
        if (c >= info.sliceEnd)
            return "";
        return info.line.charAt(c);
    };
    Lines.prototype.stripMargin = function (width, skipFirstLine) {
        if (width === 0)
            return this;
        assert_1.default.ok(width > 0, "negative margin: " + width);
        if (skipFirstLine && this.length === 1)
            return this;
        var lines = new Lines(this.infos.map(function (info, i) {
            if (info.line && (i > 0 || !skipFirstLine)) {
                info = __assign({}, info, { indent: Math.max(0, info.indent - width) });
            }
            return info;
        }));
        if (this.mappings.length > 0) {
            var newMappings = lines.mappings;
            assert_1.default.strictEqual(newMappings.length, 0);
            this.mappings.forEach(function (mapping) {
                newMappings.push(mapping.indent(width, skipFirstLine, true));
            });
        }
        return lines;
    };
    Lines.prototype.indent = function (by) {
        if (by === 0) {
            return this;
        }
        var lines = new Lines(this.infos.map(function (info) {
            if (info.line && !info.locked) {
                info = __assign({}, info, { indent: info.indent + by });
            }
            return info;
        }));
        if (this.mappings.length > 0) {
            var newMappings = lines.mappings;
            assert_1.default.strictEqual(newMappings.length, 0);
            this.mappings.forEach(function (mapping) {
                newMappings.push(mapping.indent(by));
            });
        }
        return lines;
    };
    Lines.prototype.indentTail = function (by) {
        if (by === 0) {
            return this;
        }
        if (this.length < 2) {
            return this;
        }
        var lines = new Lines(this.infos.map(function (info, i) {
            if (i > 0 && info.line && !info.locked) {
                info = __assign({}, info, { indent: info.indent + by });
            }
            return info;
        }));
        if (this.mappings.length > 0) {
            var newMappings = lines.mappings;
            assert_1.default.strictEqual(newMappings.length, 0);
            this.mappings.forEach(function (mapping) {
                newMappings.push(mapping.indent(by, true));
            });
        }
        return lines;
    };
    Lines.prototype.lockIndentTail = function () {
        if (this.length < 2) {
            return this;
        }
        return new Lines(this.infos.map(function (info, i) {
            return __assign({}, info, { locked: i > 0 });
        }));
    };
    Lines.prototype.getIndentAt = function (line) {
        assert_1.default.ok(line >= 1, "no line " + line + " (line numbers start from 1)");
        return Math.max(this.infos[line - 1].indent, 0);
    };
    Lines.prototype.guessTabWidth = function () {
        if (typeof this.cachedTabWidth === "number") {
            return this.cachedTabWidth;
        }
        var counts = []; // Sparse array.
        var lastIndent = 0;
        for (var line = 1, last = this.length; line <= last; ++line) {
            var info = this.infos[line - 1];
            var sliced = info.line.slice(info.sliceStart, info.sliceEnd);
            // Whitespace-only lines don't tell us much about the likely tab
            // width of this code.
            if (isOnlyWhitespace(sliced)) {
                continue;
            }
            var diff = Math.abs(info.indent - lastIndent);
            counts[diff] = ~~counts[diff] + 1;
            lastIndent = info.indent;
        }
        var maxCount = -1;
        var result = 2;
        for (var tabWidth = 1; tabWidth < counts.length; tabWidth += 1) {
            if (hasOwn.call(counts, tabWidth) &&
                counts[tabWidth] > maxCount) {
                maxCount = counts[tabWidth];
                result = tabWidth;
            }
        }
        return this.cachedTabWidth = result;
    };
    // Determine if the list of lines has a first line that starts with a //
    // or /* comment. If this is the case, the code may need to be wrapped in
    // parens to avoid ASI issues.
    Lines.prototype.startsWithComment = function () {
        if (this.infos.length === 0) {
            return false;
        }
        var firstLineInfo = this.infos[0], sliceStart = firstLineInfo.sliceStart, sliceEnd = firstLineInfo.sliceEnd, firstLine = firstLineInfo.line.slice(sliceStart, sliceEnd).trim();
        return firstLine.length === 0 ||
            firstLine.slice(0, 2) === "//" ||
            firstLine.slice(0, 2) === "/*";
    };
    Lines.prototype.isOnlyWhitespace = function () {
        return isOnlyWhitespace(this.toString());
    };
    Lines.prototype.isPrecededOnlyByWhitespace = function (pos) {
        var info = this.infos[pos.line - 1];
        var indent = Math.max(info.indent, 0);
        var diff = pos.column - indent;
        if (diff <= 0) {
            // If pos.column does not exceed the indentation amount, then
            // there must be only whitespace before it.
            return true;
        }
        var start = info.sliceStart;
        var end = Math.min(start + diff, info.sliceEnd);
        var prefix = info.line.slice(start, end);
        return isOnlyWhitespace(prefix);
    };
    Lines.prototype.getLineLength = function (line) {
        var info = this.infos[line - 1];
        return this.getIndentAt(line) + info.sliceEnd - info.sliceStart;
    };
    Lines.prototype.nextPos = function (pos, skipSpaces) {
        if (skipSpaces === void 0) { skipSpaces = false; }
        var l = Math.max(pos.line, 0), c = Math.max(pos.column, 0);
        if (c < this.getLineLength(l)) {
            pos.column += 1;
            return skipSpaces
                ? !!this.skipSpaces(pos, false, true)
                : true;
        }
        if (l < this.length) {
            pos.line += 1;
            pos.column = 0;
            return skipSpaces
                ? !!this.skipSpaces(pos, false, true)
                : true;
        }
        return false;
    };
    Lines.prototype.prevPos = function (pos, skipSpaces) {
        if (skipSpaces === void 0) { skipSpaces = false; }
        var l = pos.line, c = pos.column;
        if (c < 1) {
            l -= 1;
            if (l < 1)
                return false;
            c = this.getLineLength(l);
        }
        else {
            c = Math.min(c - 1, this.getLineLength(l));
        }
        pos.line = l;
        pos.column = c;
        return skipSpaces
            ? !!this.skipSpaces(pos, true, true)
            : true;
    };
    Lines.prototype.firstPos = function () {
        // Trivial, but provided for completeness.
        return { line: 1, column: 0 };
    };
    Lines.prototype.lastPos = function () {
        return {
            line: this.length,
            column: this.getLineLength(this.length)
        };
    };
    Lines.prototype.skipSpaces = function (pos, backward, modifyInPlace) {
        if (backward === void 0) { backward = false; }
        if (modifyInPlace === void 0) { modifyInPlace = false; }
        if (pos) {
            pos = modifyInPlace ? pos : {
                line: pos.line,
                column: pos.column
            };
        }
        else if (backward) {
            pos = this.lastPos();
        }
        else {
            pos = this.firstPos();
        }
        if (backward) {
            while (this.prevPos(pos)) {
                if (!isOnlyWhitespace(this.charAt(pos)) &&
                    this.nextPos(pos)) {
                    return pos;
                }
            }
            return null;
        }
        else {
            while (isOnlyWhitespace(this.charAt(pos))) {
                if (!this.nextPos(pos)) {
                    return null;
                }
            }
            return pos;
        }
    };
    Lines.prototype.trimLeft = function () {
        var pos = this.skipSpaces(this.firstPos(), false, true);
        return pos ? this.slice(pos) : emptyLines;
    };
    Lines.prototype.trimRight = function () {
        var pos = this.skipSpaces(this.lastPos(), true, true);
        return pos ? this.slice(this.firstPos(), pos) : emptyLines;
    };
    Lines.prototype.trim = function () {
        var start = this.skipSpaces(this.firstPos(), false, true);
        if (start === null) {
            return emptyLines;
        }
        var end = this.skipSpaces(this.lastPos(), true, true);
        if (end === null) {
            return emptyLines;
        }
        return this.slice(start, end);
    };
    Lines.prototype.eachPos = function (callback, startPos, skipSpaces) {
        if (startPos === void 0) { startPos = this.firstPos(); }
        if (skipSpaces === void 0) { skipSpaces = false; }
        var pos = this.firstPos();
        if (startPos) {
            pos.line = startPos.line,
                pos.column = startPos.column;
        }
        if (skipSpaces && !this.skipSpaces(pos, false, true)) {
            return; // Encountered nothing but spaces.
        }
        do
            callback.call(this, pos);
        while (this.nextPos(pos, skipSpaces));
    };
    Lines.prototype.bootstrapSlice = function (start, end) {
        var strings = this.toString().split(lineTerminatorSeqExp).slice(start.line - 1, end.line);
        if (strings.length > 0) {
            strings.push(strings.pop().slice(0, end.column));
            strings[0] = strings[0].slice(start.column);
        }
        return fromString(strings.join("\n"));
    };
    Lines.prototype.slice = function (start, end) {
        if (!end) {
            if (!start) {
                // The client seems to want a copy of this Lines object, but
                // Lines objects are immutable, so it's perfectly adequate to
                // return the same object.
                return this;
            }
            // Slice to the end if no end position was provided.
            end = this.lastPos();
        }
        if (!start) {
            throw new Error("cannot slice with end but not start");
        }
        var sliced = this.infos.slice(start.line - 1, end.line);
        if (start.line === end.line) {
            sliced[0] = sliceInfo(sliced[0], start.column, end.column);
        }
        else {
            assert_1.default.ok(start.line < end.line);
            sliced[0] = sliceInfo(sliced[0], start.column);
            sliced.push(sliceInfo(sliced.pop(), 0, end.column));
        }
        var lines = new Lines(sliced);
        if (this.mappings.length > 0) {
            var newMappings = lines.mappings;
            assert_1.default.strictEqual(newMappings.length, 0);
            this.mappings.forEach(function (mapping) {
                var sliced = mapping.slice(this, start, end);
                if (sliced) {
                    newMappings.push(sliced);
                }
            }, this);
        }
        return lines;
    };
    Lines.prototype.bootstrapSliceString = function (start, end, options) {
        return this.slice(start, end).toString(options);
    };
    Lines.prototype.sliceString = function (start, end, options) {
        if (start === void 0) { start = this.firstPos(); }
        if (end === void 0) { end = this.lastPos(); }
        options = options_1.normalize(options);
        var parts = [];
        var _a = options.tabWidth, tabWidth = _a === void 0 ? 2 : _a;
        for (var line = start.line; line <= end.line; ++line) {
            var info = this.infos[line - 1];
            if (line === start.line) {
                if (line === end.line) {
                    info = sliceInfo(info, start.column, end.column);
                }
                else {
                    info = sliceInfo(info, start.column);
                }
            }
            else if (line === end.line) {
                info = sliceInfo(info, 0, end.column);
            }
            var indent = Math.max(info.indent, 0);
            var before = info.line.slice(0, info.sliceStart);
            if (options.reuseWhitespace &&
                isOnlyWhitespace(before) &&
                countSpaces(before, options.tabWidth) === indent) {
                // Reuse original spaces if the indentation is correct.
                parts.push(info.line.slice(0, info.sliceEnd));
                continue;
            }
            var tabs = 0;
            var spaces = indent;
            if (options.useTabs) {
                tabs = Math.floor(indent / tabWidth);
                spaces -= tabs * tabWidth;
            }
            var result = "";
            if (tabs > 0) {
                result += new Array(tabs + 1).join("\t");
            }
            if (spaces > 0) {
                result += new Array(spaces + 1).join(" ");
            }
            result += info.line.slice(info.sliceStart, info.sliceEnd);
            parts.push(result);
        }
        return parts.join(options.lineTerminator);
    };
    Lines.prototype.isEmpty = function () {
        return this.length < 2 && this.getLineLength(1) < 1;
    };
    Lines.prototype.join = function (elements) {
        var separator = this;
        var infos = [];
        var mappings = [];
        var prevInfo;
        function appendLines(linesOrNull) {
            if (linesOrNull === null) {
                return;
            }
            if (prevInfo) {
                var info = linesOrNull.infos[0];
                var indent = new Array(info.indent + 1).join(" ");
                var prevLine = infos.length;
                var prevColumn = Math.max(prevInfo.indent, 0) +
                    prevInfo.sliceEnd - prevInfo.sliceStart;
                prevInfo.line = prevInfo.line.slice(0, prevInfo.sliceEnd) + indent + info.line.slice(info.sliceStart, info.sliceEnd);
                // If any part of a line is indentation-locked, the whole line
                // will be indentation-locked.
                prevInfo.locked = prevInfo.locked || info.locked;
                prevInfo.sliceEnd = prevInfo.line.length;
                if (linesOrNull.mappings.length > 0) {
                    linesOrNull.mappings.forEach(function (mapping) {
                        mappings.push(mapping.add(prevLine, prevColumn));
                    });
                }
            }
            else if (linesOrNull.mappings.length > 0) {
                mappings.push.apply(mappings, linesOrNull.mappings);
            }
            linesOrNull.infos.forEach(function (info, i) {
                if (!prevInfo || i > 0) {
                    prevInfo = __assign({}, info);
                    infos.push(prevInfo);
                }
            });
        }
        function appendWithSeparator(linesOrNull, i) {
            if (i > 0)
                appendLines(separator);
            appendLines(linesOrNull);
        }
        elements.map(function (elem) {
            var lines = fromString(elem);
            if (lines.isEmpty())
                return null;
            return lines;
        }).forEach(function (linesOrNull, i) {
            if (separator.isEmpty()) {
                appendLines(linesOrNull);
            }
            else {
                appendWithSeparator(linesOrNull, i);
            }
        });
        if (infos.length < 1)
            return emptyLines;
        var lines = new Lines(infos);
        lines.mappings = mappings;
        return lines;
    };
    Lines.prototype.concat = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var list = [this];
        list.push.apply(list, args);
        assert_1.default.strictEqual(list.length, args.length + 1);
        return emptyLines.join(list);
    };
    return Lines;
}());
exports.Lines = Lines;
var fromStringCache = {};
var hasOwn = fromStringCache.hasOwnProperty;
var maxCacheKeyLen = 10;
function countSpaces(spaces, tabWidth) {
    var count = 0;
    var len = spaces.length;
    for (var i = 0; i < len; ++i) {
        switch (spaces.charCodeAt(i)) {
            case 9: // '\t'
                assert_1.default.strictEqual(typeof tabWidth, "number");
                assert_1.default.ok(tabWidth > 0);
                var next = Math.ceil(count / tabWidth) * tabWidth;
                if (next === count) {
                    count += tabWidth;
                }
                else {
                    count = next;
                }
                break;
            case 11: // '\v'
            case 12: // '\f'
            case 13: // '\r'
            case 0xfeff: // zero-width non-breaking space
                // These characters contribute nothing to indentation.
                break;
            case 32: // ' '
            default: // Treat all other whitespace like ' '.
                count += 1;
                break;
        }
    }
    return count;
}
exports.countSpaces = countSpaces;
var leadingSpaceExp = /^\s*/;
// As specified here: http://www.ecma-international.org/ecma-262/6.0/#sec-line-terminators
var lineTerminatorSeqExp = /\u000D\u000A|\u000D(?!\u000A)|\u000A|\u2028|\u2029/;
/**
 * @param {Object} options - Options object that configures printing.
 */
function fromString(string, options) {
    if (string instanceof Lines)
        return string;
    string += "";
    var tabWidth = options && options.tabWidth;
    var tabless = string.indexOf("\t") < 0;
    var cacheable = !options && tabless && (string.length <= maxCacheKeyLen);
    assert_1.default.ok(tabWidth || tabless, "No tab width specified but encountered tabs in string\n" + string);
    if (cacheable && hasOwn.call(fromStringCache, string))
        return fromStringCache[string];
    var lines = new Lines(string.split(lineTerminatorSeqExp).map(function (line) {
        // TODO: handle null exec result
        var spaces = leadingSpaceExp.exec(line)[0];
        return {
            line: line,
            indent: countSpaces(spaces, tabWidth),
            // Boolean indicating whether this line can be reindented.
            locked: false,
            sliceStart: spaces.length,
            sliceEnd: line.length
        };
    }), options_1.normalize(options).sourceFileName);
    if (cacheable)
        fromStringCache[string] = lines;
    return lines;
}
exports.fromString = fromString;
function isOnlyWhitespace(string) {
    return !/\S/.test(string);
}
function sliceInfo(info, startCol, endCol) {
    var sliceStart = info.sliceStart;
    var sliceEnd = info.sliceEnd;
    var indent = Math.max(info.indent, 0);
    var lineLength = indent + sliceEnd - sliceStart;
    if (typeof endCol === "undefined") {
        endCol = lineLength;
    }
    startCol = Math.max(startCol, 0);
    endCol = Math.min(endCol, lineLength);
    endCol = Math.max(endCol, startCol);
    if (endCol < indent) {
        indent = endCol;
        sliceEnd = sliceStart;
    }
    else {
        sliceEnd -= lineLength - endCol;
    }
    lineLength = endCol;
    lineLength -= startCol;
    if (startCol < indent) {
        indent -= startCol;
    }
    else {
        startCol -= indent;
        indent = 0;
        sliceStart += startCol;
    }
    assert_1.default.ok(indent >= 0);
    assert_1.default.ok(sliceStart <= sliceEnd);
    assert_1.default.strictEqual(lineLength, indent + sliceEnd - sliceStart);
    if (info.indent === indent &&
        info.sliceStart === sliceStart &&
        info.sliceEnd === sliceEnd) {
        return info;
    }
    return {
        line: info.line,
        indent: indent,
        // A destructive slice always unlocks indentation.
        locked: false,
        sliceStart: sliceStart,
        sliceEnd: sliceEnd
    };
}
function concat(elements) {
    return emptyLines.join(elements);
}
exports.concat = concat;
;
// The emptyLines object needs to be created all the way down here so that
// Lines.prototype will be fully populated.
var emptyLines = fromString("");

}, function(modId) { var map = {"./options":1561468592481,"./util":1561468592483,"./mapping":1561468592485}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592485, function(require, module, exports) {
;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var util_1 = require("./util");
var Mapping = /** @class */ (function () {
    function Mapping(sourceLines, sourceLoc, targetLoc) {
        if (targetLoc === void 0) { targetLoc = sourceLoc; }
        this.sourceLines = sourceLines;
        this.sourceLoc = sourceLoc;
        this.targetLoc = targetLoc;
    }
    Mapping.prototype.slice = function (lines, start, end) {
        if (end === void 0) { end = lines.lastPos(); }
        var sourceLines = this.sourceLines;
        var sourceLoc = this.sourceLoc;
        var targetLoc = this.targetLoc;
        function skip(name) {
            var sourceFromPos = sourceLoc[name];
            var targetFromPos = targetLoc[name];
            var targetToPos = start;
            if (name === "end") {
                targetToPos = end;
            }
            else {
                assert_1.default.strictEqual(name, "start");
            }
            return skipChars(sourceLines, sourceFromPos, lines, targetFromPos, targetToPos);
        }
        if (util_1.comparePos(start, targetLoc.start) <= 0) {
            if (util_1.comparePos(targetLoc.end, end) <= 0) {
                targetLoc = {
                    start: subtractPos(targetLoc.start, start.line, start.column),
                    end: subtractPos(targetLoc.end, start.line, start.column)
                };
                // The sourceLoc can stay the same because the contents of the
                // targetLoc have not changed.
            }
            else if (util_1.comparePos(end, targetLoc.start) <= 0) {
                return null;
            }
            else {
                sourceLoc = {
                    start: sourceLoc.start,
                    end: skip("end")
                };
                targetLoc = {
                    start: subtractPos(targetLoc.start, start.line, start.column),
                    end: subtractPos(end, start.line, start.column)
                };
            }
        }
        else {
            if (util_1.comparePos(targetLoc.end, start) <= 0) {
                return null;
            }
            if (util_1.comparePos(targetLoc.end, end) <= 0) {
                sourceLoc = {
                    start: skip("start"),
                    end: sourceLoc.end
                };
                targetLoc = {
                    // Same as subtractPos(start, start.line, start.column):
                    start: { line: 1, column: 0 },
                    end: subtractPos(targetLoc.end, start.line, start.column)
                };
            }
            else {
                sourceLoc = {
                    start: skip("start"),
                    end: skip("end")
                };
                targetLoc = {
                    // Same as subtractPos(start, start.line, start.column):
                    start: { line: 1, column: 0 },
                    end: subtractPos(end, start.line, start.column)
                };
            }
        }
        return new Mapping(this.sourceLines, sourceLoc, targetLoc);
    };
    Mapping.prototype.add = function (line, column) {
        return new Mapping(this.sourceLines, this.sourceLoc, {
            start: addPos(this.targetLoc.start, line, column),
            end: addPos(this.targetLoc.end, line, column)
        });
    };
    Mapping.prototype.subtract = function (line, column) {
        return new Mapping(this.sourceLines, this.sourceLoc, {
            start: subtractPos(this.targetLoc.start, line, column),
            end: subtractPos(this.targetLoc.end, line, column)
        });
    };
    Mapping.prototype.indent = function (by, skipFirstLine, noNegativeColumns) {
        if (skipFirstLine === void 0) { skipFirstLine = false; }
        if (noNegativeColumns === void 0) { noNegativeColumns = false; }
        if (by === 0) {
            return this;
        }
        var targetLoc = this.targetLoc;
        var startLine = targetLoc.start.line;
        var endLine = targetLoc.end.line;
        if (skipFirstLine && startLine === 1 && endLine === 1) {
            return this;
        }
        targetLoc = {
            start: targetLoc.start,
            end: targetLoc.end
        };
        if (!skipFirstLine || startLine > 1) {
            var startColumn = targetLoc.start.column + by;
            targetLoc.start = {
                line: startLine,
                column: noNegativeColumns
                    ? Math.max(0, startColumn)
                    : startColumn
            };
        }
        if (!skipFirstLine || endLine > 1) {
            var endColumn = targetLoc.end.column + by;
            targetLoc.end = {
                line: endLine,
                column: noNegativeColumns
                    ? Math.max(0, endColumn)
                    : endColumn
            };
        }
        return new Mapping(this.sourceLines, this.sourceLoc, targetLoc);
    };
    return Mapping;
}());
exports.default = Mapping;
function addPos(toPos, line, column) {
    return {
        line: toPos.line + line - 1,
        column: (toPos.line === 1)
            ? toPos.column + column
            : toPos.column
    };
}
function subtractPos(fromPos, line, column) {
    return {
        line: fromPos.line - line + 1,
        column: (fromPos.line === line)
            ? fromPos.column - column
            : fromPos.column
    };
}
function skipChars(sourceLines, sourceFromPos, targetLines, targetFromPos, targetToPos) {
    var targetComparison = util_1.comparePos(targetFromPos, targetToPos);
    if (targetComparison === 0) {
        // Trivial case: no characters to skip.
        return sourceFromPos;
    }
    if (targetComparison < 0) {
        // Skipping forward.
        var sourceCursor = sourceLines.skipSpaces(sourceFromPos) || sourceLines.lastPos();
        var targetCursor = targetLines.skipSpaces(targetFromPos) || targetLines.lastPos();
        var lineDiff = targetToPos.line - targetCursor.line;
        sourceCursor.line += lineDiff;
        targetCursor.line += lineDiff;
        if (lineDiff > 0) {
            // If jumping to later lines, reset columns to the beginnings
            // of those lines.
            sourceCursor.column = 0;
            targetCursor.column = 0;
        }
        else {
            assert_1.default.strictEqual(lineDiff, 0);
        }
        while (util_1.comparePos(targetCursor, targetToPos) < 0 &&
            targetLines.nextPos(targetCursor, true)) {
            assert_1.default.ok(sourceLines.nextPos(sourceCursor, true));
            assert_1.default.strictEqual(sourceLines.charAt(sourceCursor), targetLines.charAt(targetCursor));
        }
    }
    else {
        // Skipping backward.
        var sourceCursor = sourceLines.skipSpaces(sourceFromPos, true) || sourceLines.firstPos();
        var targetCursor = targetLines.skipSpaces(targetFromPos, true) || targetLines.firstPos();
        var lineDiff = targetToPos.line - targetCursor.line;
        sourceCursor.line += lineDiff;
        targetCursor.line += lineDiff;
        if (lineDiff < 0) {
            // If jumping to earlier lines, reset columns to the ends of
            // those lines.
            sourceCursor.column = sourceLines.getLineLength(sourceCursor.line);
            targetCursor.column = targetLines.getLineLength(targetCursor.line);
        }
        else {
            assert_1.default.strictEqual(lineDiff, 0);
        }
        while (util_1.comparePos(targetToPos, targetCursor) < 0 &&
            targetLines.prevPos(targetCursor, true)) {
            assert_1.default.ok(sourceLines.prevPos(sourceCursor, true));
            assert_1.default.strictEqual(sourceLines.charAt(sourceCursor), targetLines.charAt(targetCursor));
        }
    }
    return sourceCursor;
}
module.exports = exports["default"];

}, function(modId) { var map = {"./util":1561468592483}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592486, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var types_1 = __importDefault(require("./types"));
var n = types_1.default.namedTypes;
var isArray = types_1.default.builtInTypes.array;
var isObject = types_1.default.builtInTypes.object;
var lines_1 = require("./lines");
var util_1 = require("./util");
var private_1 = require("private");
var childNodesCacheKey = private_1.makeUniqueKey();
// TODO Move a non-caching implementation of this function into ast-types,
// and implement a caching wrapper function here.
function getSortedChildNodes(node, lines, resultArray) {
    if (!node) {
        return;
    }
    // The .loc checks below are sensitive to some of the problems that
    // are fixed by this utility function. Specifically, if it decides to
    // set node.loc to null, indicating that the node's .loc information
    // is unreliable, then we don't want to add node to the resultArray.
    util_1.fixFaultyLocations(node, lines);
    if (resultArray) {
        if (n.Node.check(node) &&
            n.SourceLocation.check(node.loc)) {
            // This reverse insertion sort almost always takes constant
            // time because we almost always (maybe always?) append the
            // nodes in order anyway.
            for (var i = resultArray.length - 1; i >= 0; --i) {
                if (util_1.comparePos(resultArray[i].loc.end, node.loc.start) <= 0) {
                    break;
                }
            }
            resultArray.splice(i + 1, 0, node);
            return;
        }
    }
    else if (node[childNodesCacheKey]) {
        return node[childNodesCacheKey];
    }
    var names;
    if (isArray.check(node)) {
        names = Object.keys(node);
    }
    else if (isObject.check(node)) {
        names = types_1.default.getFieldNames(node);
    }
    else {
        return;
    }
    if (!resultArray) {
        Object.defineProperty(node, childNodesCacheKey, {
            value: resultArray = [],
            enumerable: false
        });
    }
    for (var i = 0, nameCount = names.length; i < nameCount; ++i) {
        getSortedChildNodes(node[names[i]], lines, resultArray);
    }
    return resultArray;
}
// As efficiently as possible, decorate the comment object with
// .precedingNode, .enclosingNode, and/or .followingNode properties, at
// least one of which is guaranteed to be defined.
function decorateComment(node, comment, lines) {
    var childNodes = getSortedChildNodes(node, lines);
    // Time to dust off the old binary search robes and wizard hat.
    var left = 0, right = childNodes.length;
    while (left < right) {
        var middle = (left + right) >> 1;
        var child = childNodes[middle];
        if (util_1.comparePos(child.loc.start, comment.loc.start) <= 0 &&
            util_1.comparePos(comment.loc.end, child.loc.end) <= 0) {
            // The comment is completely contained by this child node.
            decorateComment(comment.enclosingNode = child, comment, lines);
            return; // Abandon the binary search at this level.
        }
        if (util_1.comparePos(child.loc.end, comment.loc.start) <= 0) {
            // This child node falls completely before the comment.
            // Because we will never consider this node or any nodes
            // before it again, this node must be the closest preceding
            // node we have encountered so far.
            var precedingNode = child;
            left = middle + 1;
            continue;
        }
        if (util_1.comparePos(comment.loc.end, child.loc.start) <= 0) {
            // This child node falls completely after the comment.
            // Because we will never consider this node or any nodes after
            // it again, this node must be the closest following node we
            // have encountered so far.
            var followingNode = child;
            right = middle;
            continue;
        }
        throw new Error("Comment location overlaps with node location");
    }
    if (precedingNode) {
        comment.precedingNode = precedingNode;
    }
    if (followingNode) {
        comment.followingNode = followingNode;
    }
}
function attach(comments, ast, lines) {
    if (!isArray.check(comments)) {
        return;
    }
    var tiesToBreak = [];
    comments.forEach(function (comment) {
        comment.loc.lines = lines;
        decorateComment(ast, comment, lines);
        var pn = comment.precedingNode;
        var en = comment.enclosingNode;
        var fn = comment.followingNode;
        if (pn && fn) {
            var tieCount = tiesToBreak.length;
            if (tieCount > 0) {
                var lastTie = tiesToBreak[tieCount - 1];
                assert_1.default.strictEqual(lastTie.precedingNode === comment.precedingNode, lastTie.followingNode === comment.followingNode);
                if (lastTie.followingNode !== comment.followingNode) {
                    breakTies(tiesToBreak, lines);
                }
            }
            tiesToBreak.push(comment);
        }
        else if (pn) {
            // No contest: we have a trailing comment.
            breakTies(tiesToBreak, lines);
            addTrailingComment(pn, comment);
        }
        else if (fn) {
            // No contest: we have a leading comment.
            breakTies(tiesToBreak, lines);
            addLeadingComment(fn, comment);
        }
        else if (en) {
            // The enclosing node has no child nodes at all, so what we
            // have here is a dangling comment, e.g. [/* crickets */].
            breakTies(tiesToBreak, lines);
            addDanglingComment(en, comment);
        }
        else {
            throw new Error("AST contains no nodes at all?");
        }
    });
    breakTies(tiesToBreak, lines);
    comments.forEach(function (comment) {
        // These node references were useful for breaking ties, but we
        // don't need them anymore, and they create cycles in the AST that
        // may lead to infinite recursion if we don't delete them here.
        delete comment.precedingNode;
        delete comment.enclosingNode;
        delete comment.followingNode;
    });
}
exports.attach = attach;
;
function breakTies(tiesToBreak, lines) {
    var tieCount = tiesToBreak.length;
    if (tieCount === 0) {
        return;
    }
    var pn = tiesToBreak[0].precedingNode;
    var fn = tiesToBreak[0].followingNode;
    var gapEndPos = fn.loc.start;
    // Iterate backwards through tiesToBreak, examining the gaps
    // between the tied comments. In order to qualify as leading, a
    // comment must be separated from fn by an unbroken series of
    // whitespace-only gaps (or other comments).
    for (var indexOfFirstLeadingComment = tieCount; indexOfFirstLeadingComment > 0; --indexOfFirstLeadingComment) {
        var comment = tiesToBreak[indexOfFirstLeadingComment - 1];
        assert_1.default.strictEqual(comment.precedingNode, pn);
        assert_1.default.strictEqual(comment.followingNode, fn);
        var gap = lines.sliceString(comment.loc.end, gapEndPos);
        if (/\S/.test(gap)) {
            // The gap string contained something other than whitespace.
            break;
        }
        gapEndPos = comment.loc.start;
    }
    while (indexOfFirstLeadingComment <= tieCount &&
        (comment = tiesToBreak[indexOfFirstLeadingComment]) &&
        // If the comment is a //-style comment and indented more
        // deeply than the node itself, reconsider it as trailing.
        (comment.type === "Line" || comment.type === "CommentLine") &&
        comment.loc.start.column > fn.loc.start.column) {
        ++indexOfFirstLeadingComment;
    }
    tiesToBreak.forEach(function (comment, i) {
        if (i < indexOfFirstLeadingComment) {
            addTrailingComment(pn, comment);
        }
        else {
            addLeadingComment(fn, comment);
        }
    });
    tiesToBreak.length = 0;
}
function addCommentHelper(node, comment) {
    var comments = node.comments || (node.comments = []);
    comments.push(comment);
}
function addLeadingComment(node, comment) {
    comment.leading = true;
    comment.trailing = false;
    addCommentHelper(node, comment);
}
function addDanglingComment(node, comment) {
    comment.leading = false;
    comment.trailing = false;
    addCommentHelper(node, comment);
}
function addTrailingComment(node, comment) {
    comment.leading = false;
    comment.trailing = true;
    addCommentHelper(node, comment);
}
function printLeadingComment(commentPath, print) {
    var comment = commentPath.getValue();
    n.Comment.assert(comment);
    var loc = comment.loc;
    var lines = loc && loc.lines;
    var parts = [print(commentPath)];
    if (comment.trailing) {
        // When we print trailing comments as leading comments, we don't
        // want to bring any trailing spaces along.
        parts.push("\n");
    }
    else if (lines instanceof lines_1.Lines) {
        var trailingSpace = lines.slice(loc.end, lines.skipSpaces(loc.end) || lines.lastPos());
        if (trailingSpace.length === 1) {
            // If the trailing space contains no newlines, then we want to
            // preserve it exactly as we found it.
            parts.push(trailingSpace);
        }
        else {
            // If the trailing space contains newlines, then replace it
            // with just that many newlines, with all other spaces removed.
            parts.push(new Array(trailingSpace.length).join("\n"));
        }
    }
    else {
        parts.push("\n");
    }
    return lines_1.concat(parts);
}
function printTrailingComment(commentPath, print) {
    var comment = commentPath.getValue(commentPath);
    n.Comment.assert(comment);
    var loc = comment.loc;
    var lines = loc && loc.lines;
    var parts = [];
    if (lines instanceof lines_1.Lines) {
        var fromPos = lines.skipSpaces(loc.start, true) || lines.firstPos();
        var leadingSpace = lines.slice(fromPos, loc.start);
        if (leadingSpace.length === 1) {
            // If the leading space contains no newlines, then we want to
            // preserve it exactly as we found it.
            parts.push(leadingSpace);
        }
        else {
            // If the leading space contains newlines, then replace it
            // with just that many newlines, sans all other spaces.
            parts.push(new Array(leadingSpace.length).join("\n"));
        }
    }
    parts.push(print(commentPath));
    return lines_1.concat(parts);
}
function printComments(path, print) {
    var value = path.getValue();
    var innerLines = print(path);
    var comments = n.Node.check(value) &&
        types_1.default.getFieldValue(value, "comments");
    if (!comments || comments.length === 0) {
        return innerLines;
    }
    var leadingParts = [];
    var trailingParts = [innerLines];
    path.each(function (commentPath) {
        var comment = commentPath.getValue();
        var leading = types_1.default.getFieldValue(comment, "leading");
        var trailing = types_1.default.getFieldValue(comment, "trailing");
        if (leading || (trailing && !(n.Statement.check(value) ||
            comment.type === "Block" ||
            comment.type === "CommentBlock"))) {
            leadingParts.push(printLeadingComment(commentPath, print));
        }
        else if (trailing) {
            trailingParts.push(printTrailingComment(commentPath, print));
        }
    }, "comments");
    leadingParts.push.apply(leadingParts, trailingParts);
    return lines_1.concat(leadingParts);
}
exports.printComments = printComments;
;

}, function(modId) { var map = {"./types":1561468592479,"./lines":1561468592484,"./util":1561468592483}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592487, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var comments_1 = require("./comments");
var lines_1 = require("./lines");
var options_1 = require("./options");
var patcher_1 = require("./patcher");
var types_1 = __importDefault(require("./types"));
var namedTypes = types_1.default.namedTypes;
var isString = types_1.default.builtInTypes.string;
var isObject = types_1.default.builtInTypes.object;
var fast_path_1 = __importDefault(require("./fast-path"));
var util = __importStar(require("./util"));
var PrintResult = function PrintResult(code, sourceMap) {
    assert_1.default.ok(this instanceof PrintResult);
    isString.assert(code);
    this.code = code;
    if (sourceMap) {
        isObject.assert(sourceMap);
        this.map = sourceMap;
    }
};
var PRp = PrintResult.prototype;
var warnedAboutToString = false;
PRp.toString = function () {
    if (!warnedAboutToString) {
        console.warn("Deprecation warning: recast.print now returns an object with " +
            "a .code property. You appear to be treating the object as a " +
            "string, which might still work but is strongly discouraged.");
        warnedAboutToString = true;
    }
    return this.code;
};
var emptyPrintResult = new PrintResult("");
var Printer = function Printer(config) {
    assert_1.default.ok(this instanceof Printer);
    var explicitTabWidth = config && config.tabWidth;
    config = options_1.normalize(config);
    // It's common for client code to pass the same options into both
    // recast.parse and recast.print, but the Printer doesn't need (and
    // can be confused by) config.sourceFileName, so we null it out.
    config.sourceFileName = null;
    // Non-destructively modifies options with overrides, and returns a
    // new print function that uses the modified options.
    function makePrintFunctionWith(options, overrides) {
        options = Object.assign({}, options, overrides);
        return function (path) {
            return print(path, options);
        };
    }
    function print(path, options) {
        assert_1.default.ok(path instanceof fast_path_1.default);
        options = options || {};
        if (options.includeComments) {
            return comments_1.printComments(path, makePrintFunctionWith(options, {
                includeComments: false
            }));
        }
        var oldTabWidth = config.tabWidth;
        if (!explicitTabWidth) {
            var loc = path.getNode().loc;
            if (loc && loc.lines && loc.lines.guessTabWidth) {
                config.tabWidth = loc.lines.guessTabWidth();
            }
        }
        var reprinter = patcher_1.getReprinter(path);
        var lines = reprinter
            // Since the print function that we pass to the reprinter will
            // be used to print "new" nodes, it's tempting to think we
            // should pass printRootGenerically instead of print, to avoid
            // calling maybeReprint again, but that would be a mistake
            // because the new nodes might not be entirely new, but merely
            // moved from elsewhere in the AST. The print function is the
            // right choice because it gives us the opportunity to reprint
            // such nodes using their original source.
            ? reprinter(print)
            : genericPrint(path, config, options, makePrintFunctionWith(options, {
                includeComments: true,
                avoidRootParens: false
            }));
        config.tabWidth = oldTabWidth;
        return lines;
    }
    this.print = function (ast) {
        if (!ast) {
            return emptyPrintResult;
        }
        var lines = print(fast_path_1.default.from(ast), {
            includeComments: true,
            avoidRootParens: false
        });
        return new PrintResult(lines.toString(config), util.composeSourceMaps(config.inputSourceMap, lines.getSourceMap(config.sourceMapName, config.sourceRoot)));
    };
    this.printGenerically = function (ast) {
        if (!ast) {
            return emptyPrintResult;
        }
        // Print the entire AST generically.
        function printGenerically(path) {
            return comments_1.printComments(path, function (path) {
                return genericPrint(path, config, {
                    includeComments: true,
                    avoidRootParens: false
                }, printGenerically);
            });
        }
        var path = fast_path_1.default.from(ast);
        var oldReuseWhitespace = config.reuseWhitespace;
        // Do not reuse whitespace (or anything else, for that matter)
        // when printing generically.
        config.reuseWhitespace = false;
        // TODO Allow printing of comments?
        var pr = new PrintResult(printGenerically(path).toString(config));
        config.reuseWhitespace = oldReuseWhitespace;
        return pr;
    };
};
exports.Printer = Printer;
function genericPrint(path, config, options, printPath) {
    assert_1.default.ok(path instanceof fast_path_1.default);
    var node = path.getValue();
    var parts = [];
    var linesWithoutParens = genericPrintNoParens(path, config, printPath);
    if (!node || linesWithoutParens.isEmpty()) {
        return linesWithoutParens;
    }
    var shouldAddParens = false;
    var decoratorsLines = printDecorators(path, printPath);
    if (decoratorsLines.isEmpty()) {
        // Nodes with decorators can't have parentheses, so we can avoid
        // computing path.needsParens() except in this case.
        if (!options.avoidRootParens) {
            shouldAddParens = path.needsParens();
        }
    }
    else {
        parts.push(decoratorsLines);
    }
    if (shouldAddParens) {
        parts.unshift("(");
    }
    parts.push(linesWithoutParens);
    if (shouldAddParens) {
        parts.push(")");
    }
    return lines_1.concat(parts);
}
// Note that the `options` parameter of this function is what other
// functions in this file call the `config` object (that is, the
// configuration object originally passed into the Printer constructor).
// Its properties are documented in lib/options.js.
function genericPrintNoParens(path, options, print) {
    var n = path.getValue();
    if (!n) {
        return lines_1.fromString("");
    }
    if (typeof n === "string") {
        return lines_1.fromString(n, options);
    }
    namedTypes.Printable.assert(n);
    var parts = [];
    switch (n.type) {
        case "File":
            return path.call(print, "program");
        case "Program":
            // Babel 6
            if (n.directives) {
                path.each(function (childPath) {
                    parts.push(print(childPath), ";\n");
                }, "directives");
            }
            if (n.interpreter) {
                parts.push(path.call(print, "interpreter"));
            }
            parts.push(path.call(function (bodyPath) {
                return printStatementSequence(bodyPath, options, print);
            }, "body"));
            return lines_1.concat(parts);
        case "Noop": // Babel extension.
        case "EmptyStatement":
            return lines_1.fromString("");
        case "ExpressionStatement":
            return lines_1.concat([path.call(print, "expression"), ";"]);
        case "ParenthesizedExpression": // Babel extension.
            return lines_1.concat(["(", path.call(print, "expression"), ")"]);
        case "BinaryExpression":
        case "LogicalExpression":
        case "AssignmentExpression":
            return lines_1.fromString(" ").join([
                path.call(print, "left"),
                n.operator,
                path.call(print, "right")
            ]);
        case "AssignmentPattern":
            return lines_1.concat([
                path.call(print, "left"),
                " = ",
                path.call(print, "right")
            ]);
        case "MemberExpression":
        case "OptionalMemberExpression":
            parts.push(path.call(print, "object"));
            var property = path.call(print, "property");
            var optional = n.type === "OptionalMemberExpression";
            if (n.computed) {
                parts.push(optional ? "?.[" : "[", property, "]");
            }
            else {
                parts.push(optional ? "?." : ".", property);
            }
            return lines_1.concat(parts);
        case "MetaProperty":
            return lines_1.concat([
                path.call(print, "meta"),
                ".",
                path.call(print, "property")
            ]);
        case "BindExpression":
            if (n.object) {
                parts.push(path.call(print, "object"));
            }
            parts.push("::", path.call(print, "callee"));
            return lines_1.concat(parts);
        case "Path":
            return lines_1.fromString(".").join(n.body);
        case "Identifier":
            return lines_1.concat([
                lines_1.fromString(n.name, options),
                n.optional ? "?" : "",
                path.call(print, "typeAnnotation")
            ]);
        case "SpreadElement":
        case "SpreadElementPattern":
        case "RestProperty": // Babel 6 for ObjectPattern
        case "SpreadProperty":
        case "SpreadPropertyPattern":
        case "ObjectTypeSpreadProperty":
        case "RestElement":
            return lines_1.concat([
                "...",
                path.call(print, "argument"),
                path.call(print, "typeAnnotation")
            ]);
        case "FunctionDeclaration":
        case "FunctionExpression":
        case "TSDeclareFunction":
            if (n.declare) {
                parts.push("declare ");
            }
            if (n.async) {
                parts.push("async ");
            }
            parts.push("function");
            if (n.generator)
                parts.push("*");
            if (n.id) {
                parts.push(" ", path.call(print, "id"), path.call(print, "typeParameters"));
            }
            parts.push("(", printFunctionParams(path, options, print), ")", path.call(print, "returnType"));
            if (n.body) {
                parts.push(" ", path.call(print, "body"));
            }
            return lines_1.concat(parts);
        case "ArrowFunctionExpression":
            if (n.async) {
                parts.push("async ");
            }
            if (n.typeParameters) {
                parts.push(path.call(print, "typeParameters"));
            }
            if (!options.arrowParensAlways &&
                n.params.length === 1 &&
                !n.rest &&
                n.params[0].type === 'Identifier' &&
                !n.params[0].typeAnnotation &&
                !n.returnType) {
                parts.push(path.call(print, "params", 0));
            }
            else {
                parts.push("(", printFunctionParams(path, options, print), ")", path.call(print, "returnType"));
            }
            parts.push(" => ", path.call(print, "body"));
            return lines_1.concat(parts);
        case "MethodDefinition":
            return printMethod(path, options, print);
        case "YieldExpression":
            parts.push("yield");
            if (n.delegate)
                parts.push("*");
            if (n.argument)
                parts.push(" ", path.call(print, "argument"));
            return lines_1.concat(parts);
        case "AwaitExpression":
            parts.push("await");
            if (n.all)
                parts.push("*");
            if (n.argument)
                parts.push(" ", path.call(print, "argument"));
            return lines_1.concat(parts);
        case "ModuleDeclaration":
            parts.push("module", path.call(print, "id"));
            if (n.source) {
                assert_1.default.ok(!n.body);
                parts.push("from", path.call(print, "source"));
            }
            else {
                parts.push(path.call(print, "body"));
            }
            return lines_1.fromString(" ").join(parts);
        case "ImportSpecifier":
            if (n.importKind && n.importKind !== "value") {
                parts.push(n.importKind + " ");
            }
            if (n.imported) {
                parts.push(path.call(print, "imported"));
                if (n.local &&
                    n.local.name !== n.imported.name) {
                    parts.push(" as ", path.call(print, "local"));
                }
            }
            else if (n.id) {
                parts.push(path.call(print, "id"));
                if (n.name) {
                    parts.push(" as ", path.call(print, "name"));
                }
            }
            return lines_1.concat(parts);
        case "ExportSpecifier":
            if (n.local) {
                parts.push(path.call(print, "local"));
                if (n.exported &&
                    n.exported.name !== n.local.name) {
                    parts.push(" as ", path.call(print, "exported"));
                }
            }
            else if (n.id) {
                parts.push(path.call(print, "id"));
                if (n.name) {
                    parts.push(" as ", path.call(print, "name"));
                }
            }
            return lines_1.concat(parts);
        case "ExportBatchSpecifier":
            return lines_1.fromString("*");
        case "ImportNamespaceSpecifier":
            parts.push("* as ");
            if (n.local) {
                parts.push(path.call(print, "local"));
            }
            else if (n.id) {
                parts.push(path.call(print, "id"));
            }
            return lines_1.concat(parts);
        case "ImportDefaultSpecifier":
            if (n.local) {
                return path.call(print, "local");
            }
            return path.call(print, "id");
        case "TSExportAssignment":
            return lines_1.concat(["export = ", path.call(print, "expression")]);
        case "ExportDeclaration":
        case "ExportDefaultDeclaration":
        case "ExportNamedDeclaration":
            return printExportDeclaration(path, options, print);
        case "ExportAllDeclaration":
            parts.push("export *");
            if (n.exported) {
                parts.push(" as ", path.call(print, "exported"));
            }
            parts.push(" from ", path.call(print, "source"), ";");
            return lines_1.concat(parts);
        case "TSNamespaceExportDeclaration":
            parts.push("export as namespace ", path.call(print, "id"));
            return maybeAddSemicolon(lines_1.concat(parts));
        case "ExportNamespaceSpecifier":
            return lines_1.concat(["* as ", path.call(print, "exported")]);
        case "ExportDefaultSpecifier":
            return path.call(print, "exported");
        case "Import":
            return lines_1.fromString("import", options);
        case "ImportDeclaration": {
            parts.push("import ");
            if (n.importKind && n.importKind !== "value") {
                parts.push(n.importKind + " ");
            }
            if (n.specifiers &&
                n.specifiers.length > 0) {
                var unbracedSpecifiers_1 = [];
                var bracedSpecifiers_1 = [];
                path.each(function (specifierPath) {
                    var spec = specifierPath.getValue();
                    if (spec.type === "ImportSpecifier") {
                        bracedSpecifiers_1.push(print(specifierPath));
                    }
                    else if (spec.type === "ImportDefaultSpecifier" ||
                        spec.type === "ImportNamespaceSpecifier") {
                        unbracedSpecifiers_1.push(print(specifierPath));
                    }
                }, "specifiers");
                unbracedSpecifiers_1.forEach(function (lines, i) {
                    if (i > 0) {
                        parts.push(", ");
                    }
                    parts.push(lines);
                });
                if (bracedSpecifiers_1.length > 0) {
                    var lines_2 = lines_1.fromString(", ").join(bracedSpecifiers_1);
                    if (lines_2.getLineLength(1) > options.wrapColumn) {
                        lines_2 = lines_1.concat([
                            lines_1.fromString(",\n").join(bracedSpecifiers_1).indent(options.tabWidth),
                            ","
                        ]);
                    }
                    if (unbracedSpecifiers_1.length > 0) {
                        parts.push(", ");
                    }
                    if (lines_2.length > 1) {
                        parts.push("{\n", lines_2, "\n}");
                    }
                    else if (options.objectCurlySpacing) {
                        parts.push("{ ", lines_2, " }");
                    }
                    else {
                        parts.push("{", lines_2, "}");
                    }
                }
                parts.push(" from ");
            }
            parts.push(path.call(print, "source"), ";");
            return lines_1.concat(parts);
        }
        case "BlockStatement":
            var naked = path.call(function (bodyPath) {
                return printStatementSequence(bodyPath, options, print);
            }, "body");
            if (naked.isEmpty()) {
                if (!n.directives || n.directives.length === 0) {
                    return lines_1.fromString("{}");
                }
            }
            parts.push("{\n");
            // Babel 6
            if (n.directives) {
                path.each(function (childPath) {
                    parts.push(print(childPath).indent(options.tabWidth), ";", n.directives.length > 1 || !naked.isEmpty() ? "\n" : "");
                }, "directives");
            }
            parts.push(naked.indent(options.tabWidth));
            parts.push("\n}");
            return lines_1.concat(parts);
        case "ReturnStatement":
            parts.push("return");
            if (n.argument) {
                var argLines = path.call(print, "argument");
                if (argLines.startsWithComment() ||
                    (argLines.length > 1 &&
                        namedTypes.JSXElement &&
                        namedTypes.JSXElement.check(n.argument))) {
                    parts.push(" (\n", argLines.indent(options.tabWidth), "\n)");
                }
                else {
                    parts.push(" ", argLines);
                }
            }
            parts.push(";");
            return lines_1.concat(parts);
        case "CallExpression":
        case "OptionalCallExpression":
            parts.push(path.call(print, "callee"));
            if (n.type === "OptionalCallExpression" &&
                n.callee.type !== "OptionalMemberExpression") {
                parts.push("?.");
            }
            parts.push(printArgumentsList(path, options, print));
            return lines_1.concat(parts);
        case "ObjectExpression":
        case "ObjectPattern":
        case "ObjectTypeAnnotation":
            var allowBreak = false;
            var isTypeAnnotation = n.type === "ObjectTypeAnnotation";
            var separator = options.flowObjectCommas ? "," : (isTypeAnnotation ? ";" : ",");
            var fields = [];
            if (isTypeAnnotation) {
                fields.push("indexers", "callProperties");
                if (n.internalSlots != null) {
                    fields.push("internalSlots");
                }
            }
            fields.push("properties");
            var len = 0;
            fields.forEach(function (field) {
                len += n[field].length;
            });
            var oneLine = (isTypeAnnotation && len === 1) || len === 0;
            var leftBrace = n.exact ? "{|" : "{";
            var rightBrace = n.exact ? "|}" : "}";
            parts.push(oneLine ? leftBrace : leftBrace + "\n");
            var leftBraceIndex = parts.length - 1;
            var i = 0;
            fields.forEach(function (field) {
                path.each(function (childPath) {
                    var lines = print(childPath);
                    if (!oneLine) {
                        lines = lines.indent(options.tabWidth);
                    }
                    var multiLine = !isTypeAnnotation && lines.length > 1;
                    if (multiLine && allowBreak) {
                        // Similar to the logic for BlockStatement.
                        parts.push("\n");
                    }
                    parts.push(lines);
                    if (i < len - 1) {
                        // Add an extra line break if the previous object property
                        // had a multi-line value.
                        parts.push(separator + (multiLine ? "\n\n" : "\n"));
                        allowBreak = !multiLine;
                    }
                    else if (len !== 1 && isTypeAnnotation) {
                        parts.push(separator);
                    }
                    else if (!oneLine && util.isTrailingCommaEnabled(options, "objects")) {
                        parts.push(separator);
                    }
                    i++;
                }, field);
            });
            if (n.inexact) {
                var line = lines_1.fromString("...", options);
                if (oneLine) {
                    if (len > 0) {
                        parts.push(separator, " ");
                    }
                    parts.push(line);
                }
                else {
                    // No trailing separator after ... to maintain parity with prettier.
                    parts.push("\n", line.indent(options.tabWidth));
                }
            }
            parts.push(oneLine ? rightBrace : "\n" + rightBrace);
            if (i !== 0 && oneLine && options.objectCurlySpacing) {
                parts[leftBraceIndex] = leftBrace + " ";
                parts[parts.length - 1] = " " + rightBrace;
            }
            if (n.typeAnnotation) {
                parts.push(path.call(print, "typeAnnotation"));
            }
            return lines_1.concat(parts);
        case "PropertyPattern":
            return lines_1.concat([
                path.call(print, "key"),
                ": ",
                path.call(print, "pattern")
            ]);
        case "ObjectProperty": // Babel 6
        case "Property": // Non-standard AST node type.
            if (n.method || n.kind === "get" || n.kind === "set") {
                return printMethod(path, options, print);
            }
            var key = path.call(print, "key");
            if (n.computed) {
                parts.push("[", key, "]");
            }
            else {
                parts.push(key);
            }
            if (!n.shorthand) {
                parts.push(": ", path.call(print, "value"));
            }
            return lines_1.concat(parts);
        case "ClassMethod": // Babel 6
        case "ObjectMethod": // Babel 6
        case "ClassPrivateMethod":
        case "TSDeclareMethod":
            return printMethod(path, options, print);
        case "PrivateName":
            return lines_1.concat(["#", path.call(print, "id")]);
        case "Decorator":
            return lines_1.concat(["@", path.call(print, "expression")]);
        case "ArrayExpression":
        case "ArrayPattern":
            var elems = n.elements, len = elems.length;
            var printed = path.map(print, "elements");
            var joined = lines_1.fromString(", ").join(printed);
            var oneLine = joined.getLineLength(1) <= options.wrapColumn;
            if (oneLine) {
                if (options.arrayBracketSpacing) {
                    parts.push("[ ");
                }
                else {
                    parts.push("[");
                }
            }
            else {
                parts.push("[\n");
            }
            path.each(function (elemPath) {
                var i = elemPath.getName();
                var elem = elemPath.getValue();
                if (!elem) {
                    // If the array expression ends with a hole, that hole
                    // will be ignored by the interpreter, but if it ends with
                    // two (or more) holes, we need to write out two (or more)
                    // commas so that the resulting code is interpreted with
                    // both (all) of the holes.
                    parts.push(",");
                }
                else {
                    var lines = printed[i];
                    if (oneLine) {
                        if (i > 0)
                            parts.push(" ");
                    }
                    else {
                        lines = lines.indent(options.tabWidth);
                    }
                    parts.push(lines);
                    if (i < len - 1 || (!oneLine && util.isTrailingCommaEnabled(options, "arrays")))
                        parts.push(",");
                    if (!oneLine)
                        parts.push("\n");
                }
            }, "elements");
            if (oneLine && options.arrayBracketSpacing) {
                parts.push(" ]");
            }
            else {
                parts.push("]");
            }
            return lines_1.concat(parts);
        case "SequenceExpression":
            return lines_1.fromString(", ").join(path.map(print, "expressions"));
        case "ThisExpression":
            return lines_1.fromString("this");
        case "Super":
            return lines_1.fromString("super");
        case "NullLiteral": // Babel 6 Literal split
            return lines_1.fromString("null");
        case "RegExpLiteral": // Babel 6 Literal split
            return lines_1.fromString(n.extra.raw);
        case "BigIntLiteral": // Babel 7 Literal split
            return lines_1.fromString(n.value + "n");
        case "NumericLiteral": // Babel 6 Literal Split
            // Keep original representation for numeric values not in base 10.
            if (n.extra &&
                typeof n.extra.raw === "string" &&
                Number(n.extra.raw) === n.value) {
                return lines_1.fromString(n.extra.raw, options);
            }
            return lines_1.fromString(n.value, options);
        case "BooleanLiteral": // Babel 6 Literal split
        case "StringLiteral": // Babel 6 Literal split
        case "Literal":
            // Numeric values may be in bases other than 10. Use their raw
            // representation if equivalent.
            if (typeof n.value === "number" &&
                typeof n.raw === "string" &&
                Number(n.raw) === n.value) {
                return lines_1.fromString(n.raw, options);
            }
            if (typeof n.value !== "string") {
                return lines_1.fromString(n.value, options);
            }
            return lines_1.fromString(nodeStr(n.value, options), options);
        case "Directive": // Babel 6
            return path.call(print, "value");
        case "DirectiveLiteral": // Babel 6
            return lines_1.fromString(nodeStr(n.value, options));
        case "InterpreterDirective":
            return lines_1.fromString("#!" + n.value + "\n", options);
        case "ModuleSpecifier":
            if (n.local) {
                throw new Error("The ESTree ModuleSpecifier type should be abstract");
            }
            // The Esprima ModuleSpecifier type is just a string-valued
            // Literal identifying the imported-from module.
            return lines_1.fromString(nodeStr(n.value, options), options);
        case "UnaryExpression":
            parts.push(n.operator);
            if (/[a-z]$/.test(n.operator))
                parts.push(" ");
            parts.push(path.call(print, "argument"));
            return lines_1.concat(parts);
        case "UpdateExpression":
            parts.push(path.call(print, "argument"), n.operator);
            if (n.prefix)
                parts.reverse();
            return lines_1.concat(parts);
        case "ConditionalExpression":
            return lines_1.concat([
                path.call(print, "test"),
                " ? ", path.call(print, "consequent"),
                " : ", path.call(print, "alternate")
            ]);
        case "NewExpression":
            parts.push("new ", path.call(print, "callee"));
            var args = n.arguments;
            if (args) {
                parts.push(printArgumentsList(path, options, print));
            }
            return lines_1.concat(parts);
        case "VariableDeclaration":
            if (n.declare) {
                parts.push("declare ");
            }
            parts.push(n.kind, " ");
            var maxLen = 0;
            var printed = path.map(function (childPath) {
                var lines = print(childPath);
                maxLen = Math.max(lines.length, maxLen);
                return lines;
            }, "declarations");
            if (maxLen === 1) {
                parts.push(lines_1.fromString(", ").join(printed));
            }
            else if (printed.length > 1) {
                parts.push(lines_1.fromString(",\n").join(printed)
                    .indentTail(n.kind.length + 1));
            }
            else {
                parts.push(printed[0]);
            }
            // We generally want to terminate all variable declarations with a
            // semicolon, except when they are children of for loops.
            var parentNode = path.getParentNode();
            if (!namedTypes.ForStatement.check(parentNode) &&
                !namedTypes.ForInStatement.check(parentNode) &&
                !(namedTypes.ForOfStatement &&
                    namedTypes.ForOfStatement.check(parentNode)) &&
                !(namedTypes.ForAwaitStatement &&
                    namedTypes.ForAwaitStatement.check(parentNode))) {
                parts.push(";");
            }
            return lines_1.concat(parts);
        case "VariableDeclarator":
            return n.init ? lines_1.fromString(" = ").join([
                path.call(print, "id"),
                path.call(print, "init")
            ]) : path.call(print, "id");
        case "WithStatement":
            return lines_1.concat([
                "with (",
                path.call(print, "object"),
                ") ",
                path.call(print, "body")
            ]);
        case "IfStatement":
            var con = adjustClause(path.call(print, "consequent"), options);
            parts.push("if (", path.call(print, "test"), ")", con);
            if (n.alternate)
                parts.push(endsWithBrace(con) ? " else" : "\nelse", adjustClause(path.call(print, "alternate"), options));
            return lines_1.concat(parts);
        case "ForStatement":
            // TODO Get the for (;;) case right.
            var init = path.call(print, "init"), sep = init.length > 1 ? ";\n" : "; ", forParen = "for (", indented = lines_1.fromString(sep).join([
                init,
                path.call(print, "test"),
                path.call(print, "update")
            ]).indentTail(forParen.length), head = lines_1.concat([forParen, indented, ")"]), clause = adjustClause(path.call(print, "body"), options);
            parts.push(head);
            if (head.length > 1) {
                parts.push("\n");
                clause = clause.trimLeft();
            }
            parts.push(clause);
            return lines_1.concat(parts);
        case "WhileStatement":
            return lines_1.concat([
                "while (",
                path.call(print, "test"),
                ")",
                adjustClause(path.call(print, "body"), options)
            ]);
        case "ForInStatement":
            // Note: esprima can't actually parse "for each (".
            return lines_1.concat([
                n.each ? "for each (" : "for (",
                path.call(print, "left"),
                " in ",
                path.call(print, "right"),
                ")",
                adjustClause(path.call(print, "body"), options)
            ]);
        case "ForOfStatement":
        case "ForAwaitStatement":
            parts.push("for ");
            if (n.await || n.type === "ForAwaitStatement") {
                parts.push("await ");
            }
            parts.push("(", path.call(print, "left"), " of ", path.call(print, "right"), ")", adjustClause(path.call(print, "body"), options));
            return lines_1.concat(parts);
        case "DoWhileStatement":
            var doBody = lines_1.concat([
                "do",
                adjustClause(path.call(print, "body"), options)
            ]);
            parts.push(doBody);
            if (endsWithBrace(doBody))
                parts.push(" while");
            else
                parts.push("\nwhile");
            parts.push(" (", path.call(print, "test"), ");");
            return lines_1.concat(parts);
        case "DoExpression":
            var statements = path.call(function (bodyPath) {
                return printStatementSequence(bodyPath, options, print);
            }, "body");
            return lines_1.concat([
                "do {\n",
                statements.indent(options.tabWidth),
                "\n}"
            ]);
        case "BreakStatement":
            parts.push("break");
            if (n.label)
                parts.push(" ", path.call(print, "label"));
            parts.push(";");
            return lines_1.concat(parts);
        case "ContinueStatement":
            parts.push("continue");
            if (n.label)
                parts.push(" ", path.call(print, "label"));
            parts.push(";");
            return lines_1.concat(parts);
        case "LabeledStatement":
            return lines_1.concat([
                path.call(print, "label"),
                ":\n",
                path.call(print, "body")
            ]);
        case "TryStatement":
            parts.push("try ", path.call(print, "block"));
            if (n.handler) {
                parts.push(" ", path.call(print, "handler"));
            }
            else if (n.handlers) {
                path.each(function (handlerPath) {
                    parts.push(" ", print(handlerPath));
                }, "handlers");
            }
            if (n.finalizer) {
                parts.push(" finally ", path.call(print, "finalizer"));
            }
            return lines_1.concat(parts);
        case "CatchClause":
            parts.push("catch ");
            if (n.param) {
                parts.push("(", path.call(print, "param"));
            }
            if (n.guard) {
                // Note: esprima does not recognize conditional catch clauses.
                parts.push(" if ", path.call(print, "guard"));
            }
            if (n.param) {
                parts.push(") ");
            }
            parts.push(path.call(print, "body"));
            return lines_1.concat(parts);
        case "ThrowStatement":
            return lines_1.concat(["throw ", path.call(print, "argument"), ";"]);
        case "SwitchStatement":
            return lines_1.concat([
                "switch (",
                path.call(print, "discriminant"),
                ") {\n",
                lines_1.fromString("\n").join(path.map(print, "cases")),
                "\n}"
            ]);
        // Note: ignoring n.lexical because it has no printing consequences.
        case "SwitchCase":
            if (n.test)
                parts.push("case ", path.call(print, "test"), ":");
            else
                parts.push("default:");
            if (n.consequent.length > 0) {
                parts.push("\n", path.call(function (consequentPath) {
                    return printStatementSequence(consequentPath, options, print);
                }, "consequent").indent(options.tabWidth));
            }
            return lines_1.concat(parts);
        case "DebuggerStatement":
            return lines_1.fromString("debugger;");
        // JSX extensions below.
        case "JSXAttribute":
            parts.push(path.call(print, "name"));
            if (n.value)
                parts.push("=", path.call(print, "value"));
            return lines_1.concat(parts);
        case "JSXIdentifier":
            return lines_1.fromString(n.name, options);
        case "JSXNamespacedName":
            return lines_1.fromString(":").join([
                path.call(print, "namespace"),
                path.call(print, "name")
            ]);
        case "JSXMemberExpression":
            return lines_1.fromString(".").join([
                path.call(print, "object"),
                path.call(print, "property")
            ]);
        case "JSXSpreadAttribute":
            return lines_1.concat(["{...", path.call(print, "argument"), "}"]);
        case "JSXSpreadChild":
            return lines_1.concat(["{...", path.call(print, "expression"), "}"]);
        case "JSXExpressionContainer":
            return lines_1.concat(["{", path.call(print, "expression"), "}"]);
        case "JSXElement":
        case "JSXFragment":
            var openingPropName = "opening" + (n.type === "JSXElement" ? "Element" : "Fragment");
            var closingPropName = "closing" + (n.type === "JSXElement" ? "Element" : "Fragment");
            var openingLines = path.call(print, openingPropName);
            if (n[openingPropName].selfClosing) {
                assert_1.default.ok(!n[closingPropName], "unexpected " + closingPropName + " element in self-closing " + n.type);
                return openingLines;
            }
            var childLines = lines_1.concat(path.map(function (childPath) {
                var child = childPath.getValue();
                if (namedTypes.Literal.check(child) &&
                    typeof child.value === "string") {
                    if (/\S/.test(child.value)) {
                        return child.value.replace(/^\s+|\s+$/g, "");
                    }
                    else if (/\n/.test(child.value)) {
                        return "\n";
                    }
                }
                return print(childPath);
            }, "children")).indentTail(options.tabWidth);
            var closingLines = path.call(print, closingPropName);
            return lines_1.concat([
                openingLines,
                childLines,
                closingLines
            ]);
        case "JSXOpeningElement":
            parts.push("<", path.call(print, "name"));
            var attrParts = [];
            path.each(function (attrPath) {
                attrParts.push(" ", print(attrPath));
            }, "attributes");
            var attrLines = lines_1.concat(attrParts);
            var needLineWrap = (attrLines.length > 1 ||
                attrLines.getLineLength(1) > options.wrapColumn);
            if (needLineWrap) {
                attrParts.forEach(function (part, i) {
                    if (part === " ") {
                        assert_1.default.strictEqual(i % 2, 0);
                        attrParts[i] = "\n";
                    }
                });
                attrLines = lines_1.concat(attrParts).indentTail(options.tabWidth);
            }
            parts.push(attrLines, n.selfClosing ? " />" : ">");
            return lines_1.concat(parts);
        case "JSXClosingElement":
            return lines_1.concat(["</", path.call(print, "name"), ">"]);
        case "JSXOpeningFragment":
            return lines_1.fromString("<>");
        case "JSXClosingFragment":
            return lines_1.fromString("</>");
        case "JSXText":
            return lines_1.fromString(n.value, options);
        case "JSXEmptyExpression":
            return lines_1.fromString("");
        case "TypeAnnotatedIdentifier":
            return lines_1.concat([
                path.call(print, "annotation"),
                " ",
                path.call(print, "identifier")
            ]);
        case "ClassBody":
            if (n.body.length === 0) {
                return lines_1.fromString("{}");
            }
            return lines_1.concat([
                "{\n",
                path.call(function (bodyPath) {
                    return printStatementSequence(bodyPath, options, print);
                }, "body").indent(options.tabWidth),
                "\n}"
            ]);
        case "ClassPropertyDefinition":
            parts.push("static ", path.call(print, "definition"));
            if (!namedTypes.MethodDefinition.check(n.definition))
                parts.push(";");
            return lines_1.concat(parts);
        case "ClassProperty":
            var access = n.accessibility || n.access;
            if (typeof access === "string") {
                parts.push(access, " ");
            }
            if (n.static) {
                parts.push("static ");
            }
            if (n.abstract) {
                parts.push("abstract ");
            }
            if (n.readonly) {
                parts.push("readonly ");
            }
            var key = path.call(print, "key");
            if (n.computed) {
                key = lines_1.concat(["[", key, "]"]);
            }
            if (n.variance) {
                key = lines_1.concat([printVariance(path, print), key]);
            }
            parts.push(key);
            if (n.optional) {
                parts.push("?");
            }
            if (n.typeAnnotation) {
                parts.push(path.call(print, "typeAnnotation"));
            }
            if (n.value) {
                parts.push(" = ", path.call(print, "value"));
            }
            parts.push(";");
            return lines_1.concat(parts);
        case "ClassPrivateProperty":
            if (n.static) {
                parts.push("static ");
            }
            parts.push(path.call(print, "key"));
            if (n.typeAnnotation) {
                parts.push(path.call(print, "typeAnnotation"));
            }
            if (n.value) {
                parts.push(" = ", path.call(print, "value"));
            }
            parts.push(";");
            return lines_1.concat(parts);
        case "ClassDeclaration":
        case "ClassExpression":
            if (n.declare) {
                parts.push("declare ");
            }
            if (n.abstract) {
                parts.push("abstract ");
            }
            parts.push("class");
            if (n.id) {
                parts.push(" ", path.call(print, "id"));
            }
            if (n.typeParameters) {
                parts.push(path.call(print, "typeParameters"));
            }
            if (n.superClass) {
                parts.push(" extends ", path.call(print, "superClass"), path.call(print, "superTypeParameters"));
            }
            if (n["implements"] && n['implements'].length > 0) {
                parts.push(" implements ", lines_1.fromString(", ").join(path.map(print, "implements")));
            }
            parts.push(" ", path.call(print, "body"));
            return lines_1.concat(parts);
        case "TemplateElement":
            return lines_1.fromString(n.value.raw, options).lockIndentTail();
        case "TemplateLiteral":
            var expressions = path.map(print, "expressions");
            parts.push("`");
            path.each(function (childPath) {
                var i = childPath.getName();
                parts.push(print(childPath));
                if (i < expressions.length) {
                    parts.push("${", expressions[i], "}");
                }
            }, "quasis");
            parts.push("`");
            return lines_1.concat(parts).lockIndentTail();
        case "TaggedTemplateExpression":
            return lines_1.concat([
                path.call(print, "tag"),
                path.call(print, "quasi")
            ]);
        // These types are unprintable because they serve as abstract
        // supertypes for other (printable) types.
        case "Node":
        case "Printable":
        case "SourceLocation":
        case "Position":
        case "Statement":
        case "Function":
        case "Pattern":
        case "Expression":
        case "Declaration":
        case "Specifier":
        case "NamedSpecifier":
        case "Comment": // Supertype of Block and Line
        case "Flow": // Supertype of all Flow AST node types
        case "FlowType": // Supertype of all Flow types
        case "FlowPredicate": // Supertype of InferredPredicate and DeclaredPredicate
        case "MemberTypeAnnotation": // Flow
        case "Type": // Flow
        case "TSHasOptionalTypeParameterInstantiation":
        case "TSHasOptionalTypeParameters":
        case "TSHasOptionalTypeAnnotation":
            throw new Error("unprintable type: " + JSON.stringify(n.type));
        case "CommentBlock": // Babel block comment.
        case "Block": // Esprima block comment.
            return lines_1.concat(["/*", lines_1.fromString(n.value, options), "*/"]);
        case "CommentLine": // Babel line comment.
        case "Line": // Esprima line comment.
            return lines_1.concat(["//", lines_1.fromString(n.value, options)]);
        // Type Annotations for Facebook Flow, typically stripped out or
        // transformed away before printing.
        case "TypeAnnotation":
            if (n.typeAnnotation) {
                if (n.typeAnnotation.type !== "FunctionTypeAnnotation") {
                    parts.push(": ");
                }
                parts.push(path.call(print, "typeAnnotation"));
                return lines_1.concat(parts);
            }
            return lines_1.fromString("");
        case "ExistentialTypeParam":
        case "ExistsTypeAnnotation":
            return lines_1.fromString("*", options);
        case "EmptyTypeAnnotation":
            return lines_1.fromString("empty", options);
        case "AnyTypeAnnotation":
            return lines_1.fromString("any", options);
        case "MixedTypeAnnotation":
            return lines_1.fromString("mixed", options);
        case "ArrayTypeAnnotation":
            return lines_1.concat([
                path.call(print, "elementType"),
                "[]"
            ]);
        case "TupleTypeAnnotation":
            var printed = path.map(print, "types");
            var joined = lines_1.fromString(", ").join(printed);
            var oneLine = joined.getLineLength(1) <= options.wrapColumn;
            if (oneLine) {
                if (options.arrayBracketSpacing) {
                    parts.push("[ ");
                }
                else {
                    parts.push("[");
                }
            }
            else {
                parts.push("[\n");
            }
            path.each(function (elemPath) {
                var i = elemPath.getName();
                var elem = elemPath.getValue();
                if (!elem) {
                    // If the array expression ends with a hole, that hole
                    // will be ignored by the interpreter, but if it ends with
                    // two (or more) holes, we need to write out two (or more)
                    // commas so that the resulting code is interpreted with
                    // both (all) of the holes.
                    parts.push(",");
                }
                else {
                    var lines = printed[i];
                    if (oneLine) {
                        if (i > 0)
                            parts.push(" ");
                    }
                    else {
                        lines = lines.indent(options.tabWidth);
                    }
                    parts.push(lines);
                    if (i < n.types.length - 1 || (!oneLine && util.isTrailingCommaEnabled(options, "arrays")))
                        parts.push(",");
                    if (!oneLine)
                        parts.push("\n");
                }
            }, "types");
            if (oneLine && options.arrayBracketSpacing) {
                parts.push(" ]");
            }
            else {
                parts.push("]");
            }
            return lines_1.concat(parts);
        case "BooleanTypeAnnotation":
            return lines_1.fromString("boolean", options);
        case "BooleanLiteralTypeAnnotation":
            assert_1.default.strictEqual(typeof n.value, "boolean");
            return lines_1.fromString("" + n.value, options);
        case "InterfaceTypeAnnotation":
            parts.push("interface");
            if (n.extends && n.extends.length > 0) {
                parts.push(" extends ", lines_1.fromString(", ").join(path.map(print, "extends")));
            }
            parts.push(" ", path.call(print, "body"));
            return lines_1.concat(parts);
        case "DeclareClass":
            return printFlowDeclaration(path, [
                "class ",
                path.call(print, "id"),
                " ",
                path.call(print, "body"),
            ]);
        case "DeclareFunction":
            return printFlowDeclaration(path, [
                "function ",
                path.call(print, "id"),
                ";"
            ]);
        case "DeclareModule":
            return printFlowDeclaration(path, [
                "module ",
                path.call(print, "id"),
                " ",
                path.call(print, "body"),
            ]);
        case "DeclareModuleExports":
            return printFlowDeclaration(path, [
                "module.exports",
                path.call(print, "typeAnnotation"),
            ]);
        case "DeclareVariable":
            return printFlowDeclaration(path, [
                "var ",
                path.call(print, "id"),
                ";"
            ]);
        case "DeclareExportDeclaration":
        case "DeclareExportAllDeclaration":
            return lines_1.concat([
                "declare ",
                printExportDeclaration(path, options, print)
            ]);
        case "InferredPredicate":
            return lines_1.fromString("%checks", options);
        case "DeclaredPredicate":
            return lines_1.concat([
                "%checks(",
                path.call(print, "value"),
                ")"
            ]);
        case "FunctionTypeAnnotation":
            // FunctionTypeAnnotation is ambiguous:
            // declare function(a: B): void; OR
            // var A: (a: B) => void;
            var parent = path.getParentNode(0);
            var isArrowFunctionTypeAnnotation = !(namedTypes.ObjectTypeCallProperty.check(parent) ||
                (namedTypes.ObjectTypeInternalSlot.check(parent) && parent.method) ||
                namedTypes.DeclareFunction.check(path.getParentNode(2)));
            var needsColon = isArrowFunctionTypeAnnotation &&
                !namedTypes.FunctionTypeParam.check(parent);
            if (needsColon) {
                parts.push(": ");
            }
            parts.push("(", printFunctionParams(path, options, print), ")");
            // The returnType is not wrapped in a TypeAnnotation, so the colon
            // needs to be added separately.
            if (n.returnType) {
                parts.push(isArrowFunctionTypeAnnotation ? " => " : ": ", path.call(print, "returnType"));
            }
            return lines_1.concat(parts);
        case "FunctionTypeParam":
            return lines_1.concat([
                path.call(print, "name"),
                n.optional ? '?' : '',
                ": ",
                path.call(print, "typeAnnotation"),
            ]);
        case "GenericTypeAnnotation":
            return lines_1.concat([
                path.call(print, "id"),
                path.call(print, "typeParameters")
            ]);
        case "DeclareInterface":
            parts.push("declare ");
        // Fall through to InterfaceDeclaration...
        case "InterfaceDeclaration":
        case "TSInterfaceDeclaration":
            if (n.declare) {
                parts.push("declare ");
            }
            parts.push("interface ", path.call(print, "id"), path.call(print, "typeParameters"), " ");
            if (n["extends"] && n["extends"].length > 0) {
                parts.push("extends ", lines_1.fromString(", ").join(path.map(print, "extends")), " ");
            }
            if (n.body) {
                parts.push(path.call(print, "body"));
            }
            return lines_1.concat(parts);
        case "ClassImplements":
        case "InterfaceExtends":
            return lines_1.concat([
                path.call(print, "id"),
                path.call(print, "typeParameters")
            ]);
        case "IntersectionTypeAnnotation":
            return lines_1.fromString(" & ").join(path.map(print, "types"));
        case "NullableTypeAnnotation":
            return lines_1.concat([
                "?",
                path.call(print, "typeAnnotation")
            ]);
        case "NullLiteralTypeAnnotation":
            return lines_1.fromString("null", options);
        case "ThisTypeAnnotation":
            return lines_1.fromString("this", options);
        case "NumberTypeAnnotation":
            return lines_1.fromString("number", options);
        case "ObjectTypeCallProperty":
            return path.call(print, "value");
        case "ObjectTypeIndexer":
            return lines_1.concat([
                printVariance(path, print),
                "[",
                path.call(print, "id"),
                ": ",
                path.call(print, "key"),
                "]: ",
                path.call(print, "value")
            ]);
        case "ObjectTypeProperty":
            return lines_1.concat([
                printVariance(path, print),
                path.call(print, "key"),
                n.optional ? "?" : "",
                ": ",
                path.call(print, "value")
            ]);
        case "ObjectTypeInternalSlot":
            return lines_1.concat([
                n.static ? "static " : "",
                "[[",
                path.call(print, "id"),
                "]]",
                n.optional ? "?" : "",
                n.value.type !== "FunctionTypeAnnotation" ? ": " : "",
                path.call(print, "value")
            ]);
        case "QualifiedTypeIdentifier":
            return lines_1.concat([
                path.call(print, "qualification"),
                ".",
                path.call(print, "id")
            ]);
        case "StringLiteralTypeAnnotation":
            return lines_1.fromString(nodeStr(n.value, options), options);
        case "NumberLiteralTypeAnnotation":
        case "NumericLiteralTypeAnnotation":
            assert_1.default.strictEqual(typeof n.value, "number");
            return lines_1.fromString(JSON.stringify(n.value), options);
        case "StringTypeAnnotation":
            return lines_1.fromString("string", options);
        case "DeclareTypeAlias":
            parts.push("declare ");
        // Fall through to TypeAlias...
        case "TypeAlias":
            return lines_1.concat([
                "type ",
                path.call(print, "id"),
                path.call(print, "typeParameters"),
                " = ",
                path.call(print, "right"),
                ";"
            ]);
        case "DeclareOpaqueType":
            parts.push("declare ");
        // Fall through to OpaqueType...
        case "OpaqueType":
            parts.push("opaque type ", path.call(print, "id"), path.call(print, "typeParameters"));
            if (n["supertype"]) {
                parts.push(": ", path.call(print, "supertype"));
            }
            if (n["impltype"]) {
                parts.push(" = ", path.call(print, "impltype"));
            }
            parts.push(";");
            return lines_1.concat(parts);
        case "TypeCastExpression":
            return lines_1.concat([
                "(",
                path.call(print, "expression"),
                path.call(print, "typeAnnotation"),
                ")"
            ]);
        case "TypeParameterDeclaration":
        case "TypeParameterInstantiation":
            return lines_1.concat([
                "<",
                lines_1.fromString(", ").join(path.map(print, "params")),
                ">"
            ]);
        case "Variance":
            if (n.kind === "plus") {
                return lines_1.fromString("+");
            }
            if (n.kind === "minus") {
                return lines_1.fromString("-");
            }
            return lines_1.fromString("");
        case "TypeParameter":
            if (n.variance) {
                parts.push(printVariance(path, print));
            }
            parts.push(path.call(print, 'name'));
            if (n.bound) {
                parts.push(path.call(print, 'bound'));
            }
            if (n['default']) {
                parts.push('=', path.call(print, 'default'));
            }
            return lines_1.concat(parts);
        case "TypeofTypeAnnotation":
            return lines_1.concat([
                lines_1.fromString("typeof ", options),
                path.call(print, "argument")
            ]);
        case "UnionTypeAnnotation":
            return lines_1.fromString(" | ").join(path.map(print, "types"));
        case "VoidTypeAnnotation":
            return lines_1.fromString("void", options);
        case "NullTypeAnnotation":
            return lines_1.fromString("null", options);
        // Type Annotations for TypeScript (when using Babylon as parser)
        case "TSType":
            throw new Error("unprintable type: " + JSON.stringify(n.type));
        case "TSNumberKeyword":
            return lines_1.fromString("number", options);
        case "TSBigIntKeyword":
            return lines_1.fromString("bigint", options);
        case "TSObjectKeyword":
            return lines_1.fromString("object", options);
        case "TSBooleanKeyword":
            return lines_1.fromString("boolean", options);
        case "TSStringKeyword":
            return lines_1.fromString("string", options);
        case "TSSymbolKeyword":
            return lines_1.fromString("symbol", options);
        case "TSAnyKeyword":
            return lines_1.fromString("any", options);
        case "TSVoidKeyword":
            return lines_1.fromString("void", options);
        case "TSThisType":
            return lines_1.fromString("this", options);
        case "TSNullKeyword":
            return lines_1.fromString("null", options);
        case "TSUndefinedKeyword":
            return lines_1.fromString("undefined", options);
        case "TSUnknownKeyword":
            return lines_1.fromString("unknown", options);
        case "TSNeverKeyword":
            return lines_1.fromString("never", options);
        case "TSArrayType":
            return lines_1.concat([
                path.call(print, "elementType"),
                "[]"
            ]);
        case "TSLiteralType":
            return path.call(print, "literal");
        case "TSUnionType":
            return lines_1.fromString(" | ").join(path.map(print, "types"));
        case "TSIntersectionType":
            return lines_1.fromString(" & ").join(path.map(print, "types"));
        case "TSConditionalType":
            parts.push(path.call(print, "checkType"), " extends ", path.call(print, "extendsType"), " ? ", path.call(print, "trueType"), " : ", path.call(print, "falseType"));
            return lines_1.concat(parts);
        case "TSInferType":
            parts.push("infer ", path.call(print, "typeParameter"));
            return lines_1.concat(parts);
        case "TSParenthesizedType":
            return lines_1.concat([
                "(",
                path.call(print, "typeAnnotation"),
                ")"
            ]);
        case "TSFunctionType":
        case "TSConstructorType":
            return lines_1.concat([
                path.call(print, "typeParameters"),
                "(",
                printFunctionParams(path, options, print),
                ")",
                path.call(print, "typeAnnotation")
            ]);
        case "TSMappedType": {
            parts.push(n.readonly ? "readonly " : "", "[", path.call(print, "typeParameter"), "]", n.optional ? "?" : "");
            if (n.typeAnnotation) {
                parts.push(": ", path.call(print, "typeAnnotation"), ";");
            }
            return lines_1.concat([
                "{\n",
                lines_1.concat(parts).indent(options.tabWidth),
                "\n}",
            ]);
        }
        case "TSTupleType":
            return lines_1.concat([
                "[",
                lines_1.fromString(", ").join(path.map(print, "elementTypes")),
                "]"
            ]);
        case "TSRestType":
            return lines_1.concat([
                "...",
                path.call(print, "typeAnnotation"),
                "[]"
            ]);
        case "TSOptionalType":
            return lines_1.concat([
                path.call(print, "typeAnnotation"),
                "?"
            ]);
        case "TSIndexedAccessType":
            return lines_1.concat([
                path.call(print, "objectType"),
                "[",
                path.call(print, "indexType"),
                "]"
            ]);
        case "TSTypeOperator":
            return lines_1.concat([
                path.call(print, "operator"),
                " ",
                path.call(print, "typeAnnotation")
            ]);
        case "TSTypeLiteral": {
            var memberLines_1 = lines_1.fromString(",\n").join(path.map(print, "members"));
            if (memberLines_1.isEmpty()) {
                return lines_1.fromString("{}", options);
            }
            parts.push("{\n", memberLines_1.indent(options.tabWidth), "\n}");
            return lines_1.concat(parts);
        }
        case "TSEnumMember":
            parts.push(path.call(print, "id"));
            if (n.initializer) {
                parts.push(" = ", path.call(print, "initializer"));
            }
            return lines_1.concat(parts);
        case "TSTypeQuery":
            return lines_1.concat([
                "typeof ",
                path.call(print, "exprName"),
            ]);
        case "TSParameterProperty":
            if (n.accessibility) {
                parts.push(n.accessibility, " ");
            }
            if (n.export) {
                parts.push("export ");
            }
            if (n.static) {
                parts.push("static ");
            }
            if (n.readonly) {
                parts.push("readonly ");
            }
            parts.push(path.call(print, "parameter"));
            return lines_1.concat(parts);
        case "TSTypeReference":
            return lines_1.concat([
                path.call(print, "typeName"),
                path.call(print, "typeParameters")
            ]);
        case "TSQualifiedName":
            return lines_1.concat([
                path.call(print, "left"),
                ".",
                path.call(print, "right")
            ]);
        case "TSAsExpression": {
            var withParens = n.extra && n.extra.parenthesized === true;
            if (withParens)
                parts.push("(");
            parts.push(path.call(print, "expression"), lines_1.fromString(" as "), path.call(print, "typeAnnotation"));
            if (withParens)
                parts.push(")");
            return lines_1.concat(parts);
        }
        case "TSNonNullExpression":
            return lines_1.concat([
                path.call(print, "expression"),
                "!"
            ]);
        case "TSTypeAnnotation": {
            // similar to flow's FunctionTypeAnnotation, this can be
            // ambiguous: it can be prefixed by => or :
            // in a type predicate, it takes the for u is U
            var parent = path.getParentNode(0);
            var prefix = ": ";
            if (namedTypes.TSFunctionType.check(parent)) {
                prefix = " => ";
            }
            if (namedTypes.TSTypePredicate.check(parent)) {
                prefix = " is ";
            }
            return lines_1.concat([
                prefix,
                path.call(print, "typeAnnotation")
            ]);
        }
        case "TSIndexSignature":
            return lines_1.concat([
                n.readonly ? "readonly " : "",
                "[",
                path.map(print, "parameters"),
                "]",
                path.call(print, "typeAnnotation")
            ]);
        case "TSPropertySignature":
            parts.push(printVariance(path, print), n.readonly ? "readonly " : "");
            if (n.computed) {
                parts.push("[", path.call(print, "key"), "]");
            }
            else {
                parts.push(path.call(print, "key"));
            }
            parts.push(n.optional ? "?" : "", path.call(print, "typeAnnotation"));
            return lines_1.concat(parts);
        case "TSMethodSignature":
            if (n.computed) {
                parts.push("[", path.call(print, "key"), "]");
            }
            else {
                parts.push(path.call(print, "key"));
            }
            if (n.optional) {
                parts.push("?");
            }
            parts.push(path.call(print, "typeParameters"), "(", printFunctionParams(path, options, print), ")", path.call(print, "typeAnnotation"));
            return lines_1.concat(parts);
        case "TSTypePredicate":
            return lines_1.concat([
                path.call(print, "parameterName"),
                path.call(print, "typeAnnotation")
            ]);
        case "TSCallSignatureDeclaration":
            return lines_1.concat([
                path.call(print, "typeParameters"),
                "(",
                printFunctionParams(path, options, print),
                ")",
                path.call(print, "typeAnnotation")
            ]);
        case "TSConstructSignatureDeclaration":
            if (n.typeParameters) {
                parts.push("new", path.call(print, "typeParameters"));
            }
            else {
                parts.push("new ");
            }
            parts.push("(", printFunctionParams(path, options, print), ")", path.call(print, "typeAnnotation"));
            return lines_1.concat(parts);
        case "TSTypeAliasDeclaration":
            return lines_1.concat([
                n.declare ? "declare " : "",
                "type ",
                path.call(print, "id"),
                path.call(print, "typeParameters"),
                " = ",
                path.call(print, "typeAnnotation"),
                ";"
            ]);
        case "TSTypeParameter":
            parts.push(path.call(print, "name"));
            // ambiguous because of TSMappedType
            var parent = path.getParentNode(0);
            var isInMappedType = namedTypes.TSMappedType.check(parent);
            if (n.constraint) {
                parts.push(isInMappedType ? " in " : " extends ", path.call(print, "constraint"));
            }
            if (n["default"]) {
                parts.push(" = ", path.call(print, "default"));
            }
            return lines_1.concat(parts);
        case "TSTypeAssertion":
            var withParens = n.extra && n.extra.parenthesized === true;
            if (withParens) {
                parts.push("(");
            }
            parts.push("<", path.call(print, "typeAnnotation"), "> ", path.call(print, "expression"));
            if (withParens) {
                parts.push(")");
            }
            return lines_1.concat(parts);
        case "TSTypeParameterDeclaration":
        case "TSTypeParameterInstantiation":
            return lines_1.concat([
                "<",
                lines_1.fromString(", ").join(path.map(print, "params")),
                ">"
            ]);
        case "TSEnumDeclaration":
            parts.push(n.declare ? "declare " : "", n.const ? "const " : "", "enum ", path.call(print, "id"));
            var memberLines = lines_1.fromString(",\n").join(path.map(print, "members"));
            if (memberLines.isEmpty()) {
                parts.push(" {}");
            }
            else {
                parts.push(" {\n", memberLines.indent(options.tabWidth), "\n}");
            }
            return lines_1.concat(parts);
        case "TSExpressionWithTypeArguments":
            return lines_1.concat([
                path.call(print, "expression"),
                path.call(print, "typeParameters")
            ]);
        case "TSInterfaceBody":
            var lines = lines_1.fromString(";\n").join(path.map(print, "body"));
            if (lines.isEmpty()) {
                return lines_1.fromString("{}", options);
            }
            return lines_1.concat([
                "{\n",
                lines.indent(options.tabWidth), ";",
                "\n}",
            ]);
        case "TSImportType":
            parts.push("import(", path.call(print, "argument"), ")");
            if (n.qualifier) {
                parts.push(".", path.call(print, "qualifier"));
            }
            if (n.typeParameters) {
                parts.push(path.call(print, "typeParameters"));
            }
            return lines_1.concat(parts);
        case "TSImportEqualsDeclaration":
            if (n.isExport) {
                parts.push("export ");
            }
            parts.push("import ", path.call(print, "id"), " = ", path.call(print, "moduleReference"));
            return maybeAddSemicolon(lines_1.concat(parts));
        case "TSExternalModuleReference":
            return lines_1.concat(["require(", path.call(print, "expression"), ")"]);
        case "TSModuleDeclaration": {
            var parent_1 = path.getParentNode();
            if (parent_1.type === "TSModuleDeclaration") {
                parts.push(".");
            }
            else {
                if (n.declare) {
                    parts.push("declare ");
                }
                if (!n.global) {
                    var isExternal = n.id.type === "StringLiteral" ||
                        (n.id.type === "Literal" &&
                            typeof n.id.value === "string");
                    if (isExternal) {
                        parts.push("module ");
                    }
                    else if (n.loc &&
                        n.loc.lines &&
                        n.id.loc) {
                        var prefix_1 = n.loc.lines.sliceString(n.loc.start, n.id.loc.start);
                        // These keywords are fundamentally ambiguous in the
                        // Babylon parser, and not reflected in the AST, so
                        // the best we can do is to match the original code,
                        // when possible.
                        if (prefix_1.indexOf("module") >= 0) {
                            parts.push("module ");
                        }
                        else {
                            parts.push("namespace ");
                        }
                    }
                    else {
                        parts.push("namespace ");
                    }
                }
            }
            parts.push(path.call(print, "id"));
            if (n.body && n.body.type === "TSModuleDeclaration") {
                parts.push(path.call(print, "body"));
            }
            else if (n.body) {
                var bodyLines = path.call(print, "body");
                if (bodyLines.isEmpty()) {
                    parts.push(" {}");
                }
                else {
                    parts.push(" {\n", bodyLines.indent(options.tabWidth), "\n}");
                }
            }
            return lines_1.concat(parts);
        }
        case "TSModuleBlock":
            return path.call(function (bodyPath) {
                return printStatementSequence(bodyPath, options, print);
            }, "body");
        // Unhandled types below. If encountered, nodes of these types should
        // be either left alone or desugared into AST types that are fully
        // supported by the pretty-printer.
        case "ClassHeritage": // TODO
        case "ComprehensionBlock": // TODO
        case "ComprehensionExpression": // TODO
        case "Glob": // TODO
        case "GeneratorExpression": // TODO
        case "LetStatement": // TODO
        case "LetExpression": // TODO
        case "GraphExpression": // TODO
        case "GraphIndexExpression": // TODO
        // XML types that nobody cares about or needs to print.
        case "XMLDefaultDeclaration":
        case "XMLAnyName":
        case "XMLQualifiedIdentifier":
        case "XMLFunctionQualifiedIdentifier":
        case "XMLAttributeSelector":
        case "XMLFilterExpression":
        case "XML":
        case "XMLElement":
        case "XMLList":
        case "XMLEscape":
        case "XMLText":
        case "XMLStartTag":
        case "XMLEndTag":
        case "XMLPointTag":
        case "XMLName":
        case "XMLAttribute":
        case "XMLCdata":
        case "XMLComment":
        case "XMLProcessingInstruction":
        default:
            debugger;
            throw new Error("unknown type: " + JSON.stringify(n.type));
    }
}
function printDecorators(path, printPath) {
    var parts = [];
    var node = path.getValue();
    if (node.decorators &&
        node.decorators.length > 0 &&
        // If the parent node is an export declaration, it will be
        // responsible for printing node.decorators.
        !util.getParentExportDeclaration(path)) {
        path.each(function (decoratorPath) {
            parts.push(printPath(decoratorPath), "\n");
        }, "decorators");
    }
    else if (util.isExportDeclaration(node) &&
        node.declaration &&
        node.declaration.decorators) {
        // Export declarations are responsible for printing any decorators
        // that logically apply to node.declaration.
        path.each(function (decoratorPath) {
            parts.push(printPath(decoratorPath), "\n");
        }, "declaration", "decorators");
    }
    return lines_1.concat(parts);
}
function printStatementSequence(path, options, print) {
    var filtered = [];
    var sawComment = false;
    var sawStatement = false;
    path.each(function (stmtPath) {
        var stmt = stmtPath.getValue();
        // Just in case the AST has been modified to contain falsy
        // "statements," it's safer simply to skip them.
        if (!stmt) {
            return;
        }
        // Skip printing EmptyStatement nodes to avoid leaving stray
        // semicolons lying around.
        if (stmt.type === "EmptyStatement" &&
            !(stmt.comments && stmt.comments.length > 0)) {
            return;
        }
        if (namedTypes.Comment.check(stmt)) {
            // The pretty printer allows a dangling Comment node to act as
            // a Statement when the Comment can't be attached to any other
            // non-Comment node in the tree.
            sawComment = true;
        }
        else if (namedTypes.Statement.check(stmt)) {
            sawStatement = true;
        }
        else {
            // When the pretty printer encounters a string instead of an
            // AST node, it just prints the string. This behavior can be
            // useful for fine-grained formatting decisions like inserting
            // blank lines.
            isString.assert(stmt);
        }
        // We can't hang onto stmtPath outside of this function, because
        // it's just a reference to a mutable FastPath object, so we have
        // to go ahead and print it here.
        filtered.push({
            node: stmt,
            printed: print(stmtPath)
        });
    });
    if (sawComment) {
        assert_1.default.strictEqual(sawStatement, false, "Comments may appear as statements in otherwise empty statement " +
            "lists, but may not coexist with non-Comment nodes.");
    }
    var prevTrailingSpace = null;
    var len = filtered.length;
    var parts = [];
    filtered.forEach(function (info, i) {
        var printed = info.printed;
        var stmt = info.node;
        var multiLine = printed.length > 1;
        var notFirst = i > 0;
        var notLast = i < len - 1;
        var leadingSpace;
        var trailingSpace;
        var lines = stmt && stmt.loc && stmt.loc.lines;
        var trueLoc = lines && options.reuseWhitespace &&
            util.getTrueLoc(stmt, lines);
        if (notFirst) {
            if (trueLoc) {
                var beforeStart = lines.skipSpaces(trueLoc.start, true);
                var beforeStartLine = beforeStart ? beforeStart.line : 1;
                var leadingGap = trueLoc.start.line - beforeStartLine;
                leadingSpace = Array(leadingGap + 1).join("\n");
            }
            else {
                leadingSpace = multiLine ? "\n\n" : "\n";
            }
        }
        else {
            leadingSpace = "";
        }
        if (notLast) {
            if (trueLoc) {
                var afterEnd = lines.skipSpaces(trueLoc.end);
                var afterEndLine = afterEnd ? afterEnd.line : lines.length;
                var trailingGap = afterEndLine - trueLoc.end.line;
                trailingSpace = Array(trailingGap + 1).join("\n");
            }
            else {
                trailingSpace = multiLine ? "\n\n" : "\n";
            }
        }
        else {
            trailingSpace = "";
        }
        parts.push(maxSpace(prevTrailingSpace, leadingSpace), printed);
        if (notLast) {
            prevTrailingSpace = trailingSpace;
        }
        else if (trailingSpace) {
            parts.push(trailingSpace);
        }
    });
    return lines_1.concat(parts);
}
function maxSpace(s1, s2) {
    if (!s1 && !s2) {
        return lines_1.fromString("");
    }
    if (!s1) {
        return lines_1.fromString(s2);
    }
    if (!s2) {
        return lines_1.fromString(s1);
    }
    var spaceLines1 = lines_1.fromString(s1);
    var spaceLines2 = lines_1.fromString(s2);
    if (spaceLines2.length > spaceLines1.length) {
        return spaceLines2;
    }
    return spaceLines1;
}
function printMethod(path, options, print) {
    var node = path.getNode();
    var kind = node.kind;
    var parts = [];
    var nodeValue = node.value;
    if (!namedTypes.FunctionExpression.check(nodeValue)) {
        nodeValue = node;
    }
    var access = node.accessibility || node.access;
    if (typeof access === "string") {
        parts.push(access, " ");
    }
    if (node.static) {
        parts.push("static ");
    }
    if (node.abstract) {
        parts.push("abstract ");
    }
    if (node.readonly) {
        parts.push("readonly ");
    }
    if (nodeValue.async) {
        parts.push("async ");
    }
    if (nodeValue.generator) {
        parts.push("*");
    }
    if (kind === "get" || kind === "set") {
        parts.push(kind, " ");
    }
    var key = path.call(print, "key");
    if (node.computed) {
        key = lines_1.concat(["[", key, "]"]);
    }
    parts.push(key);
    if (node.optional) {
        parts.push("?");
    }
    if (node === nodeValue) {
        parts.push(path.call(print, "typeParameters"), "(", printFunctionParams(path, options, print), ")", path.call(print, "returnType"));
        if (node.body) {
            parts.push(" ", path.call(print, "body"));
        }
        else {
            parts.push(";");
        }
    }
    else {
        parts.push(path.call(print, "value", "typeParameters"), "(", path.call(function (valuePath) {
            return printFunctionParams(valuePath, options, print);
        }, "value"), ")", path.call(print, "value", "returnType"));
        if (nodeValue.body) {
            parts.push(" ", path.call(print, "value", "body"));
        }
        else {
            parts.push(";");
        }
    }
    return lines_1.concat(parts);
}
function printArgumentsList(path, options, print) {
    var printed = path.map(print, "arguments");
    var trailingComma = util.isTrailingCommaEnabled(options, "parameters");
    var joined = lines_1.fromString(", ").join(printed);
    if (joined.getLineLength(1) > options.wrapColumn) {
        joined = lines_1.fromString(",\n").join(printed);
        return lines_1.concat([
            "(\n",
            joined.indent(options.tabWidth),
            trailingComma ? ",\n)" : "\n)"
        ]);
    }
    return lines_1.concat(["(", joined, ")"]);
}
function printFunctionParams(path, options, print) {
    var fun = path.getValue();
    if (fun.params) {
        var params = fun.params;
        var printed = path.map(print, "params");
    }
    else if (fun.parameters) {
        params = fun.parameters;
        printed = path.map(print, "parameters");
    }
    if (fun.defaults) {
        path.each(function (defExprPath) {
            var i = defExprPath.getName();
            var p = printed[i];
            if (p && defExprPath.getValue()) {
                printed[i] = lines_1.concat([p, " = ", print(defExprPath)]);
            }
        }, "defaults");
    }
    if (fun.rest) {
        printed.push(lines_1.concat(["...", path.call(print, "rest")]));
    }
    var joined = lines_1.fromString(", ").join(printed);
    if (joined.length > 1 ||
        joined.getLineLength(1) > options.wrapColumn) {
        joined = lines_1.fromString(",\n").join(printed);
        if (util.isTrailingCommaEnabled(options, "parameters") &&
            !fun.rest &&
            params[params.length - 1].type !== 'RestElement') {
            joined = lines_1.concat([joined, ",\n"]);
        }
        else {
            joined = lines_1.concat([joined, "\n"]);
        }
        return lines_1.concat(["\n", joined.indent(options.tabWidth)]);
    }
    return joined;
}
function printExportDeclaration(path, options, print) {
    var decl = path.getValue();
    var parts = ["export "];
    if (decl.exportKind && decl.exportKind !== "value") {
        parts.push(decl.exportKind + " ");
    }
    var shouldPrintSpaces = options.objectCurlySpacing;
    namedTypes.Declaration.assert(decl);
    if (decl["default"] ||
        decl.type === "ExportDefaultDeclaration") {
        parts.push("default ");
    }
    if (decl.declaration) {
        parts.push(path.call(print, "declaration"));
    }
    else if (decl.specifiers) {
        if (decl.specifiers.length === 1 &&
            decl.specifiers[0].type === "ExportBatchSpecifier") {
            parts.push("*");
        }
        else if (decl.specifiers.length === 0) {
            parts.push("{}");
        }
        else if (decl.specifiers[0].type === 'ExportDefaultSpecifier') {
            var unbracedSpecifiers_2 = [];
            var bracedSpecifiers_2 = [];
            path.each(function (specifierPath) {
                var spec = specifierPath.getValue();
                if (spec.type === "ExportDefaultSpecifier") {
                    unbracedSpecifiers_2.push(print(specifierPath));
                }
                else {
                    bracedSpecifiers_2.push(print(specifierPath));
                }
            }, "specifiers");
            unbracedSpecifiers_2.forEach(function (lines, i) {
                if (i > 0) {
                    parts.push(", ");
                }
                parts.push(lines);
            });
            if (bracedSpecifiers_2.length > 0) {
                var lines_3 = lines_1.fromString(", ").join(bracedSpecifiers_2);
                if (lines_3.getLineLength(1) > options.wrapColumn) {
                    lines_3 = lines_1.concat([
                        lines_1.fromString(",\n").join(bracedSpecifiers_2).indent(options.tabWidth),
                        ","
                    ]);
                }
                if (unbracedSpecifiers_2.length > 0) {
                    parts.push(", ");
                }
                if (lines_3.length > 1) {
                    parts.push("{\n", lines_3, "\n}");
                }
                else if (options.objectCurlySpacing) {
                    parts.push("{ ", lines_3, " }");
                }
                else {
                    parts.push("{", lines_3, "}");
                }
            }
        }
        else {
            parts.push(shouldPrintSpaces ? "{ " : "{", lines_1.fromString(", ").join(path.map(print, "specifiers")), shouldPrintSpaces ? " }" : "}");
        }
        if (decl.source) {
            parts.push(" from ", path.call(print, "source"));
        }
    }
    var lines = lines_1.concat(parts);
    if (lastNonSpaceCharacter(lines) !== ";" &&
        !(decl.declaration &&
            (decl.declaration.type === "FunctionDeclaration" ||
                decl.declaration.type === "ClassDeclaration" ||
                decl.declaration.type === "TSModuleDeclaration" ||
                decl.declaration.type === "TSInterfaceDeclaration" ||
                decl.declaration.type === "TSEnumDeclaration"))) {
        lines = lines_1.concat([lines, ";"]);
    }
    return lines;
}
function printFlowDeclaration(path, parts) {
    var parentExportDecl = util.getParentExportDeclaration(path);
    if (parentExportDecl) {
        assert_1.default.strictEqual(parentExportDecl.type, "DeclareExportDeclaration");
    }
    else {
        // If the parent node has type DeclareExportDeclaration, then it
        // will be responsible for printing the "declare" token. Otherwise
        // it needs to be printed with this non-exported declaration node.
        parts.unshift("declare ");
    }
    return lines_1.concat(parts);
}
function printVariance(path, print) {
    return path.call(function (variancePath) {
        var value = variancePath.getValue();
        if (value) {
            if (value === "plus") {
                return lines_1.fromString("+");
            }
            if (value === "minus") {
                return lines_1.fromString("-");
            }
            return print(variancePath);
        }
        return lines_1.fromString("");
    }, "variance");
}
function adjustClause(clause, options) {
    if (clause.length > 1)
        return lines_1.concat([" ", clause]);
    return lines_1.concat([
        "\n",
        maybeAddSemicolon(clause).indent(options.tabWidth)
    ]);
}
function lastNonSpaceCharacter(lines) {
    var pos = lines.lastPos();
    do {
        var ch = lines.charAt(pos);
        if (/\S/.test(ch))
            return ch;
    } while (lines.prevPos(pos));
}
function endsWithBrace(lines) {
    return lastNonSpaceCharacter(lines) === "}";
}
function swapQuotes(str) {
    return str.replace(/['"]/g, function (m) {
        return m === '"' ? '\'' : '"';
    });
}
function nodeStr(str, options) {
    isString.assert(str);
    switch (options.quote) {
        case "auto":
            var double = JSON.stringify(str);
            var single = swapQuotes(JSON.stringify(swapQuotes(str)));
            return double.length > single.length ? single : double;
        case "single":
            return swapQuotes(JSON.stringify(swapQuotes(str)));
        case "double":
        default:
            return JSON.stringify(str);
    }
}
function maybeAddSemicolon(lines) {
    var eoc = lastNonSpaceCharacter(lines);
    if (!eoc || "\n};".indexOf(eoc) < 0)
        return lines_1.concat([lines, ";"]);
    return lines;
}

}, function(modId) { var map = {"./comments":1561468592486,"./lines":1561468592484,"./options":1561468592481,"./patcher":1561468592488,"./types":1561468592479,"./fast-path":1561468592489,"./util":1561468592483}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592488, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var linesModule = __importStar(require("./lines"));
var types_1 = __importDefault(require("./types"));
var Printable = types_1.default.namedTypes.Printable;
var Expression = types_1.default.namedTypes.Expression;
var ReturnStatement = types_1.default.namedTypes.ReturnStatement;
var SourceLocation = types_1.default.namedTypes.SourceLocation;
var util_1 = require("./util");
var fast_path_1 = __importDefault(require("./fast-path"));
var isObject = types_1.default.builtInTypes.object;
var isArray = types_1.default.builtInTypes.array;
var isString = types_1.default.builtInTypes.string;
var riskyAdjoiningCharExp = /[0-9a-z_$]/i;
var Patcher = function Patcher(lines) {
    assert_1.default.ok(this instanceof Patcher);
    assert_1.default.ok(lines instanceof linesModule.Lines);
    var self = this, replacements = [];
    self.replace = function (loc, lines) {
        if (isString.check(lines))
            lines = linesModule.fromString(lines);
        replacements.push({
            lines: lines,
            start: loc.start,
            end: loc.end
        });
    };
    self.get = function (loc) {
        // If no location is provided, return the complete Lines object.
        loc = loc || {
            start: { line: 1, column: 0 },
            end: { line: lines.length,
                column: lines.getLineLength(lines.length) }
        };
        var sliceFrom = loc.start, toConcat = [];
        function pushSlice(from, to) {
            assert_1.default.ok(util_1.comparePos(from, to) <= 0);
            toConcat.push(lines.slice(from, to));
        }
        replacements.sort(function (a, b) {
            return util_1.comparePos(a.start, b.start);
        }).forEach(function (rep) {
            if (util_1.comparePos(sliceFrom, rep.start) > 0) {
                // Ignore nested replacement ranges.
            }
            else {
                pushSlice(sliceFrom, rep.start);
                toConcat.push(rep.lines);
                sliceFrom = rep.end;
            }
        });
        pushSlice(sliceFrom, loc.end);
        return linesModule.concat(toConcat);
    };
};
exports.Patcher = Patcher;
var Pp = Patcher.prototype;
Pp.tryToReprintComments = function (newNode, oldNode, print) {
    var patcher = this;
    if (!newNode.comments &&
        !oldNode.comments) {
        // We were (vacuously) able to reprint all the comments!
        return true;
    }
    var newPath = fast_path_1.default.from(newNode);
    var oldPath = fast_path_1.default.from(oldNode);
    newPath.stack.push("comments", getSurroundingComments(newNode));
    oldPath.stack.push("comments", getSurroundingComments(oldNode));
    var reprints = [];
    var ableToReprintComments = findArrayReprints(newPath, oldPath, reprints);
    // No need to pop anything from newPath.stack or oldPath.stack, since
    // newPath and oldPath are fresh local variables.
    if (ableToReprintComments && reprints.length > 0) {
        reprints.forEach(function (reprint) {
            var oldComment = reprint.oldPath.getValue();
            assert_1.default.ok(oldComment.leading || oldComment.trailing);
            patcher.replace(oldComment.loc, 
            // Comments can't have .comments, so it doesn't matter whether we
            // print with comments or without.
            print(reprint.newPath).indentTail(oldComment.loc.indent));
        });
    }
    return ableToReprintComments;
};
// Get all comments that are either leading or trailing, ignoring any
// comments that occur inside node.loc. Returns an empty array for nodes
// with no leading or trailing comments.
function getSurroundingComments(node) {
    var result = [];
    if (node.comments &&
        node.comments.length > 0) {
        node.comments.forEach(function (comment) {
            if (comment.leading || comment.trailing) {
                result.push(comment);
            }
        });
    }
    return result;
}
Pp.deleteComments = function (node) {
    if (!node.comments) {
        return;
    }
    var patcher = this;
    node.comments.forEach(function (comment) {
        if (comment.leading) {
            // Delete leading comments along with any trailing whitespace they
            // might have.
            patcher.replace({
                start: comment.loc.start,
                end: node.loc.lines.skipSpaces(comment.loc.end, false, false)
            }, "");
        }
        else if (comment.trailing) {
            // Delete trailing comments along with any leading whitespace they
            // might have.
            patcher.replace({
                start: node.loc.lines.skipSpaces(comment.loc.start, true, false),
                end: comment.loc.end
            }, "");
        }
    });
};
function getReprinter(path) {
    assert_1.default.ok(path instanceof fast_path_1.default);
    // Make sure that this path refers specifically to a Node, rather than
    // some non-Node subproperty of a Node.
    var node = path.getValue();
    if (!Printable.check(node))
        return;
    var orig = node.original;
    var origLoc = orig && orig.loc;
    var lines = origLoc && origLoc.lines;
    var reprints = [];
    if (!lines || !findReprints(path, reprints))
        return;
    return function (print) {
        var patcher = new Patcher(lines);
        reprints.forEach(function (reprint) {
            var newNode = reprint.newPath.getValue();
            var oldNode = reprint.oldPath.getValue();
            SourceLocation.assert(oldNode.loc, true);
            var needToPrintNewPathWithComments = !patcher.tryToReprintComments(newNode, oldNode, print);
            if (needToPrintNewPathWithComments) {
                // Since we were not able to preserve all leading/trailing
                // comments, we delete oldNode's comments, print newPath with
                // comments, and then patch the resulting lines where oldNode used
                // to be.
                patcher.deleteComments(oldNode);
            }
            var newLines = print(reprint.newPath, {
                includeComments: needToPrintNewPathWithComments,
                // If the oldNode we're replacing already had parentheses, we may
                // not need to print the new node with any extra parentheses,
                // because the existing parentheses will suffice. However, if the
                // newNode has a different type than the oldNode, let the printer
                // decide if reprint.newPath needs parentheses, as usual.
                avoidRootParens: (oldNode.type === newNode.type &&
                    reprint.oldPath.hasParens())
            }).indentTail(oldNode.loc.indent);
            var nls = needsLeadingSpace(lines, oldNode.loc, newLines);
            var nts = needsTrailingSpace(lines, oldNode.loc, newLines);
            // If we try to replace the argument of a ReturnStatement like
            // return"asdf" with e.g. a literal null expression, we run the risk
            // of ending up with returnnull, so we need to add an extra leading
            // space in situations where that might happen. Likewise for
            // "asdf"in obj. See #170.
            if (nls || nts) {
                var newParts = [];
                nls && newParts.push(" ");
                newParts.push(newLines);
                nts && newParts.push(" ");
                newLines = linesModule.concat(newParts);
            }
            patcher.replace(oldNode.loc, newLines);
        });
        // Recall that origLoc is the .loc of an ancestor node that is
        // guaranteed to contain all the reprinted nodes and comments.
        var patchedLines = patcher.get(origLoc).indentTail(-orig.loc.indent);
        if (path.needsParens()) {
            return linesModule.concat(["(", patchedLines, ")"]);
        }
        return patchedLines;
    };
}
exports.getReprinter = getReprinter;
;
// If the last character before oldLoc and the first character of newLines
// are both identifier characters, they must be separated by a space,
// otherwise they will most likely get fused together into a single token.
function needsLeadingSpace(oldLines, oldLoc, newLines) {
    var posBeforeOldLoc = util_1.copyPos(oldLoc.start);
    // The character just before the location occupied by oldNode.
    var charBeforeOldLoc = oldLines.prevPos(posBeforeOldLoc) &&
        oldLines.charAt(posBeforeOldLoc);
    // First character of the reprinted node.
    var newFirstChar = newLines.charAt(newLines.firstPos());
    return charBeforeOldLoc &&
        riskyAdjoiningCharExp.test(charBeforeOldLoc) &&
        newFirstChar &&
        riskyAdjoiningCharExp.test(newFirstChar);
}
// If the last character of newLines and the first character after oldLoc
// are both identifier characters, they must be separated by a space,
// otherwise they will most likely get fused together into a single token.
function needsTrailingSpace(oldLines, oldLoc, newLines) {
    // The character just after the location occupied by oldNode.
    var charAfterOldLoc = oldLines.charAt(oldLoc.end);
    var newLastPos = newLines.lastPos();
    // Last character of the reprinted node.
    var newLastChar = newLines.prevPos(newLastPos) &&
        newLines.charAt(newLastPos);
    return newLastChar &&
        riskyAdjoiningCharExp.test(newLastChar) &&
        charAfterOldLoc &&
        riskyAdjoiningCharExp.test(charAfterOldLoc);
}
function findReprints(newPath, reprints) {
    var newNode = newPath.getValue();
    Printable.assert(newNode);
    var oldNode = newNode.original;
    Printable.assert(oldNode);
    assert_1.default.deepEqual(reprints, []);
    if (newNode.type !== oldNode.type) {
        return false;
    }
    var oldPath = new fast_path_1.default(oldNode);
    var canReprint = findChildReprints(newPath, oldPath, reprints);
    if (!canReprint) {
        // Make absolutely sure the calling code does not attempt to reprint
        // any nodes.
        reprints.length = 0;
    }
    return canReprint;
}
function findAnyReprints(newPath, oldPath, reprints) {
    var newNode = newPath.getValue();
    var oldNode = oldPath.getValue();
    if (newNode === oldNode)
        return true;
    if (isArray.check(newNode))
        return findArrayReprints(newPath, oldPath, reprints);
    if (isObject.check(newNode))
        return findObjectReprints(newPath, oldPath, reprints);
    return false;
}
function findArrayReprints(newPath, oldPath, reprints) {
    var newNode = newPath.getValue();
    var oldNode = oldPath.getValue();
    if (newNode === oldNode ||
        newPath.valueIsDuplicate() ||
        oldPath.valueIsDuplicate()) {
        return true;
    }
    isArray.assert(newNode);
    var len = newNode.length;
    if (!(isArray.check(oldNode) &&
        oldNode.length === len))
        return false;
    for (var i = 0; i < len; ++i) {
        newPath.stack.push(i, newNode[i]);
        oldPath.stack.push(i, oldNode[i]);
        var canReprint = findAnyReprints(newPath, oldPath, reprints);
        newPath.stack.length -= 2;
        oldPath.stack.length -= 2;
        if (!canReprint) {
            return false;
        }
    }
    return true;
}
function findObjectReprints(newPath, oldPath, reprints) {
    var newNode = newPath.getValue();
    isObject.assert(newNode);
    if (newNode.original === null) {
        // If newNode.original node was set to null, reprint the node.
        return false;
    }
    var oldNode = oldPath.getValue();
    if (!isObject.check(oldNode))
        return false;
    if (newNode === oldNode ||
        newPath.valueIsDuplicate() ||
        oldPath.valueIsDuplicate()) {
        return true;
    }
    if (Printable.check(newNode)) {
        if (!Printable.check(oldNode)) {
            return false;
        }
        // Here we need to decide whether the reprinted code for newNode is
        // appropriate for patching into the location of oldNode.
        if (newNode.type === oldNode.type) {
            var childReprints = [];
            if (findChildReprints(newPath, oldPath, childReprints)) {
                reprints.push.apply(reprints, childReprints);
            }
            else if (oldNode.loc) {
                // If we have no .loc information for oldNode, then we won't be
                // able to reprint it.
                reprints.push({
                    oldPath: oldPath.copy(),
                    newPath: newPath.copy()
                });
            }
            else {
                return false;
            }
            return true;
        }
        if (Expression.check(newNode) &&
            Expression.check(oldNode) &&
            // If we have no .loc information for oldNode, then we won't be
            // able to reprint it.
            oldNode.loc) {
            // If both nodes are subtypes of Expression, then we should be able
            // to fill the location occupied by the old node with code printed
            // for the new node with no ill consequences.
            reprints.push({
                oldPath: oldPath.copy(),
                newPath: newPath.copy()
            });
            return true;
        }
        // The nodes have different types, and at least one of the types is
        // not a subtype of the Expression type, so we cannot safely assume
        // the nodes are syntactically interchangeable.
        return false;
    }
    return findChildReprints(newPath, oldPath, reprints);
}
function findChildReprints(newPath, oldPath, reprints) {
    var newNode = newPath.getValue();
    var oldNode = oldPath.getValue();
    isObject.assert(newNode);
    isObject.assert(oldNode);
    if (newNode.original === null) {
        // If newNode.original node was set to null, reprint the node.
        return false;
    }
    // If this node needs parentheses and will not be wrapped with
    // parentheses when reprinted, then return false to skip reprinting and
    // let it be printed generically.
    if (newPath.needsParens() &&
        !oldPath.hasParens()) {
        return false;
    }
    var keys = util_1.getUnionOfKeys(oldNode, newNode);
    if (oldNode.type === "File" ||
        newNode.type === "File") {
        // Don't bother traversing file.tokens, an often very large array
        // returned by Babylon, and useless for our purposes.
        delete keys.tokens;
    }
    // Don't bother traversing .loc objects looking for reprintable nodes.
    delete keys.loc;
    var originalReprintCount = reprints.length;
    for (var k in keys) {
        if (k.charAt(0) === "_") {
            // Ignore "private" AST properties added by e.g. Babel plugins and
            // parsers like Babylon.
            continue;
        }
        newPath.stack.push(k, types_1.default.getFieldValue(newNode, k));
        oldPath.stack.push(k, types_1.default.getFieldValue(oldNode, k));
        var canReprint = findAnyReprints(newPath, oldPath, reprints);
        newPath.stack.length -= 2;
        oldPath.stack.length -= 2;
        if (!canReprint) {
            return false;
        }
    }
    // Return statements might end up running into ASI issues due to
    // comments inserted deep within the tree, so reprint them if anything
    // changed within them.
    if (ReturnStatement.check(newPath.getNode()) &&
        reprints.length > originalReprintCount) {
        return false;
    }
    return true;
}

}, function(modId) { var map = {"./lines":1561468592484,"./types":1561468592479,"./util":1561468592483,"./fast-path":1561468592489}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1561468592489, function(require, module, exports) {
;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var types_1 = __importDefault(require("./types"));
var n = types_1.default.namedTypes;
var isArray = types_1.default.builtInTypes.array;
var isNumber = types_1.default.builtInTypes.number;
var util = __importStar(require("./util"));
var FastPath = function FastPath(value) {
    assert_1.default.ok(this instanceof FastPath);
    this.stack = [value];
};
var FPp = FastPath.prototype;
// Static convenience function for coercing a value to a FastPath.
FastPath.from = function (obj) {
    if (obj instanceof FastPath) {
        // Return a defensive copy of any existing FastPath instances.
        return obj.copy();
    }
    if (obj instanceof types_1.default.NodePath) {
        // For backwards compatibility, unroll NodePath instances into
        // lightweight FastPath [..., name, value] stacks.
        var copy = Object.create(FastPath.prototype);
        var stack = [obj.value];
        for (var pp; (pp = obj.parentPath); obj = pp)
            stack.push(obj.name, pp.value);
        copy.stack = stack.reverse();
        return copy;
    }
    // Otherwise use obj as the value of the new FastPath instance.
    return new FastPath(obj);
};
FPp.copy = function copy() {
    var copy = Object.create(FastPath.prototype);
    copy.stack = this.stack.slice(0);
    return copy;
};
// The name of the current property is always the penultimate element of
// this.stack, and always a String.
FPp.getName = function getName() {
    var s = this.stack;
    var len = s.length;
    if (len > 1) {
        return s[len - 2];
    }
    // Since the name is always a string, null is a safe sentinel value to
    // return if we do not know the name of the (root) value.
    return null;
};
// The value of the current property is always the final element of
// this.stack.
FPp.getValue = function getValue() {
    var s = this.stack;
    return s[s.length - 1];
};
FPp.valueIsDuplicate = function () {
    var s = this.stack;
    var valueIndex = s.length - 1;
    return s.lastIndexOf(s[valueIndex], valueIndex - 1) >= 0;
};
function getNodeHelper(path, count) {
    var s = path.stack;
    for (var i = s.length - 1; i >= 0; i -= 2) {
        var value = s[i];
        if (n.Node.check(value) && --count < 0) {
            return value;
        }
    }
    return null;
}
FPp.getNode = function getNode(count) {
    if (count === void 0) { count = 0; }
    return getNodeHelper(this, ~~count);
};
FPp.getParentNode = function getParentNode(count) {
    if (count === void 0) { count = 0; }
    return getNodeHelper(this, ~~count + 1);
};
// The length of the stack can be either even or odd, depending on whether
// or not we have a name for the root value. The difference between the
// index of the root value and the index of the final value is always
// even, though, which allows us to return the root value in constant time
// (i.e. without iterating backwards through the stack).
FPp.getRootValue = function getRootValue() {
    var s = this.stack;
    if (s.length % 2 === 0) {
        return s[1];
    }
    return s[0];
};
// Temporarily push properties named by string arguments given after the
// callback function onto this.stack, then call the callback with a
// reference to this (modified) FastPath object. Note that the stack will
// be restored to its original state after the callback is finished, so it
// is probably a mistake to retain a reference to the path.
FPp.call = function call(callback /*, name1, name2, ... */) {
    var s = this.stack;
    var origLen = s.length;
    var value = s[origLen - 1];
    var argc = arguments.length;
    for (var i = 1; i < argc; ++i) {
        var name = arguments[i];
        value = value[name];
        s.push(name, value);
    }
    var result = callback(this);
    s.length = origLen;
    return result;
};
// Similar to FastPath.prototype.call, except that the value obtained by
// accessing this.getValue()[name1][name2]... should be array-like. The
// callback will be called with a reference to this path object for each
// element of the array.
FPp.each = function each(callback /*, name1, name2, ... */) {
    var s = this.stack;
    var origLen = s.length;
    var value = s[origLen - 1];
    var argc = arguments.length;
    for (var i = 1; i < argc; ++i) {
        var name = arguments[i];
        value = value[name];
        s.push(name, value);
    }
    for (var i = 0; i < value.length; ++i) {
        if (i in value) {
            s.push(i, value[i]);
            // If the callback needs to know the value of i, call
            // path.getName(), assuming path is the parameter name.
            callback(this);
            s.length -= 2;
        }
    }
    s.length = origLen;
};
// Similar to FastPath.prototype.each, except that the results of the
// callback function invocations are stored in an array and returned at
// the end of the iteration.
FPp.map = function map(callback /*, name1, name2, ... */) {
    var s = this.stack;
    var origLen = s.length;
    var value = s[origLen - 1];
    var argc = arguments.length;
    for (var i = 1; i < argc; ++i) {
        var name = arguments[i];
        value = value[name];
        s.push(name, value);
    }
    var result = new Array(value.length);
    for (var i = 0; i < value.length; ++i) {
        if (i in value) {
            s.push(i, value[i]);
            result[i] = callback(this, i);
            s.length -= 2;
        }
    }
    s.length = origLen;
    return result;
};
// Returns true if the node at the tip of the path is wrapped with
// parentheses, OR if the only reason the node needed parentheses was that
// it couldn't be the first expression in the enclosing statement (see
// FastPath#canBeFirstInStatement), and it has an opening `(` character.
// For example, the FunctionExpression in `(function(){}())` appears to
// need parentheses only because it's the first expression in the AST, but
// since it happens to be preceded by a `(` (which is not apparent from
// the AST but can be determined using FastPath#getPrevToken), there is no
// ambiguity about how to parse it, so it counts as having parentheses,
// even though it is not immediately followed by a `)`.
FPp.hasParens = function () {
    var node = this.getNode();
    var prevToken = this.getPrevToken(node);
    if (!prevToken) {
        return false;
    }
    var nextToken = this.getNextToken(node);
    if (!nextToken) {
        return false;
    }
    if (prevToken.value === "(") {
        if (nextToken.value === ")") {
            // If the node preceded by a `(` token and followed by a `)` token,
            // then of course it has parentheses.
            return true;
        }
        // If this is one of the few Expression types that can't come first in
        // the enclosing statement because of parsing ambiguities (namely,
        // FunctionExpression, ObjectExpression, and ClassExpression) and
        // this.firstInStatement() returns true, and the node would not need
        // parentheses in an expression context because this.needsParens(true)
        // returns false, then it just needs an opening parenthesis to resolve
        // the parsing ambiguity that made it appear to need parentheses.
        var justNeedsOpeningParen = !this.canBeFirstInStatement() &&
            this.firstInStatement() &&
            !this.needsParens(true);
        if (justNeedsOpeningParen) {
            return true;
        }
    }
    return false;
};
FPp.getPrevToken = function (node) {
    node = node || this.getNode();
    var loc = node && node.loc;
    var tokens = loc && loc.tokens;
    if (tokens && loc.start.token > 0) {
        var token = tokens[loc.start.token - 1];
        if (token) {
            // Do not return tokens that fall outside the root subtree.
            var rootLoc = this.getRootValue().loc;
            if (util.comparePos(rootLoc.start, token.loc.start) <= 0) {
                return token;
            }
        }
    }
    return null;
};
FPp.getNextToken = function (node) {
    node = node || this.getNode();
    var loc = node && node.loc;
    var tokens = loc && loc.tokens;
    if (tokens && loc.end.token < tokens.length) {
        var token = tokens[loc.end.token];
        if (token) {
            // Do not return tokens that fall outside the root subtree.
            var rootLoc = this.getRootValue().loc;
            if (util.comparePos(token.loc.end, rootLoc.end) <= 0) {
                return token;
            }
        }
    }
    return null;
};
// Inspired by require("ast-types").NodePath.prototype.needsParens, but
// more efficient because we're iterating backwards through a stack.
FPp.needsParens = function (assumeExpressionContext) {
    var node = this.getNode();
    // This needs to come before `if (!parent) { return false }` because
    // an object destructuring assignment requires parens for
    // correctness even when it's the topmost expression.
    if (node.type === "AssignmentExpression" && node.left.type === 'ObjectPattern') {
        return true;
    }
    var parent = this.getParentNode();
    if (!parent) {
        return false;
    }
    var name = this.getName();
    // If the value of this path is some child of a Node and not a Node
    // itself, then it doesn't need parentheses. Only Node objects (in fact,
    // only Expression nodes) need parentheses.
    if (this.getValue() !== node) {
        return false;
    }
    // Only statements don't need parentheses.
    if (n.Statement.check(node)) {
        return false;
    }
    // Identifiers never need parentheses.
    if (node.type === "Identifier") {
        return false;
    }
    if (parent.type === "ParenthesizedExpression") {
        return false;
    }
    switch (node.type) {
        case "UnaryExpression":
        case "SpreadElement":
        case "SpreadProperty":
            return parent.type === "MemberExpression"
                && name === "object"
                && parent.object === node;
        case "BinaryExpression":
        case "LogicalExpression":
            switch (parent.type) {
                case "CallExpression":
                    return name === "callee"
                        && parent.callee === node;
                case "UnaryExpression":
                case "SpreadElement":
                case "SpreadProperty":
                    return true;
                case "MemberExpression":
                    return name === "object"
                        && parent.object === node;
                case "BinaryExpression":
                case "LogicalExpression":
                    var po = parent.operator;
                    var pp = PRECEDENCE[po];
                    var no = node.operator;
                    var np = PRECEDENCE[no];
                    if (pp > np) {
                        return true;
                    }
                    if (pp === np && name === "right") {
                        assert_1.default.strictEqual(parent.right, node);
                        return true;
                    }
                default:
                    return false;
            }
        case "SequenceExpression":
            switch (parent.type) {
                case "ReturnStatement":
                    return false;
                case "ForStatement":
                    // Although parentheses wouldn't hurt around sequence expressions in
                    // the head of for loops, traditional style dictates that e.g. i++,
                    // j++ should not be wrapped with parentheses.
                    return false;
                case "ExpressionStatement":
                    return name !== "expression";
                default:
                    // Otherwise err on the side of overparenthesization, adding
                    // explicit exceptions above if this proves overzealous.
                    return true;
            }
        case "YieldExpression":
            switch (parent.type) {
                case "BinaryExpression":
                case "LogicalExpression":
                case "UnaryExpression":
                case "SpreadElement":
                case "SpreadProperty":
                case "CallExpression":
                case "MemberExpression":
                case "NewExpression":
                case "ConditionalExpression":
                case "YieldExpression":
                    return true;
                default:
                    return false;
            }
        case "IntersectionTypeAnnotation":
        case "UnionTypeAnnotation":
            return parent.type === "NullableTypeAnnotation";
        case "Literal":
            return parent.type === "MemberExpression"
                && isNumber.check(node.value)
                && name === "object"
                && parent.object === node;
        // Babel 6 Literal split
        case "NumericLiteral":
            return parent.type === "MemberExpression"
                && name === "object"
                && parent.object === node;
        case "AssignmentExpression":
        case "ConditionalExpression":
            switch (parent.type) {
                case "UnaryExpression":
                case "SpreadElement":
                case "SpreadProperty":
                case "BinaryExpression":
                case "LogicalExpression":
                    return true;
                case "CallExpression":
                case "NewExpression":
                    return name === "callee"
                        && parent.callee === node;
                case "ConditionalExpression":
                    return name === "test"
                        && parent.test === node;
                case "MemberExpression":
                    return name === "object"
                        && parent.object === node;
                default:
                    return false;
            }
        case "ArrowFunctionExpression":
            if (n.CallExpression.check(parent) &&
                name === 'callee') {
                return true;
            }
            if (n.MemberExpression.check(parent) &&
                name === 'object') {
                return true;
            }
            return isBinary(parent);
        case "ObjectExpression":
            if (parent.type === "ArrowFunctionExpression" &&
                name === "body") {
                return true;
            }
            break;
        case "CallExpression":
            if (name === "declaration" &&
                n.ExportDefaultDeclaration.check(parent) &&
                n.FunctionExpression.check(node.callee)) {
                return true;
            }
    }
    if (parent.type === "NewExpression" &&
        name === "callee" &&
        parent.callee === node) {
        return containsCallExpression(node);
    }
    if (assumeExpressionContext !== true &&
        !this.canBeFirstInStatement() &&
        this.firstInStatement()) {
        return true;
    }
    return false;
};
function isBinary(node) {
    return n.BinaryExpression.check(node)
        || n.LogicalExpression.check(node);
}
// @ts-ignore 'isUnaryLike' is declared but its value is never read. [6133]
function isUnaryLike(node) {
    return n.UnaryExpression.check(node)
        // I considered making SpreadElement and SpreadProperty subtypes of
        // UnaryExpression, but they're not really Expression nodes.
        || (n.SpreadElement && n.SpreadElement.check(node))
        || (n.SpreadProperty && n.SpreadProperty.check(node));
}
var PRECEDENCE = {};
[["||"],
    ["&&"],
    ["|"],
    ["^"],
    ["&"],
    ["==", "===", "!=", "!=="],
    ["<", ">", "<=", ">=", "in", "instanceof"],
    [">>", "<<", ">>>"],
    ["+", "-"],
    ["*", "/", "%", "**"]
].forEach(function (tier, i) {
    tier.forEach(function (op) {
        PRECEDENCE[op] = i;
    });
});
function containsCallExpression(node) {
    if (n.CallExpression.check(node)) {
        return true;
    }
    if (isArray.check(node)) {
        return node.some(containsCallExpression);
    }
    if (n.Node.check(node)) {
        return types_1.default.someField(node, function (_name, child) {
            return containsCallExpression(child);
        });
    }
    return false;
}
FPp.canBeFirstInStatement = function () {
    var node = this.getNode();
    if (n.FunctionExpression.check(node)) {
        return false;
    }
    if (n.ObjectExpression.check(node)) {
        return false;
    }
    if (n.ClassExpression.check(node)) {
        return false;
    }
    return true;
};
FPp.firstInStatement = function () {
    var s = this.stack;
    var parentName, parent;
    var childName, child;
    for (var i = s.length - 1; i >= 0; i -= 2) {
        if (n.Node.check(s[i])) {
            childName = parentName;
            child = parent;
            parentName = s[i - 1];
            parent = s[i];
        }
        if (!parent || !child) {
            continue;
        }
        if (n.BlockStatement.check(parent) &&
            parentName === "body" &&
            childName === 0) {
            assert_1.default.strictEqual(parent.body[0], child);
            return true;
        }
        if (n.ExpressionStatement.check(parent) &&
            childName === "expression") {
            assert_1.default.strictEqual(parent.expression, child);
            return true;
        }
        if (n.AssignmentExpression.check(parent) &&
            childName === "left") {
            assert_1.default.strictEqual(parent.left, child);
            return true;
        }
        if (n.ArrowFunctionExpression.check(parent) &&
            childName === "body") {
            assert_1.default.strictEqual(parent.body, child);
            return true;
        }
        if (n.SequenceExpression.check(parent) &&
            parentName === "expressions" &&
            childName === 0) {
            assert_1.default.strictEqual(parent.expressions[0], child);
            continue;
        }
        if (n.CallExpression.check(parent) &&
            childName === "callee") {
            assert_1.default.strictEqual(parent.callee, child);
            continue;
        }
        if (n.MemberExpression.check(parent) &&
            childName === "object") {
            assert_1.default.strictEqual(parent.object, child);
            continue;
        }
        if (n.ConditionalExpression.check(parent) &&
            childName === "test") {
            assert_1.default.strictEqual(parent.test, child);
            continue;
        }
        if (isBinary(parent) &&
            childName === "left") {
            assert_1.default.strictEqual(parent.left, child);
            continue;
        }
        if (n.UnaryExpression.check(parent) &&
            !parent.prefix &&
            childName === "argument") {
            assert_1.default.strictEqual(parent.argument, child);
            continue;
        }
        return false;
    }
    return true;
};
exports.default = FastPath;
module.exports = exports["default"];

}, function(modId) { var map = {"./types":1561468592479,"./util":1561468592483}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1561468592478);
})()
//# sourceMappingURL=index.js.map