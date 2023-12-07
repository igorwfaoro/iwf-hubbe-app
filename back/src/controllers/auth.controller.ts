import { Router } from 'express';
import { validateInput } from '../middlewares/validate-input';
import { authValidator } from '../validators/auth.validator';
import { checkHttpToken } from '../middlewares/check-token/check-token';
import { TokenHelper } from '../util/helpers/token/token.helper';
import { createAuthService } from '../services/auth/auth.service';

const AuthController = Router();

const authService = createAuthService();

AuthController.post('/login', validateInput(authValidator.login), async (req, res, next) => {
    try {
        const result = await authService.login(req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

AuthController.post('/refresh', checkHttpToken, async (req, res, next) => {
    try {
        const result = await authService.refresh(TokenHelper.getPayload(res).user.id);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

export { AuthController };
