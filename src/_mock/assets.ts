import { faker } from "@faker-js/faker";

enum BasicStatus {
  DISABLE = 0,
  ENABLE = 1,
}
interface CommonOptions {
  status?: BasicStatus;
  desc?: string;
  createdAt?: string;
  updatedAt?: string;
}
interface User extends CommonOptions {
  id: string; // uuid
  username: string;
  password: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export const DB_USER: User[] = [
  {
    id: "user_admin_id",
    username: "admin",
    password: "demo1234",
    avatar: faker.image.avatarGitHub(),
    email: "admin@slash.com",
  },
  {
    id: "user_test_id",
    username: "test",
    password: "demo1234",
    avatar: faker.image.avatarGitHub(),
    email: "test@slash.com",
  },
  {
    id: "user_guest_id",
    username: "guest",
    password: "demo1234",
    avatar: faker.image.avatarGitHub(),
    email: "guest@slash.com",
  },
];
