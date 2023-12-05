import { Router } from 'express';
import { createAuthService } from '../services/auth.service';
import { validateInput } from '../middlewares/validate-input';
import { authValidator } from '../validators/auth.validator';
import { TokenHelper } from '../util/helpers/token.helper';
import { checkHttpToken } from '../middlewares/check-token';

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
