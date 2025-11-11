import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req, BadRequestException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { JornadasService } from './jornadas.service';
import { CreateJornadaDto } from './dto/create-jornada.dto';
import { UpdateJornadaDto } from './dto/update-jornada.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ChangeStateDto } from './dto/change-state.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('jornadas')
@UseGuards(AuthGuard)
export class JornadasController {
  constructor(private readonly jornadasService: JornadasService) { }

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
  update(@Param('id', ParseIntPipe) id: number, @Body() updateJornadaDto: UpdateJornadaDto) {
    return this.jornadasService.update(id, updateJornadaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.jornadasService.remove(id);
  }

  @Get('mis-jornadas')
  getUserJornadas(@Req() req) {
    const user = req.user
    if (typeof user?.userId === 'number') return this.jornadasService.getUserJornadas(user.userId)
  }


  @UseInterceptors(FileInterceptor('image'))
  @Post('change-jornada-state/:id')
  changeJornadaState(@Param('id', ParseIntPipe) id: number, @Body() changeStateDto: ChangeStateDto, @UploadedFile() image: Express.Multer.File) {
    return this.jornadasService.chageJornadaState(id, changeStateDto, image)
  }
}
