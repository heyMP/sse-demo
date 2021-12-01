import { Controller, Get, Sse, MessageEvent } from '@nestjs/common';
import { AppService } from './app.service';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((_) => ({ data: new Date().toString() } as MessageEvent)),
    );
  }
}
