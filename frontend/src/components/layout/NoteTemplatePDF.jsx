import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFF",
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    color: "orange",
    fontSize: 28,
  },
});

// Create Document Component
// eslint-disable-next-line react/prop-types
const NoteTemplatePDF = () => {
  const notesList = [
    {
      title: "A",
    },
    {
      title: "N",
    },
  ];
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Note Application</Text>
        </View>
        <View style={styles.section}>
          {notesList.map((note, index) => {
            <View key={index}>
              <Text style={styles.title}>{note.title}</Text>;
            </View>;
          })}
        </View>
      </Page>
    </Document>
  );
};

export default NoteTemplatePDF;
