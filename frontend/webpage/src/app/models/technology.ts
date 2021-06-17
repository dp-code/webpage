export class Technology {
  icon: string;
  technology: string;
  experience: number;
  lastUsed: number;
  confidence: number;
  language: string;

  constructor(icon: string, technology: string, experience: number, lastUsed: number, confidence: number, language: string) {
    this.icon = icon;
    this.technology = technology;
    this.experience = experience;
    this.lastUsed = lastUsed;
    this.confidence = confidence;
    this.language = language;
  }
}
