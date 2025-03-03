import '@testing-library/jest-dom';
import {afterAll, afterEach, beforeAll} from 'vitest';
import {cleanup} from '@testing-library/react';
import {setupServer} from "msw/node";
import {handlersGen} from "./mocks/handlers.ts";
import {Task} from "./types.ts";
const tasks: Task[] = [{
  id: 101,
  status: 'COMPLETED',
  createdOn: '2025-02-25T11:12:54.073Z',
  name: 'hardcoded_11111',
  description: 'This is project hardcoded_11111 description',
  delta: 1000
},
  {
    id: 102,
    status: 'PENDING',
    createdOn: '2025-02-26T11:12:54.073Z',
    name: 'hardcoded_22222',
    description: 'This is project hardcoded_22222 description',
    delta: 2000
  }, {
    id: 103,
    status: 'FAILED',
    createdOn: '2025-02-28T11:12:54.073Z',
    name: 'hardcoded_33333',
    description: 'This is project hardcoded_33333 description',
    delta: 3000
  }]
const handlers = handlersGen(tasks)
const server =setupServer(...handlers);

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});
afterAll(() => server.close());
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
