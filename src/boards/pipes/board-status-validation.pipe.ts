import { BadRequestException, PipeTransform } from '@nestjs/common';

export class BoardStatusValidationPipe implements PipeTransform {
  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value))
      throw new BadRequestException(`${value} isn't in the status options`);
    return value;
  }

  private isStatusValid(status: any) {
    if (status === 'PRIVATE' || status === 'PUBLIC') return true;
    return false;
  }
}
