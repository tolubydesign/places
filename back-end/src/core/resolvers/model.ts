
export type Place = {
  id: string, 
  name: string,
  description: string,
  location_type: string | null,
  latitude: string,
  longitude: string,
  event_time: Date | string,
  event_type: "private" | "public",
  street: string,
  city: string,
  suburb: string,
  country: string,
  province: string,
  code: number,
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
