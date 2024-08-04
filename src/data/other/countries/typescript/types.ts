export type Country = {
  callingCode: string;
  cca2: string;
  flag: string;
  name: string;
};

export type PhoneInputProps = {
  defaultValue?: string;
  placeholder?: string;
  selectedCountry: Country | undefined;
  onChangePhoneNumber: () => void;
  onChangeSelectedCountry: () => void;
};
