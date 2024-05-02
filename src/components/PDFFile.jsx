/* eslint-disable react/destructuring-assignment */

<<<<<<< Updated upstream
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"
=======
// import React  from 'react';
import { Page, Text, View, Document, StyleSheet} from "@react-pdf/renderer"
>>>>>>> Stashed changes


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
  item: {
    fontSize: 10,
    display: 'flex',
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
  total: {
    textAlign: 'right',
    fontSize: 10,
  },
});


<<<<<<< Updated upstream
const PDFfile = (data) => (
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
=======
const PDFfile = ( dataa  ) => {
  
// {id: 25, date: '2022-03-05T00:34:10.674000Z', time: '12:30 PM', items: Array(2), total: 725, …}
    const { data } = dataa
    const { id, date, items,total ,change, cash } = data
  // const data = useContext(DataContext);
  // const [data, setData] = useState('');
    console.log(1+1)
    return(
        <Document>
            {/* {console.log("data", data.data.date)} */}
            <Page style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.header}>ALJ PRINTS AND MERCHANDISE</Text>
                <Text style={styles.subHeader}>Thank you for your purchase!</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>id: {id}</Text>
                <Text style={styles.text}>Date: {date}</Text>
            </View>
>>>>>>> Stashed changes

      <View style={styles.section}>

        <Text style={[styles.text, styles.bold]}>Items Purchased:</Text>
        <View style={styles.item}>
          <Text > item</Text>
          <Text > qty</Text>
          <Text >price</Text>
          <Text > sub total </Text>
        </View>
        <View style={styles.line} />

<<<<<<< Updated upstream
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
=======
            {items.map((item, index) => (
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
                <Text style={styles.total}>Total: Php{total}</Text>
                <Text style={styles.total}>Cash: Php{cash}</Text>
                <Text style={styles.total}>Change: Php{change}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Thank you for shopping with us!</Text>
            </View>
            </Page>
        </Document>
    )
}
>>>>>>> Stashed changes


export default PDFfile;