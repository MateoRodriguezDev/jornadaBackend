import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    DataType,
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript';
import { User } from '../users/user.model';

@Table
export class Jornada extends Model<Jornada> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    nameLocation: string;

    @Column
    startingDate: Date;

    @Column
    finishingDate: Date;

    @Column({ allowNull: true })
    dateStarted: Date;

    @Column({ allowNull: true })
    dateFinished: Date;

    @Column({ defaultValue: 'Pendiente' })
    state: string;

    @Column({ allowNull: true })
    firstImgURL: string;

    @Column({ allowNull: true })
    lastImgURL: string;

    @Column({ type: DataType.DECIMAL(10, 7) })
    lat: number;

    @Column({ type: DataType.DECIMAL(10, 7) })
    long: number;

    @Column({ type: DataType.DATE, allowNull: true })
    deletedAt?: Date;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;
}
