/*!
 * Lunr languages, `Korean` language
 * https://github.com/MihaiValentin/lunr-languages
 *
 * Copyright 2014, Chad Liu
 * http://www.mozilla.org/MPL/
 */
/*!
 * based on
 * Snowball JavaScript Library v0.3
 * http://code.google.com/p/urim/
 * http://snowball.tartarus.org/
 *
 * Copyright 2010, Oleg Mazko
 * http://www.mozilla.org/MPL/
 */

/**
 * export the module via AMD, CommonJS or as a browser global
 * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
 */
;
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory)
  } else if (typeof exports === 'object') {
    /**
     * Node. Does not work with strict CommonJS, but
     * only CommonJS-like environments that support module.exports,
     * like Node.
     */
    module.exports = factory()
  } else {
    // Browser globals (root is window)
    factory()(root.lunr);
  }
}(this, function() {
  /**
   * Just return a value to define the module export.
   * This example returns an object, but the module
   * can return a function as the exported value.
   */
  return function(lunr) {
    /* throw error if lunr is not yet included */
    if ('undefined' === typeof lunr) {
      throw new Error('Lunr is not present. Please include / require Lunr before this script.');
    }

    /* throw error if lunr stemmer support is not yet included */
    if ('undefined' === typeof lunr.stemmerSupport) {
      throw new Error('Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.');
    }

    /*
    Korean tokenization is trickier, since it does not
    take into account spaces.
    Since the tokenization function is represented different
    internally for each of the Lunr versions, this had to be done
    in order to try to try to pick the best way of doing this based
    on the Lunr version
     */
    var isLunr2 = lunr.version[0] == "2";

    /* register specific locale function */
    lunr.ko = function() {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.ko.trimmer,
        lunr.ko.stopWordFilter,
        lunr.ko.stemmer
      );
    };

    /* lunr stemmer function */
    lunr.ko.stemmer = (function() {

      /* TODO Korean stemmer  */
      return function(word) {
        return word;
      }
    })();
    lunr.Pipeline.registerFunction(lunr.ko.stemmer, 'stemmer-ko');

    /* lunr trimmer function */
    lunr.ko.wordCharacters = "가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9\\{\\}\\[\\]\\/?.,;:|\\)*~`!^\\-_+<>@\\#$%&\\\\\=\\(\\'\\\"";
    lunr.ko.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.ko.wordCharacters);
    lunr.Pipeline.registerFunction(lunr.ko.trimmer, 'trimmer-ko');

    /* lunr stop word filter. see http://www.ranks.nl/stopwords/Korean */
    lunr.ko.stopWordFilter = lunr.stopWordFilter;
    lunr.Pipeline.registerFunction(lunr.ko.stopWordFilter, 'stopWordFilter-ko');

  };
}))