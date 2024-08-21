import { validate } from '../middleware/validate';
import { logoutHandler } from './routes/auth';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import upload from 'multer';
import { GetAllProviders, GetNearestProviders, GetProvider } from './routes/provider';
import { AddCareType, CreateCare, DeleteCare, GetCares, UpdateCare } from './routes/care';

export default async (app: any) => {

  let uploadOptions = upload({ dest: '/files' });
  app.get('/api/allProviders', GetAllProviders);
  // get providers by id
  app.get('/api/provider/:id', GetProvider);
  app.get('/api/provider/findNearest', GetNearestProviders);

  app.get('/api/cares/all', GetCares);  
  app.post('/api/cares/new', CreateCare);
  app.post('/api/cares/update', UpdateCare);
  app.get('/api/cares/delete/:id', DeleteCare);
  app.post('/api/cares/caretype/add', AddCareType);

  app.get('/api/logout', deserializeUser, requireUser, logoutHandler);
}




