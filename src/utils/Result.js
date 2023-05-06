class Result {
  constructor({ success = false, errors = [], value = {}, wasCached = false }) {
    this.success = success;
    this.errors = errors;
    this.value = value;
    this.wasCached = wasCached;
  }
}

module.exports = Result;
