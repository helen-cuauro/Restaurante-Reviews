import { ModelsParams } from "../models/models-params";

export function getEditQueryAndData(
  id: string,
  data: ModelsParams,
  tableName: string
): [string, string[]] {
  const query = [`UPDATE ${tableName}  SET`];
  const queryData: string[] = [];

  const patch: string[] = [];

  let idIndex;
  Object.keys(data).forEach(function (key: string, i: number) {
    patch.push(key + " = $" + (i + 1));
    queryData.push((data as any)[key].toString());
    idIndex = i + 2;
  });
  query.push(patch.join(", "));
  query.push("WHERE id = $" + idIndex + " RETURNING *");
  queryData.push(id);

  return [query.join(" "), queryData];
}

export function postFormat(object: Record<string, any>) {
  let result = [];
  for (let key in object) {
    result.push(`'${object[key]}'`);
  }
  return result.join(" ,");
}
