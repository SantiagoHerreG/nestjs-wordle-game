import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AttemptResponse } from 'src/types';
import { Attempts } from './entities/attempts.model';
import { WordService } from 'src/word/word.service';
import { Wins } from './entities/wins.model';

@Injectable()
export class AttemptsService {
  constructor(
    @InjectModel(Attempts)
    private attempts: typeof Attempts,
    @InjectModel(Wins)
    private wins: typeof Wins,
    @Inject(WordService)
    private readonly wordService: WordService,
  ) {}

  async handleAttempt(
    userId: number,
    wordInput: string,
  ): Promise<AttemptResponse> {
    const attemptsOfUser = await this.attempts.findOne({
      where: {
        id: userId,
      },
    });

    const currentAttempt = attemptsOfUser?.currentAttempt
      ? attemptsOfUser.currentAttempt + 1
      : 1;

    if (attemptsOfUser) {
      await this.attempts.update(
        { currentAttempt },
        {
          where: {
            userId,
          },
        },
      );
    } else {
      await this.attempts.create({
        currentAttempt,
        userId,
      });
    }

    if (currentAttempt > 5) {
      return [];
    }

    if (wordInput === this.wordService.getWordValue()) {
      await this.wins.create({
        userId,
        word: wordInput,
      });
    }

    return this.handleWordComparison(wordInput);
  }

  handleWordComparison(wordInput: string): AttemptResponse {
    const activeWord = this.wordService.getWordValue();
    const responseList = [];

    for (let i = 0; i < 5; i++) {
      if (wordInput[i] === activeWord[i]) {
        responseList.push({
          letter: wordInput[i],
          value: 1,
        });
      } else if (activeWord.includes(wordInput[i])) {
        responseList.push({
          letter: wordInput[i],
          value: 2,
        });
      } else {
        responseList.push({
          letter: wordInput[i],
          value: 3,
        });
      }
    }

    return responseList;
  }

  async addAttemptToUser(): Promise<void> {
    // return await this.userModel.create({
    //   ...user,
    // });
  }

  async cleanAllAttempts(): Promise<void> {
    // const res = await this.userModel.findAll();
    // console.log(res);
    // return res;
  }
}
