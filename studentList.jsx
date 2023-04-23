import React, { useState } from 'react';
import { Button, Table } from 'reactstrap';
import axios from 'axios';

const EnrolledStudentList = ({ courseId, enrolledStudents, setEnrolledStudents }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (studentId) => {
    try {
      setLoading(true);
      await axios.delete(`/api/courses/${courseId}/students/${studentId}`);
      const updatedEnrolledStudents = enrolledStudents.filter((student) => student._id !== studentId);
      setEnrolledStudents(updatedEnrolledStudents);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Enrolled Students</h2>
      {enrolledStudents.length === 0 && <p>No students enrolled yet.</p>}
      {enrolledStudents.length > 0 && (
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrolledStudents.map((student, index) => (
              <tr key={student._id}>
                <th scope="row">{index + 1}</th>
                <td>{student.name}</td>
                <td>
                  <Button color="danger" disabled={loading} onClick={() => handleDelete(student._id)}>
                    {loading ? 'Deleting...' : 'Delete'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default EnrolledStudentList;
