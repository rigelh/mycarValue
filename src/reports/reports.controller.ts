import { Controller, Post, Body, Patch, Get, UseGuards, Param,Query} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guards';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Seriliaze } from 'src/interceptors/seriliaze.interceptors';
import { UserDto } from 'src/users/dtos/user.dto';
import { ReportDto } from './dtos/report.dto';
import { ApprovedReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

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
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id : string, @Body() body: ApprovedReportDto ){
 return this.reportsService.changeApproval(id, body.approved)
  }


  // get handle taht gets the data from query
  @Get()
  getEstimate(@Query() query: GetEstimateDto){
  return this.reportsService.createEstimate(query);
  }

}
