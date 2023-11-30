import { User } from '@prisma/client';

export class UserViewModel {
    public id: string;
    public username: string;
    public fullName: string;

    public static fromModel(model: User): UserViewModel {
        const viewModel = new UserViewModel();
        viewModel.id = model.id;
        viewModel.username = model.username;
        viewModel.fullName = model.fullName;
        return viewModel;
    }
}
