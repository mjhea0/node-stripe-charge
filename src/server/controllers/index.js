function sum(num1, num2, callback) {
  const total = num1 + num2;
  if (isNaN(total)) {
    const error = 'Something went wrong!';
    callback(error);
  } else {
    callback(null, total);
  }
}

module.exports = {
  sum
};
