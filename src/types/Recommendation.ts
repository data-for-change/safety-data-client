export type Recommendation = {
    _id: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    language: string;
    lang: string;
    references: { title: string; url: string }[]; 
    updateDate: Date;
  };