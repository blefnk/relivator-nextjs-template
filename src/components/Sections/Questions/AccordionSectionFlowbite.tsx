import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";
import { useTranslations } from "next-intl";
import { v4 as uuid } from "uuid";

export function FaqFlowbite() {
  const t = useTranslations();

  // Set items according to the "faq"
  // entries in the en-us.json file
  const items = [1, 2, 3] as const;

  type FaqNumber = (typeof items)[number];

  type TranslationKeys =
    | `faq.${FaqNumber}.details`
    | `faq.${FaqNumber}.summary`;

  return (
    <Accordion>
      {items.map((item) => {
        const summaryKey = `faq.${item}.summary` as TranslationKeys;
        const detailsKey = `faq.${item}.details` as TranslationKeys;

        return (
          <AccordionPanel key={uuid()}>
            <AccordionTitle>
              {item}. {t(summaryKey)}
            </AccordionTitle>
            <AccordionContent>
              <p
                className={`
                  text-gray-500

                  dark:text-gray-400
                `}
              >
                {t(detailsKey)}
              </p>
            </AccordionContent>
          </AccordionPanel>
        );
      })}
    </Accordion>
  );
}
