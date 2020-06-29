import { exec } from 'child_process';
import { prompt } from 'inquirerer';
import templates from '@instaql/db-templates';
import { generate, makeAutocompleteFunctionWithInput } from '@instaql/db-utils';

const templatePath =
  require.resolve('@instaql/db-templates').split('main/index')[0] + 'templates';

const searchTemplates = makeAutocompleteFunctionWithInput(
  Object.keys(templates)
);

const templateQuestion = [
  {
    _: true,
    type: 'autocomplete',
    name: 'template',
    message: 'what do you want to create?',
    source: searchTemplates
  }
];

export const aliases = ['g'];

export default async (argv) => {
  var { template } = await prompt(templateQuestion, argv);

  const questions = templates[template].default;
  const answers = await prompt(questions, argv);

  const cmd = await generate({
    templates,
    template,
    templatePath,
    payload: answers
  });

  console.log(cmd);

  const sqitch = exec(cmd.trim());
  sqitch.stdout.pipe(process.stdout);
  sqitch.stderr.pipe(process.stderr);
};
