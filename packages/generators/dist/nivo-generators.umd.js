(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash/range'), require('lodash/random'), require('lodash/shuffle'), require('d3-time'), require('d3-time-format')) :
    typeof define === 'function' && define.amd ? define(['exports', 'lodash/range', 'lodash/random', 'lodash/shuffle', 'd3-time', 'd3-time-format'], factory) :
    (global = global || self, factory(global.nivo = global.nivo || {}, global['lodash/range'], global['lodash/random'], global['lodash/shuffle'], global.d3, global.d3));
}(this, function (exports, range, random, shuffle, d3Time, d3TimeFormat) { 'use strict';

    range = range && range.hasOwnProperty('default') ? range['default'] : range;
    random = random && random.hasOwnProperty('default') ? random['default'] : random;
    shuffle = shuffle && shuffle.hasOwnProperty('default') ? shuffle['default'] : shuffle;

    var randColor = function randColor() {
      return "hsl(".concat(Math.round(Math.random() * 360), ", 70%, 50%)");
    };

    var countryCodes = ['AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SY', 'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'UM', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU', 'WF', 'WS', 'YE', 'YT', 'ZA', 'ZM', 'ZW'];

    var names = ['John', 'Raoul', 'Jane', 'Marcel', 'Ibrahim', 'Junko', 'Lyu', 'André', 'Maki', 'Véronique', 'Thibeau', 'Josiane', 'Raphaël', 'Mathéo', 'Margot', 'Hugo', 'Christian', 'Louis', 'Ella', 'Alton', 'Jimmy', 'Guillaume', 'Sébastien', 'Alfred', 'Bon', 'Solange', 'Kendrick', 'Jared', 'Satoko', 'Tomoko', 'Line', 'Delphine', 'Leonard', 'Alphonse', 'Lisa', 'Bart', 'Benjamin', 'Homer', 'Jack'];

    var programmingLanguages = ['php', 'make', 'javascript', 'go', 'erlang', 'elixir', 'lisp', 'haskell', 'python', 'ruby', 'hack', 'scala', 'java', 'rust', 'c', 'css', 'sass', 'stylus'];



    var index = /*#__PURE__*/Object.freeze({
        countryCodes: countryCodes,
        names: names,
        programmingLanguages: programmingLanguages
    });

    function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }
    function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }
    function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }
    function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }
    var generateBulletData = function generateBulletData(id, max) {
      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          title = _ref.title,
          subtitle = _ref.subtitle,
          _ref$rangeCount = _ref.rangeCount,
          rangeCount = _ref$rangeCount === void 0 ? 5 : _ref$rangeCount,
          _ref$measureCount = _ref.measureCount,
          measureCount = _ref$measureCount === void 0 ? 1 : _ref$measureCount,
          _ref$markerCount = _ref.markerCount,
          markerCount = _ref$markerCount === void 0 ? 1 : _ref$markerCount,
          _ref$float = _ref.float,
          float = _ref$float === void 0 ? false : _ref$float;
      var ranges = range(rangeCount - 1).reduce(function (acc) {
        var remaining = max - acc[0];
        return [random(remaining, float)].concat(_toConsumableArray(acc));
      }, [max]);
      var measures = range(measureCount).reduce(function (acc) {
        if (acc.length === 0) return [random(max, float)];
        return [random(acc[0], float)].concat(_toConsumableArray(acc));
      }, []);
      var markers = range(markerCount).map(function () {
        return max * 0.6 + random(max * 0.4);
      });
      return {
        id: id,
        title: title,
        subtitle: subtitle,
        ranges: ranges,
        measures: measures,
        markers: markers
      };
    };

    var generateChordData = function generateChordData() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$keys = _ref.keys,
          keys = _ref$keys === void 0 ? names : _ref$keys,
          _ref$size = _ref.size,
          size = _ref$size === void 0 ? 7 : _ref$size,
          _ref$minValue = _ref.minValue,
          minValue = _ref$minValue === void 0 ? 0 : _ref$minValue,
          _ref$maxValue = _ref.maxValue,
          maxValue = _ref$maxValue === void 0 ? 2000 : _ref$maxValue;
      var maxSize = Math.min(keys.length, size);
      var selectedKeys = keys.slice(0, maxSize);
      var matrix = range(maxSize).map(function () {
        return range(maxSize).map(function () {
          if (Math.random() < 0.66) return random(minValue, maxValue / 4);
          return random(minValue, maxValue);
        });
      });
      return {
        matrix: matrix,
        keys: selectedKeys
      };
    };

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }
    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _nonIterableSpread$1(); }
    function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }
    function _iterableToArray$1(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }
    function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }
    var generateParallelCoordinatesData = function generateParallelCoordinatesData() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$size = _ref.size,
          size = _ref$size === void 0 ? 26 : _ref$size,
          _ref$keys = _ref.keys,
          keys = _ref$keys === void 0 ? [{
        key: 'temp',
        random: [-10, 40]
      }, {
        key: 'cost',
        random: [200, 400000]
      }, {
        key: 'color',
        shuffle: ['red', 'yellow', 'green']
      }, {
        key: 'target',
        shuffle: ['A', 'B', 'C', 'D', 'E']
      }, {
        key: 'volume',
        random: [0.2, 7.6]
      }] : _ref$keys;
      var datumGenerator = function datumGenerator() {
        return keys.reduce(function (acc, key) {
          var value;
          if (key.random !== undefined) {
            value = random.apply(void 0, _toConsumableArray$1(key.random));
          } else if (key.shuffle !== undefined) {
            value = shuffle(key.shuffle)[0];
          }
          return _objectSpread({}, acc, _defineProperty({}, key.key, value));
        }, {});
      };
      return range(size).map(datumGenerator);
    };

    function _toConsumableArray$2(arr) { return _arrayWithoutHoles$2(arr) || _iterableToArray$2(arr) || _nonIterableSpread$2(); }
    function _nonIterableSpread$2() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }
    function _iterableToArray$2(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }
    function _arrayWithoutHoles$2(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }
    var availableNodes = names.map(function (name) {
      return {
        id: name
      };
    });
    var getNodeTargets = function getNodeTargets(id, links, currentPath) {
      var targets = links.filter(function (_ref) {
        var source = _ref.source;
        return source === id;
      }).map(function (_ref2) {
        var target = _ref2.target;
        if (target === id) {
          throw new Error("[sankey] a node cannot be linked on itself:\n  link: ".concat(id, " \u2014> ").concat(id));
        }
        if (currentPath && currentPath.includes(target)) {
          throw new Error("[sankey] found cyclic dependency:\n  link: ".concat(currentPath.join(' —> '), " \u2014> ").concat(target));
        }
        return target;
      });
      return targets.reduce(function (acc, targetId) {
        return acc.concat(getNodeTargets(targetId, links, currentPath ? [].concat(_toConsumableArray$2(currentPath), [targetId]) : [id, targetId]));
      }, targets);
    };
    var getNodesTargets = function getNodesTargets(links) {
      return links.reduce(function (targetsById, link) {
        if (!targetsById[link.source]) {
          targetsById[link.source] = getNodeTargets(link.source, links);
        }
        return targetsById;
      }, {});
    };
    var generateSankeyData = function generateSankeyData() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          nodeCount = _ref3.nodeCount,
          _ref3$maxIterations = _ref3.maxIterations,
          maxIterations = _ref3$maxIterations === void 0 ? 3 : _ref3$maxIterations;
      var nodes = availableNodes.slice(0, nodeCount).map(function (node) {
        return Object.assign({}, node, {
          color: randColor()
        });
      });
      var links = [];
      shuffle(nodes).forEach(function (_ref4) {
        var id = _ref4.id;
        range(random(1, maxIterations)).forEach(function () {
          var targetsById = getNodesTargets(links);
          var randId = shuffle(nodes.filter(function (n) {
            return n.id !== id;
          }).map(function (n) {
            return n.id;
          }))[0];
          if ((!targetsById[randId] || !targetsById[randId].includes(id)) && (!targetsById[id] || !targetsById[id].includes(randId))) {
            links.push({
              source: id,
              target: randId,
              value: random(5, 200)
            });
          }
        });
      });
      return {
        nodes: nodes,
        links: links
      };
    };

    function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } return target; }
    function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toConsumableArray$3(arr) { return _arrayWithoutHoles$3(arr) || _iterableToArray$3(arr) || _nonIterableSpread$3(); }
    function _nonIterableSpread$3() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }
    function _iterableToArray$3(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }
    function _arrayWithoutHoles$3(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }
    var randomPrice = function randomPrice() {
      return random(0, 500);
    };
    var randomVolume = function randomVolume() {
      return random(4, 20);
    };
    var randomCategory = function randomCategory() {
      return random(3, 17);
    };
    var generateSwarmPlotData = function generateSwarmPlotData(groups, _ref) {
      var _ref$min = _ref.min,
          min = _ref$min === void 0 ? 60 : _ref$min,
          _ref$max = _ref.max,
          max = _ref$max === void 0 ? 100 : _ref$max,
          _ref$categoryCount = _ref.categoryCount,
          categoryCount = _ref$categoryCount === void 0 ? 0 : _ref$categoryCount;
      return {
        groups: groups,
        data: groups.reduce(function (acc, group, groupIndex) {
          return [].concat(_toConsumableArray$3(acc), _toConsumableArray$3(range(random(min, max)).map(function () {
            return randomPrice();
          }).map(function (price, index) {
            var datum = {
              id: "".concat(groupIndex, ".").concat(index),
              group: group,
              price: price,
              volume: randomVolume()
            };
            if (categoryCount > 0) {
              datum.categories = range(categoryCount).map(randomCategory);
            }
            return datum;
          })));
        }, [])
      };
    };
    var randomizeSwarmPlotData = function randomizeSwarmPlotData(previousData) {
      return {
        groups: previousData.groups,
        data: previousData.data.map(function (d) {
          var datum = _objectSpread$1({}, d, {
            group: shuffle(previousData.groups)[0],
            price: randomPrice(),
            volume: randomVolume()
          });
          if (d.categories !== undefined) {
            datum.categories = range(3).map(randomCategory);
          }
          return datum;
        })
      };
    };

    var randColor$1 = randColor;
    var generateProgrammingLanguageStats = function generateProgrammingLanguageStats() {
      var shouldShuffle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      var langs = programmingLanguages;
      if (shouldShuffle) {
        langs = shuffle(langs);
      }
      if (limit < 1) {
        limit = 1 + Math.round(Math.random() * (programmingLanguages.length - 1));
      }
      return langs.slice(0, limit).map(function (language) {
        return {
          label: language,
          value: Math.round(Math.random() * 600),
          color: randColor$1()
        };
      });
    };
    var uniqRand = function uniqRand(generator) {
      var used = [];
      return function () {
        var value;
        do {
          value = generator.apply(void 0, arguments);
        } while (used.includes(value));
        used.push(value);
        return value;
      };
    };
    var randCountryCode = function randCountryCode() {
      return shuffle(countryCodes)[0];
    };
    var generateDrinkStats = function generateDrinkStats() {
      var xSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
      var rand = function rand() {
        return random(0, 60);
      };
      var types = ['whisky', 'rhum', 'gin', 'vodka', 'cognac'];
      var country = uniqRand(randCountryCode);
      var data = types.map(function (id) {
        return {
          id: id,
          color: randColor$1(),
          data: []
        };
      });
      range(xSize).forEach(function () {
        var x = country();
        types.forEach(function (id) {
          data.find(function (d) {
            return d.id === id;
          }).data.push({
            color: randColor$1(),
            x: x,
            y: rand()
          });
        });
      });
      return data;
    };
    var generateSerie = function generateSerie() {
      var xSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
      var max = 100 + Math.random() * (Math.random() * 600);
      return range(xSize).map(function () {
        return Math.round(Math.random() * max);
      });
    };
    var generateSeries = function generateSeries(ids, xKeys) {
      return ids.map(function (id) {
        return {
          id: id,
          color: randColor$1(),
          data: xKeys.map(function (x) {
            return {
              x: x,
              y: Math.round(Math.random() * 300)
            };
          })
        };
      });
    };
    var generateStackData = function generateStackData() {
      var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
      var length = 16;
      return range(size).map(function () {
        return generateSerie(length).map(function (v, i) {
          return {
            x: i,
            y: v
          };
        });
      });
    };
    var generateCountriesPopulation = function generateCountriesPopulation(size) {
      var countryCode = uniqRand(randCountryCode());
      return range(size).map(function () {
        return {
          country: countryCode(),
          population: 200 + Math.round(Math.random() * Math.random() * 1000000)
        };
      });
    };
    var generateDayCounts = function generateDayCounts(from, to) {
      var maxSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.9;
      var days = d3Time.timeDays(from, to);
      var size = Math.round(days.length * (maxSize * 0.4)) + Math.round(Math.random() * (days.length * (maxSize * 0.6)));
      var dayFormat = d3TimeFormat.timeFormat('%Y-%m-%d');
      return shuffle(days).slice(0, size).map(function (day) {
        return {
          day: dayFormat(day),
          value: Math.round(Math.random() * 400)
        };
      });
    };
    var generateCountriesData = function generateCountriesData(keys) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$size = _ref.size,
          size = _ref$size === void 0 ? 12 : _ref$size,
          _ref$min = _ref.min,
          min = _ref$min === void 0 ? 0 : _ref$min,
          _ref$max = _ref.max,
          max = _ref$max === void 0 ? 200 : _ref$max,
          _ref$withColors = _ref.withColors,
          withColors = _ref$withColors === void 0 ? true : _ref$withColors;
      return countryCodes.slice(0, size).map(function (country) {
        var d = {
          country: country
        };
        keys.forEach(function (key) {
          d[key] = random(min, max);
          if (withColors === true) {
            d["".concat(key, "Color")] = randColor$1();
          }
        });
        return d;
      });
    };
    var libTreeItems = [['viz', [['stack', [['chart'], ['xAxis'], ['yAxis'], ['layers']]], ['pie', [['chart', [['pie', [['outline'], ['slices'], ['bbox']]], ['donut'], ['gauge']]], ['legends']]]]], ['colors', [['rgb'], ['hsl']]], ['utils', [['randomize'], ['resetClock'], ['noop'], ['tick'], ['forceGC'], ['stackTrace'], ['dbg']]], ['generators', [['address'], ['city'], ['animal'], ['movie'], ['user']]], ['set', [['clone'], ['intersect'], ['merge'], ['reverse'], ['toArray'], ['toObject'], ['fromCSV'], ['slice'], ['append'], ['prepend'], ['shuffle'], ['pick'], ['plouc']]], ['text', [['trim'], ['slugify'], ['snakeCase'], ['camelCase'], ['repeat'], ['padLeft'], ['padRight'], ['sanitize'], ['ploucify']]], ['misc', [['whatever', [['hey'], ['WTF'], ['lol'], ['IMHO']]], ['other'], ['crap', [['crapA'], ['crapB', [['crapB1'], ['crapB2'], ['crapB3'], ['crapB4']]], ['crapC', [['crapC1'], ['crapC2'], ['crapC3'], ['crapC4'], ['crapC5'], ['crapC6'], ['crapC7'], ['crapC8'], ['crapC9']]]]]]]];
    var generateLibTree = function generateLibTree() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'nivo';
      var limit = arguments.length > 1 ? arguments[1] : undefined;
      var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : libTreeItems;
      limit = limit || children.length;
      if (limit > children.length) {
        limit = children.length;
      }
      var tree = {
        name: name,
        color: randColor$1()
      };
      if (children && children.length > 0) {
        tree.children = range(limit).map(function (o, i) {
          var leaf = children[i];
          return generateLibTree(leaf[0], null, leaf[1] || []);
        });
      } else {
        tree.loc = Math.round(Math.random() * 200000);
      }
      return tree;
    };
    var wines = ['chardonay', 'carmenere', 'syrah'];
    var wineTastes = ['fruity', 'bitter', 'heavy', 'strong', 'sunny'];
    var generateWinesTastes = function generateWinesTastes() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$randMin = _ref2.randMin,
          randMin = _ref2$randMin === void 0 ? 20 : _ref2$randMin,
          _ref2$randMax = _ref2.randMax,
          randMax = _ref2$randMax === void 0 ? 120 : _ref2$randMax;
      var data = wineTastes.map(function (taste) {
        var d = {
          taste: taste
        };
        wines.forEach(function (wine) {
          d[wine] = random(randMin, randMax);
        });
        return d;
      });
      return {
        data: data,
        keys: wines
      };
    };

    exports.generateBulletData = generateBulletData;
    exports.generateChordData = generateChordData;
    exports.generateCountriesData = generateCountriesData;
    exports.generateCountriesPopulation = generateCountriesPopulation;
    exports.generateDayCounts = generateDayCounts;
    exports.generateDrinkStats = generateDrinkStats;
    exports.generateLibTree = generateLibTree;
    exports.generateParallelCoordinatesData = generateParallelCoordinatesData;
    exports.generateProgrammingLanguageStats = generateProgrammingLanguageStats;
    exports.generateSankeyData = generateSankeyData;
    exports.generateSerie = generateSerie;
    exports.generateSeries = generateSeries;
    exports.generateStackData = generateStackData;
    exports.generateSwarmPlotData = generateSwarmPlotData;
    exports.generateWinesTastes = generateWinesTastes;
    exports.randColor = randColor$1;
    exports.randCountryCode = randCountryCode;
    exports.randomizeSwarmPlotData = randomizeSwarmPlotData;
    exports.sets = index;
    exports.uniqRand = uniqRand;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
