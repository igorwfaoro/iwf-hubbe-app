import { Room } from '@prisma/client';

export class RoomIsInUseViewModel {
    public id: string;
    public isSecret: boolean;
    public isInUse: boolean;

    public static fromModel(room: Room): RoomIsInUseViewModel {
        const viewModel = new RoomIsInUseViewModel();
        viewModel.id = room.id;
        viewModel.isSecret = room.isSecret;
        viewModel.isInUse = !!room.currentUserId;
        return viewModel;
    }
}
