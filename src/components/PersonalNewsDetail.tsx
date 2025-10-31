import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { colors, shadows } from '../utils/theme';
import axios from 'axios';


// const personalNewsObject = 
//   {
//     symbol: "TEAMLEASE",
//     "desc": "Analysts/Institutional Investor Meet/Con. Call Updates",
//     "dt": "16102025164915",
//     "attchmntFile": "https://nsearchives.nseindia.com/corporate/TEAMLEASE_16102025164702_TeamLeaseIntimationofConcallonQ2FY26.pdf",
//     "sm_name": "Teamlease Services Limited",
//     "sm_isin": "INE985S01024",
//     "an_dt": "16-Oct-2025 16:49:15",
//     "sort_date": "2025-10-16 16:49:15",
//     "seq_id": "106409849",
//     "smIndustry": null,
//     "orgid": null,
//     "attchmntText": "Conference Call with Investors on Q2 FY26 Results",
//     "bflag": null,
//     "old_new": null,
//     "csvName": null,
//     "exchdisstime": "16-Oct-2025 16:49:16",
//     "difference": "00:00:01",
//     "fileSize": "3.74 MB",
//     "attFileSize": "3.74 MB",
//     "hasXbrl": true
// }



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
  const [personalNewsObject, setPersonalNewsObject] = useState<ResponseObject[]>([]);

  

  // useEffect(() => {
  //   axios.get('localhost:3000/api/announcements/TCS')
  //     .then(response => {
  //       const data = response.data;
  //       setPersonalNewsObject(Array.isArray(data) ? data : [data]);
  //     })
  //     .catch(err => console.error("Error fetching:", err));
  // }, []);
  
  useEffect(() => {
    console.log(" useEffect triggered");

    async function fetchResponse() {
      try {
        const response = await axios.get('http://localhost:3000/api/announcements/TCS');
        console.log("Response data:", response.data);
        setPersonalNewsObject(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (error) {
        console.error("Axios error:", error);
      } finally {
        console.log("useEffect completed");
      }      
    }
  
    fetchResponse();
  }, []);
  

  console.log("personalNewsObject", personalNewsObject)
  

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
            }
          ]}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
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
                style={{ color: colors.bg.primary, fontFamily: 'Poppins' }}
              >
                {/* {ticker}   */}
                {personalNewsObject[0]?.symbol}
              </Text>
            </View>
            {/* stock name  */}
            <Text
              className="text-sm font-semibold"
              style={{ color: colors.accent.tealLight, fontFamily: 'Poppins' }}
            >
              {/* {nameOfStock} */}
              {personalNewsObject[0]?.sm_name}
            </Text>
          </View>

          <Text
            className="text-2xl font-bold mb-3"
            style={{ color: colors.text.primary, fontFamily: 'Poppins' }}
          >
            {/* {headline} */}
            {personalNewsObject[0]?.desc}
          </Text>

          <Text
            className="text-xs mb-5"
            style={{ color: colors.text.tertiary, fontFamily: 'Poppins' }}
          >
            {/* {new Date(date).toLocaleDateString()} */}
            {/* {newsDate} */}  DATE
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
                fontFamily: 'Poppins',
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
