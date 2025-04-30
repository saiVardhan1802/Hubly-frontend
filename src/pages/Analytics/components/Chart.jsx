// import React from 'react';
import styles from './styles/Chart.module.css';

import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export default function Chart({ data }) {
    return (
        <div style={{ marginTop: '1em', height: '50vh', width: '60%', backgroundColor: '' }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid style={{ color: 'rgba(0, 0, 0, 0.5)' }} horizontal={true} vertical={false} />
                    <XAxis dataKey="week" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Line
                        type="monotone"
                        dataKey="chats"
                        stroke="#00D907"
                        activeDot={{ r: 8 }}
                        strokeWidth={4}
                        dot={{ stroke: 'black', strokeWidth: 3, r: 6, fill: 'white' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}