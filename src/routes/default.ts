import express, { Router } from 'express';

const router: Router = express.Router();

// Controllers import
import * as defaultController from '../controllers/default';

// Controllers middleware
router.get('/', defaultController.getOverview);

export default router;
