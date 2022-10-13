/*! EnlighterJS Syntax Highlighter 3.5.0 | Mozilla Public License 2.0 | https://enlighterjs.org */
var EnlighterJS = (function (e) {
  "use strict";
  var u = {
    indent: 4,
    ampersandCleanup: !0,
    linehover: !0,
    rawcodeDbclick: !1,
    textOverflow: "break",
    collapse: !1,
    retainCssClasses: !1,
    cssClasses: "",
    toolbarOuter: "{BTN_TABS}",
    toolbarTop: "{BTN_RAW}{BTN_COPY}{BTN_WINDOW}{BTN_WEBSITE}",
    toolbarBottom: "{BTN_COLLAPSE}",
    linenumbers: !0,
    lineoffset: 0,
    highlight: "",
    layout: "standard",
    language: "generic",
    theme: "enlighter",
    title: "",
  };
  function r(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  function T(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        "value" in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function n(e, t, r) {
    t && T(e.prototype, t),
      r && T(e, r),
      Object.defineProperty(e, "prototype", { writable: !1 });
  }
  function i(e, t) {
    if ("function" != typeof t && null !== t)
      throw new TypeError("Super expression must either be null or a function");
    (e.prototype = Object.create(t && t.prototype, {
      constructor: { value: e, writable: !0, configurable: !0 },
    })),
      Object.defineProperty(e, "prototype", { writable: !1 }),
      t && a(e, t);
  }
  function s(e) {
    return (s = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        })(e);
  }
  function a(e, t) {
    return (a =
      Object.setPrototypeOf ||
      function (e, t) {
        return (e.__proto__ = t), e;
      })(e, t);
  }
  function R() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
      return (
        Boolean.prototype.valueOf.call(
          Reflect.construct(Boolean, [], function () {})
        ),
        !0
      );
    } catch (e) {
      return !1;
    }
  }
  function F(e, t, r) {
    return (F = R()
      ? Reflect.construct
      : function (e, t, r) {
          var n = [null];
          n.push.apply(n, t);
          t = new (Function.bind.apply(e, n))();
          return r && a(t, r.prototype), t;
        }).apply(null, arguments);
  }
  function j(e, t) {
    if (t && ("object" == typeof t || "function" == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError(
        "Derived constructors may only return object or undefined"
      );
    t = e;
    if (void 0 === t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return t;
  }
  function o(r) {
    var n = R();
    return function () {
      var e,
        t = s(r);
      return j(
        this,
        n
          ? ((e = s(this).constructor), Reflect.construct(t, arguments, e))
          : t.apply(this, arguments)
      );
    };
  }
  function l() {
    return (l =
      "undefined" != typeof Reflect && Reflect.get
        ? Reflect.get
        : function (e, t, r) {
            var n = (function (e, t) {
              for (
                ;
                !Object.prototype.hasOwnProperty.call(e, t) &&
                null !== (e = s(e));

              );
              return e;
            })(e, t);
            if (n)
              return (
                (n = Object.getOwnPropertyDescriptor(n, t)),
                n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value
              );
          }).apply(this, arguments);
  }
  function g(e) {
    return (
      (function (e) {
        if (Array.isArray(e)) return p(e);
      })(e) ||
      (function (e) {
        if (
          ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
          null != e["@@iterator"]
        )
          return Array.from(e);
      })(e) ||
      z(e) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function z(e, t) {
    if (e) {
      if ("string" == typeof e) return p(e, t);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      return "Map" ===
        (r = "Object" === r && e.constructor ? e.constructor.name : r) ||
        "Set" === r
        ? Array.from(e)
        : "Arguments" === r ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
        ? p(e, t)
        : void 0;
    }
  }
  function p(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
    return n;
  }
  var c = {
    sqStrings: { regex: /('(?:[^'\\]|\\.)*')/g, type: "s0" },
    dqStrings: { regex: /"(?:[^"\\]|\\.)*"/g, type: "s0" },
    bqStrings: { regex: /`(?:[^`\\]|\\.)*`/g, type: "s0" },
    char: { regex: /('(\\.|.|\\\w+)')/g, type: "s1" },
    slashComments: { regex: /(?:^|[^\\])(\/\/.*)$/gm, type: "c0" },
    poundComments: { regex: /(?:^|[^\\])(#.*)$/gm, type: "c0" },
    blockComments: { regex: /\/\*[\s\S]*?\*\//g, type: "c1" },
    docComments: { regex: /\/\*\*[\s\S]*?\*\//g, type: "c2" },
    heredoc: {
      regex: /(<<[<-]?\s*?(['"]?)([A-Z0-9_]+)\2\s*\n[\s\S]*?\n\3)/gi,
      type: "s5",
    },
    brackets: { regex: /[[\](){}<>]+/g, type: "g1" },
    floats: {
      regex:
        /[\b\W](-?((?:\d+\.\d+|\.\d+|\d+\.)(?:e[+-]?\d+)?)|\d+(?:e[+-]?\d+))/gi,
      type: "n0",
    },
    complex: {
      regex:
        /[\b\W](?:-?(?:(?:\d+\.\d+|\.\d+|\d+\.|\d+)(?:e[+-]?\d+)?)|\d+(?:e[+-]?\d+))[ij]/gi,
      type: "n5",
    },
    int: { regex: /[\b\W](-?\d+)(?!\.)\b/g, type: "n1" },
    hex: { regex: /[\b\W](-?0x[A-F0-9]+)\b/gi, type: "n2" },
    bin: { regex: /[\b\W](-?0b[01]+)\b/gi, type: "n3" },
    octal: { regex: /[\b\W](-?0[0-7]+)(?!\.)\b/g, type: "n4" },
    prop: { regex: /[\w\])]\.(\w+)\b/g, type: "m3" },
    fCalls: { regex: /\b([\w]+)\s*\(/gm, type: "m0" },
    mCalls: { regex: /\.([\w]+)\s*\(/gm, type: "m1" },
    boolean: { regex: /\b(true|false)\b/gi, type: "e0" },
    null: { regex: /\b(null)\b/gi, type: "e1" },
  };
  function b(e, t, r, n, i) {
    return {
      text: e,
      type: t,
      index: n || 0,
      end: e.length + n,
      filter: r || null,
      priority: i || 0,
    };
  }
  function B() {
    (console.error || console.log || function () {}).apply(void 0, arguments);
  }
  function Z(e, t, r) {
    for (
      var n = 2 < arguments.length && void 0 !== r ? r : "text", i = [], s = 0;
      s < t.length;
      s++
    ) {
      var a = t[s];
      if (!a || !a.type || !a.regex) return;
      try {
        var o = (function (e, t, r) {
            for (var n, i = [], s = 0; null != (n = t.regex.exec(e)); ) {
              if (5e4 < ++s)
                throw new Error(
                  "Infinite tokenizer loop detected; more than 50k tokens - language rule [" +
                    r +
                    "] " +
                    t.regex +
                    " seems to be broken"
                );
              if (0 != n[0].length) {
                t.regex.lastIndex = n.index + 1 + n[0].length / 3;
                var a = Array.isArray(t.type) ? t.type[0] : t.type,
                  o =
                    (Array.isArray(t.filter) ? t.filter[0] : t.filter) || null;
                if (1 < n.length)
                  for (var l, g, u, p = 0, c = 1; c < n.length; c++)
                    n[c] &&
                      ((l =
                        Array.isArray(t.type) && t.type.length >= c
                          ? t.type[c - 1]
                          : a),
                      (g =
                        Array.isArray(t.filter) && t.filter.length >= c
                          ? t.filter[c - 1]
                          : o),
                      (u = n[0].indexOf(n[c], p)),
                      i.push(b(n[c], l, g, n.index + (p = u), r)));
                else i.push(b(n[0], a, o, n.index, r));
              }
            }
            return i;
          })(e, a, s),
          i = i.concat(o);
      } catch (e) {
        B(e);
      }
    }
    i = i.sort(function (e, t) {
      return e.index == t.index
        ? e.priority < t.priority
          ? -1
          : 1
        : e.index < t.index
        ? -1
        : 1;
    });
    for (var l = [], g = 0, u = 0; u < i.length; u++) {
      if (
        (g < i[u].index && l.push(b(e.substring(g, i[u].index), n, null, g)),
        i[u].filter)
      )
        for (var p = i[u].filter(i[u]) || [], c = 0; c < p.length; c++)
          l.push(p[c]);
      else l.push(i[u]);
      for (var g = i[u].end, y = !1, f = u + 1; f < i.length; f++)
        if (i[f].index >= g) {
          (u = f - 1), (y = !0);
          break;
        }
      if (!1 === y) break;
    }
    return g < e.length && l.push(b(e.substring(g), n, null, g)), l;
  }
  var y = (function () {
      function e() {
        r(this, e), (this.rules = []), this.setupLanguage();
      }
      return (
        n(e, [
          {
            key: "setupLanguage",
            value: function () {
              this.rules = [
                c.sqStrings,
                c.dqStrings,
                c.prop,
                c.slashComments,
                c.poundComments,
                c.blockComments,
                c.brackets,
                {
                  regex:
                    /\b(true|false|null|nil|if|then|else|for|while|do|class|implements|extends|function|end|void|return|in|of|new|this|try|catch|def|except)\b/gi,
                  type: "k1",
                },
                c.mCalls,
                c.fCalls,
                c.octal,
                c.bin,
                c.hex,
                c.floats,
                c.int,
                { regex: /[\b\s]([$&|~*:;]+)[\b\s]/g, type: "g0" },
              ];
            },
          },
          {
            key: "analyze",
            value: function (e) {
              return Z(e, this.rules);
            },
          },
        ]),
        e
      );
    })(),
    t = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              this.rules = [
                c.sqStrings,
                { regex: /\|.*?\|/g, type: "s2" },
                { regex: /(".*)$/gm, type: "c0" },
                { regex: /^\s*(\*.*)$/gm, type: "c0" },
                { regex: /(data):?\s*(\w+)\s*/gi, type: ["k2", "k7"] },
                { regex: /(type)\s+(\w+)\s*/gi, type: ["k2", "k5"] },
                { regex: /\b(abap_true|abap_false)\b/gi, type: "e0" },
                { regex: /\b(abap_undefined)\b/gi, type: "e1" },
                { regex: /\b[A-Z_][A-Za-z0-9_]*\b/g, type: "k0" },
                c.fCalls,
                c.int,
                c.brackets,
              ];
            },
          },
        ]),
        t
      );
    })();
  function f(e, t, r) {
    for (var n, i = [], s = 0; null != (n = t.exec(e.text)); ) {
      s < n.index && i.push(b(e.text.substring(s, n.index), e.type, null, s));
      for (var a = r(n, e.type) || [], o = 0; o < a.length; o++) i.push(a[o]);
      (s = n.index + n[0].length), (t.lastIndex = s);
    }
    return 0 == i.length
      ? [e]
      : (s < e.text.length && i.push(b(e.text.substring(s), e.type, null, s)),
        i);
  }
  var M = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(
          t,
          [
            {
              key: "setupLanguage",
              value: function () {
                this.rules = [
                  c.dqStrings,
                  c.poundComments,
                  {
                    regex: /(<)([A-Z:_][A-Z0-9:.-]*)([\s\S]*?)(\/?>)/gi,
                    type: ["g1", "x1", "text", "g1"],
                    filter: [
                      null,
                      null,
                      function (e) {
                        return f(e, c.dqStrings.regex, function (e) {
                          return [b(e[0], "s0")];
                        });
                      },
                      null,
                    ],
                  },
                  {
                    regex: /(<\/)([A-Z:_][A-Z0-9:.-]*\s*)(>)/gi,
                    type: ["g1", "x1", "g1"],
                  },
                  { regex: /^\s*([A-Z]\w+)\b/gm, type: "k0" },
                  { regex: /%\{\w+\}/g, type: "k7" },
                  { regex: /\b(on|off)\b/gi, type: "e0" },
                  c.int,
                ];
              },
            },
          ],
          [
            {
              key: "alias",
              value: function () {
                return ["apacheconf", "httpd"];
              },
            },
          ]
        ),
        t
      );
    })(),
    P = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(
          t,
          [
            {
              key: "setupLanguage",
              value: function () {
                this.rules = [
                  { regex: /(;.*)$/gm, type: "co0" },
                  { regex: /(\$.*)$/gm, type: "k4" },
                  c.sqStrings,
                  c.dqStrings,
                  { regex: /(^|:)\s*?(\w+)\s+/gm, type: "k0" },
                  { regex: /^\s*?([A-Z?_][A-Z0-9?_]+:)\s*?/gim, type: "k6" },
                  { regex: /@\w+/gi, type: "k9" },
                  { regex: /#\w+/gi, type: "k9" },
                  { regex: /[A-F0-9][A-F0-9$]+?H/gi, type: "n2" },
                  { regex: /\d[\d$]+?D/gi, type: "n1" },
                  { regex: /[01][01$]+?B/gi, type: "n3" },
                  { regex: /[0-7][0-7$]+?(?:Q|O)/gi, type: "nu4" },
                  { regex: /(0x[A-F0-9]+|\$[A-F0-9]+)/gi, type: "n2" },
                  { regex: /(0b[01]+)/g, type: "n3" },
                  { regex: /\b(\d+)/g, type: "n1" },
                  c.fCalls,
                ];
              },
            },
          ],
          [
            {
              key: "alias",
              value: function () {
                return ["asm"];
              },
            },
          ]
        ),
        t
      );
    })(),
    U = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(
          t,
          [
            {
              key: "setupLanguage",
              value: function () {
                this.rules = [
                  { regex: /(;.*)$/gm, type: "co0" },
                  c.sqStrings,
                  c.dqStrings,
                  { regex: /^\s*?\.\w+\s+/gm, type: "kw4" },
                  { regex: /\b(r\d{1,2})/gi, type: "kw0" },
                  { regex: /(@[0-9])/gi, type: "k2" },
                  { regex: /^\s*?(\w+:)\s*?/gm, type: "kw6" },
                  { regex: /(^|:)\s*?(\w+)\s+/gm, type: "kw0" },
                  { regex: /(0x[A-F0-9]+|\$[A-F0-9]+)/gi, type: "nu2" },
                  c.bin,
                  c.int,
                  c.fCalls,
                  { regex: /\b[A-Z]{2,}[0-9]?[0-9]?\b/g, type: "kw9" },
                ];
              },
            },
          ],
          [
            {
              key: "alias",
              value: function () {
                return ["avrasm"];
              },
            },
          ]
        ),
        t
      );
    })(),
    G = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(
          t,
          [
            {
              key: "setupLanguage",
              value: function () {
                this.rules = [
                  c.dqStrings,
                  { regex: /(?:^|\b)(REM)(.*)?$/gim, type: ["k0", "c0"] },
                  { regex: /^(::.*)$/gim, type: "c0" },
                  { regex: /%%\w+/gi, type: "s4" },
                  { regex: /(%[\d*])\b/gi, type: "k9" },
                  { regex: /(%\w+%)/gi, type: "k7" },
                  { regex: /\b(\w+)=/gi, type: ["k0", "k7"] },
                  { regex: /\s(\/\w)\s/gi, type: "k8" },
                  { regex: /\b(echo)\s+(.*)$/gim, type: ["k1", "text"] },
                  { regex: /\s*(:[\w_]+)\s*/gi, type: "k6" },
                  { regex: /\b(goto)\s+([\w_]+)\b/gi, type: ["k1", "k6"] },
                  { regex: /\b(if|else|for|in|do|echo|goto)\b/gi, type: "k1" },
                  { regex: /\b(set)\b/gi, type: "k0" },
                  { regex: /\b(not@equ)\b/gi, type: "k3" },
                  { regex: /\b(on|off)\b/gi, type: "e0" },
                  { regex: /\b(nul)\b/gi, type: "e1" },
                  c.mCalls,
                  c.int,
                ];
              },
            },
          ],
          [
            {
              key: "alias",
              value: function () {
                return ["bat", "cmd"];
              },
            },
          ]
        ),
        t
      );
    })(),
    H = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(
          t,
          [
            {
              key: "setupLanguage",
              value: function () {
                this.rules = [
                  c.dqStrings,
                  c.char,
                  { regex: /@[\W\w_][\w]+/gm, type: "k11" },
                  c.boolean,
                  c.null,
                  c.prop,
                  { regex: /#.*$/gm, type: "k4" },
                  {
                    regex:
                      /\b(break|case|catch|continue|do|else|for|if|goto|switch|try|throw|while)\b/g,
                    type: "k1",
                  },
                  {
                    regex: /\b(__[A-Z][A-Z0-9_]+__|__cplusplus)\b/g,
                    type: "e3",
                  },
                  { regex: /\b(\w+\d+?_t)\b/g, type: "k5" },
                  {
                    regex: /\b(bool|char|double|float|int|long|short|void)\b/g,
                    type: "k5",
                  },
                  { regex: /\b(enum|struct|typedef|union)\b/g, type: "k2" },
                  {
                    regex: /\b(const|volatile|unsigned|signed|restrict)\b/g,
                    type: "k8",
                  },
                  {
                    regex:
                      /\b(asm|auto|class|auto|default|explicit|export|extern|friend|inline|thread_local|static_assert|nullptr|noexcept|friend|decltype|constexpr|alignof|alignas|virtual|using|typename|typeid|this|template|static|return|register|public|protected|private|operator|namespace|mutable|inline)\b/g,
                    type: "k0",
                  },
                  {
                    regex:
                      /\b(new|delete|cast|const_cast|dynamic_cast|static_cast|reinterpret_cast|sizeof|and|bitand|and_eq|not|not_eq|or|bitor|or_eq|xor|xor_eq|compl)\b/g,
                    type: "k3",
                  },
                  c.mCalls,
                  c.fCalls,
                  c.slashComments,
                  c.blockComments,
                  c.octal,
                  c.bin,
                  c.hex,
                  c.floats,
                  c.brackets,
                ];
              },
            },
          ],
          [
            {
              key: "alias",
              value: function () {
                return ["c++", "c"];
              },
            },
          ]
        ),
        t
      );
    })(),
    V = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(
          t,
          [
            {
              key: "setupLanguage",
              value: function () {
                this.rules = [
                  {
                    regex: /\$("(?:[^"\\]|\\.)*")/g,
                    type: "s0",
                    filter: function (e) {
                      return f(e, /\{.*?}/g, function (e) {
                        return [b(e[0], "s3")];
                      });
                    },
                  },
                  c.dqStrings,
                  c.char,
                  c.null,
                  c.boolean,
                  c.prop,
                  {
                    regex:
                      /\b(bool|byte|char|decimal|double|float|int|long|sbyte|short|uint|ulong|ushort|void|string)\b/g,
                    type: "k5",
                  },
                  {
                    regex:
                      /\b(while|try|throw|switch|if|goto|foreach|for|finally|else|do|continue|catch|case|break)\b/g,
                    type: "k1",
                  },
                  {
                    regex: /^((?:using|namespace)\s+)(\w[\w._]+[;{\n])/gm,
                    type: ["k0", "k10"],
                  },
                  { regex: /\b(enum|struct|var)\b/g, type: "k2" },
                  { regex: /\b(const|in|out)\b/g, type: "k8" },
                  {
                    regex:
                      /\b(using|volatile|virtual|using|unsafe|unchecked|static|stackalloc|sealed|return|ref|readonly|public|protected|private|params|override|operator|object|namespace|lock|is|internal|interface|implicit|fixed|extern|explicit|event|delegate|default|class|checked|base|as|abstract)\b/g,
                    type: "k0",
                  },
                  {
                    regex:
                      /\b(add|alias|ascending|async|await|by|descending|dynamic|equals|from|get|global|group|into|join|let|nameof|on|orderby|partial|remove|select|set|unmanaged|value|var|when|where|yield)\b/g,
                    type: "k0",
                  },
                  { regex: /\b(this)\b/g, type: "k9" },
                  { regex: /\b(new|sizeof|typeof)\b/g, type: "k3" },
                  c.fCalls,
                  c.mCalls,
                  c.slashComments,
                  c.blockComments,
                  c.docComments,
                  c.int,
                  c.floats,
                  c.bin,
                  c.hex,
                  c.octal,
                  c.brackets,
                ];
              },
            },
          ],
          [
            {
              key: "alias",
              value: function () {
                return ["c#"];
              },
            },
          ]
        ),
        t
      );
    })(),
    d = {
      pseudoElements: { regex: /[\w\])](::?[\w-]+)\b/g, type: "x15" },
      idSelector: { regex: /(#[\w-]+)/g, type: "x10" },
      classSelector: { regex: /(\.[\w-]+)/g, type: "x11" },
      elementSelector: { regex: /\b([\w-]+)/g, type: "x16" },
    },
    h = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(
          t,
          [
            {
              key: "setupLanguage",
              value: function () {
                var t = [
                  d.pseudoElements,
                  d.idSelector,
                  d.classSelector,
                  d.elementSelector,
                  c.dqStrings,
                  c.sqStrings,
                ];
                this.rules = [
                  {
                    regex: /(?:^|}|\*\/|;|{)\s*([^{};/]+?)\s*{/g,
                    type: "text",
                    filter: function (e) {
                      return Z(e.text, t);
                    },
                  },
                  c.dqStrings,
                  c.sqStrings,
                  {
                    regex:
                      /\W@(charset|import|namespace|page|font-face|keyframes|viewport|document|supports)\b/gi,
                    type: "k4",
                  },
                  { regex: /(url\s*)(\(.*?\))/gi, type: ["m0", "s0"] },
                  { regex: /(#[a-z0-9]+)\W/gi, type: "x14" },
                  { regex: /(-?\.?\d+[.\d]*(%|[a-z]{2,4})?)/gim, type: "x13" },
                  { regex: /([\w-]+)\s*:/g, type: "x12" },
                  c.blockComments,
                  c.brackets,
                ];
              },
            },
          ],
          [
            {
              key: "alias",
              value: function () {
                return ["styles"];
              },
            },
          ]
        ),
        t
      );
    })(),
    J = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(
          t,
          [
            {
              key: "setupLanguage",
              value: function () {
                this.rules = [
                  { regex: /^("""[\s\S]*?"""|'''[\s\S]*?''')/gm, type: "c9" },
                  { regex: /("""[\s\S]*?"""|'''[\s\S]*?''')/g, type: "s5" },
                  c.dqStrings,
                  c.sqStrings,
                  { regex: /\b(__[a-z]+__)\b/g, type: "e3" },
                  {
                    regex: /[^;]\s*(from\s+)([\w.]+)(\s+import)/gi,
                    type: ["k0", "k10", "k0"],
                  },
                  {
                    regex:
                      /\b(raise|while|try|if|for|finally|else|elif|continue|break)\b/g,
                    type: "k1",
                  },
                  {
                    regex:
                      /\b(yield|with|return|pass|lambda|is|in|import|global|from|except|def|class|assert|as|async|await)\b/g,
                    type: "k0",
                  },
                  { regex: /\b(and|or|not|del)\b/g, type: "k3" },
                  { regex: /\b(True|False)\b/g, type: "e0" },
                  { regex: /\b(None)\b/g, type: "e1" },
                  c.mCalls,
                  c.fCalls,
                  c.poundComments,
                  c.int,
                  c.hex,
                  c.floats,
                  c.octal,
                  c.brackets,
                ];
              },
            },
          ],
          [
            {
              key: "alias",
              value: function () {
                return ["py"];
              },
            },
          ]
        ),
        t
      );
    })(),
    Y = (function () {
      i(t, J);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              l(s(t.prototype), "setupLanguage", this).call(this);
              this.rules = [
                {
                  regex: /\b(bool|char|double|float|int|long|short|void)\b/g,
                  type: "k5",
                },
                {
                  regex: /\b(enum|struct|typedef|union|object)\b/g,
                  type: "k2",
                },
                {
                  regex: /\b(const|volatile|unsigned|signed|restrict)\b/g,
                  type: "k8",
                },
                {
                  regex:
                    /\b(readonly|extern|namespace|public|privat|include|cimport|pyximport|cythonize|cdef|cpdef|ctypedef|property|IF|ELIF|ELSE|DEF)\b/g,
                  type: "k0",
                },
              ].concat(this.rules);
            },
          },
        ]),
        t
      );
    })(),
    X = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              this.rules = [
                c.poundComments,
                c.brackets,
                { regex: /\[(\w+)\]/gm, type: "k9" },
                {
                  regex: /\{([\w_-]+)\s*(?::\s*(.*?))?}/gm,
                  type: ["k7", "s0"],
                },
              ];
            },
          },
        ]),
        t
      );
    })(),
    K = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              function e(e) {
                return f(e, /\\(x[A-F0-9]{2}|u[A-F0-9]{4}|.)/gi, function (e) {
                  return [b(e[0], "s4")];
                });
              }
              this.rules = [
                { regex: /@[\W\w_][\w]+/gm, type: "k11" },
                { regex: c.sqStrings.regex, type: "s0", filter: e },
                { regex: c.dqStrings.regex, type: "s0", filter: e },
                {
                  regex: /`(?:[^`\\]|\\.)*`/g,
                  type: "s2",
                  filter: function (e) {
                    return f(e, /\$\{.*?}/g, function (e) {
                      return [b(e[0], "s3")];
                    });
                  },
                },
                c.boolean,
                c.null,
                c.prop,
                { regex: /\b(var|dynamic|enum|const)\b/g, type: "k2" },
                {
                  regex:
                    /\b(bool|int|num|double|String|Number|Map|List|Set|Symbol|Boolean|void|Object)\b/g,
                  type: "k5",
                },
                {
                  regex:
                    /\b(break|case|catch|continue|do|else|finally|for|if|switch|try|while|throw|rethrow)\b/g,
                  type: "k1",
                },
                {
                  regex:
                    /\b(abstract|as|assert|async|await|class|covariant|default|deferred|export|extends|extension|external|factory|false|final|from|Function|get|hide|implements|import|in|inferface|is|late|library|mixin|null|on|operator|part|required|return|set|show|static|sync|true|typedef|with|yield)\b/g,
                  type: "k0",
                },
                { regex: /\b(this|super)\b/g, type: "k9" },
                { regex: /\W(=>)\W/g, type: "k3" },
                { regex: /\.{3}/g, type: "k3" },
                c.slashComments,
                c.blockComments,
                c.docComments,
                { regex: /(?:^|[^\\])(\/\/\/.*)$/gm, type: "c1" },
                c.mCalls,
                c.fCalls,
                c.octal,
                c.bin,
                c.hex,
                c.floats,
                c.int,
                c.brackets,
              ];
            },
          },
        ]),
        t
      );
    })(),
    Q = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              this.rules = [
                { regex: /^([+-]{3}.*)$/gm, type: "c0" },
                { regex: /^(@@.*@@\s*)/gm, type: "t2" },
                { regex: /^(\+.*)/gm, type: "t5" },
                { regex: /^(-.*)/gm, type: "t6" },
              ];
            },
          },
        ]),
        t
      );
    })(),
    ee = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(
          t,
          [
            {
              key: "setupLanguage",
              value: function () {
                this.rules = [
                  c.dqStrings,
                  { regex: /\$\{\w+\}/gi, type: "k7" },
                  {
                    regex: /ARG\s+(\w+)(?:(=)(.*?)$)?/gim,
                    type: ["k7", "k3", "s0"],
                  },
                  {
                    regex: /ENV\s+(\w+)(?:(\s+|=)(.*?)$)?/gim,
                    type: ["k7", "k3", "s0"],
                  },
                  { regex: /(?:^|[^\\])#\s*\w+=.*$/gm, type: "k4" },
                  c.poundComments,
                  { regex: /^([a-z]+)\b/gim, type: "k0" },
                  { regex: /\b(AS)\b/gi, type: "k0" },
                  { regex: /^\s+(&&)/gim, type: "k3" },
                  c.brackets,
                ];
              },
            },
          ],
          [
            {
              key: "alias",
              value: function () {
                return ["docker"];
              },
            },
          ]
        ),
        t
      );
    })(),
    te = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(
          t,
          [
            {
              key: "setupLanguage",
              value: function () {
                this.rules = [
                  c.dqStrings,
                  c.bqStrings,
                  c.char,
                  c.boolean,
                  { regex: /\b(nil)\b/gi, type: "e1" },
                  c.prop,
                  { regex: /\b(var)\b/g, type: "k2" },
                  {
                    regex:
                      /\b(case|break|default|else|goto|switch|if|continue|for)\b/g,
                    type: "k1",
                  },
                  {
                    regex:
                      /\b(func|interface|select|defer|go|map|chan|package|fallthrough|range|import|return)\b/g,
                    type: "k0",
                  },
                  { regex: /\b(iota)\b/g, type: "k9" },
                  {
                    regex:
                      /\b(bool|string|u?int(8|16|32|64)?|uintptr|byte|rune|float32|float64|complex64|complex128)\b/g,
                    type: "k5",
                  },
                  { regex: /\b(struct|type)\b/g, type: "k2" },
                  { regex: /\b(const)\b/g, type: "k8" },
                  c.mCalls,
                  c.fCalls,
                  c.slashComments,
                  c.octal,
                  c.int,
                  c.complex,
                  c.floats,
                  c.hex,
                  c.brackets,
                ];
              },
            },
          ],
          [
            {
              key: "alias",
              value: function () {
                return ["golang"];
              },
            },
          ]
        ),
        t
      );
    })(),
    re = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              this.rules = [
                { regex: /("""[\s\S]*?"""|'''[\s\S]*?''')/g, type: "s5" },
                c.dqStrings,
                c.sqStrings,
                c.char,
                c.slashComments,
                c.blockComments,
                c.docComments,
                { regex: /(\/(?:[^/\\]|\\.)*\/)/g, type: "s5" },
                c.prop,
                {
                  regex: /\b(byte|char|short|int|long|float|double|String)\b/g,
                  type: "k5",
                },
                {
                  regex:
                    /\b(break|case|catch|continue|default|do|else|finally|for|goto|if|switch|throw|try|while)\b/g,
                  type: "k1",
                },
                {
                  regex: /^(package|import)(\s+[\w.]+)/gm,
                  type: ["k0", "k10"],
                },
                { regex: /\b(const|enum|def)\b/g, type: "k2" },
                {
                  regex:
                    /\b(as|assert|class|extends|goto|implements|in|interface|return|thows|trait)\b/g,
                  type: "k0",
                },
                { regex: /\b(this|super)\b/g, type: "k9" },
                { regex: /\b(instanceof|new)\b/g, type: "k3" },
                c.fCalls,
                c.mCalls,
                c.null,
                c.boolean,
                { regex: /^#.*/g, type: "k9" },
                { regex: /[\b\W](-?0[0-7][0-7_]+[GLIDF]?)\b/gi, type: "n4" },
                { regex: /[\b\W](-?\d[\d_]*[GLIDF]?)(?!\.)\b/gi, type: "n1" },
                {
                  regex: /[\b\W](-?0x[A-F0-9][A-F0-9_]+[GLIDF]?)\b/gi,
                  type: "n2",
                },
                { regex: /[\b\W](-?0b[01][01_]+[GLIDF]?)\b/gi, type: "n3" },
                {
                  regex:
                    /(-?((?:\d+\.\d+|\.\d+|\d+\.)(?:e[+-]?\d+)?)|\d+(?:e[+-]?\d+)?)/gi,
                  type: "n0",
                },
                c.brackets,
              ];
            },
          },
        ]),
        t
      );
    })(),
    ne = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(
          t,
          [
            {
              key: "setupLanguage",
              value: function () {
                this.rules = [
                  c.dqStrings,
                  { regex: /(;.*)$/gm, type: "c0" },
                  c.poundComments,
                  { regex: /^\s*?(\[.*])\s*?$/gm, type: "t2" },
                  {
                    regex: /^(\s*?[a-z0-9._-]+\s*?)(=)/gim,
                    type: ["k2", "k3"],
                  },
                  { regex: /\b(true|false|on|off|yes|no)\b/gim, type: "e0" },
                  c.octal,
                  c.bin,
                  c.hex,
                  c.floats,
                  c.brackets,
                ];
              },
            },
          ],
          [
            {
              key: "alias",
              value: function () {
                return ["conf", "cnf"];
              },
            },
          ]
        ),
        t
      );
    })(),
    ie = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              this.rules = [
                c.dqStrings,
                c.char,
                { regex: /@[\W\w_][\w]+/gm, type: "k11" },
                c.prop,
                {
                  regex:
                    /\b(boolean|byte|char|short|int|long|float|double|String|void|Integer|Double|BigInt|Float|Boolean|Byte|Char|Long)\b/g,
                  type: "k5",
                },
                {
                  regex:
                    /\b(while|try|catch|case|else|throw|break|if|do|goto|switch|for|continue)\b/g,
                  type: "k1",
                },
                {
                  regex: /^(package|import)(\s+[\w.]+)/gm,
                  type: ["k0", "k10"],
                },
                { regex: /\b(enum)\b/g, type: "k2" },
                { regex: /\b(const)\b/g, type: "k8" },
                {
                  regex:
                    /\b(native|volatile|strictfp|finally|class|static|interface|final|extends|transient|return|throws|public|protected|implements|private|synchronized|default|assert|abstract)\b/g,
                  type: "k0",
                },
                { regex: /\b(this|super)\b/g, type: "k9" },
                { regex: /\b(instanceof|new)\b/g, type: "k3" },
                c.fCalls,
                c.mCalls,
                c.null,
                c.boolean,
                c.slashComments,
                c.blockComments,
                c.docComments,
                c.int,
                c.floats,
                c.bin,
                c.hex,
                c.octal,
                c.brackets,
              ];
            },
          },
        ]),
        t
      );
    })(),
    x = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(
          t,
          [
            {
              key: "setupLanguage",
              value: function () {
                function e(e) {
                  return f(
                    e,
                    /\\(x[A-F0-9]{2}|u[A-F0-9]{4}|.)/gi,
                    function (e) {
                      return [b(e[0], "s4")];
                    }
                  );
                }
                this.rules = [
                  { regex: c.sqStrings.regex, type: "s0", filter: e },
                  { regex: c.dqStrings.regex, type: "s0", filter: e },
                  {
                    regex: /`(?:[^`\\]|\\.)*`/g,
                    type: "s2",
                    filter: function (e) {
                      return f(e, /\$\{.*?}/g, function (e) {
                        return [b(e[0], "s3")];
                      });
                    },
                  },
                  c.boolean,
                  c.null,
                  c.prop,
                  { regex: /\b(var|let|enum|const)\b/g, type: "k2" },
                  { regex: /\b(document|window|console)\b/g, type: "k9" },
                  {
                    regex:
                      /\b(break|case|catch|continue|do|else|finally|for|if|switch|try|while|throw)\b/g,
                    type: "k1",
                  },
                  {
                    regex:
                      /\b(as|async|class|constructor|debugger|default|export|extends|function|import|return|with|yield|implements|package|protected|static|interface|private|public|await|module)\b/g,
                    type: "k0",
                  },
                  { regex: /\b(this|super)\b/g, type: "k9" },
                  {
                    regex: /\b(instanceof|new|delete|typeof|void|in)\b/g,
                    type: "k3",
                  },
                  { regex: /\W(=>)\W/g, type: "k3" },
                  c.slashComments,
                  c.blockComments,
                  { regex: /\W(\/(?:[^/\\\n]|\\.)*\/\w*)/g, type: "e2" },
                  c.mCalls,
                  c.fCalls,
                  { regex: /\{|}|\(|\)|\[|]/g, type: "g1" },
                  { regex: /[\b\W](-?0o[0-7]+)(?!\.)\b/g, type: "n4" },
                  c.bin,
                  c.hex,
                  c.floats,
                  c.int,
                ];
              },
            },
          ],
          [
            {
              key: "alias",
              value: function () {
                return ["js"];
              },
            },
          ]
        ),
        t
      );
    })(),
    se = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              this.rules = [
                { regex: /"(?:[^"\\]|\\.)*"\s*:/g, type: "k2" },
                c.dqStrings,
                c.boolean,
                c.null,
                { regex: /\{|}|\(|\)|\[|]/g, type: "g1" },
                c.int,
                c.floats,
                { regex: /,|:/g, type: "g0" },
              ];
            },
          },
        ]),
        t
      );
    })(),
    ae = (function () {
      i(t, x);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              l(s(t.prototype), "setupLanguage", this).call(this);
              this.rules = this.rules.concat([
                {
                  regex: /(<)([A-Z:_][A-Z0-9:.-]*)([\s\S]*?)(\/?>)/gi,
                  type: ["g1", "x1", "text", "g1"],
                  filter: [null, null, null, null],
                },
                {
                  regex: /(<\/)([A-Z:_][A-Z0-9:.-]*\s*)(>)/gi,
                  type: ["g1", "x1", "g1"],
                },
              ]);
            },
          },
        ]),
        t
      );
    })(),
    oe = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              function e(e) {
                return f(e, /\$(?:\{.*?}|\w+)/g, function (e) {
                  return [b(e[0], "s3")];
                });
              }
              this.rules = [
                { regex: /"""[\s\S]*?"""/g, type: "s5", filter: e },
                { regex: c.dqStrings.regex, type: "s0", filter: e },
                c.char,
                c.prop,
                {
                  regex:
                    /\b(Double|Float|Long|Int|Short|Byte|Any|String|Array)\b/g,
                  type: "k5",
                },
                {
                  regex:
                    /\b(break|continue|do|else|for|if|throw|try|when|while|catch|finally)\b/g,
                  type: "k1",
                },
                {
                  regex: /^(package|import)(\s+[\w.]+)/gm,
                  type: ["k0", "k10"],
                },
                {
                  regex: /\b(enum|typealias|object|companion|val|var)\b/g,
                  type: "k2",
                },
                {
                  regex:
                    /\b(actual|abstract|annotation|companion|crossinline|data|expect|external|final|infix|inline|inner|internal|lateinit|noinline|open|operator|out|override|private|protected|public|reified|sealed|suspend|tailrec|vararg)\b/g,
                  type: "k8",
                },
                {
                  regex:
                    /\b(as|class|fun|in|interface|is|return|by|constructor|delegate|dynamic|field|file|get|init|param|property|receiver|set|setparam|where|field|it)\b/g,
                  type: "k0",
                },
                { regex: /\b(this|super)\b/g, type: "k9" },
                { regex: /\b(instanceof|new)\b/g, type: "k3" },
                { regex: /(@\w+|\w+@)/gm, type: "k6" },
                c.fCalls,
                c.mCalls,
                c.null,
                c.boolean,
                c.slashComments,
                c.blockComments,
                { regex: /[\b\W](-?\d[\d_]*L?)(?!\.)\b/g, type: "n1" },
                c.floats,
                { regex: /[\b\W](-?0x[A-F0-9][A-F0-9_]+)\b/gi, type: "n2" },
                { regex: /[\b\W](-?0b[01][01_]+)\b/gi, type: "n3" },
                c.brackets,
              ];
            },
          },
        ]),
        t
      );
    })(),
    le = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(
          t,
          [
            {
              key: "setupLanguage",
              value: function () {
                this.rules = [
                  { regex: /(?:^|[^\\])%.*$/gm, type: "c0" },
                  { regex: /(?:^|[^\\])(\\\w+)(?:[\W\s])/gm, type: "k0" },
                  { regex: /[$()]/g, type: ["s3"] },
                  c.int,
                  c.floats,
                  c.brackets,
                ];
              },
            },
          ],
          [
            {
              key: "alias",
              value: function () {
                return ["tex"];
              },
            },
          ]
        ),
        t
      );
    })(),
    ge = (function () {
      i(t, h);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              l(s(t.prototype), "setupLanguage", this).call(this),
                this.rules.shift(),
                (this.rules = this.rules.concat([
                  c.slashComments,
                  d.pseudoElements,
                  d.idSelector,
                  d.classSelector,
                  { regex: /\b([\w][\w-]+)\s*\(/gm, type: "m0" },
                  { regex: /@[\w-]+\b/g, type: "k7" },
                  { regex: /&/gi, type: "k3" },
                ]));
            },
          },
        ]),
        t
      );
    })(),
    ue = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(
          t,
          [
            {
              key: "setupLanguage",
              value: function () {
                this.rules = [
                  c.dqStrings,
                  c.poundComments,
                  { regex: /[\w\])]\.([\w-]+)\b/g, type: "m3" },
                  { regex: /\b(else)\b/g, type: "k1" },
                  { regex: /\s\$[A-Z_]+/g, type: "k7" },
                  { regex: /(==|!=|=~|!~)/g, type: "k3" },
                  { regex: /\b(\w[\w-]+)\.\w/g, type: "k9" },
                  c.int,
                  c.brackets,
                ];
              },
            },
          ],
          [
            {
              key: "alias",
              value: function () {
                return [];
              },
            },
          ]
        ),
        t
      );
    })(),
    pe = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              this.rules = [
                { regex: /---\[\[[\s\S]*?(]])/g, type: "c1" },
                { regex: /--\[\[[\s\S]*?]]/g, type: "c1" },
                { regex: /(--.*)$/gm, type: "c0" },
                c.dqStrings,
                c.sqStrings,
                { regex: /(\[(=*)\[[\S\s]*?]\2])/g, type: "s5" },
                { regex: /\b(true|false)\b/gi, type: "e0" },
                { regex: /\b(nil)\b/gi, type: "e1" },
                { regex: /\b(local)\b/g, type: "k2" },
                {
                  regex:
                    /\b(break|do|else|elseif|end|for|if|repeat|then|until|while)\b/g,
                  type: "k1",
                },
                { regex: /\b(function|return|and|in|or|not)\b/g, type: "k0" },
                c.brackets,
                c.floats,
                c.mCalls,
                c.fCalls,
              ];
            },
          },
        ]),
        t
      );
    })(),
    m = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              this.rules = [
                c.blockComments,
                { regex: /--.*$/gm, type: "c0" },
                c.null,
                c.sqStrings,
                {
                  regex:
                    /\b(NOT NULL|UNIQUE|PRIMARY KEY|FOREIGN KEY|CHECK|DEFAULT|INDEX)\b/gi,
                  type: "k4",
                },
                { regex: /`\S+?`(?:\.`\S+?`)*/g, type: "k9" },
                {
                  regex:
                    /\b(all|and|any|between|exists|in|like|not|or|is null|is not null|=|!=|<>|>|<|>=|<=|!<|!>)\b/gi,
                  type: "k3",
                },
                {
                  regex:
                    /\b(SELECT|INSERT|UPDATE|DELETE|INTO|FROM|CREATE|TABLE|VIEW|WHERE|TRIGGER|ALTER|ORDER BY|DESC|ASC|AS|BETWEEN|JOIN|LEFT|RIGHT|INNER|OUTER|USING|ON|UNION)\b/gi,
                  type: "k0",
                },
                { regex: /\b[A-Z]+\b/g, type: "k0" },
                c.int,
                c.floats,
              ];
            },
          },
        ]),
        t
      );
    })(),
    ce = (function () {
      i(t, m);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(
          t,
          [
            {
              key: "setupLanguage",
              value: function () {
                l(s(t.prototype), "setupLanguage", this).call(this),
                  (this.rules = this.rules.concat([
                    c.poundComments,
                    {
                      regex:
                        /\b(tinyint|smallint|mediumint|bigint|int|integer|boolean|decimal|number|float|double|bit|double precision|real|dec|numeric|fixed)\b/g,
                      type: "k5",
                    },
                    { regex: /\b(unsigned|signed|zerofill)\b/g, type: "k8" },
                  ]));
              },
            },
          ],
          [
            {
              key: "alias",
              value: function () {
                return ["mysql"];
              },
            },
          ]
        ),
        t
      );
    })(),
    ye = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(
          t,
          [
            {
              key: "setupLanguage",
              value: function () {
                this.rules = [
                  {
                    regex: /[\r|\n](```[a-z_-]*[\r|\n][\S\s]+?```)/gi,
                    type: "t8",
                  },
                  { regex: /^\s*#{1,6}.+$/gm, type: "t1" },
                  { regex: /(.+[\r|\n][=-]{3,})[\r|\n]/g, type: "t1" },
                  { regex: /`.+?`/g, type: "t8" },
                  { regex: /^(?:\*|_|-){3,}$/gm, type: "t2" },
                  { regex: /\W(\*\*|\*|~~|~|__|_)(.*?\1)\W/gm, type: "t4" },
                  { regex: /!?\[.*?]\(.*?\)/g, type: "t3" },
                ];
              },
            },
          ],
          [
            {
              key: "alias",
              value: function () {
                return ["md", "gfm"];
              },
            },
          ]
        ),
        t
      );
    })(),
    fe = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              this.rules = [
                { regex: /%.*$/gm, type: "c0" },
                { regex: /%%.*$/gm, type: "c1" },
                c.sqStrings,
                c.dqStrings,
                c.boolean,
                c.mCalls,
                c.prop,
                {
                  regex:
                    /\b(break|case|catch|continue|do|else|elseif|end|end_try_catch|endfor|endif|endmethods|endparfor|endproperties|endswitch|endwhile|for|if|switch|try|until|while)\b/gi,
                  type: "k1",
                },
                {
                  regex:
                    /\b(__FILE__|__LINE__|classdef|end_unwind_protect|endclassdef|endenumeration|endevents|endfunctionenumeration|events|function|global|methods|otherwise|parfor|persistent|properties|return|static|unwind_protect|unwind_protect_cleanup)\b/gi,
                  type: "k0",
                },
                { regex: /(@[\w]+)\s*/gm, type: "k7" },
                c.fCalls,
                c.floats,
                c.brackets,
              ];
            },
          },
        ]),
        t
      );
    })(),
    be = (function () {
      i(t, m);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              l(s(t.prototype), "setupLanguage", this).call(this);
              this.rules = this.rules.concat([]);
            },
          },
        ]),
        t
      );
    })(),
    de = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(
          t,
          [
            {
              key: "setupLanguage",
              value: function () {
                this.rules = [
                  c.dqStrings,
                  c.sqStrings,
                  c.poundComments,
                  { regex: /([a-z]+)\s*\{/g, type: "k9" },
                  { regex: /^\s*([a-z]\w+)\s/gm, type: "k0" },
                  { regex: /\W([a-z]+:\/\/.*?);/g, type: "k9" },
                  { regex: /\b(\d+\.\d+\.\d+\.\d+(?::\d+))\b/g, type: "k9" },
                  { regex: /(?:\W)\$[a-z_]+/g, type: "k7" },
                  { regex: /[\b\W](\d+[kmgdyw])\b/g, type: "n0" },
                  c.int,
                  c.brackets,
                ];
              },
            },
          ],
          [
            {
              key: "alias",
              value: function () {
                return [];
              },
            },
          ]
        ),
        t
      );
    })(),
    he = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              this.rules = [
                c.dqStrings,
                c.sqStrings,
                c.bqStrings,
                {
                  regex: /^\s*(Var(\s+\\GLOBAL)?)(\s+\w+)\b/g,
                  type: ["k2", "k7"],
                },
                { regex: /\W(\$\{\w+})\W/g, type: "k9" },
                { regex: /\W(\$\w+)\b/g, type: "k7" },
                { regex: /^\s*([A-Z]\w+)\s+/gm, type: "k0" },
                { regex: /\b[A-Z][A-Z_]*[A-Z]\b/g, type: "e3" },
                { regex: /^\s*(!\w+)\s+/gm, type: "k4" },
                { regex: /^\s*(\w+:)\s*$/gim, type: "k6" },
                {
                  regex:
                    /\b(admin|all|auto|both|colored|false|force|hide|highest|lastused|leave|listonly|none|normal|notset|off|on|open|print|show|silent|silentlog|smooth|textonly|true|user)\b/gi,
                  type: "k9",
                },
                c.blockComments,
                { regex: /[#;].*?$/gm, type: "c0" },
                c.int,
                c.hex,
                c.octal,
                c.brackets,
              ];
            },
          },
        ]),
        t
      );
    })(),
    xe = (function () {
      i(t, m);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(
          t,
          [
            {
              key: "setupLanguage",
              value: function () {
                l(s(t.prototype), "setupLanguage", this).call(this);
                this.rules = this.rules.concat([]);
              },
            },
          ],
          [
            {
              key: "alias",
              value: function () {
                return ["oracle"];
              },
            },
          ]
        ),
        t
      );
    })(),
    me = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              this.rules = [
                c.sqStrings,
                c.dqStrings,
                c.heredoc,
                c.boolean,
                c.null,
                { regex: /(->)([\w]+)/gim, type: ["k3", "m1"] },
                { regex: /(::)([\w]+)/gim, type: ["k3", "m2"] },
                { regex: /(self|parent|\$this)/gi, type: "k9" },
                {
                  regex:
                    /\b(as|break|case|catch|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|finally|for|foreach|goto|if|switch|throw|try|while)\b/g,
                  type: "k1",
                },
                { regex: /\b__[A-Z][A-Z0-9_]+__\b/g, type: "e3" },
                {
                  regex:
                    /\b(__halt_compiler|abstract|array|callable|class|const|continue|declare|default|die|echo|empty|eval|exit|extends|final|function|global|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|print|private|protected|public|require|require_once|return|static|trait|use|var|yield)\b/g,
                  type: "k0",
                },
                { regex: /\b(and|or|xor|clone|new|unset)\b/g, type: "k3" },
                {
                  regex:
                    /\b(int|float|bool|string|resource|object|mixed|numeric)\b/g,
                  type: "k5",
                },
                c.slashComments,
                c.poundComments,
                c.blockComments,
                { regex: /\$[^\s=;()'">:-]+/gim, type: "k7" },
                { regex: /\b(\w[^\s('"]+)\s*\(/gm, type: "m0" },
                c.octal,
                c.bin,
                c.hex,
                c.floats,
                c.int,
                c.brackets,
              ];
            },
          },
        ]),
        t
      );
    })(),
    ke = (function () {
      i(t, m);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(
          t,
          [
            {
              key: "setupLanguage",
              value: function () {
                l(s(t.prototype), "setupLanguage", this).call(this);
                this.rules = this.rules.concat([]);
              },
            },
          ],
          [
            {
              key: "alias",
              value: function () {
                return ["postgres"];
              },
            },
          ]
        ),
        t
      );
    })(),
    ve = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              function e(e) {
                return f(e, /\$(?:\w+|\(.*?\))/g, function (e) {
                  return [b(e[0], "k7")];
                });
              }
              this.rules = [
                { regex: /"(?:[^"`]|`.)*"/g, type: "s2", filter: e },
                c.sqStrings,
                { regex: /@"[\S\s]*?\n\s*"@/g, type: "s5", filter: e },
                { regex: /@'[\S\s]*?\n\s*'@/g, type: "s5" },
                {
                  regex:
                    /\b(Begin|Break|Catch|Continue|Else|Elseif|End|Finally|For|ForEach|If|Switch|Throw|Try|Until|While)\b/gi,
                  type: "k1",
                },
                {
                  regex:
                    /\b(Data|Do|DynamicParam|Exit|Filter|From|Function|In|InlineScript|Hidden|Parallel|Param|Process|Return|Sequence|Trap|Workflow)\b/gi,
                  type: "k0",
                },
                { regex: /\b([A-Z]\w+(?:-\w+)+)\b/gi, type: "m0" },
                { regex: /<#[\S\s]+?#>/gi, type: "c1" },
                c.poundComments,
                { regex: /\$[A-Z_][\w]*/gim, type: "k7" },
                c.mCalls,
                c.fCalls,
                c.int,
                c.floats,
                c.brackets,
              ];
            },
          },
        ]),
        t
      );
    })(),
    we = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              this.rules = [
                { regex: /(%.*)$/gm, type: "c0" },
                c.blockComments,
                c.dqStrings,
                c.sqStrings,
                { regex: /^(\w+)(?:\(.*?\))?\s*(?::-|\.)/gm, type: "k9" },
                { regex: /\b(true|false|Yes|No|not|fail)\b/gi, type: "e0" },
                { regex: /\b(catch|throw|repeat)\b/g, type: "k1" },
                { regex: /^(\?-)/g, type: "k9" },
                { regex: /\b(is)\b/g, type: "k3" },
                { regex: /[A-Z_][\w]*/g, type: "k7" },
                c.brackets,
                c.floats,
                c.int,
                c.fCalls,
              ];
            },
          },
        ]),
        t
      );
    })(),
    Ce = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(
          t,
          [
            {
              key: "setupLanguage",
              value: function () {
                this.rules = [
                  c.int,
                  c.floats,
                  { regex: /[\b\W](-?\$[A-F0-9]+)\b/gi, type: "n2" },
                  { regex: /[\b\W](-?%[01]+)\b/gi, type: "n3" },
                  { regex: /[\b\W](\*\w+)\b/gi, type: "text" },
                  c.dqStrings,
                  { regex: /[[\]()]+/g, type: "g0" },
                  { regex: /#\w+/gim, type: "g0" },
                  { regex: /[@?]\w+/gim, type: "g1" },
                  {
                    regex:
                      /(IncludeFile|XIncludeFile|IncludeBinary|IncludePath) (.*?)$/gim,
                    type: "k0",
                  },
                  {
                    regex:
                      /\b(Break|Case|Continue|Default|Else|ElseIf|End|EndIf|EndSelect|For|ForEver|ForEach|Gosub|Goto|If|Next|Repeat|Return|FakeReturn|Select|Until|Wend|While|To|Step)\b/gi,
                    type: "k1",
                  },
                  {
                    regex:
                      /\b(Array|List|Map|Procedure(?:C|Dll|CDll)?|ProcedureReturn|EndProcedure|Declare(?:C|Dll|CDll)?|ImportC?|EndImport|As|Macro|MacroExpandedCount|EndMacro|UndefineMacro|DeclareModule|EndDeclareModule|Module|EndModule|UseModule|UnuseModule|With|EndWith|PrototypeC?|Runtime|Swap|Data|DataSection|EndDataSection|Read|Restore)\b/gi,
                    type: "k2",
                  },
                  {
                    regex:
                      /\b(ReDim|Dim|NewList|NewMap|Enumeration|EndEnumeration|Interface|Extends|EndInterface|Structure(?:Union)?|EndStructure(?:Union)?)\b/gi,
                    type: "k4",
                  },
                  {
                    regex: /\b(?:ReDim|Dim|NewList|NewMap)\s*([\w]+)\(/gim,
                    type: "text",
                  },
                  {
                    regex:
                      /\b(Define|Global|Protected|Shared|Static|Threaded)\b/gi,
                    type: "k3",
                  },
                  {
                    regex:
                      /[\w\])]\.(s{\d+}|(?:p-ascii|p-utf8|p-bstr|p-unicode|p-variant)|\w+)(?:\([\d,]*\))?/gi,
                    type: "k4",
                  },
                  {
                    regex:
                      /\b(CompilerIf|CompilerElse|CompilerElseIf|CompilerEndIf|CompilerSelect|CompilerCase|CompilerDefault|CompilerEndSelect|CompilerError|CompilerWarning|EnableExplicit|DisableExplicit|EnableASM|DisableASM|EnableDebugger|DisableDebugger|Debug|DebugLevel|CallDebugger)\b/gi,
                    type: "k5",
                  },
                  { regex: /\W(And|Not|Or|Xor)\W/gi, type: "k6" },
                  {
                    regex: /(<=|=<|>=|=>|<>|<<|>>|=|-|\+|\/|%|<|>|&|\||!|~)/gi,
                    type: "k6",
                  },
                  { regex: /(\*)(?:\d|\s*(?:\b|-|\(|%|\$|\*))/gi, type: "k6" },
                  { regex: /(\w+)::/gi, type: "k7" },
                  { regex: /(\w+):/gi, type: "k8" },
                  c.fCalls,
                  { regex: /;.*$/gm, type: "c0" },
                  { regex: /\\(\w+)\b/g, type: "m3" },
                ];
              },
            },
          ],
          [
            {
              key: "alias",
              value: function () {
                return ["pb"];
              },
            },
          ]
        ),
        t
      );
    })(),
    Se = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              this.rules = [
                c.dqStrings,
                c.prop,
                { regex: /\b([A-Z]\w+)\b/g, type: "k5" },
                { regex: /^(import)(\s+[\w.]+)/gm, type: ["k0", "k5"] },
                {
                  regex:
                    /\b(bool|char|double|float|int|long|short|void|string)\b/g,
                  type: "k5",
                },
                c.mCalls,
                c.null,
                c.boolean,
                c.slashComments,
                c.blockComments,
                c.int,
                c.floats,
                c.brackets,
              ];
            },
          },
        ]),
        t
      );
    })(),
    _e = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, null, [
          {
            key: "alias",
            value: function () {
              return [];
            },
          },
        ]),
        t
      );
    })(),
    Ee = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              this.rules = [{ regex: /^(.*?)$/g, type: "text" }];
            },
          },
        ]),
        t
      );
    })(),
    Ae = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(
          t,
          [
            {
              key: "setupLanguage",
              value: function () {
                this.rules = [
                  c.dqStrings,
                  { regex: /("[\s\S]*?")/g, type: "s5" },
                  { regex: /\b(yes|no)\b/gi, type: "e0" },
                  { regex: /\b([\w-]+)(=)/gi, type: ["k6", "k3"] },
                  { regex: /[^\b](:local|:global)\s/gm, type: "k2" },
                  { regex: /^\/\w+(?:\s+[a-z-]+)*\s*$/gm, type: "k10" },
                  {
                    regex:
                      /\b(add|set|print|enable|disable|export|find|get|move|remove)\b/gi,
                    type: "k9",
                  },
                  { regex: /[^\b](:[a-z-]+)\s/gm, type: "k0" },
                  { regex: /\$[\w]*/gi, type: "k7" },
                  { regex: /(?:[a-f0-9]{2}:){5}(?:[a-f0-9]{2})/gi, type: "s0" },
                  {
                    regex: /(?:\d{1,3}\.){3}(?:\d{1,3})(?:\/\d{1,2})?/gi,
                    type: "s0",
                  },
                  c.poundComments,
                  { regex: /[\b\W](-?\d+)([a-z]{1,4})?[\b\W]/gi, type: "n0" },
                  c.int,
                  c.hex,
                  c.brackets,
                ];
              },
            },
          ],
          [
            {
              key: "alias",
              value: function () {
                return ["mikrotik", "mt", "switchos", "ros"];
              },
            },
          ]
        ),
        t
      );
    })(),
    Le = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              function e(e) {
                return (
                  e.text.match(/^%r/)
                    ? (e.type = "e2")
                    : e.text.match(/^%x/) && (e.type = "e4"),
                  [e]
                );
              }
              this.rules = [
                c.dqStrings,
                c.sqStrings,
                c.heredoc,
                { regex: /(`(?:[^`\\]|\\.)*`)/g, type: "e4" },
                c.boolean,
                { regex: /\b(nil)\b/gi, type: "e1" },
                c.fCalls,
                c.prop,
                { regex: /@{1,2}[A-Za-z_]\w*\W/g, type: "k7" },
                { regex: /[^:](:[\w]+)\b/g, type: "k6" },
                { regex: /(\$[a-z0-9_-]+|\$.)\W/gi, type: "k9" },
                {
                  regex:
                    /\b(begin|break|case|do|else|elsif|end|ensure|for|if|in|next|redo|rescue|retry|then|unless|until|when|while)\b/gi,
                  type: "k1",
                },
                { regex: /\b((?:__)?[A-Z][A-Z0-9_]+)\b/g, type: "e3" },
                {
                  regex:
                    /\b(alias|class|defined\?|undef|def|module|return|self|super|yield)\W/gi,
                  type: "k0",
                },
                { regex: /\b(and|not|or)\b/gi, type: "k3" },
                c.poundComments,
                { regex: /^=begin[\S\s]*?^=end/gim, type: "c2" },
                {
                  regex: /(%[iqrswx](\W)(?:[^\2\n\\]|\\.)*\2[iomx]*)/gim,
                  type: "s2",
                  filter: e,
                },
                {
                  regex:
                    /(%[iqrswx]?(\{(?:[^}\\]|\\.)*}|\[(?:[^}\\]|\\.)*]|\((?:[^)\\]|\\.)*\))[iomx]*)/gim,
                  type: "s2",
                  filter: e,
                },
                { regex: /\W(\/(?:[^/\\]|\\.)*\/\w*)\W/g, type: "e2" },
                {
                  regex: /\W\?(?:\w|\\M|\\C)(?:-\w|-\\M|-\\C)*\b/g,
                  type: "n1",
                },
                { regex: /[\b\W](-?\d[\d_]+?)(?!\.)\b/g, type: "n1" },
                { regex: /[\b\W](-?0x[A-F0-9][A-F0-9_]+)\b/gi, type: "n2" },
                { regex: /[\b\W](-?0b[01][01_]+)\b/gi, type: "n3" },
                {
                  regex: /[\b\W](-?[\d_]+(?:\.[\d_]+)?(?:e[+-]?\d+)?[ji]?)\b/gi,
                  type: "n0",
                },
                c.brackets,
              ];
            },
          },
        ]),
        t
      );
    })(),
    qe = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              this.rules = [
                c.char,
                { regex: /r((#+)".*?"\2)/gm, type: "s0" },
                { regex: /("(?:\\.|\\\s*\n|\\s*\r\n|[^\\"])*")/g, type: "s0" },
                { regex: /^\s*#.*$/gm, type: "k4" },
                { regex: /fn\s+([\w]+)\s*(<\w+\s*>)?\(/gm, type: "k0" },
                { regex: /\b\.?([\w]+)\s*(\(|::)/gm, type: "k1" },
                { regex: /\b([\w]+)!/gm, type: "k9" },
                { regex: /\bself\b/gi, type: "k9" },
                c.boolean,
                {
                  regex: /\b(while|loop|in|for|if|else|do|continue|break)\b/g,
                  type: "k1",
                },
                { regex: /\b(type|struct|let|enum)\b/g, type: "k2" },
                { regex: /\b(const)\b/g, type: "k8" },
                {
                  regex:
                    /\b(yield|where|virtual|use|unsized|unsafe|trait|super|static|return|ref|pure|pub|proc|priv|override|offsetof|mut|move|mod|match|macro|impl|fn|final|extern|crate|box|become|as|alignof|abstract)\b/g,
                  type: "k0",
                },
                { regex: /\b(sizeof|typeof)\b/g, type: "k3" },
                {
                  regex: /\b([0-9_]+\.?[0-9_]+?(e\+[0-9_]+)?)(?:f32|f64)?\b/gim,
                  type: "n0",
                },
                {
                  regex:
                    /\b([0-9_]+|0o[0-9_]+|0x[A-F0-9_]+|0b[0-1_]+)(?:u8|i8|u16|i16|u32|i32|u64|i64|isize|usize)?\b/gim,
                  type: "n1",
                },
                c.slashComments,
                c.blockComments,
                { regex: /(?:^|[^\\])\/\/[/!].*$/gm, type: "c2" },
                { regex: /\/\*[*!][\s\S]*?\*\//gm, type: "c2" },
                c.brackets,
                { regex: /\W(&)\w/g, type: "k3" },
              ];
            },
          },
        ]),
        t
      );
    })(),
    Ie = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              this.rules = [
                c.dqStrings,
                c.char,
                { regex: /s"(?:[^"\\]|\\.)*"/g, type: "s2" },
                { regex: /`(?:[^`\\]|\\.)*`/g, type: "k7" },
                { regex: /@[\W\w_][\w]+/g, type: "k11" },
                { regex: /\b([A-Z]\w*)\b/g, type: "k5" },
                {
                  regex:
                    /\b(while|try|catch|else|throw|break|if|do|goto|switch|for|match)\b/g,
                  type: "k1",
                },
                { regex: /(package|import)(\s+[\w.]+)/gm, type: ["k0", "k10"] },
                {
                  regex: /[\b\w\s)](_|:|@|#|<-|←|<:|<%|=|=>|⇒|>:)[\b\w\s]/g,
                  type: "k3",
                },
                {
                  regex:
                    /\b(abstract|class|case|extends|final|finally|forSome|implicit|lazy|object|override|private|protected|return|sealed|trait|with|yield)\b/g,
                  type: "k0",
                },
                { regex: /\b(def)\s+(\w+)\b/gm, type: ["k2", "m0"] },
                { regex: /\b(type)\s+(\w+)\b/gm, type: ["k2", "k5"] },
                { regex: /\b(val)\s+(\w+)\b/gm, type: ["k2", "k7"] },
                { regex: /\b(var)\s+(\w+)\b/gm, type: ["k2", "k7"] },
                { regex: /\b(this|super)\b/g, type: "k9" },
                { regex: /\b(new)\b/g, type: "k3" },
                c.mCalls,
                c.fCalls,
                c.null,
                c.boolean,
                c.slashComments,
                c.blockComments,
                c.docComments,
                c.int,
                c.floats,
                c.bin,
                c.brackets,
              ];
            },
          },
        ]),
        t
      );
    })(),
    Ne = (function () {
      i(t, h);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(
          t,
          [
            {
              key: "setupLanguage",
              value: function () {
                l(s(t.prototype), "setupLanguage", this).call(this),
                  this.rules.shift(),
                  (this.rules = this.rules.concat([
                    c.slashComments,
                    d.pseudoElements,
                    d.idSelector,
                    d.classSelector,
                    { regex: /\b([\w-]+)\s*\(/gm, type: "m0" },
                    { regex: /\$[\w-]+\b/g, type: "k7" },
                    { regex: /@[\w-]+\b/g, type: "k9" },
                    { regex: /&/gi, type: "k3" },
                  ]));
              },
            },
          ],
          [
            {
              key: "alias",
              value: function () {
                return ["sass"];
              },
            },
          ]
        ),
        t
      );
    })(),
    We = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(
          t,
          [
            {
              key: "setupLanguage",
              value: function () {
                this.rules = [
                  { regex: /(^#!.*?)\n/gi, type: "k4" },
                  c.poundComments,
                  { regex: /[^\\]("(?:[^"\\]|\\.)*")/g, type: "s0" },
                  { regex: /`.*?`/gm, type: "s2" },
                  { regex: /(\$)\(/gm, type: "s2" },
                  { regex: /(\$\d)\b/gim, type: "k9" },
                  { regex: /(\$\w+)\b/gim, type: "k7" },
                  { regex: /^(\s*\w+)=/gm, type: "k7" },
                  { regex: /^\s*\w+\)\s*$/gm, type: "k6" },
                  {
                    regex:
                      /\b(if|fi|then|elif|else|for|do|done|until|while|break|continue|case|esac|in|eq|ne|gt|lt|ge|le)\b/gi,
                    type: "k1",
                  },
                  { regex: /\b(return|function)\b/gi, type: "k0" },
                  { regex: /^\s*\w+\(\)\s*\{/gm, type: "k0" },
                  c.int,
                ];
              },
            },
          ],
          [
            {
              key: "alias",
              value: function () {
                return ["bash", "sh", "zsh"];
              },
            },
          ]
        ),
        t
      );
    })(),
    $e = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              this.rules = [
                c.dqStrings,
                { regex: c.sqStrings.regex, type: "n0" },
                c.prop,
                c.slashComments,
                c.poundComments,
                c.blockComments,
                c.brackets,
                { regex: /\b(const|enum|local)\b/g, type: "k2" },
                {
                  regex:
                    /\b(break|case|catch|continue|else|for|foreach|if|switch|while|try|do)\b/g,
                  type: "k1",
                },
                {
                  regex:
                    /\b(base|class|clone|constructor|default|extends|false|function|null|resume|return|static|this|throw|true|yield)\b/g,
                  type: "k0",
                },
                { regex: /\b(delete|in|instanceof|typeof)\b/g, type: "k3" },
                c.mCalls,
                c.fCalls,
                c.octal,
                c.hex,
                c.floats,
                c.int,
              ];
            },
          },
        ]),
        t
      );
    })(),
    Oe = (function () {
      i(t, y);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              this.rules = [
                c.dqStrings,
                c.boolean,
                { regex: /#.*$/gm, type: "k4" },
                c.prop,
                { regex: /(import )(.*?)$/gm, type: ["k0", "k10"] },
                { regex: /\b(nil)\b/gi, type: "e1" },
                {
                  regex:
                    /\b(break|case|continue|default|do|else|for|if|switch|while|catch|throw|try)\b/g,
                  type: "k1",
                },
                { regex: /\b(var|let|enum|struct)\b/g, type: "k2" },
                {
                  regex:
                    /\b(Int|UInt|Float|Double|Bool|String|Character|Optional|Array|Dictionary)\b/g,
                  type: "k5",
                },
                {
                  regex:
                    /\b(associatedtype|class|deinit|extension|func|init|inout|internal|operator|private|protocol|public|static|subscript|typealias|defer|fallthrough|guard|in|as|repeat|return|where|dynamicType|is|rethrows|super|self|Self|throws|associativity|convenience|dynamic|didSet|final|get|infix|indirect|lazy|left|mutating|none|nonmutating|optional|override|postfix|precedence|prefix|Protocol|required|right|set|Type|unowned|weak|willSet)\b/g,
                  type: "k0",
                },
                c.mCalls,
                c.fCalls,
                { regex: /(?:^|[^\\])\/\/\/.*$/gm, type: "c2" },
                c.docComments,
                c.slashComments,
                c.blockComments,
                { regex: /[\b\W](-?0b[01_]+)\b/gi, type: "n3" },
                { regex: /[\b\W](-?0x[A-F0-9_]+)(?!\.)\b/gi, type: "n2" },
                { regex: /[\b\W](-?0o[0-7_]+)(?!\.)\b/g, type: "n4" },
                { regex: /[\b\W](-?[\d_]+)(?!\.)\b/g, type: "n1" },
                {
                  regex: /(-?(?:[\d_]+\.[\d_]+(?:e[+-]?[\d_]+)?))/gi,
                  type: "n0",
                },
                {
                  regex:
                    /(-?0x(?:[A-F0-9_]+\.[A-F0-9_]+(?:p[+-]?[A-F0-9_]+)?))/gi,
                  type: "n2",
                },
                c.brackets,
              ];
            },
          },
        ]),
        t
      );
    })(),
    De = (function () {
      i(t, x);
      var e = o(t);
      function t() {
        return r(this, t), e.apply(this, arguments);
      }
      return (
        n(t, [
          {
            key: "setupLanguage",
            value: function () {
              l(s(t.prototype), "setupLanguage", this).call(this);
              this.rules = [
                {
                  regex:
                    /\b(boolean|number|string|any|void|undefined|never|symbol)\b/g,
                  type: "k5",
                },
                { regex: /\b(type|interface)\b/g, type: "k2" },
                { regex: /\b(abstract|implements|readonly)\b/g, type: "k8" },
                { regex: /\b(declare|namespace)\b/g, type: "k0" },
                { regex: /\b([\w]+)\s*</gm, type: "m0" },
                { regex: /[<>]/g, type: "g1" },
              ].concat(this.rules);
            },
          },
        ]),
        t
      );
    })(),
    k = Object.freeze({
      __proto__: null,
      generic: y,
      abap: t,
      apache: M,
      assembly: P,
      avrassembly: U,
      batch: G,
      cpp: H,
      csharp: V,
      css: h,
      cython: Y,
      cordpro: X,
      dart: K,
      diff: Q,
      dockerfile: ee,
      go: te,
      groovy: re,
      ini: ne,
      java: ie,
      javascript: x,
      json: se,
      jsx: ae,
      kotlin: oe,
      latex: le,
      less: ge,
      lighttpd: ue,
      lua: pe,
      mariadb: ce,
      markdown: ye,
      matlab: fe,
      mssql: be,
      nginx: de,
      nsis: he,
      oracledb: xe,
      php: me,
      postgresql: ke,
      powershell: ve,
      prolog: we,
      purebasic: Ce,
      python: J,
      qml: Se,
      r: _e,
      raw: Ee,
      routeros: Ae,
      ruby: Le,
      rust: qe,
      scala: Ie,
      scss: Ne,
      shell: We,
      sql: m,
      squirrel: $e,
      swift: Oe,
      typescript: De,
      vhdl: (function () {
        i(t, y);
        var e = o(t);
        function t() {
          return r(this, t), e.apply(this, arguments);
        }
        return (
          n(t, [
            {
              key: "setupLanguage",
              value: function () {
                this.rules = [
                  { regex: /((?:^\s*|\s+)--.*$)/gm, type: "c0" },
                  { regex: /^\s*(?:use|library)\s*(\S+);/gim, type: "k9" },
                  c.fCalls,
                  { regex: /\*\*|\*|\/|\+|-|&|=|\/=|<|<=|>|>=/g, type: "g0" },
                  c.dqStrings,
                  { regex: /('.')/g, type: "s0" },
                  c.brackets,
                  {
                    regex:
                      /\b(alias|array|variable|downto|range|to|type|units)\b/g,
                    type: "k2",
                  },
                  { regex: /\b(array|buffer|bus|file)\b/g, type: "k5" },
                  {
                    regex:
                      /\b(if|else|elsif|end|for|while|loop|when|begin|block|case|exit|next|then)\b/g,
                    type: "k1",
                  },
                  {
                    regex:
                      /\b(access|after|all|architecture|attribute|assert|body|component|configuration|constant|disconnect|entity|function|generate|generic|group|guarded|impure|in|inertial|inout|is|label|library|linkage|literal|map|null|of|on|open|others|out|package|port|postponed|procedure|process|pure|record|return|select|severity|signal|shared|subtype|transport|unaffected|use|vaiable|with|wait|until)\b/g,
                    type: "k0",
                  },
                  {
                    regex:
                      /\b(abs|not|mod|rem|sll|srl|sla|sra|rol|ror|and|or|nand|nor|xor|xnor|new)\b/g,
                    type: "k3",
                  },
                  c.floats,
                ];
              },
            },
          ]),
          t
        );
      })(),
      visualbasic: (function () {
        i(t, y);
        var e = o(t);
        function t() {
          return r(this, t), e.apply(this, arguments);
        }
        return (
          n(
            t,
            [
              {
                key: "setupLanguage",
                value: function () {
                  this.rules = [
                    c.dqStrings,
                    c.boolean,
                    c.prop,
                    { regex: /(#.*?)(?:'|$)/gim, type: "k4" },
                    {
                      regex:
                        /\b(Case|Catch|Continue|Each|Else|ElseIf|End|EndIf|Do|Finally|For|If|Loop|Next|OrElse|Then|Throw|Try|When|While)\b/g,
                      type: "k1",
                    },
                    { regex: /(Imports )(.*?)$/gm, type: ["k0", "k10"] },
                    {
                      regex:
                        /\b(Boolean|Byte|CBool|CByte|CChar|CDate|CDbl|CDec|Char|CInt|CLng|CObj|CSByte|CShort|CSng|CStr|CType|CUInt|CULng|CUShort|Decimal|Double|Integer|Long|ParamArray|SByte|Short|Single|String|UInteger|ULong|UShort)\b/g,
                      type: "k5",
                    },
                    { regex: /\b(Dim|Enum|Let|ReDim)\b/g, type: "k2" },
                    { regex: /\b(Const|Shared|Static)\b/g, type: "k8" },
                    {
                      regex:
                        /\b(AddHandler|AddressOf|Alias|As|ByRef|ByVal|Call|Class|Date|Declare|Default|Delegate|DirectCast|Erase|Error|Event|Exit|Friend|Function|Get|GetType|GetXMLNamespace|Global|GoSub|GoTo|Handles|Implements|In|Inherits|Interface|Lib|Like|Me|Module|MustInherit|MustOverride|MyBase|MyClass|Namespace|Narrowing|Nothing|NotInheritable|NotOverridable|Object|Of|On|Operator|Option|Optional|Out|Overloads|Overridable|Overrides|Partial|Private|Property|Protected|Public|RaiseEvent|ReadOnly|REM|RemoveHandler|Resume|Return|Select|Set|Shadows|Step|Stop|Structure|Sub|SyncLock|To|TryCast|Using|Variant|Wend|Widening|With|WithEvents|WriteOnly)\b/gi,
                      type: "k0",
                    },
                    {
                      regex:
                        /\b(And|AndAlso|Is|IsNot|Mod|New|Not|Or|TypeOf|Xor)\b/g,
                      type: "k3",
                    },
                    c.mCalls,
                    c.fCalls,
                    { regex: /'.*$/gm, type: "c0" },
                    c.int,
                    c.floats,
                    c.brackets,
                  ];
                },
              },
            ],
            [
              {
                key: "alias",
                value: function () {
                  return ["vb"];
                },
              },
            ]
          ),
          t
        );
      })(),
      xml: (function () {
        i(t, y);
        var e = o(t);
        function t() {
          return r(this, t), e.apply(this, arguments);
        }
        return (
          n(
            t,
            [
              {
                key: "setupLanguage",
                value: function () {
                  this.rules = [
                    { regex: /<!DOCTYPE[\s\S]+?>/g, type: "k9" },
                    { regex: /<\?xml[\s\S]+\?>/gi, type: "k4" },
                    { regex: /<!--[\s\S]*?-->/g, type: "c1" },
                    {
                      regex: /(<!\[CDATA\[)([\s\S]*?)(]]>)/gim,
                      type: ["c9", "text", "c9"],
                    },
                    {
                      regex: /(<)([A-Z:_][A-Z0-9:.-]*)([\s\S]*?)(\/?>)/gi,
                      type: ["g1", "x1", "text", "g1"],
                      filter: [
                        null,
                        null,
                        function (e) {
                          return f(
                            e,
                            /\b([^\s\0"'>/=]+)(\s*=\s*)((['"]).*?\4|[^'" \t]+)/gi,
                            function (e) {
                              return [
                                b(e[1], "x2"),
                                b(e[2], "k3"),
                                b(e[3], "s0"),
                              ];
                            }
                          );
                        },
                        null,
                      ],
                    },
                    {
                      regex: /(<\/)([A-Z:_][A-Z0-9:.-]*\s*)(>)/gi,
                      type: ["g1", "x1", "g1"],
                    },
                  ];
                },
              },
            ],
            [
              {
                key: "alias",
                value: function () {
                  return ["html"];
                },
              },
            ]
          ),
          t
        );
      })(),
      yaml: (function () {
        i(t, y);
        var e = o(t);
        function t() {
          return r(this, t), e.apply(this, arguments);
        }
        return (
          n(t, [
            {
              key: "setupLanguage",
              value: function () {
                this.rules = [
                  c.poundComments,
                  c.boolean,
                  c.null,
                  { regex: /^%[A-Z]+\s+.*$/gm, type: "k4" },
                  { regex: /\b!{1,2}[A-Z]+\b/gi, type: "k5" },
                  { regex: /\b[a-z][a-z0-9_-]*:/gim, type: "k7" },
                  { regex: /\{|}|\(|\)|\[|]/g, type: "g1" },
                  c.dqStrings,
                  c.sqStrings,
                  c.floats,
                  c.int,
                ];
              },
            },
          ]),
          t
        );
      })(),
      verilog: (function () {
        i(t, y);
        var e = o(t);
        function t() {
          return r(this, t), e.apply(this, arguments);
        }
        return (
          n(t, [
            {
              key: "setupLanguage",
              value: function () {
                this.rules = [
                  c.dqStrings,
                  { regex: /`\w*\b/g, type: "k4" },
                  { regex: /\[( *\d+(?: *\: *\d+) *)\]/g, type: "e3" },
                  {
                    regex:
                      /\b(for|generate|if|else|repeat|case|endcase|begin|end|ifnone)\b/g,
                    type: "k1",
                  },
                  {
                    regex: /\b(output|input|inout|reg|wire|assign)\b/g,
                    type: "k5",
                  },
                  {
                    regex:
                      /\b(module|endmodule|always|function|endfunction)\b/g,
                    type: "k2",
                  },
                  {
                    regex:
                      /\b(or|rpmos|tranif1|and|initial|rtran|tri|parameter|rtranif0|tri0|pmos|rtranif1|tri1|buf|endprimitive|integer|posedge|scalared|triand|bufif0|endspecify|join|primitive|small|trior|bufif1|endtable|large|pull0|specify|trireg|endtask|macromodule|pull1|specparam|vectored|casex|event|medium|pullup|strong0|wait|casez|pulldown|strong1|wand|cmos|force|nand|rcmos|supply0|weak0|deassign|forever|negedge|real|supply1|weak1|default|nmos|realtime|table|defparam|nor|task|disable|highz0|not|release|time|wor|edge|highz1|notif0|tran|xnor|notif1|rnmos|tranif0|xor)\b/g,
                    type: "k0",
                  },
                  c.slashComments,
                  c.blockComments,
                  { regex: /-?\d*'s?d[0-9_xz]+\b/gi, type: "n1" },
                  { regex: /-?\d*'s?h[0-9a-f_xz]+\b/gi, type: "n2" },
                  { regex: /-?\d*'s?b[01_xz]+\b/gi, type: "n3" },
                  { regex: /-?\d*'s?o[0-7_xz]+\b/gi, type: "n4" },
                  c.int,
                  c.brackets,
                ];
              },
            },
          ]),
          t
        );
      })(),
    }),
    Te = { standard: "generic" },
    v = {},
    Re = !1;
  function Fe(e) {
    if (!Re)
      for (var t in ((Re = !0), k))
        if ("function" == typeof k[t].alias) {
          var r,
            n = (function (e, t) {
              var r,
                n =
                  ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                  e["@@iterator"];
              if (!n) {
                if (
                  Array.isArray(e) ||
                  (n = z(e)) ||
                  (t && e && "number" == typeof e.length)
                )
                  return (
                    n && (e = n),
                    (r = 0),
                    {
                      s: (t = function () {}),
                      n: function () {
                        return r >= e.length
                          ? { done: !0 }
                          : { done: !1, value: e[r++] };
                      },
                      e: function (e) {
                        throw e;
                      },
                      f: t,
                    }
                  );
                throw new TypeError(
                  "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                );
              }
              var i,
                s = !0,
                a = !1;
              return {
                s: function () {
                  n = n.call(e);
                },
                n: function () {
                  var e = n.next();
                  return (s = e.done), e;
                },
                e: function (e) {
                  (a = !0), (i = e);
                },
                f: function () {
                  try {
                    s || null == n.return || n.return();
                  } finally {
                    if (a) throw i;
                  }
                },
              };
            })(k[t].alias());
          try {
            for (n.s(); !(r = n.n()).done; ) {
              var i = r.value;
              Te[i] = t;
            }
          } catch (e) {
            n.e(e);
          } finally {
            n.f();
          }
        }
    return Te[e];
  }
  function je(e) {
    return (e = Fe((e = (e || "").toLowerCase())) || e), k[e] ? e : null;
  }
  t = { document: document, window: window };
  function w() {
    return document;
  }
  function C() {
    return window;
  }
  function S(e) {
    e.style.display =
      !0 ===
      (!(1 < arguments.length && void 0 !== arguments[1]) || arguments[1])
        ? "block"
        : "none";
  }
  function _(e) {
    e.parentNode.removeChild(e);
  }
  function E(e) {
    return null != e && 0 < e.length ? w().querySelectorAll(e) : [];
  }
  function A(e, t) {
    return e.getAttribute("data-" + t) || null;
  }
  function ze(e, t) {
    return e.getAttribute(t) || null;
  }
  function Be(e, t) {
    return e.parentNode.insertBefore(t, e);
  }
  function Ze(e, t, r) {
    var n,
      i = w(),
      s = i.createElement(e);
    if (0 < r.length)
      for (var a = 0; a < r.length; a++) {
        var o = r[a];
        if (null !== o && !1 !== o)
          if (void 0 === o)
            s.appendChild(i.createTextNode("#INVALID_ELEMENT#"));
          else if (o.push)
            for (var l = 0; l < o.length; l++) {
              var g = o[l];
              null !== g &&
                !1 !== g &&
                (void 0 === g
                  ? s.appendChild(i.createTextNode("#INVALID_ELEMENT#"))
                  : g.appendChild
                  ? s.appendChild(g)
                  : s.appendChild(i.createTextNode(g)));
            }
          else
            o.appendChild
              ? s.appendChild(o)
              : s.appendChild(i.createTextNode(o));
      }
    function u(e, t) {
      s.addEventListener(e, function (e) {
        e.preventDefault(), e.stopPropagation(), t && t.apply(s, [e, s]);
      });
    }
    for (n in t)
      if (Object.prototype.hasOwnProperty.call(t, n)) {
        var p = t[n];
        if ("on" === n.substr(0, 2))
          null !== p && u(n.substr(2).toLowerCase(), p);
        else if (null != p)
          switch (n) {
            case "className":
              s.setAttribute("class", p);
              break;
            case "htmlFor":
              s.setAttribute("for", p);
              break;
            default:
              s.setAttribute(n, p);
          }
      }
    return (s.on = u), s;
  }
  function L(e, t) {
    for (
      var r, n = arguments.length, i = new Array(2 < n ? n - 2 : 0), s = 2;
      s < n;
      s++
    )
      i[s - 2] = arguments[s];
    return "function" == typeof e
      ? "function" == typeof (r = F(e, [t || {}].concat(i))).render
        ? r.render()
        : r instanceof HTMLElement
        ? r
        : void w().createTextNode("#INVALID_JSX_ELEMENT#")
      : Ze(e, t, i);
  }
  function q(e, t) {
    e.classList.contains(t) || e.classList.add(t);
  }
  function Me(e, t) {
    e.classList.contains(t) && e.classList.remove(t);
  }
  function Pe(e, t) {
    return e.classList.contains(t);
  }
  function Ue(e, t) {
    e.classList.contains(t) ? e.classList.remove(t) : e.classList.add(t);
  }
  var I = C();
  function Ge() {
    var e;
    void 0 !== I.console &&
      I.console.log &&
      (e = I.console).log.apply(e, arguments);
  }
  var He = Object.freeze({
    __proto__: null,
    globals: t,
    getDocument: w,
    getWindow: C,
    displayElement: S,
    disposeElement: _,
    getElements: E,
    getElement: function (e) {
      return null != e && 0 < e.length ? w().querySelector(e) : null;
    },
    getElementDataAttribute: A,
    getElementAttribute: ze,
    insertBefore: Be,
    createNode: Ze,
    createElement: L,
    renderComponent: function (e) {
      var t =
        1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
      return null !== t && t.appendChild(e), e;
    },
    addClass: q,
    removeClass: Me,
    hasClass: Pe,
    toggleClass: Ue,
    logInfo: Ge,
    logError: function () {
      var e;
      void 0 !== I.console && I.console.error
        ? (e = I.console).error.apply(e, arguments)
        : Ge.apply(void 0, arguments);
    },
  });
  function Ve(e) {
    var t = e.tokens,
      e = e.options,
      r = (function (e, t) {
        if ("string" != typeof e || 0 === e.length)
          return function () {
            return !1;
          };
        var t = parseInt(t),
          s = !isNaN(t) && 1 < t ? t - 1 : 0,
          a = {};
        return (
          e.split(",").forEach(function (e) {
            var t = e.match(/([0-9]+)-([0-9]+)/);
            if (null != t) {
              var r = parseInt(t[1]) - s,
                n = parseInt(t[2]) - s;
              if (r < n) for (var i = r; i <= n; i++) a["" + i] = !0;
            } else a["" + (parseInt(e) - s)] = !0;
          }),
          function (e) {
            return a["" + e] || !1;
          }
        );
      })(e.highlight, e.lineoffset),
      n = [],
      i = [],
      t =
        (t.forEach(function (t) {
          var e = t.text.split("\n");
          1 === e.length
            ? i.push([t.type, t.text])
            : (i.push([t.type, e.shift()]),
              e.forEach(function (e) {
                n.push(i), (i = []).push([t.type, e]);
              }));
        }),
        n.push(i),
        []);
    return (
      0 < e.lineoffset &&
        t.push("counter-reset: enlighter " + (parseInt(e.lineoffset) - 1)),
      L(
        "div",
        { className: "enlighter", style: t.join(";") },
        n.map(function (e, t) {
          return L(
            "div",
            { className: r(t + 1) ? "enlighter-special" : "" },
            L(
              "div",
              null,
              e.map(function (e) {
                return L("span", { className: "enlighter-" + e[0] }, e[1]);
              })
            )
          );
        })
      )
    );
  }
  function N(e) {
    var t = [];
    e.name && t.push("enlighter-" + e.name),
      e.className &&
        ("string" == typeof e.className
          ? t.push(e.className)
          : t.push.apply(t, g(e.className)));
    for (
      var r = arguments.length, n = new Array(1 < r ? r - 1 : 0), i = 1;
      i < r;
      i++
    )
      n[i - 1] = arguments[i];
    return L.apply(He, ["div", { className: t.join(" ") }].concat(n));
  }
  function W(e) {
    var t = ["enlighter-btn"];
    return (
      e.name && t.push("enlighter-btn-" + e.name),
      L(
        "div",
        { className: t.join(" "), onClick: e.onClick, title: e.tooltip },
        e.text || null
      )
    );
  }
  function Je() {
    C().open("https://enlighterjs.org");
  }
  var Ye = Object.freeze({
    __proto__: null,
    raw: function (e) {
      return L(W, {
        name: "raw",
        tooltip: "Plain text",
        onClick: function () {
          e.toggleClass("enlighter-show-rawcode");
        },
      });
    },
    copy: function (s) {
      return L(W, {
        name: "copy",
        tooltip: "Copy to clipboard",
        onClick: function () {
          var e = s.getRawCode(),
            t = w(),
            r = C(),
            e = L("pre", { className: "enlighter-clipboard" }, e);
          t.body.appendChild(e);
          try {
            var n = t.createRange(),
              i = (n.selectNodeContents(e), r.getSelection());
            i.removeAllRanges(), i.addRange(n);
          } catch (e) {
            return;
          }
          !(function () {
            try {
              t.execCommand("copy");
            } catch (e) {
              return;
            }
          })(),
            r.getSelection().removeAllRanges(),
            _(e);
        },
      });
    },
    window: function (r) {
      var n = C();
      return L(W, {
        name: "window",
        tooltip: "Open code in new window",
        onClick: function () {
          var e = n.open(
              "",
              "",
              "width=" +
                n.screen.width / 2 +
                ", height=" +
                n.screen.height / 2 +
                ", menubar=no, titlebar=no, toolbar=no, top=100, left=100, scrollbars=yes, status=no"
            ),
            t = r
              .getRawCode()
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");
          (e.document.body.innerHTML = "<pre>" + t + "</pre>"),
            (e.document.title = "Sourcecode | EnlighterJS Syntax Highlighter");
        },
      });
    },
    website: function () {
      return L(W, {
        name: "website",
        tooltip: "EnlighterJS 3 Syntax Highlighter",
        onClick: Je,
      });
    },
    collapse: function (e) {
      return L(W, {
        name: "collapse",
        tooltip: "Expand",
        onClick: function () {
          e.toggleClass("enlighter-collapse-full");
        },
      });
    },
  });
  function $(t) {
    var e = (function (e) {
      for (var t, r = [], n = /{BTN_([A-Z_]+)}/g; null != (t = n.exec(e)); )
        r.push(t[1].toLowerCase());
      return r;
    })(t.layout)
      .map(function (e) {
        return Ye[e]
          ? L(Ye[e], { getRawCode: t.getRawCode, toggleClass: t.toggleClass })
          : null;
      })
      .filter(function (e) {
        return null !== e;
      });
    return L(
      N,
      { name: "toolbar-" + t.name, className: "enlighter-toolbar" },
      e
    );
  }
  function Xe(e, t) {
    return L("div", { className: "enlighter-raw" }, t);
  }
  function Ke(e) {
    var t = null,
      r = e[0].params,
      n = [
        "enlighter-default",
        "enlighter-v-standard",
        "enlighter-t-" + e[0].params.theme,
      ];
    function i(e) {
      Ue(t, e);
    }
    function s() {
      return e[0].code;
    }
    return (
      !0 === r.linehover && n.push("enlighter-hover"),
      !0 === r.linenumbers && n.push("enlighter-linenumbers"),
      "scroll" === r.textOverflow && n.push("enlighter-overflow-scroll"),
      !0 === r.collapse && n.push("enlighter-collapse"),
      0 < r.cssClasses.length && n.push.apply(n, g(r.cssClasses)),
      (t = L(
        N,
        { className: n },
        L($, {
          name: "top",
          layout: r.toolbarTop,
          toggleClass: i,
          getRawCode: s,
        }),
        L(Ve, { tokens: e[0].tokens, options: e[0].params }),
        L(Xe, null, e[0].code),
        L($, {
          name: "bottom",
          layout: r.toolbarBottom,
          toggleClass: i,
          getRawCode: s,
        })
      )),
      r.rawcodeDbclick &&
        t.on("dblclick", function () {
          i("enlighter-show-rawcode");
        }),
      t
    );
  }
  function Qe(e) {
    return L(
      "span",
      { className: "enlighter" },
      e.tokens.map(function (e) {
        return L("span", { className: "enlighter-" + e.type }, e.text);
      })
    );
  }
  function et(r) {
    var n = 0,
      i = [];
    return (
      (i = r.dataset.map(function (e, t) {
        return L(W, {
          onClick: function () {
            return (
              (e = t),
              Me(i[n], "enlighter-active"),
              q(i[e], "enlighter-active"),
              (n = e),
              void r.onChange(e)
            );
            var e;
          },
          text: e.params.title || e.params.language,
        });
      })),
      q(i[0], "enlighter-active"),
      L(N, { name: "codegroup-switch" }, i)
    );
  }
  var tt = Object.freeze({
    __proto__: null,
    standard: Ke,
    inline: function (e) {
      var t = e[0].params,
        r = [
          "enlighter-default",
          "enlighter-v-inline",
          "enlighter-t-" + t.theme,
        ];
      return (
        0 < t.cssClasses.length && r.push.apply(r, g(t.cssClasses)),
        L(N, { className: r }, L(Qe, { tokens: e[0].tokens, options: t }))
      );
    },
    codegroup: function (e) {
      var t,
        r = null,
        n = e[0].params,
        i = 0,
        s = [
          "enlighter-default",
          "enlighter-v-codegroup",
          "enlighter-t-" + n.theme,
        ];
      function a(e) {
        Ue(r, e);
      }
      function o() {
        return e[i].code;
      }
      function l(e) {
        S(t[i], !1), S(t[e], !0), (i = e);
      }
      return (
        !0 === n.linehover && s.push("enlighter-hover"),
        !0 === n.linenumbers && s.push("enlighter-linenumbers"),
        "scroll" === n.textOverflow && s.push("enlighter-overflow-scroll"),
        !0 === n.collapse && s.push("enlighter-collapse"),
        0 < n.cssClasses.length && s.push.apply(s, g(n.cssClasses)),
        (t = e.map(function (e) {
          return L(
            "div",
            { style: "display:none" },
            L(Ve, { tokens: e.tokens, options: e.params }),
            L(Xe, null, e.code)
          );
        })),
        l(0),
        (r = L(
          N,
          { className: s },
          L(et, { onChange: l, dataset: e }),
          L(
            N,
            { name: "codegroup-wrapper" },
            L($, {
              name: "top",
              layout: n.toolbarTop,
              toggleClass: a,
              getRawCode: o,
            }),
            t,
            L($, {
              name: "bottom",
              layout: n.toolbarBottom,
              toggleClass: a,
              getRawCode: o,
            })
          )
        )),
        n.rawcodeDbclick &&
          r.on("dblclick", function () {
            a("enlighter-show-rawcode");
          }),
        r
      );
    },
  });
  function rt(e) {
    var t;
    return (
      (t = ((t = e[0].params.layout) || "").toLowerCase()),
      (tt[t] || Ke)(
        e.map(function (e) {
          var t,
            r,
            n = e.code,
            e = e.params;
          if ("string" != typeof n)
            throw new TypeError("EnlighterJS Engine requires string input");
          return (
            (t = e.language),
            (r = u.language || null),
            (t = je(t) || je(r) || "generic"),
            v[t] || (v[t] = new k[t]()),
            { tokens: v[t].analyze(n), params: e, code: n }
          );
        })
      )
    );
  }
  function nt(i, t) {
    function s(e) {
      return (function () {
        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
          t[r] = arguments[r];
        for (var n = t.pop(), i = 0; i < t.length; i++) {
          var s = t[i];
          if (null != s) return s;
        }
        return n;
      })(t[e], u[e], null);
    }
    function e(e, t) {
      var r = A(i, "enlighter-" + e),
        n = s(e);
      if (!(r && 0 < r.length)) return n;
      switch (t) {
        case "boolean":
          return (
            "true" === (r = r.toLowerCase().trim()) || ("false" !== r && n)
          );
        case "int":
          return (r = parseInt(r)), isNaN(r) ? n : r;
        default:
          return r;
      }
    }
    var r = s("cssClasses") || "",
      r =
        (!0 === s("retainCssClasses") && (r += " " + (ze(i, "class") || "")),
        r.replace(/\s+/g, " ").trim().split(" "));
    return {
      language: e("language"),
      theme: e("theme"),
      layout: e("layout"),
      title: e("title"),
      highlight: e("highlight"),
      linenumbers: e("linenumbers", "boolean"),
      lineoffset: e("lineoffset", "int"),
      indent: s("indent"),
      ampersandCleanup: s("ampersandCleanup"),
      linehover: s("linehover"),
      rawcodeDbclick: s("rawcodeDbclick"),
      textOverflow: s("textOverflow"),
      collapse: s("collapse"),
      cssClasses: r,
      toolbarTop: s("toolbarTop"),
      toolbarBottom: s("toolbarBottom"),
      toolbarHeader: s("toolbarHeader"),
    };
  }
  var O = [];
  function it(e) {
    e = (function (e) {
      for (var t = 0; t < O.length; t++)
        for (var r = 0; r < O[t].elements.length; r++)
          if (O[t].elements[r] === e) return t;
      return !1;
    })(e);
    if (!1 === e) return !1;
    e = O.splice(e, 1);
    return (
      _(e[0].wrapper),
      e[0].elements.map(function (e) {
        return Me(e, "enlighter-origin");
      }),
      !0
    );
  }
  function D(e) {
    var t,
      r,
      s = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
    try {
      if (0 === (e = Array.isArray(e) ? e : [e]).length) return !1;
      if (!1 === s) return it(e[0]);
      if (Pe(e[0], "enlighter-origin")) return !1;
      var n = rt(
        e.map(function (e) {
          var t,
            r,
            n = nt(e, s),
            i =
              ((i = n),
              (t = (t = (t = (t = e).innerHTML || "").replace(
                /(^\s*\n|\n\s*$)/gi,
                ""
              ))
                .replace(/&lt;/gim, "<")
                .replace(/&gt;/gim, ">")
                .replace(/&nbsp;/gim, " ")),
              !0 === i.ampersandCleanup && (t = t.replace(/&amp;/gim, "&")),
              (r = i.indent),
              (t =
                !1 !== r && -1 < r
                  ? t.replace(/(\t*)/gim, function (e, t) {
                      return new Array(r * t.length + 1).join(" ");
                    })
                  : t));
          return q(e, "enlighter-origin"), { element: e, code: i, params: n };
        })
      );
      return (
        Be(e[0], n), (t = e), (r = n), O.push({ elements: t, wrapper: r }), !0
      );
    } catch (e) {
      return B("EnlighterJS Internal Error:", e), !1;
    }
  }
  return (
    (e.enlight = D),
    (e.init = function () {
      for (
        var e =
            0 < arguments.length && void 0 !== arguments[0]
              ? arguments[0]
              : "pre.ejs",
          t =
            1 < arguments.length && void 0 !== arguments[1]
              ? arguments[1]
              : "code.ejs",
          r =
            2 < arguments.length && void 0 !== arguments[2]
              ? arguments[2]
              : null,
          n =
            3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {},
          r = ((r = r), Object.assign(u, r || {}), E(e)),
          i = E(t),
          s = (e = (function (e) {
            for (var t = {}, r = [], n = 0; n < e.length; n++) {
              var i = A(e[n], "enlighter-group");
              i ? (t[i] || (t[i] = []), t[i].push(e[n])) : r.push(e[n]);
            }
            return {
              standalone: r,
              groups: Object.keys(t).map(function (e) {
                return t[e];
              }),
            };
          })(r)).standalone,
          a = e.groups,
          o = 0;
        o < s.length;
        o++
      )
        D(s[o], { layout: n.block || "standard" });
      for (var l = 0; l < a.length; l++)
        D(a[l], { layout: n.codegroup || "codegroup" });
      for (var g = 0; g < i.length; g++)
        D(i[g], { layout: n.inline || "inline" });
    }),
    (e.version = "3.5.0"),
    Object.defineProperty(e, "__esModule", { value: !0 }),
    e
  );
})({});
!(function (n) {
  "function" == typeof n &&
    n.fn &&
    (n.fn.enlight = function (n) {
      return (
        (n = !0 === (n = void 0 === n ? {} : n) ? {} : n),
        this.each(function () {
          EnlighterJS.enlight(this, n);
        })
      );
    });
})(window.jQuery);
