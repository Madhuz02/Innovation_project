
import React, { useState } from "react";

export default function App() {
  const [certificates, setCertificates] = useState([]);
  const [form, setForm] = useState({
    name: "",
    course: "",
    date: "",
    id: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addCertificate = () => {
    if (!form.name || !form.course || !form.date || !form.id) {
      alert("Fill all fields");
      return;
    }
    setCertificates([...certificates, form]);
    setForm({ name: "", course: "", date: "", id: "" });
  };

  const deleteCertificate = (id) => {
    setCertificates(certificates.filter((c) => c.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1>Certificate Management System</h1>

      <div style={styles.form}>
        <input
          name="name"
          placeholder="Student Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="course"
          placeholder="Course"
          value={form.course}
          onChange={handleChange}
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
        />
        <input
          name="id"
          placeholder="Certificate ID"
          value={form.id}
          onChange={handleChange}
        />

        <button onClick={addCertificate}>Add Certificate</button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.course}</td>
              <td>{c.date}</td>
              <td>
                <button onClick={() => deleteCertificate(c.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
    textAlign: "center",
  },
  form: {
    marginBottom: "20px",
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  table: {
    margin: "auto",
    borderCollapse: "collapse",
    width: "80%",
  },
};
