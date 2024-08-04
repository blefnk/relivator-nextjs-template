import ModernError from "modern-errors";
import modernErrorsCli from "modern-errors-cli";
import modernErrorsSerialize from "modern-errors-serialize";

export const BaseError = ModernError.subclass("BaseError", {
  plugins: [modernErrorsCli, modernErrorsSerialize],
});

export const UnknownError = BaseError.subclass("UnknownError");

export const InputError = BaseError.subclass("InputError");

export const AuthError = BaseError.subclass("AuthError");

export const DatabaseError = BaseError.subclass("DatabaseError");
