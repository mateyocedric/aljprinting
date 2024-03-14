import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import {
  _analyticTasks,
  _analyticPosts,
  _analyticTraffic,
  _analyticOrderTimeline,
} from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';

import AnalyticsNews from '../analytics-news';
import AnalyticsTasks from '../analytics-tasks';
import AnalyticsCurrentVisits from '../analytics-current-visits';
import AnalyticsOrderTimeline from '../analytics-order-timeline';
import AnalyticsWebsiteVisits from '../analytics-website-visits';
import AnalyticsWidgetSummary from '../analytics-widget-summary';
import AnalyticsTrafficBySite from '../analytics-traffic-by-site';
import AnalyticsCurrentSubject from '../analytics-current-subject';
import AnalyticsConversionRates from '../analytics-conversion-rates';

// ----------------------------------------------------------------------

export default function OverviewAnalyticsView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
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
            title="Weekly Sales"
            total={714000}
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

         

        <Grid xs={12} sm={6} md={4}>
          <AnalyticsWidgetSummary
            title="Weekly Customers"
            total={129}
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AnalyticsWidgetSummary
            title="AVG SALES"
            total={2341333}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits
            title="Monthly Sales"
            subheader="(+43%) than last year"
            chart={{
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
                },
                
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentVisits
            title="Top Categories"
            chart={{
              series: [
                { label: 'Print', value: 4344 },
                { label: 'Bind', value: 5435 },
                { label: 'Laminate', value: 1443 },
                { label: 'School Supplies', value: 4443 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsConversionRates
            title="Inventory Management"
            chart={{
              series: [
                { label: 'Printer Paper (Letter Size)', value: 400 },
                { label: 'Printer Paper (Legal Size)', value: 430 },
                { label: 'Ballpoint Pens (Blue)', value: 448 },
                { label: 'Ballpoint Pens (Black)', value: 470 },
                { label: 'Lamination Sheets (Letter Size)', value: 540 },
                { label: 'Printer Ink (Color)', value: 580 },
                { label: 'Printer Ink (Black)', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'T-Shirt (Small, White)', value: 1200 },
                { label: 'T-Shirt (Medium, Black)', value: 1380 },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
