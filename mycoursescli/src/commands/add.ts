import { Command, flags } from '@oclif/command';
import axios from 'axios';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { Auth } from '../auth';
import { parserComments, parserResources, Resource } from '../utils/parsers.helper';

inquirer.registerPrompt('datepicker', require('inquirer-datepicker'));
const { API_PATH } = require('../../config.js');

const params = {
  maxLengthTitle: 100
}

export default class Add extends Command {
  static description = 'Добавить курс или лекцию в базу данных';
  static strict = true;

  static args = [
    {
      name: 'entity',
      required: true,
      description: 'Тип добавленного объекта',
      options: ['course', 'lesson']
    }
  ]

  private async addCourse({ title, description, author }: any) {
    try {
      const token: string = await Auth.token();
      const response = await axios.post(`${API_PATH}/courses`, { title, description, author }, { headers: { 'set-cookie': token } })
      this.log(`${chalk.green('[SUCCESS]')} Добавлен курс с ID: ${response.data.data.id}`);
    } catch (err) {
      if (err instanceof Error) {
        this.log(`${chalk.red('[ERROR]')} ${err.message}`);
      }
    }
  }
  private async addLesson({ title, description, video, resources, comments, courseId }: any) {
    try {
      const token: string = await Auth.token();
      const response = await axios.post(`${API_PATH}/courses/${courseId}/lessons`, { title, description, video, resources, comments, course: courseId, courseId }, { headers: { 'set-cookie': token } });
      this.log(`${chalk.green('[SUCCESS]')} Добавлена лекция: ${response.data.data.id}`);
    } catch (err) {
      if (err instanceof Error) {
        this.log(`${chalk.red('[ERROR]')} ${err.message}`);
      }
    }
  }

  async run() {
    const { args } = this.parse(Add);
    const token: string = await Auth.token();
    if (!token) {
      this.log(`${chalk.red('[FAILED]')} You not yet authorized. Use login command`)
      return;
    }

    const courses = (await axios.get(`${API_PATH}/courses`, { headers: { 'set-cookie': token } })).data.data.courses;
    const coursesTitlesMap = courses.map((course: { title: string }) => course.title);
    const coursesAuthorsMap = courses.map((course: { author: string }) => course.author);

    if (args.entity === 'course') {
      const courseParams: any = await inquirer.prompt([
        {
          name: 'title',
          type: "input",
          message: `Название курса (максимум ${params.maxLengthTitle} символов):`,
          validate: (input: string, answer: any) => {
            if (input.length > params.maxLengthTitle) {
              this.log(`\nДлина названия больше ${params.maxLengthTitle} символов`);
              return;
            }
            if (!coursesTitlesMap.includes(input)) return !!answer;
            this.log("\nКурс с таким названием уже существует");
            return;
          }
        },
        {
          name: 'description',
          message: 'Описание курса:',
          type: 'input',
          validate: (answer: any) => !!answer
        },
        {
          name: 'author',
          message: 'Автор ID:',
          type: 'list',
          choices: coursesAuthorsMap,
          validate: (answer: any) => !!answer
        },
        {
          name: 'confirm',
          message: 'Сохранить изменения?',
          type: 'confirm'
        },
      ]);
      await this.addCourse(courseParams);
    };

    if (args.entity === 'lesson') {

      const courseTitle: any = await inquirer.prompt([
        {
          name: 'title',
          message: 'Выберите курс в который нужно добавить лекцию',
          type: 'list',
          choices: coursesTitlesMap,
        },
      ]);

      const course = courses.find((course: { title: string }) => course.title === courseTitle.title);
      const lessons = (await axios.get(`${API_PATH}/courses/${course.id}/lessons`, { headers: { 'set-cookie': token } })).data.data.lessons;

      const lessonParams: any = await inquirer.prompt([
        {
          name: 'title',
          type: "input",
          message: 'Название лекции (максимум 100 символов):',
          validate: async (input: string, answer: any) => {
            if (input.length > params.maxLengthTitle) {
              this.log(`\nДлина названия больше ${params.maxLengthTitle} символов`);
              return;
            }
            const lessonsId = lessons.find((lesson: { title: string }) => lesson.title === input).id;
            if (lessonsId) {
              this.log("\nТакая лекция уже есть в данном курсе");
              return;
            }
            return !!answer;
          }
        },
        {
          name: 'description',
          message: 'Описание лекции:',
          type: 'input',
          validate: (answer: any) => !!answer
        },
        {
          name: 'video',
          type: "input",
          message: 'Ссылка на видео к лекции:',
          validate: (answer: any) => !!answer
        },

        {
          name: 'comments',
          message: 'Введите список комментариев в формате title%%text%%date%%title%%...:',
          type: 'input',
          validate: (answer: any) => !!answer
        },
        {
          name: 'resources',
          message: 'Введите список ресурсов в формате title%%link%%tile%%...:',
          type: 'input',
          validate: (answer: any) => !!answer
        },
        {
          name: 'confirm',
          message: 'Сохранить изменения?',
          type: 'confirm'
        },
      ])
      lessonParams.comments =  parserComments(lessonParams.comments);
      lessonParams.resources = parserResources(lessonParams.resources);
      await this.addLesson(lessonParams);
    };
  }
}
