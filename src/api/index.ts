import { validate } from '../middleware/validate';
import { logoutHandler } from './routes/auth';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import upload from 'multer';
import { FindProvidersByCare, GetAllProviders, GetNearestProviders, GetProvider } from './routes/provider';
import { AddCareType, CreateCare, DeleteCare, GetCares, UpdateCare } from './routes/care';

export default async (app: any) => {

  let uploadOptions = upload({ dest: '/files' });

  app.get('/api/provider/all', GetAllProviders);
  app.post('/api/provider/findNearest', GetNearestProviders);
  app.get('/api/provider/findProvidersByCare/:care', FindProvidersByCare);
  app.get('/api/provider/:id', GetProvider);

  app.get('/api/cares/all', GetCares);  
  app.post('/api/cares/new', CreateCare);
  app.post('/api/cares/update', UpdateCare);
  app.get('/api/cares/delete/:id', DeleteCare);
  app.post('/api/cares/caretype/add', AddCareType);

  app.get('/api/logout', deserializeUser, requireUser, logoutHandler);
}




