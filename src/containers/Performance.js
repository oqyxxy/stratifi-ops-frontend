import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ProcessesProvider from '../providers/processes';


class Performance extends Component {

  static propTypes = {
    processes: PropTypes.array.isRequired,
    processesProvider: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.processesProvider.getList();
  }

  render() {
    const { processes } = this.props;
    const body = processes.map(process => (
      <tr>
        <td>{process.id}</td>
        <td>{process.status}</td>
      </tr>
    ));

    return (
      <section>
        <h1>Performance</h1>
        <p>
          Nullam quis risus eget urna mollis ornare vel eu leo.
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
          eget lacinia odio sem nec elit. Curabitur blandit tempus porttitor.
        </p>

        {
          processes.length ? (
            <table className="table table-bordered table-borderless-top">
              <thead className="thead-graphite">
                <th>Process ID</th>
                <th>Status</th>
              </thead>
              <tbody>{body}</tbody>
            </table>
          ) : (
            <p>There are no active processes.</p>
          )
        }

        <Link to="/" className="btn btn-primary btn-black btn-title">Back to dashboard</Link>
      </section>
    );
  }

}


export default connect(
  state => ({
    processes: state.processes.list,
  }),
  dispatch => ({
    processesProvider: new ProcessesProvider(dispatch),
  })
)(Performance);
