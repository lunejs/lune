import { VendyxServer } from './server';

const vendyxServer = new VendyxServer();

vendyxServer.start();

/**
 * - Make that the create method in repositories, the input type not be a partial input
 *   instead of a partial input, it should be an accurate input type, for example
 *   ask for name, description, price, etc. and the optional fields should be optionals (according to the sql table)
 */
