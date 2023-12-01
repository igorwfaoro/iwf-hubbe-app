import { Room } from '@prisma/client';

export class RoomViewModel {
    public id: string;
    public name: string;
    public description: string;
    public image: string | undefined;
    public isSecret: boolean;

    public static fromModel(model: Room): RoomViewModel {
        const viewModel = new RoomViewModel();

        viewModel.id = model.id;
        viewModel.name = model.name;
        viewModel.description = model.description;
        viewModel.image = model.image;
        viewModel.isSecret = model.isSecret;

        return viewModel;
    }
}
