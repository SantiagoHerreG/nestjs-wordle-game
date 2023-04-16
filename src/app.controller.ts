import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTopScores(@Res() response: Response): Response {
    return response.status(200).send('Server running');
  }
}
