import { ApiProperty } from '@nestjs/swagger';
import PageDto from 'src/shared/pagination/page.dto';
import { MentorResponseDTO } from './mentor-response.dto';

export class PaginatedMentorResponseDTO extends PageDto<MentorResponseDTO> {
  @ApiProperty({ type: MentorResponseDTO, isArray: true })
  declare readonly data: MentorResponseDTO[];
}
