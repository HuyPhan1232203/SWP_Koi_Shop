import { useRef } from "react";
import "./certificate.css"; // Add a CSS file for styling
import { Document, Page, Text, View } from "@react-pdf/renderer";

function Certificate({ koi }) {
  const styles = {
    koiCertificateText: {
      fontSize: "18px",
      margin: "10px 0",
    },
    koiCertificateName: {
      fontSize: "30px",
      fontWeight: "bold",
      color: "#d63447",
    },
    koiCertificateDegree: {
      fontSize: "26px",
      margin: "15px 0",
      color: "#444",
    },
    koiCertificateOwner: {
      fontSize: "24px",
      marginBottom: "20px",
      color: "#333",
    },
    koiCertificateDate: {
      fontSize: "16px",
      marginTop: "40px",
      color: "#777",
    },
    koiCertificateSignature: {
      fontSize: "18px",
      marginTop: "40px",
      position: "absolute",
      bottom: "20px",
      right: "50px",
      color: "#555",
    },
    koiTitle: {
      fontSize: "38px",
      fontWeight: "bold",
      color: "#333",
    },
  };

  return (
    <Document>
      <Page size="A4">
        <View>
          <Text style={styles.koiTitle}>Koi Fish Certificate</Text>
          <Text
            style={styles.koiCertificateText}
            className="koi-certificate-text"
          >
            This certifies that
          </Text>
          <Text
            style={styles.koiCertificateName}
            className="koi-certificate-name"
          >
            {koi?.name}
          </Text>
          <Text
            style={styles.koiCertificateText}
            className="koi-certificate-text"
          >
            has been awarded the
          </Text>
          <Text
            style={styles.koiCertificateDegree}
            className="koi-certificate-degree"
          >
            {koi?.imageUrl}
          </Text>
          <Text
            style={styles.koiCertificateText}
            className="koi-certificate-text"
          >
            price
          </Text>
          <Text
            style={styles.koiCertificateOwner}
            className="koi-certificate-owner"
          >
            {koi?.price}
          </Text>
          <Text
            style={styles.koiCertificateSignature}
            className="koi-certificate-signature"
          >
            koi.bornYear
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default Certificate;
