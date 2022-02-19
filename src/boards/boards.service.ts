import { Injectable } from '@nestjs/common';
import { CreateBoardDTO } from './dto/create-board.dto';
import type { BoardStatus } from './board-status';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  createBoard(createBoardDto: CreateBoardDTO): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  deleteBoard(id: number): Promise<void> {
    return this.boardRepository.deleteBoard(id);
  }

  async updateBoard(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    this.boardRepository.updateBoardStatus(board);

    return board;
  }

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getAllBoards();
  }
}
