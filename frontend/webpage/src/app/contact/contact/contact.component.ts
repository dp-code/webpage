import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ContactService} from '../../services/contact.service';
import {LocalizationService} from '../../services/localization.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {BaseComponent} from '../../base.component';
import {Subscription, timer} from 'rxjs';
import {HtmlService} from '../../services/html.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild('ckEditor') ckEditor: any;
  public config = {
    language: 'de'
  };
  editor = ClassicEditor;
  subscription: Subscription | undefined;
  privacyPolicy = false;
  alertPrivacyPolicy = false;
  alertMessageSuccess = false;
  alertMessageFailure = false;
  alertMessageEmpty = false;
  showPrivacyPolicy = false;

  contactLabelHeadline: string | undefined;
  contactLabelText: string | undefined;
  contactLabelImprint: string | undefined;
  contactLabelAccept: string | undefined;
  contactLabelPrivacy: string | undefined;
  contactButtonSend: string | undefined;
  contactAlertPrivacy: string | undefined;
  contactAlertSuccess: string | undefined;
  contactAlertFailure: string | undefined;
  contactAlertEmpty: string | undefined;
  contactPrivacyText: SafeHtml | undefined;
  contactButtonPrivacy: string | undefined;

  constructor(
    public localizationService: LocalizationService,
    private contactService: ContactService,
    private htmlService: HtmlService,
    private sanitized: DomSanitizer
  ) {
    super(localizationService);
  }

  ngOnInit(): void {
    this.localize('contact-label-headline').then(value => this.contactLabelHeadline = value);
    this.localize('contact-label-text').then(value => this.contactLabelText = value);
    this.localize('contact-label-imprint').then(value => this.contactLabelImprint = value);
    this.localize('contact-label-accept').then(value => this.contactLabelAccept = value);
    this.localize('contact-label-privacy').then(value => this.contactLabelPrivacy = value);
    this.localize('contact-button-send').then(value => this.contactButtonSend = value);
    this.localize('contact-alert-privacy').then(value => this.contactAlertPrivacy = value);
    this.localize('contact-alert-success').then(value => this.contactAlertSuccess = value);
    this.localize('contact-alert-failure').then(value => this.contactAlertFailure = value);
    this.localize('contact-alert-empty').then(value => this.contactAlertEmpty = value);
    this.htmlService.getHtml('privacy').then(value => this.contactPrivacyText = this.sanitized.bypassSecurityTrustHtml(value));
    this.localize('contact-button-privacy').then(value => this.contactButtonPrivacy = value);
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  onSend(): void {
    if (this.privacyPolicy === false) {
      this.showPrivacyMessage();
    } else if (this.getEditorContent() === '') {
      this.showEmptyMessage();
    } else {
      this.contactService.sendMessage(this.getEditorContent()).then(result => {
        this.setEditorContent('');
        if (result.success) {
          this.showSuccessMessage();
        } else {
          this.showFailureMessage();
        }
      });
    }
  }

  onPrivacyShow(): void {
    this.showPrivacyPolicy = true;
    this.alertPrivacyPolicy = false;
    this.alertMessageSuccess = false;
    this.alertMessageFailure = false;
    this.alertMessageEmpty = false;
    this.unsubscribe();
  }

  onPrivacyAccept(): void {
    this.showPrivacyPolicy = false;
    this.privacyPolicy = true;
  }

  private showPrivacyMessage(): void {
    this.alertPrivacyPolicy = true;
    this.alertMessageSuccess = false;
    this.alertMessageFailure = false;
    this.alertMessageEmpty = false;
    this.unsubscribe();
    const delayedTimer = timer(3000);
    this.subscription = delayedTimer.subscribe(ticks => this.onTimer(ticks));
  }

  private showSuccessMessage(): void {
    this.alertPrivacyPolicy = false;
    this.alertMessageSuccess = true;
    this.alertMessageFailure = false;
    this.alertMessageEmpty = false;
    this.unsubscribe();
    const delayedTimer = timer(3000);
    this.subscription = delayedTimer.subscribe(ticks => this.onTimer(ticks));
  }

  private showFailureMessage(): void {
    this.alertPrivacyPolicy = false;
    this.alertMessageSuccess = false;
    this.alertMessageFailure = true;
    this.alertMessageEmpty = false;
    this.unsubscribe();
    const delayedTimer = timer(3000);
    this.subscription = delayedTimer.subscribe(ticks => this.onTimer(ticks));
  }

  private showEmptyMessage(): void {
    this.alertPrivacyPolicy = false;
    this.alertMessageSuccess = false;
    this.alertMessageFailure = false;
    this.alertMessageEmpty = true;
    this.unsubscribe();
    const delayedTimer = timer(3000);
    this.subscription = delayedTimer.subscribe(ticks => this.onTimer(ticks));
  }

  private getEditorContent(): string {
    if (this.ckEditor && this.ckEditor.editorInstance) {
      return this.ckEditor.editorInstance.getData();
    } else {
      return '';
    }
  }

  private setEditorContent(data: string): void {
    if (this.ckEditor && this.ckEditor.editorInstance) {
      this.ckEditor.editorInstance.setData(data);
    }
  }

  private onTimer(ticks: number): void {
    this.alertPrivacyPolicy = false;
    this.alertMessageSuccess = false;
    this.alertMessageFailure = false;
    this.alertMessageEmpty = false;
    this.unsubscribe();
  }

  private unsubscribe(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
