import { AccountDetails, Account } from "../model";

export type AccountCreationArgs = Omit<Account, "id">;
export type UserDetails = Omit<AccountDetails, "name" | "lastname" | "password">
