import { setupWorker } from 'msw/browser'
import { db } from './equipes';

// for browser environments
export const worker = setupWorker(...db.user.toHandlers('rest') );
