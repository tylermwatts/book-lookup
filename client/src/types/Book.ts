export type Book = {
  author: string;
  title: string;
  subtitle?: string;
  publisher?: string;
  description: string;
  thumbnail?: string;
  link: string;
  ISBN: {
    ISBN_10: string;
    ISBN_13: string;
  };
};
