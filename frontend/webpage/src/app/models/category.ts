import {Technology} from './technology';

export class Category {
  name: keyof Technology;
  title: string;
  defaultDirection: string;

  constructor(name: keyof Technology, title: string, defaultDirection: string) {
    this.name = name;
    this.title = title;
    this.defaultDirection = defaultDirection;
  }
}
