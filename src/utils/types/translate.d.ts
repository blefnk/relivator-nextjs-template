declare module "translate" {
  export default function translate(
    text: string,
    options: {
      from: string;
      to: string;
      cache?: number;
      engine?: string;
      key?: string;
      url?: string;
    },
  ): string;
}
