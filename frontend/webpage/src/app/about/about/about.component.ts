import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {HtmlService} from '../../services/html.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  aboutText: SafeHtml | undefined;

  constructor(
    private htmlService: HtmlService,
    private sanitized: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.htmlService.getHtml('about').then(value => this.aboutText = this.sanitized.bypassSecurityTrustHtml(value));
  }
}
