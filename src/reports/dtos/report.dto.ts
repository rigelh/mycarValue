import { Expose, Transform } from "class-transformer";
import { User } from "src/users/user.entity";
export class ReportDto {

  @Expose()
  id:number;

  @Expose()
  make:string;

  @Expose()
  model:string;

  @Expose()
  year:number;

  @Expose()
  mileage: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  price: number;

  @Expose()
  approved: boolean;

  @Transform(({obj})=> obj.user?.id) // from another entity transforms it into a obj and then with the parameters you take the id of that user
  @Expose()
  userId:  number;


}