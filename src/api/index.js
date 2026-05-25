import {Router} from 'express';
import authRouter from './auth/auth-router.js';
import linkRouter from './link/link-router.js';

const router = Router();

const routes = [
    { path: '/auth' , route: authRouter},
    { path: '/link' , route: linkRouter}
]

routes.forEach((r) => {
    router.use(r.path, r.route);
});

export default router;