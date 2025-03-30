import { View, Image, TextInput } from "react-native";
import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  onPress?: () => void;
  onChangeText: (text: string) => void;
  value: string;
}

const SearchBar = ({ onPress, placeholder, value, onChangeText }: Props) => {
  return (
    <View
      className={"flex-row items-center bg-dark-200 rounded-full px-5 py-4"}
    >
      <Image
        source={icons.search}
        className={"size-5"}
        resizeMode={"contain"}
        tintColor={"#ab8bff"}
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={"#a8b5db"}
        className={"text-white ml-2 flex-1"}
      />
    </View>
  );
};
export default SearchBar;
