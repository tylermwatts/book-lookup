import { IndustryIdentifier, Volume } from '../api';
import { IBook } from '../interfaces/IBook';

export function bookFormatter(volume: Volume): IBook {
  return {
    author: volume.volumeInfo.authors[0],
    title: volume.volumeInfo.title,
    subtitle: volume.volumeInfo.subtitle,
    publisher: volume.volumeInfo.publisher,
    description: volume.volumeInfo.description,
    thumbnail: volume.volumeInfo.imageLinks
      ? volume.volumeInfo.imageLinks.thumbnail
      : undefined,
    link: volume.volumeInfo.infoLink,
    ISBN: {
      ISBN_10: volume.volumeInfo.industryIdentifiers.find(
        (i: IndustryIdentifier) => i.type === 'ISBN_10'
      )!.identifier,
      ISBN_13: volume.volumeInfo.industryIdentifiers.find(
        (i: IndustryIdentifier) => i.type === 'ISBN_13'
      )!.identifier
    }
  };
}
