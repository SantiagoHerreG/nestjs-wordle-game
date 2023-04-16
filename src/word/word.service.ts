import { Injectable, Global, Logger } from '@nestjs/common';
import { createReadStream } from 'fs';
import { DATA_FILE_PATH } from 'src/constants';

@Global()
@Injectable()
export class WordService {
  private globalValue: any;
  private setOfWords: Set<string> = new Set();

  constructor(private readonly logger: Logger) {}

  setWordValue(value: any) {
    this.globalValue = value;
    this.logger.log(value, 'was succesfully selected');
  }

  getWordValue(): any {
    return this.globalValue;
  }

  addWordToSet(word: string) {
    this.setOfWords.add(word);
  }

  selectRandomWord(): string {
    return Array.from(this.setOfWords)[
      Math.floor(Math.random() * this.setOfWords.size)
    ];
  }

  handleSelectionOfWord() {
    if (this.setOfWords.size === 0) {
      this.logger.log('No words left');
      return;
    }
    const randomWord = this.selectRandomWord();
    this.setWordValue(randomWord);
    this.setOfWords.delete(randomWord);
  }

  async getAllWordsWithFiveLetters() {
    const readStream = createReadStream(DATA_FILE_PATH);
    readStream.on('data', (chunk) => {
      chunk
        .toString()
        .split('\n')
        .forEach((word) => word.length === 5 && this.addWordToSet(word));
    });
    readStream.on('end', () => {
      this.logger.log(this.setOfWords.size, 'words were succesfully loaded');
      this.handleSelectionOfWord();
    });
  }
}
