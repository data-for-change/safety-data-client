export type Recommendation = {
    _id: string;
    title: string;
    category: string;
    description: string;
    tags: TagScore[];
    language: string;
    lang: string;
    references: { title: string; url: string }[]; 
    updateDate: Date;
  };
 export type TagScore = {
    name: string;
    score: number;
  };
export type NewRecommendation = Omit<Recommendation, '_id'>;