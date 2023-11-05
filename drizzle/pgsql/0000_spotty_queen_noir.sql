DO $$ BEGIN
 CREATE TYPE "category" AS ENUM('accessories', 'furniture', 'clothing', 'tech');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "acme_account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"access_token" text,
	"expires_at" integer,
	"id_token" text,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token_expires_in" integer,
	"refresh_token" text,
	"scope" text,
	"session_state" text,
	"token_type" text,
	CONSTRAINT acme_account_provider_providerAccountId PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "acme_addresses" (
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
CREATE TABLE IF NOT EXISTS "acme_carts" (
	"id" serial PRIMARY KEY NOT NULL,
	"paymentIntentId" text,
	"clientSecret" text,
	"items" json DEFAULT 'null'::json,
	"closed" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "acme_emails" (
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
CREATE TABLE IF NOT EXISTS "acme_orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"storeId" integer NOT NULL,
	"items" json DEFAULT 'null'::json,
	"quantity" integer,
	"amount" numeric(10, 2) DEFAULT '0' NOT NULL,
	"stripePaymentIntentId" text NOT NULL,
	"stripePaymentIntentStatus" text NOT NULL,
	"name" text,
	"email" text,
	"addressId" integer,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "acme_payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"storeId" integer NOT NULL,
	"stripeAccountId" text NOT NULL,
	"stripeAccountCreatedAt" integer,
	"stripeAccountExpiresAt" integer,
	"detailsSubmitted" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "acme_products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"images" json DEFAULT 'null'::json,
	"category" "category" DEFAULT 'clothing' NOT NULL,
	"subcategory" text,
	"price" numeric(10, 2) DEFAULT '0' NOT NULL,
	"inventory" integer DEFAULT 0 NOT NULL,
	"rating" integer DEFAULT 0 NOT NULL,
	"tags" json DEFAULT 'null'::json,
	"storeId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "acme_session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "acme_stores" (
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
CREATE TABLE IF NOT EXISTS "acme_stripe" (
	"id" text PRIMARY KEY NOT NULL,
	"account" text,
	"api_version" text,
	"created" timestamp,
	"data" json,
	"livemode" boolean,
	"object" text,
	"pending_webhooks" real,
	"request" json,
	"type" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "acme_todo" (
	"id" serial PRIMARY KEY NOT NULL,
	"position" integer DEFAULT 0,
	"content" text NOT NULL,
	"done" boolean,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "acme_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"emailClerk" text,
	"emailVerified" timestamp,
	"image" text,
	"stripeCustomerId" text,
	"stripePriceId" text,
	"stripeCurrentPeriodEnd" text,
	"stripeSubscriptionId" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "acme_users_to_products" (
	"user_id" text NOT NULL,
	"product_id" text NOT NULL,
	CONSTRAINT acme_users_to_products_user_id_product_id PRIMARY KEY("user_id","product_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "acme_verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT acme_verificationToken_identifier_token PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "userId_idx" ON "acme_account" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "userId_idx" ON "acme_session" ("userId");