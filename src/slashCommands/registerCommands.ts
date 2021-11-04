//@index(['../commands/**/*.ts(x)?','!**/*.*.*'], f => `import { ${f.name} } from '${f.path}';`)
import { bill } from '../commands/bill';
import { greet } from '../commands/greet';
import { jobs } from '../commands/jobs';
import { puppy } from '../commands/puppy';
import { roles } from '../commands/roles';
//@endindex

interface ICommands {
  [key: string]: any;
}

export const commands = () => {
  return {
    //@index(['../commands/**/*.ts(x)?','!**/*.*.*'], f => `"${f.name}": ${f.name}(),`)
    bill: bill(),
    greet: greet(),
    jobs: jobs(),
    puppy: puppy(),
    roles: roles(),
    //@endindex
  } as ICommands;
};
