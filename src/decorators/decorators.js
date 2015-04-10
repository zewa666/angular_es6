export function inject (...components) {
  return function decorate (target, key, descriptor) {
    if (descriptor) {
      target = descriptor.value;
    }

    target.$inject = components;

    return descriptor;
  }
}