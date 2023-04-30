class Result {
  constructor(success = false, errors = [], value = {}) {
    this.success = success;
    this.errors = errors;
    this.value = value;
  }
}

module.exports = Result;
