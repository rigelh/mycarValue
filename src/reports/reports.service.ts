import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './reports.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
constructor(@InjectRepository(Report) private repo: Repository<Report>){}


create(reportDto : CreateReportDto, user: User){
const report = this.repo.create(reportDto);
report.user= user; // i ben save brenda reportit 
return this.repo.save(report);
}

async changeApproval(id: string, approved: boolean){
  const report = await this.repo.findOne({ where: { id: parseInt(id) } })
  if (!report){
    throw new NotFoundException('report not found');
  }
  report.approved = approved;
  return this.repo.save(report);
  }


  // query buider method
  createEstimate( { make,model, year, lat, lng, mileage }: GetEstimateDto){
     // destrukturizimi duhet bere ne parameter te metodes

    return this.repo.createQueryBuilder()
    .select('AVG(price)', 'price') // avg e cmimit
    .where('make = :make', { make }) 
    .andWhere('model = :model', {model}) // modli duhet te jete e = me modelin ne url
    .andWhere('lng - :lng BETWEEN -5 AND 5', {lng}) 
    .andWhere('lat - :lat BETWEEN -5 AND 5', {lat}) 
    .andWhere('year - :year BETWEEN -3 AND 3' , {year})
    .andWhere('APPROVED IS TRUE' ) // per boolean values ska nevoj per desktrurizim
    .orderBy('ABS(mileage - :mileage)', 'DESC') // orderby si metod nuk ofron parameter te dyte
    .setParameters({ mileage }) // prandaj e paraqesim me kete parameter
    .limit(3) // duam only 3 reports
    .getRawOne() // sepse duam vetem nje result avg price
  }


}
