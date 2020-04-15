export interface IMsg {
  id: number;
  text: string;
}

export function createInitialLists() {
  return [
    {
      id: 1,
      text: "Hello World",
    },
    {
      id: 2,
      text: "I am initialData",
    },
  ];
}
