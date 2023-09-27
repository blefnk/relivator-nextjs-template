import Image from "next/image";
import { featureCards } from "~/app";

import HeadingText from "~/islands/modules/heading-text";
import { Card, CardDescription, CardTitle } from "~/islands/primitives/card";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ElementType;
};

export function FeatureCard({
  title,
  description,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-background p-2 text-left">
      <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
        <Icon className="h-12 w-12" />
        <div className="space-y-2">
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}

// todo: merge the best things from this with the above

export default function DeprecatedFeatureCards() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900">
      <div className="container space-y-8 py-12 text-center lg:py-20">
        {featureCards.header || featureCards.subheader ? (
          <HeadingText subtext={featureCards.subheader}>
            {featureCards.header}
          </HeadingText>
        ) : null}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {featureCards.content.map((cards) => (
            <Card
              key={cards.text}
              className="flex flex-grow flex-col items-center justify-between gap-4 p-8 dark:bg-secondary"
            >
              {cards.image !== "" ? (
                <div className="flex items-center justify-center">
                  <div className="flex flex-1 bg-white">
                    <Image
                      src="https://relivator.bleverse.com/logo.png"
                      width={100}
                      height={100}
                      alt="Card image"
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div className="space-y-2">
                <CardTitle>{cards.text}</CardTitle>
                <CardDescription>{cards.subtext}</CardDescription>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
