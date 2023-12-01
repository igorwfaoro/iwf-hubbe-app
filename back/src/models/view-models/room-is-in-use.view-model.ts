import { Room } from '@prisma/client';

export class RoomIsInUseViewModel {
    public id: string;
    public isInUse: boolean;

    public static fromModel(room: Room): RoomIsInUseViewModel {
        const viewModel = new RoomIsInUseViewModel();
        viewModel.id = room.id;
        viewModel.isInUse = !!room.currentUserId;
        return viewModel;
    }
}
