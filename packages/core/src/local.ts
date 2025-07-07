import { DEFAULT_VENDYX_CONFIG } from './config/default-config';
import { VendyxServer } from './server';

const vendyxServer = new VendyxServer(DEFAULT_VENDYX_CONFIG);

vendyxServer.start();
