import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'
import axios, { AxiosError, RawAxiosResponseHeaders } from 'axios'
import chalk from 'chalk'
import { Auth } from '../auth'

const { API_PATH } = require('../../config.js');

export default class Login extends Command {
  static description = 'Авторизация';
  static args = [{ name: 'name' }];

  async run() {
    let email: string;
    let password: string;
    try {
      const { args } = this.parse(Login);
      email = args.name;
      if (!email) email = await cli.prompt('Email');
      password = await cli.prompt('Password', { type: 'hide' });
      const response = await axios.post(`${API_PATH}/auth/login`, { email, password });
      const cookie: string[] | any = response.headers['set-cookie'];
      await Auth.login(cookie);
      this.log(`${chalk.green('[SUCCESS]')} You are logged in`);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          this.log(`${chalk.red('[FAILED]')} Invalid name or password`)
        } else {
          this.log(`${chalk.red('[ERROR]')} ${err.message}`)
        }
      };
      if (err instanceof Error) {
        this.log(`${chalk.red('[ERROR]')} ${err.message}`);
      };
    }
  }
}
