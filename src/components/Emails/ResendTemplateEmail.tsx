import type { FC } from "react";

type EmailTemplateProps = {
  firstName: string;
};

export const EmailTemplate: FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);
