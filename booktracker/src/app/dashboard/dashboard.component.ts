import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { Book } from "app/models/book";
import { Reader } from "app/models/reader";
import { DataService } from 'app/core/data.service';
import { BookTrackerError } from 'app/models/bookTrackerError';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private dataService: DataService,
              private title: Title,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let resolvedData: Book[] | BookTrackerError = this.route.snapshot.data['resolvedBooks'];
    if (resolvedData instanceof BookTrackerError){
      console.log(`Dashboard component error : ${resolvedData.friendlyMessage}`);
    } else {
      this.allBooks = resolvedData;
    }

    // this.dataService.getAllBooks()
    // .subscribe(
    //   (data: Book[]) => this.allBooks = data,
    //   (err: BookTrackerError) => console.log(err.friendlyMessage),
    //   () => console.log('All done getting books')
    // );
    this.dataService.getAllReaders().subscribe(
      (data:Reader[]) => this.allReaders = data,
      (err: BookTrackerError) => console.log(err.friendlyMessage)
    );
    this.mostPopularBook = this.dataService.mostPopularBook;

    // this.dataService.getAuthorRecommendation(1).then(
    //   (author: string) => console.log(author),
    //   (err: string) => console.log(`The promise was rejected: ${err}`)
    // ).catch((error: Error) => console.log(error.message));

    this.getAuthorRecommendationAsync(1);

    this.title.setTitle(`Book Tracker`);
  }

  private async getAuthorRecommendationAsync(readerID: number): Promise<void> {
    try{
      let author: string = await this.dataService.getAuthorRecommendation(readerID);
      console.log(author);
    }
    catch (error) {
      console.log(error);
    }
  }

  deleteBook(bookID: number): void {
    this.dataService.deleteBook(bookID)
    .subscribe(
      (data: void) => {
        let index: number = this.allBooks.findIndex(book => book.bookID === bookID);
        this.allBooks.splice(index, 1);
      },
      (err:any) => console.log(err)
    );
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
