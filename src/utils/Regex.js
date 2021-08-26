export function MatchExpression(str) {
  var rgularExp = {
    contains_alphaNumeric: /^(?!-)(?!.*-)[A-Za-z0-9-]+(?<!-)$/,
    onlyWhiteSpace: /^\s+$/,

    containsAlphabet: /[a-zA-Z]/,

    onlyLetters: /^[A-Za-z]+$/,
    onlyUpperCaseLetters: /^[A-Z]+$/,
    onlyLowerCaseLetters: /^[a-z]+$/,
    onlySpecialCharacter: /[^a-zA-Z0-9]+/,
    lowerCaseAndUpperCase: /^((?=.*[a-z])(?=.*[A-Z]).*)$/,

    containsNumber: /\d+/,
    onlyNumbers: /^[0-9]+$/,
    onlyMixOfAlphaNumeric: /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/,
    min8UpLowNumSpecial: "",
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\*\[\]"\';:_\-<>\., =\+\/\\]).{12,}$/,
  };

  var expMatch = {};
  expMatch.containsNumber = rgularExp.containsNumber.test(str);
  expMatch.containsAlphabet = rgularExp.containsAlphabet.test(str);
  expMatch.alphaNumeric = rgularExp.contains_alphaNumeric.test(str);
  expMatch.onlyWhiteSpace = rgularExp.onlyWhiteSpace.test(str);
  expMatch.onlyNumbers = rgularExp.onlyNumbers.test(str);
  expMatch.onlyLetters = rgularExp.onlyLetters.test(str);
  expMatch.mixOfAlphaNumeric = !rgularExp.onlyMixOfAlphaNumeric.test(str);
  expMatch.min8UpLowNumSpecial = rgularExp.min8UpLowNumSpecial.test(str);
  expMatch.onlyLowerCaseLetters = rgularExp.onlyLowerCaseLetters.test(str);
  expMatch.onlyUpperCaseLetters = rgularExp.onlyUpperCaseLetters.test(str);
  expMatch.onlySpecialCharacter = rgularExp.onlySpecialCharacter.test(str);
  expMatch.lowerCaseAndUpperCase = rgularExp.lowerCaseAndUpperCase.test(str);

  return expMatch;
}
