import { setupWorker } from 'msw/browser';
import { handlersGen } from './handlers';
import {Task} from "../types.ts";


const generateMockData = (count: number): Task[] => {
    return Array.from({length: count}, (_, i) => ({
        id: i + 1,
        status: ['COMPLETED', 'PENDING', 'FAILED'][Math.floor(Math.random() * 3)],
        createdOn: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        name: `project_${i + 1}`,
        description: `This is project ${i + 1} description`,
        delta: Math.floor(Math.random() * 1000)
    }));
}
const mockDatabase: Task[] = generateMockData(50);
const handlers = handlersGen(mockDatabase)
export const worker = setupWorker(...handlers);
