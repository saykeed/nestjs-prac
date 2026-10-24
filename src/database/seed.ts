import dataSource from './data-source.js';
import { User } from '../users/user.entity.js';

await dataSource.initialize();

const users = dataSource.getRepository(User);
const existing = await users.findOne({
  where: { email: 'demo@example.com' },
});

if (!existing) {
  await users.save(
    users.create({
      email: 'demo@example.com',
      username: 'demo',
      password: 'password123',
    }),
  );
}

await dataSource.destroy();