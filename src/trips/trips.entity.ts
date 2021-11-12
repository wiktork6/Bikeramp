import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('trip')
export class TripEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 50})
    startAdress: string;

    @Column({type: "varchar", length: 50})
    destinationAdress: string;
    
    @Column({type: "numeric"})
    distance: number;

    @Column({type: "numeric"})
    price: number;
    
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: Date;
}