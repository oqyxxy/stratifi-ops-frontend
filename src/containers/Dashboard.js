import React, { Component } from 'react';
import { Link } from 'react-router';


export default class Dashboard extends Component {

  render() {
    return (
      <div className="container">
        <div>
          <div className="dashboard-summary">
            <h1 className="m-t-2 text-gray-darkest">Welcome the dashboard</h1>
            <p>
              This is our internal StratiFi dashbaord for viewing and managing things that are trading, research & performance related. 
            </p>

            <div className="m-t-2 card-row-wrapper">
              <div>
                <div className="card dashboard-card">
                  <h3 className="text-title">Trading</h3>
                  <p>Ticker Order Management, T-costs, Vol Monitor etc.</p>
                  <Link to="/packages" className="btn btn-primary btn-black btn-title">Manage</Link>
                </div>

                <div className="card-offset"></div>

                <div className="card dashboard-card">
                  <h3 className="text-title">Performance</h3>
                  <p> View the performance of the various overlay strategies, number of accounts, etc.</p>
                  <Link to="/performance" className="btn btn-primary btn-black btn-title">Manage</Link>
                </div>
              </div>
            </div>

            <div className="m-t-2 card-row-wrapper">
              <div>
                <div className="card dashboard-card">
                  <h3 className="text-title">Research</h3>
                  <p>Run backtests, view analytics, etc.</p>
                  <Link to="/research" className="btn btn-primary btn-black btn-title">Manage</Link>
                </div>

                <div className="card-offset"></div>
                <div className="card dashboard-card" style={{border: 'none'}}></div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

}
