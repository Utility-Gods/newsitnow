export interface Plan {
  id: number;
  attributes: {
    name?: string;
    description?: string;
    allowed_collection: number;
    allowed_articles: number;
    allowed_media_in_mb: number;
  };
}
