import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJornadaDto } from './dto/create-jornada.dto';
import { UpdateJornadaDto } from './dto/update-jornada.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Jornada } from './jornada.model';
import { UsersService } from '../users/users.service';
import { calulateDistance } from '../../helpers/geolib.helper'
import { envs } from 'src/config';

@Injectable()
export class JornadasService {

  constructor(
    @InjectModel(Jornada)
    private jornadaModel: typeof Jornada,
    private userService: UsersService
  ) { }

  async create(createJornadaDto: CreateJornadaDto) {
    const user = await this.userService.findOne(createJornadaDto.userId)
    if (!user) throw new BadRequestException('User Not Found')

    return this.jornadaModel.create(createJornadaDto)
  }

  async findAll() {
    return await this.jornadaModel.findAll()
  }

  async findOne(id: number) {
    const jornada = await this.jornadaModel.findOne({ where: { id } })
    if (!jornada) throw new BadRequestException('Jornada Not Found')

    return jornada
  }

  async update(id: number, updateJornadaDto: UpdateJornadaDto) {
    const jornada = await this.findOne(id)
    if (!updateJornadaDto) throw new BadRequestException('Unvalid updateJornadaDto')

    await jornada.update(updateJornadaDto)
    await jornada.save()

    return jornada


  }

  async remove(id: number) {
    const jornada = await this.findOne(id)

    await this.update(id, { deletedAt: new Date() });
    return `${jornada.id} has been deleted`;
  }

  async getUserJornadas(userId: number) {
    const user = await this.userService.findOne(userId)
    if (!user) throw new BadRequestException('User Not Found')

    const jornadas = await this.jornadaModel.findAll({ where: { userId } })
    return jornadas
  }

  async chageJornadaState(jornadaId: number, persona: { lat: number, long: number }) {
    const jornada = await this.findOne(jornadaId)
    console.log(new Date())
    //Verificamos si ya es la hora de la jornada
    const fechaActual = new Date();

    if (fechaActual < new Date(jornada.startingDate) || fechaActual > new Date(jornada.finishingDate)) {
      throw new BadRequestException(`Jornada no está en curso`);
    }


    //Verifico la distancia entre persona y jornada 
    const distancia = calulateDistance({ lat: persona.lat, long: persona.long }, { lat: jornada.lat, long: jornada.long })
    if (distancia > envs.distance) {
      throw new BadRequestException('Too far from the Jornada location, go back to continue')
    }


    //Verifico en que estado esta la jornada y en base a eso la cambiamos
    switch (jornada.state) {
      case 'Pendiente':
        return this.update(jornadaId, { state: 'En Proceso', dateStarted: new Date() })
      case 'En Proceso':
        return this.update(jornadaId, { state: 'Finalizada', dateFinished: new Date() })
      case 'Finalizada':
        throw new BadRequestException('Jornada already finished')
    }

    //Logica para agregar la imagen de salida o entrada
  }

}
