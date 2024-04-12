
export interface Status {
  id: number;
  attributes: {
    status: 'Published' | 'Draft' | 'Deleted';
  }
}
