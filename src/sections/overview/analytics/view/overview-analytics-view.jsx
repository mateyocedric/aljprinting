import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useSettingsContext } from 'src/components/settings';

import AnalyticsCurrentVisits from '../analytics-current-visits';
import AnalyticsWebsiteVisits from '../analytics-website-visits';
import AnalyticsWidgetSummary from '../analytics-widget-summary';
import AnalyticsConversionRates from '../analytics-conversion-rates';

// ----------------------------------------------------------------------

export default function OverviewAnalyticsView() {

  const initialValue = [{ label: 'Print', value: 4344 },
  { label: 'Bind', value: 5435 },
  { label: 'Laminate', value: 1443 },
  { label: 'School Supplies', value: 4443 },]

  const[topCategories,SetTopCategories] = useState(initialValue)
  const[Inventory,setInventory] = useState(initialValue)
  const[salesData,setSalesData] = useState(initialValue)


  const initialMonth = {
    labels: [
    '01/01/2024',
    '02/01/2024',
    '03/01/2024',
    '04/01/2024',
    '05/01/2024',
    '06/01/2024',
    '07/01/2024',
    '08/01/2024',
    '09/01/2024',
    '10/01/2024',
    '11/01/2024',
  ],
  series: [
    {
      name: 'Sales',
      type: 'column',
      fill: 'solid',
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
    },
    {
      name: 'Customers',
      type: 'area',
      fill: 'gradient',
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
    },]}
  const[monthData,setMonthData] = useState(initialMonth)

  useEffect(() => {
    axios.get('https://alj-django.onrender.com/api/get-top-categories/')
      .then(response => {
        SetTopCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    axios.get('https://alj-django.onrender.com/api/materials-get-all/')
    .then(response => {

      let arr = response.data
        arr = arr.map(item => (
          {
            id: item.id,
            label: item.name,
            value: item.stock,
          }
        ));

      setInventory(arr);
      console.log('arr',arr)
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

    axios.get('https://alj-django.onrender.com/api/get-sales-data/')
    .then(response => {
      setSalesData(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

    axios.get('https://alj-django.onrender.com/api/get-month-data/')
    .then(response => {
      setMonthData(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });


  }, []);

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>


      <Stack sx={{ width: '100%' }} spacing={1}>
      {
        Inventory.map( (item,i)=> ( item.value < 20 ? <Alert key={i} severity="error"> {item.label} has only {item.value} stock left </Alert> : console.log('a')   ))
      }
      </Stack>

      
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4}>
          <AnalyticsWidgetSummary
            title="This month sale"
            total={ String( salesData.month)}
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

         

        <Grid xs={12} sm={6} md={4}>
          <AnalyticsWidgetSummary
            title="Yesterdays Sales"
            total={ String(salesData.previous)}
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AnalyticsWidgetSummary
            title="Todays Sales"
            total={ String(salesData.today)}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits
            title="Monthly Sales"
            subheader=""
            chart={  monthData}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentVisits
            title="Top Categories"
            chart={{
              series: topCategories,
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsConversionRates
            title="Inventory Management"
            chart={{
              series: Inventory,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
