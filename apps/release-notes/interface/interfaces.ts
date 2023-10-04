export interface Label {
  id: string;
  name: string;
}

export interface Issue {
  id: string;
  title: string;
  number: string;
  htmlUrl: string;
  labels: Label[];
}

export interface Release {
  id: string;
  title: string;
  description: string;
  startOn: string;
  endOn: string;
  state: string;
  issues: Issue[];
}

export interface Releases {
  open: Release[];
  close: Release[];
}
