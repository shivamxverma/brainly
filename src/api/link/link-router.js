import { Router } from 'express';
import validate from '../shared/validate';
import { LinkCreateSchema, updateLinkSchema, updateFavoriteStatusSchema } from './link-schema';
import { createLink, getAllLinks, getLinkById, updateLink, updateFavoriteStatus } from './link-controller.js';
import { verifyJWT } from '../shared/middleware.js';

const router = Router();

router.post('/', validate(LinkCreateSchema), verifyJWT, createLink);
router.get('/', verifyJWT, getAllLinks);
router.get('/:id', verifyJWT, getLinkById);
router.put('/:id', validate(updateLinkSchema), verifyJWT, updateLink);
router.patch('/:id/favorite', validate(updateFavoriteStatusSchema), verifyJWT, updateFavoriteStatus);

export default router;
