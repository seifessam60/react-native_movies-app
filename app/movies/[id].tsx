import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { fetchMovieDetails } from "@/services/api";
import { router, useLocalSearchParams } from "expo-router";
import usefetch from "@/services/usefetch";
import { icons } from "@/constants/icons";
interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className={"flex-col items-start justify-center mt-5"}>
      <Text className={"text-light-200 font-normal text-sm"}>{label}</Text>
      <Text className={"text-light-100 font-bold text-sm mt-2"}>
        {value || "N/A"}
      </Text>
    </View>
  );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = usefetch(() =>
    fetchMovieDetails(id as string),
  );

  return (
    <View className={"bg-primary flex-1"}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className={"w-full h-[550px]"}
            resizeMode={"stretch"}
          />
        </View>
        <View className={"flex-col items-start justify-center mt-5 px-5"}>
          <Text className={"text-white text-xl font-bold"}>{movie?.title}</Text>
          <View className={"flex-row items-center gap-x-1 mt-2"}>
            <Text className={"text-light-200 text-sm"}>
              {movie?.release_date.split("-")[0]}
            </Text>
            <Text className={"text-light-200 text-sm"}>
              {movie?.runtime} Min
            </Text>
          </View>
          <View
            className={
              "flex-row bg-dark-100 items-center px-2 py-1 gap-x-1 mt-2"
            }
          >
            <Image source={icons.star} className={"size-4"} />
            <Text className={"text-white font-bold text-sm"}>
              {(movie?.vote_average ?? 0).toFixed(1)}
            </Text>
            <Text className={"text-light-200 text-sm"}>
              ({movie?.vote_count} votes)
            </Text>
          </View>
          <MovieInfo label={"Overview"} value={movie?.overview} />
          <MovieInfo
            label={"Genres"}
            value={movie?.genres.map((g) => g.name).join(" - ")}
          />
          <View className={"flex flex-row justify-between w-1/2"}>
            <MovieInfo
              label="Budget"
              value={`$${((movie?.budget ?? 0) / 1_000_000).toLocaleString()} million`}
            />

            <MovieInfo
              label="Revenue"
              value={`$${((movie?.revenue ?? 0) / 1_000_000).toLocaleString()} million`}
            />
          </View>
          <MovieInfo
            label={"Production Companies"}
            value={movie?.production_companies.map((c) => c.name).join(" - ")}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-16 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};
export default MovieDetails;
