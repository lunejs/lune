import { promises as fs } from 'node:fs';

import multer from 'multer';

import { getConfig } from '@/config/config';
import { Logger } from '@/logger';

import { RestApiEndpoint, RestApiHandler } from '../shared/rest-api';

const TMP_DIR = 'tmp';
const multerMiddleware = multer({ dest: TMP_DIR, limits: {} });

const upload: RestApiHandler = async (req, res) => {
  try {
    const files = (req.files ?? []) as Express.Multer.File[];

    const { storageProvider, imageProcessor } = getConfig().assets;

    for (const file of files) {
      const tmpOut = `${TMP_DIR}/${Date.now()}-${Math.random().toString(36).slice(2)}`;
      await fs.mkdir(tmpOut, { recursive: true });

      const processedImages = await imageProcessor.process(
        { name: file.originalname, path: file.path },
        tmpOut
      );

      // const assetService = new AssetService(res.locals.context);

      for (const img of processedImages) {
        const result = await storageProvider.upload(img.filepath, { filename: img.filename });

        // TODO: handle this properly
        if (!result) continue;

        // await assetService.create({ name: img.filename, providerId: result.providerId, source: result.source, type: AssetType.IMG });
      }

      await fs.rm(tmpOut, { recursive: true, force: true });
      await fs.unlink(file.path);
    }

    res.json({ ok: true });
  } catch (error) {
    Logger.error('/upload', error, error);
    res.status(500).json({ ok: false });
  }
};

export const UploadEndpoints: RestApiEndpoint[] = [
  { method: 'post', path: '/', handlers: [multerMiddleware.array('assets', 12), upload] }
];
