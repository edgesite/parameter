type Type = 'number' | 'int' | 'integer' |
  'date' | 'datetime' | 'dateTime' |
  'bool' | 'boolean' |
  'string' |
  'email' |
  'password' |
  'url' |
  'enum' |
  'object' |
  'array';

type CommonRule = { required?: boolean };
type ParameterRule = Type |
  string | { type: string, [key: string]: any } |
  CommonRule & ({ type: 'number' | 'int' | 'integer', min?: number, max?: number } |
  { type: 'date' } |
  { type: 'datetime' | 'dateTime' } |
  { type: 'bool' | 'boolean' } |
  { type: 'string', allowEmpty?: boolean, format?: RegExp, min?: number, max?: number } |
  { type: 'email', allowEmpty?: boolean } |
  { type: 'password', compare?: string, min?: number, max?: number } |
  { type: 'url' } |
  { type: 'enum', values?: string[] } |
  { type: 'object', rule: Rules } |
  { type: 'array', itemType: 'object', rule?: Rules, min?: number, max?: number } |
  { type: 'array', itemType?: Type, rule?: ParameterRule, min?: number, max?: number });
type Rules<T = any> = { [K in keyof T]: ParameterRule }

interface ParameterError<T> {
  message: string;
  code: 'invalid' | 'missing_field';
  field: keyof T;
}

type ParameterChecker = (rule: any, value: any) => string;

interface ParameterOptions {
  translate?: () => any;
  validateRoot?: boolean;
}

declare class Parameter {
  constructor(options?: ParameterOptions);
  validate<T>(rule: Rules<T>, value: T): ParameterError<T>[] | undefined;
  addRule(type: string, check: RegExp | ParameterChecker): void;
}

export = Parameter;