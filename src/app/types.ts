export type Location = {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  description: string | null;
  imageUrl: string | null;
};
export type PostLocation = {
  name: string;
  latitude: string;
  longitude: string;
  description: string | null;
  utils: string[];
};
