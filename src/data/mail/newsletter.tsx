type NewsletterWelcomeEmailProps = {
  firstName?: string;
  fromEmail: string;
  token: string;
};

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";

// For previewing we need to put images in the .react-email/public folder
// In production we need to put images in the root public folder
const newsletterImages = [
  {
    src: `${baseUrl}/images/newsletter/skater-one.webp`,
    alt: "Skateboarder flying high",
    credit: "ALLAN FRANCA",
    creditUrl:
      "https://www.pexels.com/photo/time-lapse-photography-of-man-doing-skateboard-trick-3133685/",
    description: `Skateboarding is a sport that has been around for decades. It's not just about the tricks, but also about the culture and community that surrounds it. So we decided to create a newsletter to share our passion with others who love skateboarding as much as we do!`,
  },
  {
    src: `${baseUrl}/images/newsletter/skater-two.webp`,
    alt: "Skateboarder landing on half pipe",
    credit: "cotton studio",
    creditUrl:
      "https://www.pexels.com/photo/skateboarder-jumping-a-skateboard-5037502/",
    description: `${`We'll`} be keeping you up to date with the latest skateboarding news, events, and more. Stay up to date with the latest trends and tricks. Stay tuned for more!`,
  },
];

export default function NewsletterWelcomeEmail({
  firstName = "there",
  fromEmail,
  token,
}: NewsletterWelcomeEmailProps) {
  const previewText = `Hi ${firstName}, welcome to Relivator!`;

  return (
    <>
      <div></div>
    </>
  );
}
