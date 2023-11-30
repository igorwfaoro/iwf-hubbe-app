import { Router } from 'express';
import { createAuthService } from '../services/auth.service';
import { validateInput } from '../middlewares/validate-input';
import { authValidator } from '../validators/auth.validator';

const AuthController = Router();

const authService = createAuthService();

AuthController.post('/login', validateInput(authValidator.login), async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
});

export { AuthController };
