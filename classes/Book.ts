import { IBook } from '../interfaces/IBook';
import { IVolume } from '../interfaces/IVolume';

export class Book implements IBook {
  constructor(volume: IVolume) {
    this.author = volume.volumeInfo.authors[0];
    this.title = volume.volumeInfo.title;
    this.subtitle = volume.volumeInfo.subtitle;
    this.publisher = volume.volumeInfo.publisher!;
    this.description = volume.volumeInfo.description;
    this.thumbnail = volume.volumeInfo.imageLinks.thumbnail;
    this.link = volume.volumeInfo.infoLink;
    this.ISBN = {
      ISBN_10: volume.volumeInfo.industryIdentifiers.find(
        i => i.type === 'ISBN_10'
      )!.identifier,
      ISBN_13: volume.volumeInfo.industryIdentifiers.find(
        i => i.type === 'ISBN_13'
      )!.identifier
    };
  }
  author: string;
  title: string;
  subtitle?: string;
  publisher: string;
  description: string;
  thumbnail: string;
  link: string;
  ISBN: {
    ISBN_10: string;
    ISBN_13: string;
  };
}
