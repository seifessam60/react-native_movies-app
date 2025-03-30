import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import usefetch from "@/services/usefetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = usefetch(() => fetchMovies({ query: "" }));
  return (
    <View className={"flex-1 bg-primary"}>
      <Image
        source={images.bg}
        className={"w-full flex-1 absolute z-0"}
        resizeMode={"cover"}
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className={"h-10 w-12 mx-auto mb-5 mt-20"} />
        {moviesLoading ? (
          <ActivityIndicator
            size={"large"}
            color={"#0000ff"}
            className={"mt-10 self-center"}
          />
        ) : moviesError ? (
          <Text>Error: {moviesError.message}</Text>
        ) : (
          <View className={"flex-1 mt-5"}>
            <SearchBar
              onPress={() => {
                router.push("/search");
              }}
              placeholder={"Search for a Movie"}
            />
            <>
              <Text className={"text-lg text-white font-bold mt-5 mb-3"}>
                Latest Movies
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                scrollEnabled={false}
                className={"pb-32 mt-2"}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
