import {Line} from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import classes from './MyChart.module.css'
export const MyChart = (props) =>{
    const {resultDataForChart = {}} = props
    const options = {
        responsive : true,
        plugins : {
            legend : {
                position : 'top',
            },
            title : {
                display : true,
                text : 'График процентов'
            }
        }
    }

    const labels = []
    const resData = []
    for (let x in resultDataForChart){
        labels.push(x)
        resData.push(resultDataForChart[x])
    }
    const data = {
        labels,
        datasets: [
            {
                fill : true,
                label : 'Сумма процентов за текущий месяц',
                data : resData,
                borderColor : 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)'
            }

        ]

    }
    return (
        <div className={classes.myChart}>
            <Line data={data} options={options}/>
        </div>
    )
}