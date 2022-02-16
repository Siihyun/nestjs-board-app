import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './board.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateBoardDTO } from './dto/create-board.dto';
import type { BoardStatus } from './board.model';
@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard({ title, description }: CreateBoardDTO) {
    const board: Board = {
      id: uuidv4(),
      title,
      description,
      status: 'PUBLIC',
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    const board = this.boards.find((board) => board.id === id);
    if (!board) throw new NotFoundException(`cannot find Board with id: ${id}`);

    return board;
  }

  deleteBoard(id: string): void {
    const toBeDeleted = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== toBeDeleted.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
