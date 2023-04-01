import { Command, flags } from '@oclif/command'
import axios from 'axios'
import chalk from 'chalk'
const Table = require('cli-table')
import { Auth } from '../auth'

const { API_PATH } = require('../../config.js');

export default class Courses extends Command {
  static description = 'Отображение доступных курсов'
  static args = [];

  async run() {
    const { args } = this.parse(Courses);
    const token: string = await Auth.token()
    if (!token) {
      this.log(`${chalk.red('[FAILED]')} You not yet authorized. Use login command`)
      return
    }
    const response = await axios.get(`${API_PATH}/courses`, { headers: { 'set-cookie': token } });

    const table = new Table({
      head: [
        chalk.blueBright('id'),
        chalk.blueBright('Title'),
        chalk.blueBright('Description'),
        chalk.blueBright('Author'),
        chalk.blueBright('CreatedAt'),
      ]
    })
    const courses = response.data.data.courses;

    if (courses.length > 0) {
      for (const course of courses) {
        const id = chalk.green(course.id);
        const author = chalk.red(course.author);
        const title = chalk.black(course.title);
        const createdAt = chalk.black(course.createdAt);
        const MAX_LENGTH_DESC = 60;
        const description = chalk.gray(`${course.description.substring(0, MAX_LENGTH_DESC)} ...`);
        table.push([id, title, description, author, createdAt]);
      }
    }

    this.log(table.toString());
  }
}
