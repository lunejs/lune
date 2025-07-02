export interface Serializer<Entity, Table> {
  deserialize(row: Partial<Table>): Partial<Entity>;
  serialize(data: Partial<Entity>): Partial<Table>;
  serializeFields(fields: (keyof Entity)[]): (keyof Table | string)[];
}
