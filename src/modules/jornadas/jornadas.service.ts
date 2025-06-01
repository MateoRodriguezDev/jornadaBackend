import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJornadaDto } from './dto/create-jornada.dto';
import { UpdateJornadaDto } from './dto/update-jornada.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Jornada } from './jornada.model';
import { UsersService } from '../users/users.service';
import { calulateDistance } from '../../helpers/geolib.helper'
import { envs } from 'src/config';
import { uploadIMG } from 'src/helpers/file.helper';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class JornadasService {

  constructor(
    @InjectModel(Jornada)
    private jornadaModel: typeof Jornada,
    private userService: UsersService,
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

  async chageJornadaState(jornadaId: number, persona: { lat: number, long: number }, image: Express.Multer.File) {
    const jornada = await this.findOne(jornadaId)
 

    //Verificamos si ya es la hora de la jornada
    const fechaActual = new Date();
    if (fechaActual < new Date(jornada.startingDate) || fechaActual > new Date(jornada.finishingDate)) {
      throw new BadRequestException(`Jornada no está en curso`);
    }


    //Verifico la distancia entre persona y jornada 
    const distancia = calulateDistance({ lat: persona.lat, long: persona.long }, { lat: jornada.lat, long: jornada.long })
    if (distancia > envs.distance && envs.check_distance) {
      throw new BadRequestException('Too far from the Jornada location, go back to continue')
    }


    //Verifico en que estado esta la jornada y en base a eso la cambiamos
    switch (jornada.state) {
      case 'Pendiente':
        //Subo la imagen a Firebase Storage
        if (!image) throw new BadRequestException('Must send an image')
        image.originalname = uuidv4()
        uploadIMG(image)

        //Actualizo la jornada a En Proceso y le subo la imagen
        return this.update(jornadaId, { state: 'En Proceso', dateStarted: new Date(), firstImgURL: `jornada/img/${image.originalname}`})


      case 'En Proceso':
        //Subo la imagen a Firebase Storage
        if (!image) throw new BadRequestException('Must send an image')
        image.originalname = uuidv4()
        uploadIMG(image)
        //Actualizo la jornada a Finalizada y le subo la imagen
        return this.update(jornadaId, { state: 'Finalizada', dateFinished: new Date(), lastImgURL: `jornada/img/${image.originalname}`})

      case 'Finalizada':
        throw new BadRequestException('Jornada already finished')
    }

  }

}
