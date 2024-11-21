import { validate } from '../middleware/validate';
import { logoutHandler } from './routes/auth';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import upload from 'multer';
import { EmailSavedProvider, FindProvidersByCare, GetAllProviders, GetNearestProviders, GetProvider, GetQnAForProvider, SaveReport } from './routes/provider';
import { AddCareType, CreateCare, DeleteCare, GetCares, UpdateCare } from './routes/care';
import { bodyValidator, paramValidator, queryValidator } from '../utilities/validator';
import { contactSchema, createCareSchema, emailSchema, idSchema, loginSchema, NearestProviderSchema, otpSchema, registerSchema, resetPasswordSchema, saveReportSchema, updateSchema } from './validators';
import { CreateReviews, GetAllReviews } from './routes/review';
import path from "path";
import fs from "fs";
import { CreateUser, ForgotPassword, GetUserByEmail, loginUser, ResetPassword, RetryVerification, UpdateProfile, UpdateUser, VerifyEmail } from './routes/user';
import { CreateContactMessages, TestEmail } from './routes/contacts';

export async function useUploadDir() {
  const uploadDir = path.join(__dirname, "files");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
}

export default async (app: any) => {

  const uploadDir = path.join(__dirname, "files");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  // Set up multer to store uploaded files in the "files" directory
  const storage = upload.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir); // Save files in the "files" folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Append the correct extension
    },
  });

  const uploadOptions = upload({ storage });

  app.get('/api/provider/all', GetAllProviders);
  app.get('/api/provider/findNearest', queryValidator(NearestProviderSchema), GetNearestProviders);
  app.get('/api/provider/findProvidersByCare/:care', FindProvidersByCare);
  app.get('/api/provider/:id', paramValidator(idSchema), GetProvider);
  app.get('/api/provider/qna/:code', GetQnAForProvider);
  app.post("/api/provider/email", uploadOptions.single("file"), EmailSavedProvider);
  app.post("/api/provider/report", bodyValidator(saveReportSchema), SaveReport);

  app.get('/api/cares/all', GetCares);
  app.post('/api/cares/new', bodyValidator(createCareSchema), CreateCare);
  app.post('/api/cares/update', UpdateCare);
  app.get('/api/cares/delete/:id', DeleteCare);
  app.post('/api/cares/caretype/add', AddCareType);

  app.get('/api/reviews/all', GetAllReviews)
  app.post('/api/review/create', CreateReviews)

  app.post('/api/login', bodyValidator(loginSchema), loginUser);
  app.post('/api/user/create', bodyValidator(registerSchema), CreateUser);
  app.post('/api/user/update', bodyValidator(updateSchema), UpdateUser);
  app.post('/api/user/profile', uploadOptions.single("file"), UpdateProfile);
  app.post('/api/user/verify', bodyValidator(otpSchema), VerifyEmail);
  app.post('/api/user/retryVerification', bodyValidator(emailSchema), RetryVerification);
  app.get('/api/user/getUserByEmail', queryValidator(emailSchema), GetUserByEmail);
  app.post('/api/user/forgotPassword', bodyValidator(emailSchema), ForgotPassword);
  app.post('/api/user/resetPassword', bodyValidator(resetPasswordSchema), ResetPassword);
  app.get('/api/logout', deserializeUser, requireUser, logoutHandler);

  app.post('/api/createContact', bodyValidator(contactSchema), CreateContactMessages)
  app.get('/api/testEmail', queryValidator(emailSchema), TestEmail);

}