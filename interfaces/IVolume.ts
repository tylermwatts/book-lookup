export interface IVolume {
	volumeInfo: {
		authors: string[];
		title: string;
		subtitle?: string;
		publisher?: string;
		description: string;
		imageLinks: { thumbnail: string };
		infoLink: string;
		industryIdentifiers: [{ type: string; identifier: string }];
	};
}
