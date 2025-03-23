import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor (private readonly prisma: PrismaClient) {}
  async create(createUserDto: CreateUserDto) {
    let user=await this.prisma.user.findUnique({
      where:{
        email: createUserDto.email,
      },
    });

    if (user){
      throw new BadRequestException('This email is already registered');
    }

    user = await this.prisma.user.findUnique({
      where:{
        mobile:createUserDto.mobile,
      },
    });

    if (user){
      throw new BadRequestException('This mobile is already registered');
    }
    createUserDto.password = await hash(createUserDto.password,10);
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
   let user: User | null;
   await this.findOne(id);

   if (updateUserDto.email) {
    user =await
   }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
