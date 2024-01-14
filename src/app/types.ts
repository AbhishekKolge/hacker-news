export interface NewsListApiResponse {
  page: number;
  nbPages: number;
  hits: {
    title: string;
    story_id: number;
    author: string;
    url: string;
    points: number;
    num_comments: number;
    created_at_i: number;
  }[];
}

export interface NewsDetailsChildrenApiResponse {
  id: number;
  author: string;
  created_at_i: number;
  children: NewsDetailsChildrenApiResponse[];
  text: string;
}

export interface NewsDetailsApiResponse {
  title: string;
  story_id: number;
  author: string;
  url: string;
  points: number;
  created_at_i: number;
  children: NewsDetailsChildrenApiResponse[];
}

export interface NewsItem {
  title: string;
  id: number;
  author: string;
  url: string;
  points: number;
  totalComments: number;
  createdAt: number;
}
export interface NewsResult {
  page: number;
  totalPages: number;
  results: NewsItem[];
}

export interface NewsDetails {
  title: string;
  id: number;
  author: string;
  url: string;
  points: number;
  createdAt: number;
  comments: NewsDetailsChildrenApiResponse[];
}

export interface PageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}
