# Bleverse Relivator: Next.js Starter & Website Builder

**Crafting the world's most powerful Next.js starter and website builder.**

![GitHub repo size](https://img.shields.io/github/repo-size/blefnk/relivator?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/blefnk/relivator?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/blefnk/relivator?style=for-the-badge)

## 🚀 About the Project

Step into the future with the ultimate Next.js starter. Everything has been set up for you. It's more than just code; it's a journey. You're not on this journey alone. Move faster than ever. We've laid the groundwork; now, grab it, dive in and accelerate your development.

This is our experimental space where we tinkered with the new Next.js app directory. So, while it's all fun and exploration, there might be a few quirks here and there. Stumbled upon something odd or just feeling generous? Reach out to us on Twitter [@bleverse_com](https://x.com/bleverse_com) or raise an issue right here. If you've got some coding magic up your sleeve, contributions are always celebrated! 🎉

## 🤌 Features

Please visit [the corresponding page](/repo/roadmap.md) to see the full list of features.

## Configure Your App

The `app.ts` file contains essential configuration used to modify the contents and settings of the website.

- Manage the content displayed on the website.
- Customize various settings, such as disabling theme toggle.
- Manage general site-wide information.

## 🔥 TO-DO Features

- 🌐 Comprehensive offerings of the Next.js app directory.
- 📊 Dive deep into SQL with TypeScript ORM via [**Drizzle ORM**](https://github.com/drizzle-team/drizzle-orm).
- 🔒 Keep it tight with Authentication using [**Auth.js**](https://authjs.dev) and [**Lucia**](https://github.com/pilcrowOnPaper/lucia).
- 🌍 Centralized Database magic at [**PlanetScale**](https://planetscale.com).
- ✨ Stunning UI components, all thanks to [**shadcn/ui**](https://github.com/shadcn/ui).
- 📝 Share insights with Blogs powered by **MDX** & [**Contentlayer**](https://github.com/contentlayerdev/contentlayer).
- 💲 Seamless Subscriptions via [**LemonSqueezy**](https://www.lemonsqueezy.com/).
- 🎨 Styled to impress with **Tailwind CSS**.
- 📡 Data-fetching streamlined with RSCs & [**tRPC**](https://github.com/trpc/trpc).
- 📧 Email verification and a lot more features to enhance your application!

## ⚠️ Known Issues

A quick snapshot of the roadblocks or nuances as of now:

1. Occasionally, MySQL throws a tantrum about excessive connections. A quick restart of your Next.js app should soothe it.
2. Pricing plans are playing hard-to-get with the database sync.
3. The RBAC feature is still on probation; thorough testing pending.
4. Jury's out on tRPC's performance in RSCs.
5. An [issue with MJML](https://github.com/vercel/next.js/issues/50042) compelled us to house the email functions within the `/pages` directory.

## 🏃‍♂️ Getting Started Locally

Get all dependencies sorted:

```sh
pnpm install
```

Get your environment variables in check:

```sh
cp .env.example .env
```

Let the server magic begin:

```sh
pnpm dev
```

### 📚 Setting Up the Database

#### On Your Machine

Hop into MySQL:

```bash
mysql -u root
```

Bring your database to life:

```bash
CREATE DATABASE template;
```

Push your DB schema:

```bash
npx drizzle-kit mysql:push
```

#### 🌐 PlanetScale

Thinking of ditching local? Feel free to fully commit to PlanetScale as your primary database!

### 🔐 Authentication

Setting up GitHub OAuth is a breeze:

1. Visit: `https://github.com/settings/developers`
2. Hit "New OAuth App".
3. Register your callback URL: `http://localhost:3000/api/oauth/github`

### 💌 Email

Want a sneak peek of your email in dev mode without sending it out? Run:

```bash
npx mailing
```

For the real deal in production, you'll be working with [Resend](resend.com). Grab your API key and verify your domain there.

### 💲 Payments

LemonSqueezy powers payments, with subscription syncs via webhooks (`lemonsqueezy/route.ts`). Fancy a local test? Expose the webhook with:

```bash
npx ngrok http 3000
```

Then, register the webhook URL, like `https://abc.eu.ngrok.io/api/lemonsqueezy`, in [LemonSqueezy's webhook settings](https://app.lemonsqueezy.com/settings/webhooks).

### 🖼️ Asset Generation

For a fresh splash of branding, swap `logo-mark.svg` with your logo. Then, run:

```bash
npm run asset-generator
```

## 📫 Contributing to Bleverse Relivator

To contribute to Bleverse Relivator, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to original branch: `git push origin <project_name> / <local>`
5. Create the pull request.

Or, see the GitHub docs on [how to create a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## 🙌 Kudos to Collaborators

We thank everyone for their contributions to this repository. Please visit [the corresponding page](/repo/contributing/contributors.md) to see the full list of contributors.

## License

Released under the [MIT license](https://github.com/amosbastian/template/blob/main/LICENSE.md).

---

Happy coding! Embark on this coding adventure, learn, iterate, and most importantly – enjoy the process! And remember – this is a space of learning and experimentation. Dive in and enjoy the journey! 🚀🌌
