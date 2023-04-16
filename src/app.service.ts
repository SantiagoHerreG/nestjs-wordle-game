import { Inject, Injectable, Logger } from '@nestjs/common';
import { WordService } from './word/word.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(
    @Inject(WordService) private readonly wordService: WordService,
    private readonly logger: Logger,
  ) {}

  handleAppStartedEvent() {
    this.logger.log('Start game event fired');
    this.wordService.getAllWordsWithFiveLetters();
  }

  @Cron('0,5,10,15,20,25,30,35,40,45,50,55 * * * *')
  handleWordSelectionEvery5min() {
    this.logger.log('Word selection event fired');
    this.wordService.handleSelectionOfWord();
  }
}
