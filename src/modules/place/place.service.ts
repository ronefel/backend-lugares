import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

import { Place } from './place.entity';
import { PlaceRepository } from './place.repository';

import { CreatePlaceDto, ReadPlaceDto, UpdatePlaceDto } from './dtos';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(PlaceRepository)
    private readonly _placeRepository: PlaceRepository,
  ) {}

  async findAllPlaces(): Promise<ReadPlaceDto[]> {
    const places: Place[] = await this._placeRepository.find();

    return places.map((place: Place) => plainToClass(ReadPlaceDto, place));
  }

  async findPlaceById(id: number): Promise<ReadPlaceDto> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const place: Place = await this._placeRepository.findOne(id);

    if (!place) {
      throw new NotFoundException('Place not found');
    }

    return plainToClass(ReadPlaceDto, place);
  }

  async createPlace(place: CreatePlaceDto): Promise<ReadPlaceDto> {
    const savedPlace: Place = await this._placeRepository.save(place);

    if (!savedPlace) {
      throw new InternalServerErrorException('Problem to create a place');
    }

    return plainToClass(ReadPlaceDto, savedPlace);
  }

  async updatePlace(id: number, place: UpdatePlaceDto): Promise<ReadPlaceDto> {
    const foundPlace: Place = await this._placeRepository.findOne(id);

    if (!foundPlace) {
      throw new NotFoundException('This place does not exist');
    }

    foundPlace.place = place.place;
    foundPlace.goal = place.goal;

    const updatedPlace: Place = await this._placeRepository.save(foundPlace);

    return plainToClass(ReadPlaceDto, updatedPlace);
  }

  async deletePlace(id: number): Promise<void> {
    const placeExists = await this._placeRepository.findOne(id);

    if (!placeExists) {
      throw new NotFoundException();
    }

    await this._placeRepository.delete(id);
  }
}
