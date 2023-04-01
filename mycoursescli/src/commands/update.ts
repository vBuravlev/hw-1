import { Command, flags } from '@oclif/command'
import axios from 'axios'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { Auth } from '../auth'
import { parserComments, parserResources } from '../utils/parsers.helper'

const { API_PATH } = require('../../config.js');

export default class Update extends Command {
  static description = 'Update entity (course, stream or user)'
  static strict = true
  static args = [
    {
      name: 'entity',
      required: true,
      description: 'Тип обновленного объекта',
      options: ['course', 'lesson']
    },
  ]

  private async updateCourse({ _id, title, description, author }: any) {
    try {
      const token: string = await Auth.token();
      const response = await axios.patch(`${API_PATH}/courses/${_id}`, { title, description, author }, { headers: { 'set-cookie': token } })
      this.log(`${chalk.green('[SUCCESS]')} Course updated`);
    } catch (err) {
      if (err instanceof Error) {
        this.log(`${chalk.red('[ERROR]')} ${err.message}`)
      }
    }
  }
  private async updateLesson(params: any) {
    try {
      const token: string = await Auth.token();
      const { lessonId, title, description, courseId, video, comments, resources } = params;
      const response = await axios.patch(`${API_PATH}/courses/${courseId}/lessons/${lessonId}`, { title, description, video, comments, resources }, { headers: { 'set-cookie': token } })
      this.log(`${chalk.green('[SUCCESS]')} Course updated`)
    } catch (err) {
      if (err instanceof Error) {
        this.log(`${chalk.red('[ERROR]')} ${err.message}`)
      }
    }
  }
  async run() {
    const { args } = this.parse(Update);
    const token: string = await Auth.token();
    if (!token) {
      this.log(`${chalk.red('[FAILED]')} You not yet authorized. Use login command`)
      return;
    }

    const courses = (await axios.get(`${API_PATH}/courses`, { headers: { 'set-cookie': token } })).data.data.courses;
    const coursesTitlesMap = courses.map((course: { title: string }) => course.title);
    const coursesAuthorsMap = courses.map((course: { author: string }) => course.author);

    if (args.entity === 'course') {
      const courseTitle: any = await inquirer.prompt([
        {
          name: 'title',
          message: 'Выберите курс для редактирования',
          type: 'list',
          choices: coursesTitlesMap,
        },
      ]);

      const course = courses.find((course: { title: string }) => course.title === courseTitle.title);

      const courseParams: any = await inquirer.prompt([
        {
          name: 'title',
          message: 'Название курса:',
          validate: (input: string, answer: any) => {
            if (input.length === 0) {
              return !!answer;
            }
            return !!answer;
          }
        },
        {
          name: 'description',
          message: 'Описание курса:',
          type: 'input',
          validate: (input: string, answer: any) => {
            if (input.length === 0) {
              return !!answer;
            }
            return !!answer;
          }
        },
        {
          name: 'confirm',
          message: 'Сохранить изменения?',
          type: 'confirm'
        },
      ]);
      if (!courseParams.confirm) return;

      const courseAuthor: any = await inquirer.prompt([
        {
          name: 'author',
          message: `Автор курса (текущий автор ${course.author}):`,
          type: 'list',
          choices: coursesAuthorsMap,
        },
      ])
      const finalQuest: any = await inquirer.prompt([
        {
          name: 'confirm',
          message: 'Сохранить изменения?',
          type: 'confirm'
        },
      ]);
      if (!finalQuest.confirm) return;

      courseParams.author = courseAuthor.author;
      courseParams.title = courseParams.title.length === 0 ? course.title : courseParams.title;
      courseParams.description = courseParams.description.length === 0 ? course.description : courseParams.description;
      courseParams._id = course._id;
      await this.updateCourse(courseParams);
    }


    if (args.entity === 'lesson') {
      const courseParams: any = await inquirer.prompt([
        {
          name: 'title',
          message: 'Выберите курс в котором нужно обновить лекцию:',
          type: 'list',
          choices: coursesTitlesMap,
        },
      ]);

      const course = courses.find((course: { title: string }) => course.title === courseParams.title);
      const lessons = (await axios.get(`${API_PATH}/courses/${course.id}/lessons`, { headers: { 'set-cookie': token } })).data.data.lessons;;
      const lessonsTitlesMap = lessons.map((lesson: { title: string }) => lesson.title);

      const lessonParams: any = await inquirer.prompt([
        {
          name: 'title',
          message: 'Выберите лекцию для обновления',
          type: 'list',
          choices: lessonsTitlesMap,
          description: 'Выбрать ID курса для изменения',
        },
      ]);

      const lesson = lessons.find((lessons: { title: string }) => lessons.title === lessonParams.title);

      const lessonNewParams: any = await inquirer.prompt([
        {
          name: 'title',
          message: 'Новое название лекции:',
          validate: (input: string, answer: any) => {
            if (input.length === 0) {
              return !!answer;
            }
            return !!answer;
          }
        },
        {
          name: 'description',
          message: 'Описание лекции:',
          type: 'input',
          validate: (input: string, answer: any) => {
            if (input.length === 0) {
              return !!answer;
            }
            return !!answer;
          }
        },
        {
          name: 'video',
          message: 'video:',
          type: 'input',
          validate: (input: string, answer: any) => {
            if (input.length === 0) {
              return !!answer;
            }
            return !!answer;
          }
        },
        {
          name: 'comments',
          message: 'Введите список комментариев в формате title%%text%%date%%title%%...:',
          type: 'input',
          validate: (input: string, answer: any) => {
            if (input.length === 0) {
              return !!answer;
            }
            return !!answer;
          }
        },
        {
          name: 'resources',
          message: 'Введите список ресурсов в формате title%%link%%tile%%...:',
          type: 'input',
          validate: (input: string, answer: any) => {
            if (input.length === 0) {
              return !!answer;
            }
            return !!answer;
          }
        },
        {
          name: 'confirm',
          message: 'Сохранить изменения?',
          type: 'confirm'
        },
      ])


      lessonNewParams.lessonId = lesson.id
      lessonNewParams.courseId = course.id;
      lessonNewParams.title = lessonNewParams.title.length === 0 ? lesson.title : lessonNewParams.title;
      lessonNewParams.description = lessonNewParams.description.length === 0 ? lesson.description : lessonNewParams.description;
      lessonNewParams.video = lessonNewParams.video.length === 0 ? lesson.video : lessonNewParams.video;
      lessonNewParams.comments = parserComments(lessonNewParams.comments.length === 0 ? lesson.comments : lessonNewParams.comments);
      lessonNewParams.resources = parserResources(lessonNewParams.comments.length === 0 ? lesson.comments : lessonNewParams.comments);
      await this.updateLesson(lessonNewParams);
    }
  }
}
