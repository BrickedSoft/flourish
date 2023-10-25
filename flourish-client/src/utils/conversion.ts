import _ from "lodash";

export const enum KeyTypes {
  String = "String",
  Number = "Number",
}

export const stringToObject = (
  data: string,
  keys: { key: string; type: KeyTypes }[]
) => {
  const splits = _.chain(data)
    .replace(/\s*,\s*/g, ",")
    .split(",")
    .value();

  const length = splits.length / keys.length;
  const objects = _.map(keys, (key, index) => {
    return {
      data: _.chain(splits)
        .slice(index * length, index * length + length)
        .map((value) => {
          const TypedValue = () => {
            switch (key.type) {
              case KeyTypes.Number:
                return Number(value);
              case KeyTypes.String:
                return value;
            }
          };

          return { [key.key]: TypedValue() };
        })
        .value(),
    };
  });

  const result = {};
  _.map(objects, (value) => _.merge(result, value.data));
  return _.flatMap(result);
};

export const objectToString = (data: Object[], keys?: string[]) => {
  if (!keys) keys = Object.keys(data[0]);

  return _.chain(_.map(keys, (key) => _.chain(data).map(key).value()))
    .join(", ")
    .value();
};
