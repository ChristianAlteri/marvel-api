import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { Character } from './character.entity';

// Setting up the controller
@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  // Create a new character
  @Post()
  async create(
    @Body()
    payload: {
      character: Character;
      knownEnemies?: number[];
      knownAccomplices?: number[];
    },
  ): Promise<Character> {
    return await this.charactersService.create(payload);
  }

  // Get all characters
  @Get()
  async findAll(): Promise<Character[]> {
    return this.charactersService.findAll();
  }

  // Update a character
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() character: Character,
  ): Promise<void> {
    return this.charactersService.update(id, character);
  }

  // Delete a character
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.charactersService.delete(id);
  }
}
