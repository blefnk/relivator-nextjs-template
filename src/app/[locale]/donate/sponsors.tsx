import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Paragraph } from "@/components/ui/paragraph";
import { Section } from "@/components/ui/section";
import { Span } from "@/components/ui/span";

import { AvatarImage } from "./avatar";

type SocialMediaPlatform =
  | "Discord"
  | "Facebook"
  | "GitHub"
  | "Twitter"
  | "YouTube";

type SocialMediaLink = {
  id?: string;
  platform: SocialMediaPlatform;
  username: string;
};

type SponsorProps = {
  avatarUrl: string;
  company: string;
  location: string;
  name: string;
  socialMedia: SocialMediaLink[];
  sponsor: string;
  sponsorLevel: number;
  title: string;
};

export function Sponsors() {
  const sponsors: SponsorProps[] = [
    {
      name: "Petro Melnyk",
      title: "Music Composer & Piano Teacher",
      company: "MF Piano",
      location: "Lviv, Ukraine",
      sponsor:
        // eslint-disable-next-line @stylistic/max-len
        "It just works. Although Relivator is primarily a multi-vendor online store template, I asked @blefnk to make some changes for me, and he helped me out. Relivator turned out to be perfect for selling my sheet music! It's a really cool template. Thank you!",
      socialMedia: [{ platform: "YouTube", username: "mfpiano" }],
      sponsorLevel: 3,
      avatarUrl: "",
    },
    {
      name: "Daniel Humphreys",
      title: "Web Developer",
      company: "",
      location: "",
      sponsor:
        // eslint-disable-next-line @stylistic/max-len
        "Just found this repo today by chance. Amazing work, mate. I would love to send you some $ to sponsor you and the project. Just from what I have seen so far, there has been a huge amount of work put into this 🤯. Thanks for sharing such an insane product with the community! 🦾 I can see how much work you have put into this project. It is actually insane that one person created this. Much respect to you, bro. I appreciate people like you who share their knowledge and talent with others and ask nothing in return ❤️. Unfortunately, many people in this world don’t respect the amount of effort and dedication it takes, and they are only interested in how they can benefit from others' work.",
      socialMedia: [
        { platform: "GitHub", username: "devmarauda" },
        {
          platform: "Discord",
          username: "kongkong86",
          id: "1133132863655649280",
        },
      ],
      sponsorLevel: 2,
      avatarUrl: "",
    },
    {
      name: "Simon Victory",
      title: "GovTech and CivicTech Developer",
      company: "",
      location: "Brisbane, Australia",
      sponsor:
        // eslint-disable-next-line @stylistic/max-len
        "Great work with Relivator and getting everything done for 1.2.6! I've been referencing how you've stitched together some tools and deeply appreciate the work you've done so far. Please accept this donation as a token of my appreciation. You've got a lot of repositories and content to manage, so remember to stay focused and not stretch yourself too much!",
      socialMedia: [
        { platform: "GitHub", username: "svict4" },
        {
          platform: "Discord",
          username: "svict4",
          id: "142160962684715008",
        },
      ],
      sponsorLevel: 2,
      avatarUrl: "",
    },
    {
      name: "Saif Al-Hashar ",
      title: "Web Developer",
      company: "",
      location: "Oman",
      sponsor:
        // eslint-disable-next-line @stylistic/max-len
        "Enjoy your two boosts for your server from me. The early access looks pretty good. Oh god, this project is just amazing, and I appreciate everything! I want to do everything I can to support your work. This is how I can support and contribute to this project the best I can :3",
      socialMedia: [
        { platform: "GitHub", username: "Saif-V" },
        {
          platform: "Discord",
          username: "Gh0st",
          id: "1103781640821538896",
        },
      ],
      sponsorLevel: 1,
      avatarUrl: "",
    },
    {
      name: "Özkan Demir",
      title: "Web Developer",
      company: "fleura.de",
      location: "Germany",
      sponsor:
        // eslint-disable-next-line @stylistic/max-len
        "I learned a lot from using the Relivator project! I see the hard work that was put into it. It's truly an amazing open-source starter; I have built my startup using it. @blefnk, your hard work is impressive; it's astonishing how you manage it all alone.",
      socialMedia: [
        { platform: "GitHub", username: "demiroo" },
        {
          platform: "Discord",
          username: "demiroezkan",
          id: "605798991619293195",
        },
      ],
      sponsorLevel: 1,
      avatarUrl: "",
    },
  ];

  return (
    <Section id="sponsors">
      <Heading className="mb-4 text-2xl font-bold">
        Sponsors & Discord Boosters
      </Heading>
      <br />
      <Paragraph>
        A larger image size indicates that the user has a higher sponsorship
        level.
      </Paragraph>
      {/* <Paragraph>
        Please contact us if you would like to be added to this list. We would
        be happy to include you!
      </Paragraph> */}
      <br />
      <div className="space-y-4">
        {sponsors.map((t, index) => (
          <Sponsor key={index} {...t} />
        ))}
      </div>
    </Section>
  );
}

function Sponsor({
  name,
  title,
  company,
  sponsor,
  socialMedia,
  sponsorLevel,
  avatarUrl,
  location,
}: SponsorProps) {
  const socialMediaLinks: Record<
    SocialMediaPlatform,
    (link: SocialMediaLink) => string
  > = {
    GitHub: (link: SocialMediaLink) => `https://github.com/${link.username}`,
    Discord: (link: SocialMediaLink) =>
      link.id
        ? `https://discordapp.com/users/${link.id}`
        : `https://discordapp.com/users/${link.username}`,
    Facebook: (link: SocialMediaLink) =>
      `https://facebook.com/${link.username}`,
    Twitter: (link: SocialMediaLink) => `https://twitter.com/${link.username}`,
    YouTube: (link: SocialMediaLink) => `https://youtube.com/@${link.username}`,
  };

  return (
    <Card className="flex rounded-lg bg-chart-1/30 p-6 shadow-md">
      <div className="flex-none">
        <AvatarImage
          name={name}
          avatarUrl={avatarUrl}
          sponsorLevel={sponsorLevel}
        />
      </div>
      <div className="ml-4 grow">
        <Paragraph>{sponsor}</Paragraph>
        <br />
        <Paragraph className="">
          © {name}, {title}
          {company && `, ${company}`}
          {location && <span className="opacity-80">&nbsp;({location})</span>}
          <br />
          {socialMedia && socialMedia.length > 0 && (
            <Span>
              {socialMedia.map(({ platform, username, id }, index) => (
                <Span key={index}>
                  <Link
                    href={socialMediaLinks[platform]({
                      platform,
                      username,
                      id,
                    })}
                    variant="link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      opacity-80

                      hover:underline
                    `}
                  >
                    {platform}: {username}
                  </Link>
                  {index < socialMedia.length - 1 && " - "}
                </Span>
              ))}
            </Span>
          )}
        </Paragraph>
      </div>
    </Card>
  );
}
