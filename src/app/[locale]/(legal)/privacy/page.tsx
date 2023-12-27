import { Button } from "~/islands/primitives/button";
import { Card, CardContent, CardHeader } from "~/islands/primitives/card";

import Content from "./content.mdx";

export default function PrivacyPage() {
  return (
    <article className="prose pb-8 lg:prose-xl dark:prose-invert">
      <Content />
      <hr />
      <Card>
        <CardHeader>Cookie Management</CardHeader>
        <CardContent>
          <p>
            We use cookies to improve your experience on our website. Cookies
            are stored only in your browser. By browsing this website, you agree
            to our use of cookies.
          </p>
          <p>
            {/* You can remove stored cookies by clicking the button below. */}
            You can disallow cookie storing in your browser settings. However,
            this may affect your ability to use our website.
          </p>
          <Button variant="destructive">Remove Stored Cookies</Button>
        </CardContent>
      </Card>
    </article>
  );
}
