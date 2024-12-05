import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import moment from 'moment';

@Pipe({
  name: 'elapsedTime',
  standalone: true
})
export class ElapsedTimePipe implements PipeTransform {

  transform(value: Timestamp | Date | string | { seconds: number; nanoseconds: number }, ...args: unknown[]): string {
    let date: Date;

    if (value instanceof Timestamp) {
      date = value.toDate();
    } else if (value instanceof Date) {
      date = value;
    } else if (typeof value === 'string') {
      date = new Date(value);
    } else if (typeof value === 'object' && 'seconds' in value && 'nanoseconds' in value) {
      date = new Date(value.seconds * 1000 + value.nanoseconds / 1000000);
    } else {
      return '';
    }

    return moment(date).fromNow();
  }

}
