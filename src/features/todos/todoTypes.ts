export interface Todo {
  _id: string;
  task: string;
  completed: boolean;
  category: 'Work' | 'Learning' | 'Personal';
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
  updatedAt: string;
}


export interface Counts {
  all: number;
  categories: {
    work: number;
    learning: number;
    personal: number;
  };
  priorities: {
    high: number;
    medium: number;
    low: number;
  };
}