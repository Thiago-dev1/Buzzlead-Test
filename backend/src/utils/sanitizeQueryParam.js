function sanitizeQueryParam(string) {
   return string.replace(/[^a-zA-Z\u00C0-\u024F ]/g, "")
}

module.exports = sanitizeQueryParam