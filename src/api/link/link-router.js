import { Router } from 'express';
import validate from '../shared/validate';
import { LinkCreateSchema } from './link-schema';
import { createLink } from './link-controller.js';
import { verifyJWT } from '../shared/middleware.js';

const router = Router();

router.post('/create',validate(LinkCreateSchema), verifyJWT,createLink);

export default router;
