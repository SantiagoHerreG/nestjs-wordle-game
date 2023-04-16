import { Module, Global, Logger } from '@nestjs/common';
import { WordService } from './word.service';

@Global()
@Module({
  providers: [WordService, Logger],
  exports: [WordService],
})
export class WordModule {}
