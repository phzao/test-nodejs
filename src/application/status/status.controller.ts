import { Controller, Get } from '@nestjs/common';
import { StatusService } from './status.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StatusDto } from './dto/status.dto';

@ApiTags('status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  @ApiOkResponse({ type: StatusDto })
  getStatus(): StatusDto {
    return this.statusService.getStatus();
  }
}
