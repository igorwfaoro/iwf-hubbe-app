import { UserViewModel } from './user.view-model';

export class AuthViewModel {
    user: UserViewModel;
    token: string;

    public static create(user: UserViewModel, token: string): AuthViewModel {
        const viewModel = new AuthViewModel();
        viewModel.user = user;
        viewModel.token = token;
        return viewModel;
    }
}
