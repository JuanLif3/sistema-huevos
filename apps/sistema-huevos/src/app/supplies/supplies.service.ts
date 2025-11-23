import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supply } from './entities/supply.entity';
import { CreateSupplyDto } from './dto/create-supply.dto';

@Injectable()
export class SuppliesService {
    constructor(
        @InjectRepository(Supply)
        private readonly supplyRepository: Repository<Supply>,
    ) {}

    // Registar una compra
    async create(createSupplyDto: CreateSupplyDto) {
        const supply = this.supplyRepository.create(createSupplyDto);
        return this.supplyRepository.save(supply);
    }

    // Ver historial de compras (ordenado por fechas)
    async findAll() {
        return this.supplyRepository.find({
            order: { purchaseDate: 'DESC' },
        });
    }

    // Borrar un registro (por si se equivocaron)
    async remove(id: string) {
        const result = await this.supplyRepository.delete(id);
        if (result.affected === 0) {
            throw new NotAcceptableException(`Registro de compra ${id} no encontrado`);
        }
    }
}
