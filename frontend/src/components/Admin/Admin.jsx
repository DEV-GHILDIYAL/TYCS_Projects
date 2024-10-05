import React from 'react';
import './Admin.css';

const Admin = () => {
  const volunteers = [
    {
      id: 1,
      name: 'John Doe',
      event: 'Beach Cleanup',
      contact: 'johndoe@example.com',
      status: 'Confirmed',
    },
    // Additional volunteers
  ];

  return (
    <div className="admin">
      <h3>All Users</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Event</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((volunteer) => (
            <tr key={volunteer.id}>
              <td>{volunteer.name}</td>
              <td>{volunteer.event}</td>
              <td>{volunteer.contact}</td>
              <td>{volunteer.status}</td>
              <td>
                <button>Edit</button>
                <button>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
