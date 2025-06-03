import { ApiProperty } from '@nestjs/swagger';
import PageDto from 'src/shared/pagination/page.dto';
import { HeadResponseDTO } from './head-response.dto';

export class PaginatedHeadResponseDTO extends PageDto<HeadResponseDTO> {
  @ApiProperty({ type: HeadResponseDTO, isArray: true })
  declare readonly data: HeadResponseDTO[];
}
