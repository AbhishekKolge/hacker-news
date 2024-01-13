type ObjectModel = Record<string, any>;

const omitEmptyKeys = (
  obj: ObjectModel,
  excludes: string[] = []
): ObjectModel => {
  const isNotEmpty = (value: any): boolean =>
    value !== '' && value !== undefined && value !== null;

  const result: ObjectModel = {};

  for (const [key, value] of Object.entries(obj)) {
    if (
      !excludes.includes(key) &&
      (isNotEmpty(value) ||
        (Array.isArray(value) && value.length > 0) ||
        (typeof value === 'object' &&
          value !== null &&
          value !== undefined &&
          Object.keys(value).length > 0))
    ) {
      result[key] = value;
    }
  }

  return result;
};

const pickExactObjKeys = <T extends ObjectModel, K extends keyof T>(
  obj: T,
  pickObj: K[]
): Partial<T> => {
  const result: Partial<T> = {};

  for (const key of pickObj) {
    const value = obj[key];
    if (value !== undefined) {
      result[key] = value;
    }
  }
  return result;
};

export { omitEmptyKeys, pickExactObjKeys };
