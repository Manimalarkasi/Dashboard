import { Box, useTheme } from '@mui/material';
import React from 'react'
import { useGetGeographyQuery } from '../../state/Api';
import Header from '../../components/Header';
import { geoData } from '../../state/geoData';
import { ResponsiveChoropleth } from '@nivo/geo';
function Geography() {
    const theme = useTheme();
    const { data } = useGetGeographyQuery();
    console.log("data" , data)
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="GEOGRAPHY" subtitle="Find where yuor users are lociated" />
        <Box 
        mt="40px"
        height="75vh"
        border={`2px solid ${theme.palette.secondary[200]}`}
        borderRadius="5px"
        >
            {data ? ( 
            <ResponsiveChoropleth
        data={data}
        theme = {{
            axis:{
                domain:{
                    line:{
                        stroke: theme.palette.secondary[200]
                    }
                },
                legend:{
                    text:{
                        fill:theme.palette.secondary[200]
                    },
                },
                ticks:{
                    line:{
                        stroke:theme.palette.secondary[200],
                        strokeWidth:1,
                    },text:{
                        fill:theme.palette.secondary[200]
                    },
                },
            },
            legends:{
                text:{
                    fill:theme.palette.secondary[200]
                },
            },
            tooltip:{
                container:{
                    color:theme.palette.primary.main,
                },
            },
        }}
        features={geoData.features}
        margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
        // colors="nivo"
        domain={[ 0, 60 ]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={150}
        projectionTranslation={[ 0.45, 0.6 ]}
        projectionRotation={[ 0, 0, 0 ]}
        // graticuleLineColor="#dddddd"
        borderWidth={1.3}
        borderColor="#ffffff"
        // defs={[
        //     {
        //         id: 'dots',
        //         type: 'patternDots',
        //         background: 'inherit',
        //         color: '#38bcb2',
        //         size: 4,
        //         padding: 1,
        //         stagger: true
        //     },
        //     {
        //         id: 'lines',
        //         type: 'patternLines',
        //         background: 'inherit',
        //         color: '#eed312',
        //         rotation: -45,
        //         lineWidth: 6,
        //         spacing: 10
        //     },
        //     {
        //         id: 'gradient',
        //         type: 'linearGradient',
        //         colors: [
        //             {
        //                 offset: 0,
        //                 color: '#000'
        //             },
        //             {
        //                 offset: 100,
        //                 color: 'inherit'
        //             }
        //         ]
        //     }
        // ]}
        // fill={[
        //     {
        //         match: {
        //             id: 'CAN'
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: 'CHN'
        //         },
        //         id: 'lines'
        //     },
        //     {
        //         match: {
        //             id: 'ATA'
        //         },
        //         id: 'gradient'
        //     }
        // ]}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: theme.palette.background.alt,
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />) : <>loading....</>}
        </Box>
    </Box>
  )
}

export default Geography