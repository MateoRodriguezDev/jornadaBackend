import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { JornadasService } from './jornadas.service';
import { CreateJornadaDto } from './dto/create-jornada.dto';
import { UpdateJornadaDto } from './dto/update-jornada.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ChangeStateDto } from './dto/change-state.dto';
import { ParseNumberPipe } from 'src/helpers/parserNumber.pipe';

@Controller('jornadas')
@UseGuards(AuthGuard)
export class JornadasController {
  constructor(private readonly jornadasService: JornadasService) {}

  @Post()
  create(@Body() createJornadaDto: CreateJornadaDto) {
    return this.jornadasService.create(createJornadaDto);
  }

  @Get()
  findAll() {
    return this.jornadasService.findAll();
  }

  @Get('/find/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jornadasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJornadaDto: UpdateJornadaDto,
  ) {
    return this.jornadasService.update(id, updateJornadaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.jornadasService.remove(id);
  }

  @Get('mis-jornadas')
  getUserJornadas(@Req() req) {
    const user = req.user;
    if (typeof user?.userId === 'number')
      return this.jornadasService.getUserJornadas(user.userId);
  }

  @Post('change-jornada-state/:id')
  changeJornadaState(
    @Param('id', ParseIntPipe) id: number,
    @Body('lat', ParseNumberPipe) lat: number,
    @Body('long', ParseNumberPipe) long: number,
  ) {

    console.log('hola')
    // Transformación manual por seguridad
    const latCorrected = parseFloat(lat as any);
    const longCorrected = parseFloat(long as any);

    if (isNaN(lat) || isNaN(long)) {
      throw new BadRequestException('Latitud o longitud inválida');
    }

    return this.jornadasService.chageJornadaState(id, { lat: latCorrected, long: longCorrected });
  }
}
