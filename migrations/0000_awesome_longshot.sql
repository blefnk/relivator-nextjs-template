DO $$ BEGIN
 CREATE TYPE "category" AS ENUM('accessories', 'clothing', 'pants', 'shoes');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "comments_type" AS ENUM('question', 'review');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "subscription" AS ENUM('Starter', 'Basic', 'Advanced', 'Enterprise');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"id" text NOT NULL,
	"userId" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"provider" text NOT NULL,
	"email" text NOT NULL,
	"type" text NOT NULL,
	"refresh_token_expires_in" integer,
	"refresh_token" text,
	"session_state" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"id_token" text,
	"scope" text,
	"image" text,
	"name" text,
	CONSTRAINT account_provider_providerAccountId PRIMARY KEY("provider","providerAccountId"),
	CONSTRAINT "account_userId_name_unique" UNIQUE("userId","name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "addresses" (
	"id" serial PRIMARY KEY NOT NULL,
	"line1" text,
	"line2" text,
	"city" text,
	"state" text,
	"postalCode" text,
	"country" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "carts" (
	"id" serial PRIMARY KEY NOT NULL,
	"checkoutSessionId" text,
	"paymentIntentId" text,
	"clientSecret" text,
	"items" json DEFAULT 'null'::json,
	"closed" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments" (
	"id" integer,
	"comment_type" "comments_type"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "email_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"newsletter" boolean DEFAULT false NOT NULL,
	"marketing" boolean DEFAULT false NOT NULL,
	"transactional" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text,
	"storeId" integer NOT NULL,
	"items" json DEFAULT 'null'::json,
	"total" numeric(10, 2) DEFAULT '0' NOT NULL,
	"stripePaymentIntentId" text NOT NULL,
	"stripePaymentIntentStatus" text NOT NULL,
	"name" text,
	"email" text,
	"addressId" integer,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text,
	"storeId" integer NOT NULL,
	"stripeAccountId" text NOT NULL,
	"stripeAccountCreatedAt" integer,
	"stripeAccountExpiresAt" integer,
	"detailsSubmitted" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" json,
	"slug" text,
	"active" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"images" json DEFAULT 'null'::json,
	"category" "category" DEFAULT 'clothing' NOT NULL,
	"subcategory" text,
	"price" numeric(10, 2) DEFAULT '0' NOT NULL,
	"inventory" integer DEFAULT 0 NOT NULL,
	"stripeAccountId" text,
	"rating" integer DEFAULT 0 NOT NULL,
	"tags" json DEFAULT 'null'::json,
	"storeId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stores" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"slug" text,
	"active" boolean DEFAULT false NOT NULL,
	"stripeAccountId" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "StripeEvent" (
	"id" text PRIMARY KEY NOT NULL,
	"api_version" text,
	"data" json,
	"request" json,
	"type" text,
	"object" text,
	"account" text,
	"created" timestamp,
	"livemode" boolean,
	"pending_webhooks" real
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todo" (
	"id" serial PRIMARY KEY NOT NULL,
	"position" integer DEFAULT 0,
	"content" text NOT NULL,
	"done" boolean,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"provider" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"emailVerified" timestamp,
	"email" text DEFAULT 'fake.data@gmail.com',
	"name" text DEFAULT 'Fake Temp Data Name',
	"image" text DEFAULT 'https://relivator.bleverse.com/logo.png',
	"subscription" "subscription" DEFAULT 'Starter',
	"isSubscribed" boolean DEFAULT false NOT NULL,
	"isCanceled" boolean DEFAULT false NOT NULL,
	"stripeSubscriptionStatus" text,
	"stripeSubscriptionId" text,
	"stripe_customer_id" text,
	"active_account_id" text,
	"stripePriceId" text,
	"stripeSubscriptionCurrentPeriodStart" timestamp,
	"stripeSubscriptionCurrentPeriodEnd" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT verificationToken_identifier_token PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "account" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "active_account_idx" ON "user" ("active_account_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
