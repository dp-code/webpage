import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent implements OnInit, OnDestroy {
  @Input() value = 0;
  width = this.getWidth(0);
  color = this.getColor(0);
  subscription: Subscription | undefined;

  constructor(private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    const delayedTimer = timer(250);
    this.subscription = delayedTimer.subscribe(ticks => this.onTimer(ticks));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onTimer(ticks: number): void {
    this.width = this.getWidth(this.value);
    this.color = this.getColor(this.value);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private getWidth(value: number): string {
    return value.toString() + '%';
  }

  private getColor(value: number): string {
    if (value >= 66) {
      return 'yellowgreen';
    } else if (value >= 33) {
      return 'gold';
    } else {
      return 'orange';
    }
  }
}
