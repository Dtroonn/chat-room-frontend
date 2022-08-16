export interface RoomCardProps {
    id: string;
    title: string;
    description: string | null;
    image: any;
    onJoin: (id: string) => Promise<void> | void;
}
