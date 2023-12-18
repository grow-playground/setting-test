import { Database as DB } from '@/libs/database.types';

declare global {
  type Database = DB;
}
