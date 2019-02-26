export function logger(cb) {
  if (typeof Sentry === "object") {
    cb(Sentry);
  }
}
