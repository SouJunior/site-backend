import { ApiProperty } from '@nestjs/swagger';
import PageDto from 'src/shared/pagination/page.dto';
import { SupporterResponseDTO } from './supporter-response.dto';

export class PaginatedSupporterResponseDTO extends PageDto<SupporterResponseDTO> {
  @ApiProperty({ type: SupporterResponseDTO, isArray: true })
  declare readonly data: SupporterResponseDTO[];
}
