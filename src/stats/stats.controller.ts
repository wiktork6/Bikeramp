import { Controller, Get } from "@nestjs/common";
import { StatsService } from "./stats.service"; 

@Controller('stats')
export class StatsController {

    constructor(
        private readonly statsService: StatsService) {
    }


    @Get('weekly')
    getWeeklyStats(){
        return this.statsService.getWeeklyStats();
    }

    @Get('monthly')
    getMonthlyStats(){
        return this.statsService.getMonthlyStats();
    }
}