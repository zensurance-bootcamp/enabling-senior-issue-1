import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

interface DBSettings {
  host: string;
  port: number;
  user: string;
  password?: string; // Password might be optional
}

interface AppSettings {
  database: DBSettings;
}

@Injectable()
export class AppService {
  getHello(): string {
    try {
      const yamlContent = fs.readFileSync('settings.yml', 'utf8');
      const settings: AppSettings = yaml.load(yamlContent) as AppSettings;

      return `Database Host: ${settings.database.host}`;
    } catch (e) {
      console.error('Error reading or parsing YAML:', e);
      throw new Error('Failed to read or parse settings.yml');
    }
  }
}
