import { Command, flags } from '@oclif/command';
import axios from 'axios';
import chalk from 'chalk';
const Table = require('cli-table3');
import inquirer from 'inquirer'
import { Auth } from '../auth';
import { substringCustom } from '../utils/string.helper';

const { API_PATH } = require('../../config.js');

export default class Lessons extends Command {
  static description = 'Отображение доступных лекций в курсе';
  static args = [
    {
      name: 'courseId',
      require: true
    }
  ];

  async run() {
    const { args } = this.parse(Lessons);
    const token: string = await Auth.token();
    if (!token) {
      this.log(`${chalk.red('[FAILED]')} You not yet authorized. Use login command`);
      return;
    }

    const courses = (await axios.get(`${API_PATH}/courses`, { headers: { 'set-cookie': token } })).data.data.courses;
    const coursesTitlesMap = courses.map((course: { title: string }) => course.title);

    const courseTitle: any = await inquirer.prompt([
      {
        name: 'title',
        message: 'Выберите курс для отображения лекций',
        type: 'list',
        choices: coursesTitlesMap,
      },
    ]);

    const courseChange = courses.find((course: { title: string }) => course.title === courseTitle.title);

    const response = await axios.get(`${API_PATH}/courses/${courseChange.id}/lessons`, { headers: { 'set-cookie': token } });
    const table = new Table({
      head: [
        chalk.blueBright('id'),
        chalk.blueBright('Title'),
        chalk.blueBright('Course'),
        chalk.blueBright('Video'),
        chalk.blueBright('Comments'),
        chalk.blueBright('Resources'),
        chalk.blueBright('CreatedAt'),
      ],
      colWidths: [27, 70, 27, 23, 13, 13, 27],
      style: {
        'padding-left': 1,
        'padding-right': 1,
        compact: false
      }
    });
    const lessons = response.data.data;

    if (lessons.length > 0) {
      for (const lesson of lessons) {
        const id = chalk.green(lesson.id);
        const title = chalk.black(substringCustom(lesson.title, 70));
        const course = chalk.yellow(courseChange.title);
        const video = chalk.red(substringCustom(lesson.video, 27));
        const createdAt = chalk.black(lesson.createdAt);
        const comments = chalk.gray(lesson.comments.length);
        const resources = chalk.grey(lesson.resources.length);
        table.push([id, title, course, video, comments, resources, createdAt]);
      }
    }
    this.log(table.toString());
  }
}
