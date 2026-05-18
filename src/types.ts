import type { AppSchema } from '../instant.schema';
import type { InstaQLEntity } from '@instantdb/react-native';

export type Voter = InstaQLEntity<AppSchema, 'voterLists'>;
