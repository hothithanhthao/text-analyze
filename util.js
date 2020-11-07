function countCharOccurences(text) {
    return text.toString().replace(/[\s\d]+/g,'').split('').sort().reduce((acc, char) => {
      acc[char] = (acc[char] || 0) + 1;
      return acc;
    }, {});
}

module.exports = countCharOccurences;