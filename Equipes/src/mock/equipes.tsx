import { factory, nullable, primaryKey } from '@mswjs/data';
import { faker } from '@faker-js/faker';


// Create a "db" with an user model and some defaults
export const db = factory({
  user: {
    _id: primaryKey(faker.string.uuid),
    name: nullable(faker.internet.username),
    email: nullable(faker.internet.email),
    code_color: nullable(faker.color.rgb),
    role: nullable(() => faker.helpers.arrayElement(["admin", "arhcitect", "exploit"])),
    updated_at: nullable(() => faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' })), 
    created_at: nullable(() => faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' })) 
  },
});

// create 3 users
[...Array(10).keys()].forEach((_) => db.user.create({}));