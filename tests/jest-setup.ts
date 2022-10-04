import { toMatchImageSnapshot } from 'jest-image-snapshot';

// jest-image-snapshotをJestのexpectで使用出来るようにする
expect.extend( { toMatchImageSnapshot } );
