const { WordGenerator, Phoneme } = require("../../src/helpers/random-entity-name");

describe("The random entity name generator", () => {
  test("It can be passed a list of phonemes.", () => {
    const phonemes = ["a", "b", "c"];
    expect(new WordGenerator({ phonemes })).not.toBe(null);
  });

  test("It can be passed length parameters.", () => {

  });

  test("The name generator will create words from their phonemes.", () => {

  });

  test("The name generator stays within its length bounds.", () => {

  });

  test("The name generator never mashes invalid characters together.", () => {

  });

  test("The name generator can always return a spelling.", () => {

  });

  test("The name generator only returns a pronunciation when one is specified.", () => {

  });

});

describe("Phonemes", () => {
  test("Phonemes can be declared as consonants or vowels.", () => {
    const phoneme = new Phoneme({ isVowel: true, spelling: "a" });
    expect(phoneme).not.toBe(undefined);
    const secondPhoneme = new Phoneme({ isVowel: false, spelling: "m" });
    expect(secondPhoneme).not.toBe(undefined);
  });

  test("Phonemes must be declared with a spelling.", () => {
    expect(() => {
      new Phoneme({ isVowel: true });
    }).toThrowError("NO_SPELLING_SPECIFIED");
  });

  test("Phonemes can be declared with a pronunciation.", () => {
    const phoneme = new Phoneme({ isVowel: false, spelling: "m", pronunciation: "muh" });
    expect(phoneme).toBeInstanceOf(Phoneme);
  });

  test("All prefixes and suffixes must be phonemes.", () => {
    expect(() => {
      new Phoneme({ isVowel: false, spelling: "m", pronunciation: "muh", invalidPrefixes: ["g"] });
    }).toThrowError("INVALID_PREFIXES");

    expect(() => {
      new Phoneme({ isVowel: false, spelling: "m", pronunciation: "muh", invalidSuffixes: ["f"] });
    }).toThrowError("INVALID_SUFFIXES");
  });

  const usefulPhoneme = new Phoneme({ isVowel: false, spelling: "g" });

  test("Phonemes can be passed invalid prefixes.", () => {
    const phoneme = new Phoneme({ isVowel: false, spelling: "m", pronunciation: "muh", invalidPrefixes: [ usefulPhoneme ] });
    expect(phoneme).toBeInstanceOf(Phoneme);
  });

  test("Phonemes can be passed invalid suffixes.", () => {
    const phoneme = new Phoneme({ isVowel: false, spelling: "m", pronunciation: "muh", invalidSuffixes: [ usefulPhoneme ] });
    expect(phoneme).toBeInstanceOf(Phoneme);
  });

  test("Phonemes can be altered after they are created.", () => {
    const phoneme = new Phoneme({ isVowel: false, spelling: "m", pronunciation: "muh" });
    phoneme.addInvalidPrefix(usefulPhoneme);
    phoneme.addInvalidSuffix(usefulPhoneme);
    phoneme.setPronunciation("em");
    phoneme.setSpelling("3m");

    expect(phoneme.spelling).toBe("3m");
    expect(phoneme.invalidSuffixes.includes(usefulPhoneme)).toBe(true);
    expect(phoneme.invalidPrefixes.includes(usefulPhoneme)).toBe(true);
    expect(phoneme.pronunciation).toBe("em");
  });
});
