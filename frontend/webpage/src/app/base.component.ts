import {LocalizationService} from './services/localization.service';

export class BaseComponent {
  constructor(
    private localizationServiceBase: LocalizationService
  ) {
  }

  localize(key: string): Promise<string> {
    return this.localizationServiceBase.getLocalizedStringFromServer(key);
  }
}
