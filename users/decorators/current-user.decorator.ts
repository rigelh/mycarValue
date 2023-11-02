import { createParamDecorator, ExecutionContext} from '@nestjs/common';



export const CurrentUser = createParamDecorator(
  (data: any, contect: ExecutionContext)=> {

return 'hi there!';

  }
)