export enum StepType {
  UPLOAD = 'UPLOAD',
  COLUMNS = 'COLUMNS',
  FINISH = 'FINISH',
}

export type Step = {
  label: string;
  instructions: string;
  type: StepType;
};

export type Steps = Step[];

export const getSteps = (): Steps => [
  {
    label: 'Upload dataset',
    instructions:
      'Please upload the file with dataset. We support any delimiter separated file format (e.g. csv, tsv, etc.)',
    type: StepType.UPLOAD,
  },
  {
    label: 'Set Column Types',
    instructions:
      'Select the proper column types. Important ones are the columns which show set membership',
    type: StepType.COLUMNS,
  },
  {
    label: 'Finish',
    instructions: 'Fill in the details, and click upload.',
    type: StepType.FINISH,
  },
  {
    label: 'Finish',
    instructions: 'Fill in the details, and click upload.',
    type: StepType.FINISH,
  },
];
