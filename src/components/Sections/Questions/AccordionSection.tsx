import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/browser/reliverse/ui/Accordion";
import { useTranslations } from "next-intl";

import { FundingPlatforms } from "~/components/Common/funding";

export function AccordionSection() {
  const t = useTranslations();

  // Set items according to the "faq"
  // entries in the en-us.json file
  const items = [1, 2, 3] as const;

  type FaqNumber = (typeof items)[number];

  type TranslationKeys =
    | `faq.${FaqNumber}.details`
    | `faq.${FaqNumber}.summary`;

  return (
    <Accordion type="multiple">
      {items.map((item) => {
        const summaryKey = `faq.${item}.summary` as TranslationKeys;
        const detailsKey = `faq.${item}.details` as TranslationKeys;

        // const itemId = uuid(); // Generate a unique id for each item
        const itemId = item;

        // Generate a unique id for each item
        return (
          <AccordionItem key={itemId} value={`item-${itemId}`}>
            <AccordionTrigger>
              {item}. {t(summaryKey)}
            </AccordionTrigger>
            <AccordionContent>
              {itemId !== 3 ? (
                <p
                  className={`
                    text-gray-500

                    dark:text-gray-400
                  `}
                >
                  {t(detailsKey)}
                </p>
              ) : (
                <p
                  className={`
                    text-gray-500

                    dark:text-gray-400
                  `}
                >
                  {t(detailsKey)}
                  <FundingPlatforms />
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
