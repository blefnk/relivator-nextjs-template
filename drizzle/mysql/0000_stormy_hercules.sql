CREATE TABLE `acme_account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`access_token` text,
	`expires_at` int,
	`id_token` text,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token_expires_in` int,
	`refresh_token` text,
	`scope` varchar(255),
	`session_state` varchar(255),
	`token_type` varchar(255),
	CONSTRAINT `acme_account_provider_providerAccountId` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `acme_addresses` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`line1` varchar(191),
	`line2` varchar(191),
	`city` varchar(191),
	`state` varchar(191),
	`postalCode` varchar(191),
	`country` varchar(191),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `acme_addresses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `acme_carts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`paymentIntentId` varchar(191),
	`clientSecret` varchar(191),
	`items` json DEFAULT ('null'),
	`closed` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `acme_carts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `acme_emails` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` varchar(191),
	`email` varchar(191) NOT NULL,
	`token` varchar(191) NOT NULL,
	`newsletter` boolean NOT NULL DEFAULT false,
	`marketing` boolean NOT NULL DEFAULT false,
	`transactional` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `acme_emails_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `acme_orders` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`storeId` int NOT NULL,
	`items` json DEFAULT ('null'),
	`quantity` int,
	`amount` decimal(10,2) NOT NULL DEFAULT '0',
	`stripePaymentIntentId` varchar(191) NOT NULL,
	`stripePaymentIntentStatus` varchar(191) NOT NULL,
	`name` varchar(191),
	`email` varchar(191),
	`addressId` int,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `acme_orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `acme_payments` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`storeId` int NOT NULL,
	`stripeAccountId` varchar(191) NOT NULL,
	`stripeAccountCreatedAt` int,
	`stripeAccountExpiresAt` int,
	`detailsSubmitted` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `acme_payments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `acme_products` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`images` json DEFAULT ('null'),
	`category` enum('accessories','furniture','clothing','tech') NOT NULL DEFAULT 'clothing',
	`subcategory` varchar(191),
	`price` decimal(10,2) NOT NULL DEFAULT '0',
	`inventory` int NOT NULL DEFAULT 0,
	`rating` int NOT NULL DEFAULT 0,
	`tags` json DEFAULT ('null'),
	`storeId` int NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `acme_products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `acme_session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `acme_session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `acme_stores` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`slug` text,
	`active` boolean NOT NULL DEFAULT false,
	`stripeAccountId` varchar(191),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `acme_stores_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `acme_stripe` (
	`id` varchar(255) NOT NULL,
	`account` text,
	`api_version` text,
	`created` timestamp,
	`data` json,
	`livemode` boolean,
	`object` text,
	`pending_webhooks` real,
	`request` json,
	`type` text,
	CONSTRAINT `acme_stripe_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `acme_todo` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`position` int DEFAULT 0,
	`content` text NOT NULL,
	`done` boolean,
	`createdAt` timestamp DEFAULT (now()),
	`userId` text NOT NULL,
	CONSTRAINT `acme_todo_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `acme_user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255),
	`emailClerk` varchar(255),
	`emailVerified` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3),
	`image` varchar(255),
	`stripeCustomerId` text,
	`stripePriceId` text,
	`stripeCurrentPeriodEnd` text,
	`stripeSubscriptionId` text,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `acme_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `acme_users_to_products` (
	`user_id` varchar(255) NOT NULL,
	`product_id` varchar(255) NOT NULL,
	CONSTRAINT `acme_users_to_products_product_id_user_id` PRIMARY KEY(`product_id`,`user_id`)
);
--> statement-breakpoint
CREATE TABLE `acme_verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `acme_verificationToken_identifier_token` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
CREATE INDEX `userId_idx` ON `acme_account` (`userId`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `acme_session` (`userId`);