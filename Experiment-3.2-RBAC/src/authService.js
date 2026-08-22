const users = [
  {
    username: "John Kalisto",
    password: "JK123",
    role: "Admin",
  },
  {
    username: "John",
    password: "John123",
    role: "Editor",
  },
  {
    username: "Jacob",
    password: "Jacob123",
    role: "Viewer",
  },
];

export const authenticateUser = (username, password) => {
  const user = users.find(
    (u) =>
      u.username === username &&
      u.password === password
  );

  if (!user) return null;

  const header = btoa(
    JSON.stringify({
      alg: "HS256",
      typ: "JWT",
    })
  );

  const payload = btoa(
    JSON.stringify({
      username: user.username,
      role: user.role,
    })
  );

  const signature = btoa("rbac-secret");

  return `${header}.${payload}.${signature}`;
};