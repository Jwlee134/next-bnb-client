import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHostingState, IRoom } from "types/room";

const initialState: IHostingState = {
  largeBuildingType: {
    label: null,
    description: null,
  },
  buildingType: {
    label: null,
    description: null,
  },
  roomType: null,
  isForGuest: null,
  maximumGuestCount: 1,
  bedroomCount: 0,
  bedCount: 1,
  bedType: [],
  publicBedType: [],
  bathroomCount: 1,
  country: null,
  province: null,
  city: null,
  streetAddress: null,
  detailAddress: null,
  postalCode: null,
  latitude: 0,
  longitude: 0,
  amenities: [],
  spaces: [],
  photos: [],
  description: null,
  title: null,
  forbiddenRules: [],
  customRules: [],
  availability: 1,
  blockedDayList: [],
  price: 0,
};

const hosting = createSlice({
  name: "hosting",
  initialState,
  reducers: {
    setLargeBuildingType: (
      state,
      action: PayloadAction<{
        label: string;
        description: string;
      }>
    ) => {
      state.largeBuildingType = action.payload;
    },
    setBuildingType: (
      state,
      action: PayloadAction<{
        label: string | null;
        description: string | null;
      }>
    ) => {
      state.buildingType = action.payload;
    },
    setRoomType: (state, action: PayloadAction<string>) => {
      state.roomType = action.payload;
    },
    setIsForGuest: (state, action: PayloadAction<string>) => {
      state.isForGuest = action.payload;
    },
    setMaximumGuestCount: (state, action: PayloadAction<number>) => {
      state.maximumGuestCount = action.payload;
    },
    setBedroomCount: (state, action: PayloadAction<number>) => {
      state.bedroomCount = action.payload;
      if (state.bedType.length < action.payload) {
        for (let i = state.bedType.length + 1; i < action.payload + 1; i++) {
          state.bedType.push({ id: i, beds: [] });
        }
      } else {
        state.bedType.splice(action.payload);
      }
    },
    setBedCount: (state, action: PayloadAction<number>) => {
      state.bedCount = action.payload;
    },
    setBedType: (
      state,
      action: PayloadAction<{ label: string; id: number }>
    ) => {
      const { label, id } = action.payload;
      const index = state.bedType.findIndex((bed) => bed.id === id);
      state.bedType[index].beds.push({ label, count: 1 });
    },
    setBedTypeCount: (
      state,
      action: PayloadAction<{ value: number; label: string; id: number }>
    ) => {
      const { value, label, id } = action.payload;
      const index = state.bedType[id - 1].beds.findIndex(
        (bed) => bed.label === label
      );
      state.bedType[id - 1].beds[index].count = value;
      if (value === 0) {
        state.bedType[id - 1].beds.splice(index, 1);
      }
    },
    setPublicBedType: (state, action: PayloadAction<string>) => {
      state.publicBedType.push({ label: action.payload, count: 1 });
    },
    setPublicBedTypeCount: (
      state,
      action: PayloadAction<{ value: number; label: string }>
    ) => {
      const { value, label } = action.payload;
      const index = state.publicBedType.findIndex((bed) => bed.label === label);
      state.publicBedType[index].count = value;
      if (value === 0) {
        state.publicBedType.splice(index, 1);
      }
    },
    setBathroomCount: (state, action: PayloadAction<number>) => {
      state.bathroomCount = action.payload;
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
    setProvince: (state, action: PayloadAction<string>) => {
      state.province = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setStreetAddress: (state, action: PayloadAction<string>) => {
      state.streetAddress = action.payload;
    },
    setDetailAddress: (state, action: PayloadAction<string>) => {
      state.detailAddress = action.payload;
    },
    setPostalCode: (state, action: PayloadAction<string>) => {
      state.postalCode = action.payload;
    },
    setLatitude: (state, action: PayloadAction<number>) => {
      state.latitude = action.payload;
    },
    setLongitude: (state, action: PayloadAction<number>) => {
      state.longitude = action.payload;
    },
    setAmenities: (state, action: PayloadAction<string[]>) => {
      state.amenities = action.payload;
    },
    setSpaces: (state, action: PayloadAction<string[]>) => {
      state.spaces = action.payload;
    },
    setPhotos: (state, action: PayloadAction<string[]>) => {
      state.photos = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setCustomRules: (state, action: PayloadAction<string[]>) => {
      state.customRules = action.payload;
    },
    setForbiddenRules: (state, action: PayloadAction<string[]>) => {
      state.forbiddenRules = action.payload;
    },
    setAvailabilty: (state, action: PayloadAction<number>) => {
      state.availability = action.payload;
    },
    setBlockedDayList: (state, action: PayloadAction<string[]>) => {
      state.blockedDayList = action.payload;
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
    initState: (state) => {
      state = initialState;
      return state;
    },
    setState: (state, action: PayloadAction<IRoom>) => {
      state = action.payload;
      return state;
    },
  },
});

export const hostingActions = { ...hosting.actions };

export default hosting.reducer;
