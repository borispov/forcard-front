// credid to David Morrow's article:
// https://dev.to/dperrymorrow/create-an-observable-object-using-proxy-3h62
export function buildProxy(poj, callback, tree = []) {
  const getPath = (prop) => tree.concat(prop).join(".");

  return new Proxy(poj, {
    get(_target, prop) {
      const value = Reflect.get(...arguments);

      if (
        value &&
        typeof value === "object" &&
        ["Array", "Object"].includes(value.constructor.name)
      )
        return buildProxy(value, callback, tree.concat(prop));

      return value;
    },

    set(target, prop, value) {
      callback({
        designObject: poj,
        action: "set",
        path: getPath(prop),
        prop: prop,
        target,
        newValue: value,
        previousValue: Reflect.get(...arguments),
      });
      return Reflect.set(...arguments);
    },

  });
}
