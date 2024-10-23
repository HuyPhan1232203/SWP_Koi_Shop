import { Document, Page, Text, View } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import api from "../config/axios";
import { toast } from "react-toastify";
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "#E4E4E4",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });
function PDF() {
  const [koiList, setKoiList] = useState([]);

  // Create Document Component
  const fetchKoi = async () => {
    try {
      const res = await api.get("koi");
      setKoiList(res.data.content);
    } catch (err) {
      toast.error(err);
    }
  };
  useEffect(() => {
    fetchKoi();
  }, []);
  // const MyDocument = () => (
  //   <Document>
  //     <Page size="A4" style={styles.page}>
  //       <View style={styles.section}>
  //         <Text>Section #1</Text>
  //       </View>
  //       <View style={styles.section}>
  //         <Text>Section #2</Text>
  //       </View>
  //     </Page>
  //   </Document>
  // );
  return <div></div>;
}

export default PDF;
