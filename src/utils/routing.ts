export const getLocation = (endpoint: string): string => {
  if (endpoint === "/") return "Dashboard";

  const [_, path] = endpoint.split("/");

  return path;
};
