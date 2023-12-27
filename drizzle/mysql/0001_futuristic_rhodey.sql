CREATE TABLE `acme_capabilities` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` varchar(255) NOT NULL,
	`promote_users` boolean NOT NULL DEFAULT false,
	`remove_users` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `acme_capabilities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `acme_guest` (
	`id` varchar(255) NOT NULL,
	`email` varchar(255),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `acme_guest_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `acme_account` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `acme_users_to_products` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `acme_verificationToken` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `acme_addresses` MODIFY COLUMN `line1` varchar(255);--> statement-breakpoint
ALTER TABLE `acme_addresses` MODIFY COLUMN `line2` varchar(255);--> statement-breakpoint
ALTER TABLE `acme_addresses` MODIFY COLUMN `city` varchar(255);--> statement-breakpoint
ALTER TABLE `acme_addresses` MODIFY COLUMN `state` varchar(255);--> statement-breakpoint
ALTER TABLE `acme_addresses` MODIFY COLUMN `postalCode` varchar(255);--> statement-breakpoint
ALTER TABLE `acme_addresses` MODIFY COLUMN `country` varchar(255);--> statement-breakpoint
ALTER TABLE `acme_carts` MODIFY COLUMN `paymentIntentId` varchar(255);--> statement-breakpoint
ALTER TABLE `acme_carts` MODIFY COLUMN `clientSecret` varchar(255);--> statement-breakpoint
ALTER TABLE `acme_emails` MODIFY COLUMN `userId` varchar(255);--> statement-breakpoint
ALTER TABLE `acme_emails` MODIFY COLUMN `email` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `acme_emails` MODIFY COLUMN `token` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `acme_orders` MODIFY COLUMN `stripePaymentIntentId` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `acme_orders` MODIFY COLUMN `stripePaymentIntentStatus` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `acme_orders` MODIFY COLUMN `name` varchar(255);--> statement-breakpoint
ALTER TABLE `acme_orders` MODIFY COLUMN `email` varchar(255);--> statement-breakpoint
ALTER TABLE `acme_payments` MODIFY COLUMN `stripeAccountId` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `acme_products` MODIFY COLUMN `name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `acme_products` MODIFY COLUMN `subcategory` varchar(255);--> statement-breakpoint
ALTER TABLE `acme_products` MODIFY COLUMN `storeId` int NOT NULL DEFAULT 1;--> statement-breakpoint
ALTER TABLE `acme_stores` MODIFY COLUMN `userId` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `acme_stores` MODIFY COLUMN `name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `acme_stores` MODIFY COLUMN `stripeAccountId` varchar(255);--> statement-breakpoint
ALTER TABLE `acme_account` ADD PRIMARY KEY(`provider`,`providerAccountId`);--> statement-breakpoint
ALTER TABLE `acme_users_to_products` ADD PRIMARY KEY(`user_id`,`product_id`);--> statement-breakpoint
ALTER TABLE `acme_verificationToken` ADD PRIMARY KEY(`identifier`,`token`);--> statement-breakpoint
ALTER TABLE `acme_carts` ADD `userId` varchar(255);--> statement-breakpoint
ALTER TABLE `acme_carts` ADD `email` varchar(255);--> statement-breakpoint
ALTER TABLE `acme_user` ADD `role` enum('admin','user') DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE `acme_user` ADD `mode` enum('seller','buyer') DEFAULT 'buyer' NOT NULL;--> statement-breakpoint
ALTER TABLE `acme_user` ADD `currentCartId` varchar(255);