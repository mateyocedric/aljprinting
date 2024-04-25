
import React, { useContext } from 'react';
import { Page, Text, Document, View, StyleSheet} from "@react-pdf/renderer"


// Define custom receipt size
const receiptWidth = 80; // in millimeters
const receiptHeight = 200; // in millimeters

// Define styles
const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      width: `${receiptWidth}mm`,
      height: `${receiptHeight}mm`,
      padding: 10,
    },
    section: {
      marginBottom: 10,
      textAlign: 'center'
    },
    header: {
      fontSize: 16,
      marginBottom: 10,
      textAlign: 'center',
    },
    subHeader: {
      fontSize: 12,
      marginBottom: 5,
      textAlign: 'center',
    },
    text: {
      fontSize: 10,
    },
    item:{
      fontSize: 10,
      display:'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    line: {
      borderBottomColor: '#000000',
      borderBottomWidth: 1,
      alignSelf: 'stretch',
      marginTop: 10,
      marginBottom: 10,
      marginRight: 10,
      marginLeft: 10,
    },
    total:{
      textAlign: 'right',
      fontSize: 10,
    },
  });


const PDFfile = ( data  ) =>{
  // const data = useContext(DataContext);
  // const [data, setData] = useState('');
    return(
        <Document>
            {/* {console.log("data", data.data.date)} */}
            <Page style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.header}>ALJ PRINTS AND MERCHANDISE</Text>
                <Text style={styles.subHeader}>Thank you for your purchase!</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>id: {data.data.id}</Text>
                <Text style={styles.text}>Date: {data.data.date}</Text>
            </View>

            <View style={styles.section}>

            <Text style={[styles.text, styles.bold]}>Items Purchased:</Text>
            <View style={styles.item}>
                <Text > item</Text>
                <Text > qty</Text>
                <Text >price</Text>
                <Text > sub total </Text>
              </View>
            <View style={styles.line} />

            {data.data.items.map((item, index) => (
              <View key={index} style={styles.item}>
                <Text > {item.product_id}{item.name}</Text>
                <Text > {item.qty} {item.quantity}</Text>
                <Text > {item.price}</Text>
                <Text > {item.total}</Text>
              </View>

              
            ))}


            </View>
            <View style={styles.line} />
            <View style={styles.section}>
                <Text style={styles.total}>Total: Php{data.data.total}</Text>
                <Text style={styles.total}>Cash: Php{data.data.cash}</Text>
                <Text style={styles.total}>Change: Php{data.data.change}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Thank you for shopping with us!</Text>
            </View>
            </Page>
        </Document>
    )
}


export default PDFfile;