import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { IGetAllApp } from '../../interface';
import 'materialize-css';


const monthNow = (moment().month() + 1).toString();
const yearNow = moment().year().toString();
let list: number = 1;


export const GetAllApplications: React.FC<{applications: IGetAllApp[]}> = ({applications}) => {
    // window.M.AutoInit();
    const [selectedOptionMonth, setSelectedOptionMonth] = useState<String>(monthNow);
    const [selectedOptionYear, setSelectedOptionYear] = useState<String>(yearNow);
    
    const selectChangeMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOptionMonth(value);
    };
    
    const selectChangeYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOptionYear(value);
    };
    const uniqeMonths: string[] = Array.from(new Set(applications.map((o) => o.month.toString())));
    console.log(uniqeMonths);
    const uniqeYears: number[] = Array.from(new Set(applications.map((o: any) => o.year)));
    console.log(uniqeYears);
    
    useEffect(() => {
        window.M.AutoInit();
    });
    

    return (
      <div className="row col s12">
        <div className="input-field col s3">
          <select onChange={selectChangeMonth} defaultValue={moment().month() + 1}>
            {uniqeMonths.map((month: any) => {
              return (
                <>
                  <option value={month} >
                    {moment()
                      .month(month - 1)
                      .format("MMMM")}
                  </option>
                </>
              );
            })}
          </select>
          <label>Choose the Month</label>
        </div>
        <div className="input-field col s3">
          <select onChange={selectChangeYear} defaultValue={moment().year()}>
            {uniqeYears.map((year: any) => {
              return (
                <>
                  <option value={year}>
                    {year}
                  </option>
                </>
              );
            })}
          </select>
          <label>Choose one Year</label>
        </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Num</th>
              <th>Name</th>
              <th>Position</th>
              <th>Month</th>
              <th>Year</th>
            </tr>
          </thead>
          {}
          <tbody>
            {applications.map((app: IGetAllApp, i) => {
              if (
                selectedOptionMonth === app.month.toString() &&
                selectedOptionYear === app.year.toString()
              ) {
                return (
                  <tr key={Math.random()}>
                    <td>{list++}</td>
                    <td>{app.firstName}</td>
                    <td>{app.recipientData}</td>
                    <td>{app.sendMethod}</td>
                    <td>{app.lastName}</td>
                  </tr>
                );
              } else {
                return <></>;
              }
            })}
          </tbody>
        </table>
      </div>
      </div>
    )
}