import { promises as fs } from 'node:fs';

import multer from 'multer';

import { AssetService } from '@/business/asset/asset.service';
import { getConfig } from '@/config/config';
import { Logger } from '@/logger';
import type { Asset } from '@/persistence/entities/asset';
import { AssetType } from '@/persistence/entities/asset';

import type { ExecutionContext } from '../shared/context/types';
import { userMiddleware } from '../shared/middlewares/user.middleware';
import type { RestApiEndpoint, RestApiHandler } from '../shared/rest-api';

const TMP_DIR = 'tmp';
const multerMiddleware = multer({ dest: TMP_DIR, limits: {} });

const upload: RestApiHandler = async (req, res) => {
  const ctx = res.locals.context as ExecutionContext;

  try {
    const files = (req.files ?? []) as Express.Multer.File[];

    const { storageProvider, imageProcessor } = getConfig().assets;
    const assetService = new AssetService(ctx);
    const assets: Asset[] = [];

    for (const file of files) {
      const tmpOut = `${TMP_DIR}/${Date.now()}-${Math.random().toString(36).slice(2)}`;
      await fs.mkdir(tmpOut, { recursive: true });

      const processedImages = await imageProcessor.process(file, tmpOut);

      for (const img of processedImages) {
        const result = await storageProvider.upload(img.filepath, { filename: img.filename });

        // TODO: handle this properly
        if (!result) continue;

        const asset = await assetService.create({
          name: file.originalname,
          providerId: result.providerId,
          source: result.source,
          type: AssetType.IMG
        });

        assets.push(asset);
      }

      await fs.rm(tmpOut, { recursive: true, force: true });
      await fs.unlink(file.path);
    }

    await ctx.trx.commit();
    res.json({ success: true, data: assets });
  } catch (error) {
    Logger.error('/upload', error, error);
    await ctx.trx.rollback();
    res.status(500).json({ success: false });
  }
};

export const UploadEndpoints: RestApiEndpoint[] = [
  {
    method: 'post',
    path: '/',
    handlers: [userMiddleware, multerMiddleware.array('files', 12), upload]
  }
];
