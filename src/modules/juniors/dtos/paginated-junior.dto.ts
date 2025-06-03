import { ApiProperty } from '@nestjs/swagger';
import PageDto from 'src/shared/pagination/page.dto';
import { JuniorResponseDTO } from './junior-response.dto';

export class PaginatedJuniorResponseDTO extends PageDto<JuniorResponseDTO> {
  @ApiProperty({ type: JuniorResponseDTO, isArray: true })
  declare readonly data: JuniorResponseDTO[];
}
