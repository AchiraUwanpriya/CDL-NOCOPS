import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import DashboardCard from '../../../components/theme/shared/DashboardCard';



const DoughnutChart = ({ title, data, showLegend = true, customLegendType = 'default' }) => {

  const [chartData, setChartData] = useState({ labels: [], series: [] });

  useEffect(() => {
    if (data) {
      const labels = data.map(item => item.SectorName);
      const series = data.map(item => parseInt(item.Count));

      setChartData({ labels: labels, series: series });
    }
  }, [data]);

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;
  const secondary = theme.palette.secondary.main;
  const secondarylight = theme.palette.secondary.light;
  const warning = theme.palette.warning.main;

  const optionsdoughnutchart = {
    labels: chartData.labels,
    chart: {
      id: 'donut-chart',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70px',
        },
      },
    },
    //This will remove the chart labels

    // legend: {
    //  show: showLegend,
    //   showForSingleSeries: false,
    //   showForNullSeries: true,
    //   showForZeroSeries: true,
    //   position: 'bottom',
    //   horizontalAlign: 'center',
    //   floating: false,
    //   fontSize: '10px',
    //   fontFamily: "'Plus Jakarta Sans', sans-serif",
    //   fontWeight: 200,

    // },


    //This Shows chart counts

    // legend: {
    //   show: showLegend,
    //   position: 'bottom',
    //   horizontalAlign: 'center',
    //   fontFamily: "'Plus Jakarta Sans', sans-serif",
    //   fontWeight: 'bold',
    //   labels: {
    //   },     
    //   formatter: function (seriesName, opts) {
    //     if (customLegendType === 'countOnly') {
    //       const count = opts.w.config.series[opts.seriesIndex];
    //       return count.toString(); // Only show count
    //     }
    //     return seriesName; // default
    //   },
    // },



    //decrease the font size
    legend: {
      show: showLegend,
      position: 'bottom',
      horizontalAlign: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 'bold',
      fontSize: '10px',
      labels: {
        colors: 'dark',
      },
      formatter: function (seriesName, opts) {
        if (customLegendType === 'countOnly') {
          const count = opts.w.config.series[opts.seriesIndex];
          return count.toString();
        }
        return seriesName;
      },
    },



    // colors: ['#4c84ff', '#8fa9ff', '#ff6384', '#ffb3b3', '#ffc107'],
    colors: [primary, primarylight, secondary, secondarylight, warning],
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
    },
  };

  return (
    <DashboardCard title={title}>
      <Grid container spacing={3} alignItems="center" justifyContent="center" >
        <Chart
          options={optionsdoughnutchart}
          series={chartData.series}
          type="donut"
          height="300px"
        />
      </Grid>
    </DashboardCard>
  );
};

export default DoughnutChart;
