import { Room } from './Room';
import { Movie } from './movie';
import { TimeFrame } from './TimeFrame';

export class ShowTime {
    idTime: number;
    movie: Movie;
    showDate: Date;
    showTime: TimeFrame;
    room: Room;
}


