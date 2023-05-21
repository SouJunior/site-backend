import { Controller, Get, Post, Body, Patch, Param, Res } from '@nestjs/common';
import { CreateCollaboratorDto } from '../dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from '../dto/update-collaborator.dto';
import { EditCollaborator } from '../use-cases/edit-collaborator';
import { GetCollaborators } from '../use-cases/get-collaborators';
import { GetCollaborator } from '../use-cases/get-one-collaborator';
import { RegisterCollaborator } from '../use-cases/register-collaborator';
import { Response } from 'express';
import { CollaboratorViewModel } from 'src/shared/view-models/collaborators-view-model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('collaborators')
export class CollaboratorsController {
  constructor(
    private readonly editCollaborator: EditCollaborator,
    private readonly getCollaborators: GetCollaborators,
    private readonly getCollaborator: GetCollaborator,
    private readonly registerCollaborator: RegisterCollaborator,
  ) {}

  @ApiOperation({
    summary: 'Register new collaborator',
  })
  @ApiResponse({
    status: 201,
    description: 'Success',
    type: null,
  })
  @ApiResponse({
    status: 400,
    description: 'Error',
    type: String,
  })
  @Post()
  async create(
    @Body() createCollaboratorDto: CreateCollaboratorDto,
    @Res() response: Response,
  ) {
    try {
      const { collaborator } = await this.registerCollaborator.execute(
        createCollaboratorDto,
      );

      return response.status(201).json({
        collaborator: CollaboratorViewModel.toHTTP(collaborator),
      });
    } catch (error) {
      return response.status(error.statusCode).json({
        message: error.body,
      });
    }
  }

  @ApiOperation({
    summary: 'Search all collaborators',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: null,
  })
  @ApiResponse({
    status: 400,
    description: 'Error',
    type: String,
  })
  @Get()
  async findAll(@Res() response: Response) {
    try {
      const { collaborators } = await this.getCollaborators.execute();
      return response.status(200).json({
        collaborators: collaborators.map(CollaboratorViewModel.toHTTP),
      });
    } catch (error) {
      return response.status(error.statusCode).json({
        message: error.body,
      });
    }
  }

  @ApiOperation({
    summary: 'Search an especific collaborator',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: null,
  })
  @ApiResponse({
    status: 400,
    description: 'Error',
    type: String,
  })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const { collaborator } = await this.getCollaborator.execute({
        id,
      });

      return res.status(200).json({
        collaborator: CollaboratorViewModel.toHTTP(collaborator),
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        message: error.body,
      });
    }
  }

  @ApiOperation({
    summary: 'Update one or more informations of an collaborator',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: null,
  })
  @ApiResponse({
    status: 400,
    description: 'Error',
    type: String,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCollaboratorDto: UpdateCollaboratorDto,
    @Res() res: Response,
  ) {
    try {
      const { collaborator } = await this.editCollaborator.execute({
        id,
        name: updateCollaboratorDto.name,
        role: updateCollaboratorDto.role,
      });

      return res.status(200).json({
        collaborator: CollaboratorViewModel.toHTTP(collaborator),
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        message: error.body,
      });
    }
  }
}
