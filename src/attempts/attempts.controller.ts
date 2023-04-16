import { Controller, Logger, Param, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { AttemptResponse } from 'src/types';
import { AttemptsService } from './attempts.service';

@Controller('attempt')
export class AttemptsController {
  constructor(
    private readonly attemptsService: AttemptsService,
    private readonly logger: Logger,
  ) {}

  @Post(':id')
  async handleUserAttempt(
    @Param('id') id: number,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response<AttemptResponse>> {
    console.log(request.body);

    const attempt = await this.attemptsService.handleAttempt(
      +id,
      request.body.user_word,
    );
    return response.status(200).json(attempt);
  }
}
