import { useTranslations } from "next-intl";

export type SignInEmailProps = {
  emailAddress: string;
  existingUser?: boolean;
  url: string;
};

// export default function SignInEmail({ emailAddress, existingUser = false, url }: SignInEmailProps) {
export default function SignInEmail() {
  const t = useTranslations();

  return <div>{t("auth-user.signInEmail")}</div>;
}
