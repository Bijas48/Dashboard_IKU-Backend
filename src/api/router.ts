import { Router } from 'express';
import {getHello,mainHello} from './controllers/hello'

const router = Router();

router.get('/', mainHello);

router.get('/hello', getHello);
export default router;
