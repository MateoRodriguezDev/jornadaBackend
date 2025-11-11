import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseNumberPipe implements PipeTransform {
  transform(value: any) {
    const parsed = parseFloat(value);
    if (isNaN(parsed)) {
      throw new BadRequestException(`Valor inválido: ${value}`);
    }
    return parsed;
  }
}
