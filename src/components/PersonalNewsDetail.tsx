import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { colors, shadows } from "../utils/theme";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";

interface PersonalNewsDetailProps {
  nameOfStock: string;
  ticker: string;
  headline: string;
  date: string;
  newsContent: string;
}

interface ResponseObject {
  symbol: string;
  desc: string;
  dt: string;
  attchmntFile: string;
  sm_name: string;
  sm_isin: string;
  an_dt: string;
  sort_date: string;
  seq_id: string;
  smIndustry: string | null;
  orgid: string | null;
  attchmntText: string;
  bflag: string | null;
  old_new: string | null;
  csvName: string | null;
  exchdisstime: string;
  difference: string;
  fileSize: string;
  attFileSize: string;
  hasXbrl: boolean;
}

export function PersonalNewsDetail({
  nameOfStock,
  ticker,
  headline,
  date,
  newsContent,
}: PersonalNewsDetailProps) {
  const queryClient = useQueryClient();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["stockDetail"],
    queryFn: fetchResponse,
    staleTime: Infinity
  });

  const [personalNewsObject, setPersonalNewsObject] = useState<
    ResponseObject[]
  >([]);

  async function fetchResponse() {
    try {
      const response = await axios.get(
        "http://192.168.29.169:3000/api/announcements/TCS"
      );
      console.log("Response data:", response.data);
      setPersonalNewsObject(
        Array.isArray(response.data) ? response.data : [response.data]
      );
      return response.data;
    } catch (error) {
      console.error("Axios error:", error);
    } finally {
      console.log("useEffect completed");
    }
  }

  // TODO: display a skeleton loader
  if (isPending) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  // TODO: display a proper error component
  if (isError) {
    return (
      <SafeAreaView>
        <Text>An error has occured.</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: colors.bg.primary }}
      showsVerticalScrollIndicator={false}
    >
      <View className="m-4">
        <View
          className="rounded-lg p-5 border"
          style={[
            {
              backgroundColor: colors.bg.secondary,
              borderColor: colors.accent.teal,
              borderWidth: 1.5,
              ...shadows.lg,
            },
          ]}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: colors.highlight.yellow,
                borderRadius: 6,
              }}
            >
              {/* SYMBOL */}
              <Text
                className="text-xs font-semibold"
                style={{ color: colors.bg.primary, fontFamily: "Poppins" }}
              >
                {/* {ticker}   */}
                {personalNewsObject[0]?.symbol}
              </Text>
            </View>
            {/* stock name  */}
            <Text
              className="text-sm font-semibold"
              style={{ color: colors.accent.tealLight, fontFamily: "Poppins" }}
            >
              {/* {nameOfStock} */}
              {personalNewsObject[0]?.sm_name}
            </Text>
          </View>

          <Text
            className="text-2xl font-bold mb-3"
            style={{ color: colors.text.primary, fontFamily: "Poppins" }}
          >
            {/* {headline} */}
            {personalNewsObject[0]?.desc}
          </Text>

          <Text
            className="text-xs mb-5"
            style={{ color: colors.text.tertiary, fontFamily: "Poppins" }}
          >
            {}
          </Text>

          <View
            style={{
              backgroundColor: colors.bg.primary,
              borderRadius: 8,
              padding: 16,
              borderLeftWidth: 4,
              borderLeftColor: colors.accent.teal,
            }}
          >
            <Text
              className="text-base"
              style={{
                color: colors.text.secondary,
                lineHeight: 24,
                fontFamily: "Poppins",
              }}
            >
              {/* {newsContent} */}
              {personalNewsObject[0]?.attchmntText}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
