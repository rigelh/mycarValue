import {rm} from 'fs/promises'
import { join } from 'path';

global.beforeEach(async () => { 
  try{
    await rm(join(__dirname, '..', 'test.sqlite'))
  }
  catch(err){ }
});
// file qe ne menyre automatike ben qe typeorm te fshije database e testit sa here i bejm run nje testi e2e