import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './character.entity';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
  ) {}

  // Create a new character
  async create(characterData: {
    character: Character;
    knownEnemies?: number[];
    knownAccomplices?: number[];
  }): Promise<Character> {
    const { character, knownEnemies, knownAccomplices } = characterData;

    if (knownEnemies) {
      character.knownEnemies =
        await this.characterRepository.findByIds(knownEnemies);
    }

    if (knownAccomplices) {
      character.knownAccomplices =
        await this.characterRepository.findByIds(knownAccomplices);
    }

    const newCharacter = await this.characterRepository.create(character);
    console.log('successfully created a new character');
    return this.characterRepository.save(newCharacter);
  }

  // Get all characters
  async findAll(): Promise<Character[]> {
    console.log('successfully returned all characters');
    return await this.characterRepository.find({
      relations: ['knownAccomplices', 'knownEnemies'],
    });
  }

  // Update a character
  async update(id: number, character: Character): Promise<void> {
    console.log(`Updating character with ID ${id}`);
    try {
      await this.characterRepository.update(id, character);
      console.log('Update complete');
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // Delete a character
  async delete(id: number): Promise<void> {
    console.log('successfully deleted a character');
    await this.characterRepository.delete(id);
  }
}
