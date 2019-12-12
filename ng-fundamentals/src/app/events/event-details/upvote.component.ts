import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-upvote',
    styleUrls: ['./upvote.component.css'],
    templateUrl: './upvote.component.html'
})

export class UpVoteComponent {
    @Input() count: number;
    @Input() set voted(val) {
        this.iconColor = val ? 'red' : 'white';
    }
    @Output() vote = new EventEmitter();
    iconColor: string;

    onClick() {
        this.vote.emit({});
    }
}
