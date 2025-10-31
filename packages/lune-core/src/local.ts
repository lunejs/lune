import { DEFAULT_LUNE_CONFIG } from './config/default-config';
import { LuneServer } from './server';

const luneServer = new LuneServer(DEFAULT_LUNE_CONFIG);

luneServer.start();
