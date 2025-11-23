import { describe, test, beforeEach, afterEach, expect, vi, MockInstance } from 'vitest';
import { LuneLogger } from './lune.logger';

describe('LuneLogger', () => {
  let logSpy: MockInstance;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    LuneLogger.setLevels([]);
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  describe('info', () => {
    test('logs info messages when level is enabled', () => {
      LuneLogger.setLevels(['info']);
      LuneLogger.info('message');

      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    test('does not log info messages when level is not enabled', () => {
      LuneLogger.setLevels(['debug']);
      LuneLogger.info('message');

      expect(logSpy).not.toHaveBeenCalled();
    });

    test('logs info messages when wildcard is enabled', () => {
      LuneLogger.setLevels(['*']);
      LuneLogger.info('message');

      expect(logSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('debug', () => {
    test('logs debug messages when level is enabled', () => {
      LuneLogger.setLevels(['debug']);
      LuneLogger.debug('message');

      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    test('does not log debug messages when level is not enabled', () => {
      LuneLogger.setLevels(['info']);
      LuneLogger.debug('message');

      expect(logSpy).not.toHaveBeenCalled();
    });

    test('logs debug messages when wildcard is enabled', () => {
      LuneLogger.setLevels(['*']);
      LuneLogger.debug('message');

      expect(logSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('error', () => {
    test('logs errors when level is enabled', () => {
      LuneLogger.setLevels(['error']);
      const error = new Error('error');
      LuneLogger.error(error);

      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    test('does not log errors when level is not enabled', () => {
      LuneLogger.setLevels(['info']);
      LuneLogger.error(new Error('error'));

      expect(logSpy).not.toHaveBeenCalled();
    });

    test('logs errors when wildcard is enabled', () => {
      LuneLogger.setLevels(['*']);
      LuneLogger.error(new Error('error'));

      expect(logSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('fatal', () => {
    test('logs fatal errors when level is enabled', () => {
      LuneLogger.setLevels(['fatal']);
      const error = new Error('fatal');
      LuneLogger.fatal(error);

      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    test('does not log fatal errors when level is not enabled', () => {
      LuneLogger.setLevels(['error']);
      LuneLogger.fatal(new Error('fatal'));

      expect(logSpy).not.toHaveBeenCalled();
    });

    test('logs fatal errors when wildcard is enabled', () => {
      LuneLogger.setLevels(['*']);
      LuneLogger.fatal(new Error('fatal'));

      expect(logSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('ready', () => {
    test('logs ready messages when info level is enabled', () => {
      LuneLogger.setLevels(['info']);
      LuneLogger.ready('message');

      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    test('does not log ready messages when info level is not enabled', () => {
      LuneLogger.setLevels(['debug']);
      LuneLogger.ready('message');

      expect(logSpy).not.toHaveBeenCalled();
    });

    test('logs ready messages when wildcard is enabled', () => {
      LuneLogger.setLevels(['*']);
      LuneLogger.ready('message');

      expect(logSpy).toHaveBeenCalledTimes(1);
    });
  });
});
