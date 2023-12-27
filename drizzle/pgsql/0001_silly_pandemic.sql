DO $$ BEGIN
 CREATE TYPE "mode" AS ENUM('buyer', 'seller');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "acme_capabilities" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"promote_users" boolean DEFAULT false NOT NULL,
	"remove_users" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "acme_guest" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP INDEX IF EXISTS "userId_idx";--> statement-breakpoint
ALTER TABLE "acme_account" DROP CONSTRAINT "acme_account_provider_providerAccountId";--> statement-breakpoint
ALTER TABLE "acme_users_to_products" DROP CONSTRAINT "acme_users_to_products_user_id_product_id";--> statement-breakpoint
ALTER TABLE "acme_verificationToken" DROP CONSTRAINT "acme_verificationToken_identifier_token";--> statement-breakpoint
ALTER TABLE "acme_products" ALTER COLUMN "storeId" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "acme_account" ADD CONSTRAINT "acme_account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId");--> statement-breakpoint
ALTER TABLE "acme_users_to_products" ADD CONSTRAINT "acme_users_to_products_user_id_product_id_pk" PRIMARY KEY("user_id","product_id");--> statement-breakpoint
ALTER TABLE "acme_verificationToken" ADD CONSTRAINT "acme_verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token");--> statement-breakpoint
ALTER TABLE "acme_carts" ADD COLUMN "userId" text;--> statement-breakpoint
ALTER TABLE "acme_carts" ADD COLUMN "email" text;--> statement-breakpoint
ALTER TABLE "acme_user" ADD COLUMN "role" "role" DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE "acme_user" ADD COLUMN "mode" "mode" DEFAULT 'buyer' NOT NULL;--> statement-breakpoint
ALTER TABLE "acme_user" ADD COLUMN "currentCartId" text;