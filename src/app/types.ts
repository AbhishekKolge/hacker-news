export interface GetNewsParams {
  queryFilter: Record<string, string>;
  sortBy: string;
}
export interface NewsItem {
  title: string;
  id: number;
  author: string;
  url: string;
  points: number;
  totalComments: number;
}
export interface NewsResult {
  page: number;
  totalPages: number;
  results: NewsItem[];
}
export interface ApiResponse {
  page: number;
  nbPages: number;
  hits: {
    title: string;
    story_id: number;
    author: string;
    url: string;
    points: number;
    num_comments: number;
  }[];
}
export interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}
