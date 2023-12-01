import { Room } from '@prisma/client';

export class RoomDetailViewModel {
    public id: string;
    public name: string;
    public description: string | undefined;
    public content: string;
    public image: string | undefined;
    public isSecret: boolean;

    public static fromModel(model: Room): RoomDetailViewModel {
        const viewModel = new RoomDetailViewModel();

        viewModel.id = model.id;
        viewModel.name = model.name;
        viewModel.description = model.description;
        viewModel.content = model.content;
        viewModel.image = model.image;        
        viewModel.isSecret = model.isSecret;

        return viewModel;
    }
}
