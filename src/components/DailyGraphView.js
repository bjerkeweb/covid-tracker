import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import styled from 'styled-components';

const GraphContainer = styled.div`
  margin-top: 30px;
`;

Chart.defaults.global.defaultFontFamily = '-apple-system, BlinkMacSystemFont, sans-serif';

Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
  draw( ease ) {
    Chart.controllers.line.prototype.draw.call(this, ease);

    if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
      let activePoint = this.chart.tooltip._active[0];
      let ctx = this.chart.ctx;
      let x = activePoint.tooltipPosition().x;
      let topY = this.chart.scales['y-axis-0'].top;
      let bottomY = this.chart.scales['y-axis-0'].bottom;

      // draw line
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba( 0, 0, 0, 0.05)';
      ctx.stroke();
      ctx.restore();
    }
  }
});

export default function DailyGraphView({ chartData }) {
  const config = {
    type: 'LineWithLine',
    data: {
      labels: [...chartData.map( x => x.date )],
      datasets: [
        { 
          data: [...chartData.map( x => x.deaths )],
          label: "Deaths",
          borderColor: "#db1a1a",
          backgroundColor: '#fbd0d2',
          // pointBackgroundColor: 'fbd0d2',
          pointRadius: 1,
          fill: true,
          borderWidth: 0
        },
        { 
          data: [...chartData.map( x => x.confirmed )],
          label: "Confirmed",
          borderColor: "#e4a30c",
          backgroundColor: '#f9e6ba',
          fill: true,
          pointBackgroundColor: '#f9e6ba',
          // pointBorderColor: '#a54c1f',
          pointRadius: 1,
          borderWidth: 0
        }
      ]
    },
    options: {
      // aspectRatio: 2.5,
      legend: {
        position: 'bottom',
        align: 'end',
        labels: {
          fontStyle: 'bold'
        }        
      },
      tooltips: {
        mode: 'index',
        position: 'average',
        cornerRadius: 4,
        caretSize: 8,
        intersect: false,
        itemSort: (a, b, data) => b.yLabel - a.yLabel,
        xPadding: 10,
        yPadding: 10,
        backgroundColor: 'rgba( 0, 0, 0, 0.8 )',
        bodySpacing: 4,
        bodyFontStyle: 'bold',
        multiKeyBackground: 'rgba(0,0,0,0)',
        borderWidth: 0,
        callbacks: {
          labelColor: ( tooltipItem, chart ) => ({
            backgroundColor: config.data.datasets[tooltipItem.datasetIndex].backgroundColor,
            borderColor: 'rgba(0,0,0,0)'
          }),
          label: ( tooltipItem, data ) => {
            const label = data.datasets[tooltipItem.datasetIndex].label || '';

            if (label) {
              return `${label}: ${parseInt(tooltipItem.value).toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        xAxes: [{
          type: 'time',
          ticks: {
            autoSkip: true,
            maxTicksLimit: 12
          },
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          ticks: {
            callback: val => {
              if ( val > 0 && val >= 1000 && val < 1000000 ) {
                return (val/1000).toLocaleString() + 'K'
              }
              if ( val > 0 && val >= 1000000 ) {
                return ( val/1000000 ) + 'M'
              }
              return val;
            },
            autoSkipLimit: true,
            maxTicksLimit: 7
          }
        }]
      }
    },
    plugins: [{
      beforeUpdate( c ) {
        const width = c.chart.width;
        const height = c.chart.height;
        const showTicks = width > 600 ? true : false;
        const xAxis = c.options.scales.xAxes[0];
        const yAxis = c.options.scales.yAxes[0];
        // c.options.scales.yAxes[0].ticks.display = showTicks;
        // c.options.scales.xAxes[0].ticks.display = showTicks;
        xAxis.ticks.fontSize = Math.min( ( height * 7 / 100 ), 12 );
        yAxis.ticks.fontSize = Math.min( ( height * 7 / 100 ), 12 );
        xAxis.ticks.maxTicksLimit = width > 600 ? 12 : 6;
        yAxis.ticks.maxTicksLimit = width > 600 ? 7 : 4;
        c.config.data.datasets[0].pointRadius = width <= 600 ? 0 : 1;
        c.config.data.datasets[1].pointRadius = width <= 600 ? 0 : 1;
      }
    }]
  }
  const chartContainer = useRef( null );

  useEffect( () => {
    new Chart( chartContainer.current, config );
  }, [chartContainer])

  return (
    <GraphContainer>
      <canvas ref={ chartContainer } />
    </GraphContainer>
  )
}