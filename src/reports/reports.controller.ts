import { Controller, Post, Body, Patch, Get, UseGuards, Param} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guards';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Seriliaze } from 'src/interceptors/seriliaze.interceptors';
import { UserDto } from 'src/users/dtos/user.dto';
import { ReportDto } from './dtos/report.dto';
import { ApprovedReportDto } from './dtos/approve-report.dto';



@Seriliaze(ReportDto)
@Controller('reports')
export class ReportsController {
constructor (private reportsService: ReportsService){}


  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User){ 
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  approveReport(@Param('id') id : string, @Body() body: ApprovedReportDto ){
    console.log(id);
 return this.reportsService.changeApproval(id, body.approved)
  }
}
