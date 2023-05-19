import React, { useState, useEffect } from 'react';

function App() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch data from the provided endpoint
    fetch('https://api.example.com/employees')
      .then(response => response.json())
      .then(data => setEmployees(data.employees))
      .catch(error => console.error(error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.id.toString().includes(searchTerm) ||
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
      />
      {filteredEmployees.map((employee) => (
        <div key={employee.id}>
          <h2>{employee.name}</h2>
          <p>ID: {employee.id}</p>
          <p>Designation: {employee.designation}</p>
          <ul>
            {employee.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <h3>Projects:</h3>
          {employee.projects && employee.projects.map((project, index) => (
            <div key={index}>
              <h4>{project.name}</h4>
              <p>Description: {project.description}</p>
              <ul>
                {project.team.map((teamMember, index) => (
                  <li key={index}>{teamMember.name} - {teamMember.role}</li>
                ))}
              </ul>
              <h5>Tasks:</h5>
              <ul>
                {project.tasks.map((task, index) => (
                  <li key={index}>
                    {task.name} - Status: {task.status ? task.status : 'Not defined'}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
