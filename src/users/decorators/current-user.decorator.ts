import { createParamDecorator, ExecutionContext} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext)=> {
    // we found the session object and extracted the userid
const request = context.switchToHttp().getRequest();
return request.currentUser;
  }
)