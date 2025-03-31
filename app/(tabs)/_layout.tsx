import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

const TabIcon = ({ focused, title, icon }: any) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        style={{
          minHeight: 64,
        }}
        className="flex flex-row w-full flex-1 min-w-[112px]  mt-4 justify-center items-center rounded-full overflow-hidden"
      >
        <Image source={icon} tintColor={"#151312"} className={"size-5"} />
        <Text className={"text-secondary ml-2 text-base font-semibold"}>
          {title}
        </Text>
      </ImageBackground>
    );
  } else {
    return (
      <View className="size-full justify-center items-center mt-4 rounded-full">
        <Image source={icon} tintColor="#A8B5DB" className="size-5" />
      </View>
    );
  }
};

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0d23",
          borderRadius: 50,
          borderColor: "#0f0d23",
          marginHorizontal: 20,
          marginBottom: 50,
          height: 52,
          position: "absolute",
          overflow: "hidden",
        },
      }}
    >
      <Tabs.Screen
        name={"index"}
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title={"Home"} icon={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name={"search"}
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title={"Search"} icon={icons.search} />
          ),
        }}
      />
      <Tabs.Screen
        name={"saved"}
        options={{
          headerShown: false,
          title: "Saved",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title={"Saved"} icon={icons.save} />
          ),
        }}
      />
      <Tabs.Screen
        name={"profile"}
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title={"Profile"} icon={icons.person} />
          ),
        }}
      />
    </Tabs>
  );
};
export default _Layout;
