import { UserViewModel } from './user.view-model';

export class LoginResultViewModel {
    user: UserViewModel;
    token: string;

    public static create(user: UserViewModel, token: string): LoginResultViewModel {
        const viewModel = new LoginResultViewModel();
        viewModel.user = user;
        viewModel.token = token;
        return viewModel;
    }
}
