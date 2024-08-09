import { ofetch } from "ofetch";

type Repo = {
  description: string;
  id: number;
  name: string;
  repo: string;
  stars: number;
};

// async function main() {
export async function getRepoStarsNumber() {
  const { repo } = await ofetch<{
    repo: Repo;
  }>("https://ungh.cc/repos/blefnk/relivator-nextjs-template");

  // consola.log(`The repo ${repo.name} has ${repo.stars} stars.`);
  return repo.stars;
}
