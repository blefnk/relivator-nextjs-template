/**
 * This file is used to declare global i18n IDE types.
 * They are then automatically imported into project.
 */

type CommonMessages = typeof import("~/data/i18n/en-us.json");
// type AccountMessages = typeof import("../../messages/en-us/account.json");

// declare interface IntlMessages extends CommonMessages, AccountMessages {}
// declare type IntlMessages = CommonMessages & {}
declare type IntlMessages = CommonMessages;
