export type SauceState = {
  errors?: {
    title?: string[];
    description?: string[];
    price?: string[];
    heatLevel?: string[];
    originCountry?: string[];
    image?: string[];
  };
  error?: string; // for non-field errors, like "not logged in"
};
