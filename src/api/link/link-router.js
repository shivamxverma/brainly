import { Router } from 'express';
import validate from '../../shared/validate.js';
import { LinkCreateSchema, updateLinkSchema, updateFavoriteStatusSchema } from './link-schema.js';
import { createLink, getAllLinks, getLinkById, updateLink, updateFavoriteStatus, createShareLink, getShareableLink} from './link-controller.js';
import { verifyJWT } from '../../shared/middleware.js';

const router = Router();

router.post('/', validate(LinkCreateSchema), verifyJWT, createLink);
router.get('/', verifyJWT, getAllLinks);
router.get('/:id', verifyJWT, getLinkById);
router.put('/:id', validate(updateLinkSchema), verifyJWT, updateLink);
router.patch('/:id/favorite', validate(updateFavoriteStatusSchema), verifyJWT, updateFavoriteStatus);

// Share Link

// create share link
router.get('/:id/share', verifyJWT, createShareLink);
router.get('/share/:shareHash', getShareableLink);

export default router;
