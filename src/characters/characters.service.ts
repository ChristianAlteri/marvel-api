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
  async create(character: Character): Promise<Character> {
    const newCharacter = await this.characterRepository.create(character);
    console.log('successfully created a new character');
    return this.characterRepository.save(newCharacter);
  }

  // Get all characters
  async findall(): Promise<Character[]> {
    console.log('successfully returned all characters');
    return await this.characterRepository.find();
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
