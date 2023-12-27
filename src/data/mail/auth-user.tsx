export type SignInEmailProps = {
  existingUser?: boolean;
  emailAddress: string;
  url: string;
};

export default function SignInEmail({
  url,
  emailAddress,
  existingUser = false,
}: SignInEmailProps) {
  return (
    <>
      <div />
    </>
  );
}
