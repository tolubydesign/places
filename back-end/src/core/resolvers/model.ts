
export type Place = {
  id: string,
  name: string,
  description: string,
  owner: string,
  location_type: string,
  latitude: number,
  longitude: number,
  event_time: string,
  event_type: "open" | "private" | "invite required",
  street: string,
  city: string,
  suburb: string,
  country: string,
  province: string,
  code: string
}

export type Account = {
  id: string,
  username: string,
  name: string,
  surname: string,
  password: string,
  email: string,
  account_type: "admin" | "user",
}

export type Bookmark = {
  id: string,
  name: string,
  information: string,
  creator_id: string,
  location_id: string,
}

export type AccountDetails = Omit<Account, "password">;
