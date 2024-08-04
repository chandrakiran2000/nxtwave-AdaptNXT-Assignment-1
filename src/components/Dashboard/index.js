import { useState } from 'react'
import { PieChart, Pie, Legend, Cell, ResponsiveContainer, Label, LabelList, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts"
import './index.css'

const leftSidebarData = ["Dashboard", "Inventory", "Order", "Returns", "Customers", "Shipping", "Channel", "Integrations", "Calculators", "Reports", "Account"]


// const data = [{count: 809680,language: "Telugu",}, {count: 4555697,language: "Hindi",}, {count: 12345657,language: "English",}]

const lineChartData = [
    {"date": "6/30/2024 - 7/6/2024", "orders": 1600, "sales": 1400},
    {"date": "7/7/2024 - 7/13/2024", "orders": 800, "sales": 800},
    {"date": "7/21/2024 - 7/27/2024", "orders": 800, "sales": 500},
]
  

const pieChartData = [
    { name: 'WooCommerce Store', value: 1483.22, color: '#F67280' },
    { name: 'Shopify Store', value: 1175.78, color: '#44B394' },
  ];

  const totalSales = pieChartData.reduce((acc, data) => acc + data.value, 0);

const Dashboard = () => {
    const [activeBtn, setActiveBtn] = useState("Dashboard")
    
    const eachItem = (each) => {
        const avtiveBtnClass = activeBtn === each && "active-btn"
        const handleLeftBtn = () => (
            setActiveBtn(each)
        )
         return(
            <div className='btn-card'>
                <button onClick={handleLeftBtn} className={`left-btn ${avtiveBtnClass}`} type='button'>{each}</button>
            </div>
        )
    }

    const renderPieChart = () => {
        return(
            <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          cx="50%"
          cy="40%"
          data={pieChartData}
          startAngle={-90}
          endAngle={270}
          innerRadius="0%"
          outerRadius="70%"
          dataKey="value"
        >
          <Label
            value={`Total: ${totalSales}`}
            position="center"
            fill="#000"
            style={{ fontSize: '12px', fontWeight: 'bold',}}
          />
          <LabelList
            position="inside"
            fill="#fff"
            style={{ fontSize: '12px' }}
            formatter={(value ) => `${value.toFixed(2)}`}
          />
          <Cell name="WooCommerce Store" fill="#F67280" />
          <Cell name="Shopify Store" fill="#44B394" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
    </ResponsiveContainer>
        )
    }

    const renderLineChart = () => {
      const formatYAxis = (value) => {
        return `${(value / 1000).toFixed(1)}k`;
      };
      return(
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={lineChartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date"  />
            <YAxis tickFormatter={formatYAxis} dataKey="orders"/>
            <YAxis yAxisId="right" orientation="right" domain={[0, 4]} />
            <Tooltip />
            <Legend verticalAlign="top" align="center" wrapperStyle={{ paddingBottom: "30px", fontSize: "20px"}} />
            <Line type="monotone" dataKey="orders" stroke="#FFA500" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="sales" stroke="#4CAF50" activeDot={{ r: 8 }}/>
          </LineChart>
        </ResponsiveContainer>
      )
    }

    return(
        <div className="main-dashboard-card">
            <div className='side-bar-card'>
                {leftSidebarData.map(each => eachItem(each) )}
            </div>
            <div className='center-card'>
                <div className='heading-card'>
                    <h1 className='dashboard-heading'>Dashboard</h1>
                </div>
                <div className='reacharts-card'>
                    <div className='line-chart-card'>
                    <div className='reacharts-heading-cart'>
                        <h1 className='reacharts-heading-text'>Sales vs Orders ⓘ</h1>
                      </div>
                      <div className='chart-card'>
                        { renderLineChart()}
                      </div>
                    </div>
                    <div className='pie-chart-card'>
                      <div className='reacharts-heading-cart'>
                        <h1 className='reacharts-heading-text'>Portion of Sales ⓘ</h1>
                      </div>
                      <div className='chart-card'>
                        {renderPieChart()}
                      </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard