import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import styled from 'styled-components';

const GraphContainer = styled.div`
  margin-top: 20px;
  /* background: #627284; */
  background: #fff;
  padding: 25px 15px 0;
  border-radius: 12px;
  /* box-shadow: inset 1px 1px 2px rgba(0,0,0,0.15); */
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0.5px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.05) 0px 2px 4px 0px;
  @media (max-width: 768px) {
    background: none;
    box-shadow: none;
    padding: 0;
  }
  transition: all 250ms ease 0s;
  :hover {
    @media (min-width: 768px) {
      transform: translateY(-5px);
      box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 0px, rgba(0, 0, 0, 0.05) 0px 2px 6px, rgba(0, 0, 0, 0.05) 0px 10px 20px;
    }
  }
`;

const LegendContainer = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
`;

const LegendItem = styled.h4`
  position: relative;
  :not(:last-of-type) {
    margin-right: 20px; 
  }
  display: inline-block;
  font-size: 12px;
  /* color: ${ props => {
    switch( props.info ) {
      case 'success':
        return '#02543f';
      case 'danger':
        return '#b60c0c';
      case 'warning':
        return '#a44c1f';
      default:
        return '';
    }
  } }; */
  color: #2a2a2a;
  font-weight: 500;
  margin-top: 0;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  /* background-color: ${ props => {
    switch( props.info ) {
      case 'danger':
        return '#f8dede';
      case 'success':
        return '#def8ed';
      case 'warning':
        return '#f8e5ba';
      default:
        return '';
    }
  } }; */
  :before {
    display: block;
    content: '';
    position: absolute;
    top: 3px;
    left: -12px;
    height: 13px;
    width: 13px;
    border-radius: 50%;
    background: ${ props => {
      switch( props.info ) {
      case 'danger':
        return '#f8dede';
      case 'success':
        return '#def8ed';
      case 'warning':
        return '#f8e5ba';
      default:
        return '';
      }
    } };
    border-width: 1px;
    border-style: solid;
    border-color: ${ props => {
      switch( props.info ) {
      case 'success':
        return '#02543f';
      case 'danger':
        return '#e192a5';
      case 'warning':
        return 'hsla( 42, 90%, 55%, 1 )';
      default:
        return '';
    }
    } };
  }
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
          borderColor: "#e192a5",
          backgroundColor: 'rgba(225, 146, 165, 0.5)',
          // pointBackgroundColor: 'fbd0d2',
          pointRadius: 1,
          fill: true,
          borderWidth: 2
        },
        { 
          data: [...chartData.map( x => x.confirmed )],
          label: "Confirmed",
          borderColor: "hsla( 42, 90%, 70%, 1 )",
          backgroundColor: 'rgba( 249, 214, 133, 0.5 )',
          fill: true,
          pointBackgroundColor: '#f9e6ba',
          // pointBorderColor: '#a54c1f',
          pointRadius: 1,
          borderWidth: 2
        }
      ]
    },
    options: {
      aspectRatio: 2.75,
      legend: {
        display: false,
        position: 'bottom',
        align: 'end',
        labels: {
          fontStyle: 'bold',
          // fontColor: '#fff'
        }        
      },
      tooltips: {
        mode: 'index',
        position: 'average',
        cornerRadius: 4,
        displayColors: false,
        caretSize: 8,
        intersect: false,
        itemSort: (a, b, data) => b.yLabel - a.yLabel,
        xPadding: 10,
        yPadding: 10,
        // backgroundColor: 'rgba( 0, 0, 0, 0.8 )',
        backgroundColor: 'rgba( 31, 50, 71, 0.95 )',
        bodySpacing: 4,
        // bodyFontStyle: 'bold',
        multiKeyBackground: 'rgba(0,0,0,0)',
        borderWidth: 0,
        borderColor: 'rgba(255, 255, 255, 0.7)',
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
          time: {
            displayFormats: {
              'millisecond': 'MMM DD',
              'second': 'MMM DD',
              'minute': 'MMM DD',
              'hour': 'MMM DD',
              'day': 'MMM DD',
              'week': 'MMM DD',
              'month': 'MMM DD',
              'quarter': 'MMM DD',
              'year': 'MMM DD'
            }
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 12,
            // maxRotation: 0
            // fontColor: 'rgba( 255, 255, 255, 0.7 )'
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
            maxTicksLimit: 7,
            // fontColor: 'rgba( 255, 255, 255, 0.7 )'
          },
          gridLines: {
            color: 'rgba( 0, 0, 0, 0.05 )',
            zeroLineColor: 'rgba( 0, 0, 0, 0.05 )'
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
        xAxis.ticks.fontSize = Math.min( ( height * 8 / 100 ), 12 );
        yAxis.ticks.fontSize = Math.min( ( height * 8 / 100 ), 12 );
        xAxis.ticks.maxTicksLimit = width > 600 ? 12 : 6;
        yAxis.ticks.maxTicksLimit = width > 600 ? 7 : 4;
        c.config.data.datasets[0].pointRadius = width <= 600 ? 0 : 0;
        c.config.data.datasets[1].pointRadius = width <= 600 ? 0 : 0;
        c.config.options.legend.align = width > 600 ? 'end' : 'center';
        c.config.options.legend.labels.fontSize = width > 600 ? 12 : 11;
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
      <LegendContainer>
        <LegendItem info="danger">Deaths</LegendItem>
        <LegendItem info="warning">Confirmed</LegendItem>
      </LegendContainer>
    </GraphContainer>
  )
}