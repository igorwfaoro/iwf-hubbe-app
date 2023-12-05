import { Room } from "@prisma/client";

export class RoomIsBlockedViewModel {
    public id: string;
    public isSecret: boolean;
    public isBlocked: boolean;

    public static create(room: Room, isBlocked: boolean): RoomIsBlockedViewModel {
        const viewModel = new RoomIsBlockedViewModel();
        viewModel.id = room.id;
        viewModel.isSecret = room.isSecret;
        viewModel.isBlocked = isBlocked;
        return viewModel;
    }
}
