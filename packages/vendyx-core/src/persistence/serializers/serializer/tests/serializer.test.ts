import { User } from '@/persistence/entities/user';
import { TestSerializerMock, TestSerializer } from './serializer.mock';
import { SerializeError } from '../serializer';

describe('User Serializer', () => {
  describe('deserialize', () => {
    test('returns a correct deserialized user object', () => {
      const serializer = new TestSerializer();

      const deserialized = serializer.deserialize(TestSerializerMock.MockedTestRow);

      expect(deserialized).toEqual({
        id: '123',
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-01-02T00:00:00Z'),
        email: 'ellie.williams@us.com',
        password: 'hashed_password'
      });
    });

    test('returns and empty object when no row is provided', () => {
      const serializer = new TestSerializer();

      const deserialized = serializer.deserialize({});

      expect(deserialized).toEqual({});
    });

    test('returns an empty object when null or undefined is provided', () => {
      const serializer = new TestSerializer();

      expect(() => {
        serializer.deserialize(null as unknown as object);
      }).toThrow(SerializeError);
      expect(() => {
        serializer.deserialize(undefined as unknown as object);
      }).toThrow(SerializeError);
    });

    test('returns partial user object when some fields are missing', () => {
      const serializer = new TestSerializer();

      const deserialized = serializer.deserialize(TestSerializerMock.MockedPartialTestRow);

      expect(deserialized).toEqual({
        id: '123',
        createdAt: new Date('2023-01-01T00:00:00Z'),
        email: 'alison.madden@gmail.com'
      });
    });
  });

  describe('serialize', () => {
    test('returns a correct serialized user object', () => {
      const serializer = new TestSerializer();

      const serialized = serializer.serialize(TestSerializerMock.MockedTestEntity);

      expect(serialized).toEqual({
        id: '123',
        created_at: new Date('2023-01-01T00:00:00Z'),
        updated_at: new Date('2023-01-02T00:00:00Z'),
        email: 'joel.miller@us.com',
        password: 'hashed_password'
      });
    });

    test('returns an empty object when no user is provided', () => {
      const serializer = new TestSerializer();

      const serialized = serializer.serialize({});

      expect(serialized).toEqual({});
    });

    test('returns an empty object when null or undefined is provided', () => {
      const serializer = new TestSerializer();

      expect(() => {
        serializer.serialize(null as unknown as object);
      }).toThrow(SerializeError);
      expect(() => {
        serializer.serialize(undefined as unknown as object);
      }).toThrow(SerializeError);
    });

    test('returns partial user object when some fields are missing', () => {
      const serializer = new TestSerializer();

      const deserialized = serializer.serialize(TestSerializerMock.MockedPartialTestEntity);

      expect(deserialized).toEqual({
        id: '123',
        created_at: new Date('2023-01-01T00:00:00Z'),
        email: 'troy@staff.com'
      });
    });
  });

  describe('serializeFields', () => {
    test('returns correct serialized fields', () => {
      const serializer = new TestSerializer();

      const fields = serializer.serializeFields(['id', 'createdAt', 'email']);

      expect(fields).toEqual(['id', 'created_at', 'email']);
    });

    test('returns empty array when no fields are provided', () => {
      const serializer = new TestSerializer();

      const fields = serializer.serializeFields([]);

      expect(fields).toEqual([]);
    });

    test('returns empty array when null or undefined is provided', () => {
      const serializer = new TestSerializer();

      expect(() => {
        serializer.serializeFields(null as unknown as (keyof User)[]);
      }).toThrow(SerializeError);
      expect(() => {
        serializer.serializeFields(undefined as unknown as (keyof User)[]);
      }).toThrow(SerializeError);
    });
  });
});
