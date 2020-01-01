export type MetaData = {
  type: string;
  index: number;
  name: string;
  min?: number;
  max?: number;
};

export type SetInfo = {
  format: string;
  start: number;
  end: number;
};

export type DatasetInfo = {
  username: string;
  email: string;
  file: string;
  name: string;
  header: number;
  separator: string;
  skip: number;
  meta: Array<MetaData>;
  sets: Array<SetInfo>;
  author: string;
  description: string;
  source: string;
};

export function isValidEmail(email: string) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function getDefaultDatasetInfo(): DatasetInfo {
  return {
    username: '',
    email: '',
    file: '',
    name: '',
    header: 0,
    separator: ';',
    skip: -1,
    meta: [],
    sets: [],
    author: '',
    description: '',
    source: '',
  };
}
