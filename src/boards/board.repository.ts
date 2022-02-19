import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDTO } from './dto/create-board.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDTO): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: 'PUBLIC',
    });

    await this.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const board = await this.findOne(id);
    if (!board) {
      throw new NotFoundException(`cannot find id with ${id}`);
    }
    return board;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  async updateBoardStatus(board: Board): Promise<void> {
    await this.save(board);
  }

  async getAllBoards(): Promise<Board[]> {
    return this.find();
  }
}
