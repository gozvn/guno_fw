import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {

    transform(value: number): string {
        if (!value) {
            return '00 giờ 00 phút';
        }

        const hours = Math.floor(value / 3600);
        const minutes = Math.floor((value % 3600) / 60);
        const seconds = value % 60;

        // Add leading zeros
        const hoursString = hours < 10 ? '0' + hours : hours;
        const minutesString = minutes < 10 ? '0' + minutes : minutes;
        const secondsString = seconds < 10 ? '0' + seconds : seconds;

        return `${hoursString} giờ ${minutesString} phút`;
    }
}
