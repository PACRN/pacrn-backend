import { validate } from '../middleware/validate';
import { logoutHandler } from './routes/auth';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import upload from 'multer';
import { GetAllProviders } from './routes/provider';

export default async (app: any) => {

  let uploadOptions = upload({ dest: '/files' });
  app.get('/api/allProviders', GetAllProviders);
  app.get('/api/logout', deserializeUser, requireUser, logoutHandler);
}




