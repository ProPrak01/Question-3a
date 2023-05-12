const express = require('express');
const axios = require('axios');
const app = express();

app.get('/students', async (req, res) => {
    try {
      const response = await axios.get('https://1qy9d2uuyg.execute-api.ap-northeast-1.amazonaws.com/default/Students-API');
      const students = response.data;
      res.json(students);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
app.get('/students/sort', async (req, res) => {
    try {
      const response = await axios.get('https://1qy9d2uuyg.execute-api.ap-northeast-1.amazonaws.com/default/Students-API');
      const students = response.data;
      students.sort((a, b) => a.name.localeCompare(b.name));
      res.json(students);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Endpoint to filter the list of students by college
app.get('/students/filter', async (req, res) => {
  const college = req.query.college;
  if (!college) {
    res.status(400).json({ message: 'College not specified' });
    return;
  }

  try {
    const response = await axios.get('https://1qy9d2uuyg.execute-api.ap-northeast-1.amazonaws.com/default/Students-API');
    const students = response.data;
    const filteredStudents = students.filter(student => student.college === college);
    res.json(filteredStudents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(1000, () => {
  console.log('Server started on port 3000');
});
