declare const console: {
  log: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
};

declare const process: {
  env: Record<string, string | undefined>;
};

declare function fetch(input: string, init?: {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}): Promise<{
  ok: boolean;
  status: number;
  text(): Promise<string>;
  json(): Promise<unknown>;
}>;

declare module 'cors' {
  const cors: () => unknown;
  export default cors;
}

declare module 'dotenv' {
  export function config(): void;
}

declare module 'fs/promises' {
  export function mkdir(path: string, options?: { recursive?: boolean }): Promise<void>;
  export function access(path: string): Promise<void>;
  export function readFile(path: string, encoding: string): Promise<string>;
  export function writeFile(path: string, data: string, encoding: string): Promise<void>;
}

declare module 'path' {
  export function dirname(path: string): string;
  export function resolve(...segments: string[]): string;
}

declare module 'express' {
  export interface Request {
    body: unknown;
    header(name: string): string | undefined;
  }

  export interface Response {
    status(code: number): Response;
    json(body: unknown): void;
  }

  export type NextFunction = () => void;

  export interface Router {
    post(path: string, ...handlers: Array<unknown>): Router;
  }

  export function Router(): Router;

  export interface ExpressApp {
    use(...args: Array<unknown>): ExpressApp;
    get(path: string, ...handlers: Array<unknown>): ExpressApp;
    listen(port: number, callback?: () => void): void;
  }

  export default function express(): ExpressApp;
}
