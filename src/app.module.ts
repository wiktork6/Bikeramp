import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [TripsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
