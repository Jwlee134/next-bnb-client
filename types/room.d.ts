export interface HostingState {
  largeBuildingType: {
    label: string | null;
    description: string | null;
  };
  buildingType: {
    label: string | null;
    description: string | null;
  };
  roomType: string | null;
  isForGuest: string | null;
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedType: { id: number; beds: { type: string; count: number }[] }[];
  publicBedType: { type: string; count: number }[];
  bathroomCount: number;
  country: string | null;
  province: string | null;
  city: string | null;
  streetAddress: string | null;
  detailAddress: string | null;
  postalCode: string | null;
  latitude: number;
  longitude: number;
  amenities: string[];
  spaces: string[];
  photos: string[];
  description: string | null;
  title: string | null;
  forbiddenRules: string[];
  customRules: string[];
  availability: number;
  blockedDayList: string[];
  price: number;
}
