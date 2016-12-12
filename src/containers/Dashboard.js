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
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>

            <div className="m-t-2 card-row-wrapper">
              <div>
                <div className="card dashboard-card">
                  <h3 className="text-title">Trading</h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  <Link to="/packages" className="btn btn-primary btn-black btn-title">Manage</Link>
                </div>

                <div className="card-offset"></div>

                <div className="card dashboard-card">
                  <h3 className="text-title">Performance</h3>
                  <p> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                  <Link to="/performance" className="btn btn-primary btn-black btn-title">Manage</Link>
                </div>
              </div>
            </div>

            <div className="m-t-2 card-row-wrapper">
              <div>
                <div className="card dashboard-card">
                  <h3 className="text-title">Research</h3>
                  <p>An unknown printer took a galley of type and scrambled it.</p>
                  <Link to="/" className="btn btn-primary btn-black btn-title">Manage</Link>
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
