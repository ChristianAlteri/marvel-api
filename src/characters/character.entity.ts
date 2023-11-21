import { Column, PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Character {
    /**
     * age
     * name
     * gender
     * film status
     */

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100})
    name: string;

    @Column({type: 'int'})
    age: number;

    @Column({type: 'enum', enum: ['male', 'female', 'other']})
    gender: string;

    // If they are currently active in Marvel films.
    @Column({type: 'boolean'})
    active: boolean;

    //  Add the relationships
    @ManyToMany(type => Character, { cascade: true, nullable: true })
    @JoinTable()
    knownAccomplices: Character[];

    @ManyToMany(type => Character, { cascade: true, nullable: true })
    @JoinTable()
    knownEnemies: Character[];
   
}

