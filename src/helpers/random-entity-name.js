

class WordGenerator { 

}

class Phoneme {
  constructor({ isVowel, spelling, pronunciation, invalidPrefixes, invalidSuffixes }) {

    if (!spelling) {
      throw new Error("NO_SPELLING_SPECIFIED");
    }

    // check validity of prefixes
    if (invalidPrefixes) {
      if (!Array.isArray(invalidPrefixes) || !invalidPrefixes.every((prefix) => prefix instanceof Phoneme)) {
        throw new Error("INVALID_PREFIXES");
      }
      this.invalidPrefixes = invalidPrefixes;
    } else {
      this.invalidPrefixes = [];
    }

    // check validity of suffixes.
    if (invalidSuffixes) {
      if (!Array.isArray(invalidSuffixes) || !invalidSuffixes.every((suffix) => suffix instanceof Phoneme)) {
        throw new Error("INVALID_SUFFIXES");
      }
      this.invalidSuffixes = invalidSuffixes;
    } else {
      this.invalidSuffixes = [];
    }

    this.isVowel = isVowel;
    this.pronunciation = pronunciation;
    this.spelling = spelling;
  }

  addInvalidPrefix(prefix) {
    if (prefix instanceof Phoneme) {
      this.invalidPrefixes.push(prefix);
    } else {
      throw new Error("PREFIX_MUST_BE_PHONEME");
    }
  }

  addInvalidSuffix(suffix) {
    if (suffix instanceof Phoneme) {
      this.invalidSuffixes.push(suffix);
    } else {
      throw new Error("SUFFIX_MUST_BE_PHONEME");
    }
  }

  setPronunciation(pronunciation) {
    this.pronunciation = pronunciation;
  }

  setSpelling(spelling) {
    this.spelling = spelling;
  }
}


module.exports = { WordGenerator, Phoneme };
