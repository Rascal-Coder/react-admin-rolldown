import { faker } from "@faker-js/faker";
import { HttpResponse, http } from "msw";
import { ResultStatus } from "@/types/enum";
import { DB_USER } from "../assets";

const signIn = http.post("/api/auth/signin", async ({ request }) => {
  const { username, password } = (await request.json()) as Record<
    string,
    string
  >;

  const user = DB_USER.find((item) => item.username === username);

  if (!user || user.password !== password) {
    return HttpResponse.json({
      status: 10_001,
      message: "Incorrect username or password.",
    });
  }
  // delete password
  const { password: _, ...userWithoutPassword } = user;

  return HttpResponse.json({
    status: ResultStatus.SUCCESS,
    message: "",
    data: {
      user: { ...userWithoutPassword },
      accessToken: faker.string.uuid(),
      refreshToken: faker.string.uuid(),
    },
  });
});

const userList = http.get("/api/user", async () =>
  HttpResponse.json(
    Array.from({ length: 10 }).map(() => ({
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatarGitHub(),
      address: faker.location.streetAddress(),
    })),
    {
      status: 200,
    }
  )
);

export { signIn, userList };
