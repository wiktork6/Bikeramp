import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('trip')
export class TripEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startAdress: string;

    @Column()
    destinationAdress: string;
    
    @Column()
    distance: number;

    @Column()
    price: number;
    
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: Date;
}