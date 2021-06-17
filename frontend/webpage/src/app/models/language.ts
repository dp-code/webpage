export class Language {
  name: string;
  icon: string;
  title: string;
  text: string;
  filter: string[];

  constructor(name: string, icon: string, title: string, text: string, filter: string[]) {
    this.name = name;
    this.icon = icon;
    this.title = title;
    this.text = text;
    this.filter = filter;
  }
}
