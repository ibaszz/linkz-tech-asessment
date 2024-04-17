import { Injectable } from '@nestjs/common';

interface Cats {
  id: string;
  url: string;
}

@Injectable()
export class CatsService {
  async getCats(): Promise<Cats> {
    const cats = await fetch(
      'https://api.thecatapi.com/v1/images/search?limit=10',
    );
    return cats.json();
  }
}
