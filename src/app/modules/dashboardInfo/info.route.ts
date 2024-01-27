import express from 'express';

import { InfoController } from './info.controller';

const router = express.Router();

router.get('/cardInfo', InfoController.getCardInfo);

export const InfoRouter = router;
