var R = require('ramda');

var dimensionStringToInts = R.compose(R.map(parseInt), R.split('x'));
var parseInput = R.compose(R.map(dimensionStringToInts), R.split('\n'), R.trim);
var sideLengths = (a) => [[a[0], a[1]], [a[1], a[2]], [a[2], a[0]]];

var areaOfSides = R.compose(R.map(R.reduce(R.multiply, 1)), sideLengths);
var sqFtFromSides = R.compose(R.multiply(2), R.sum, areaOfSides);
var sqFtFromSlack = R.compose(R.reduce(R.min, Infinity), areaOfSides);
var sqFtOfWrappingPaperForPresent = R.converge(R.unapply(R.sum), [sqFtFromSlack, sqFtFromSides]);

var solution = R.compose(R.sum, R.map(sqFtOfWrappingPaperForPresent), parseInput);

module.exports = solution;