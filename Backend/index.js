const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(cors())
app.use(express.json());
app.use(express.static('files'))

// Available Routes
app.use('/api/banner', require('./routes/banner'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/gallary', require('./routes/gallary'))
app.use('/api/timeTable', require('./routes/time-table'))
app.use('/api/news', require('./routes/news'))
app.use('/api/faculty', require('./routes/faculty'))
app.use('/api/facilities', require('./routes/facilities'))
app.use('/api/alumni', require('./routes/alumni'))
app.use('/api/fee', require('./routes/fee'))
app.use('/api/bannerKhagha', require('./routes/bannerKhagha'))
app.use('/api/gallaryKhagha', require('./routes/gallaryKhagha'))
app.use('/api/timeTableKhagha', require('./routes/time-tableKhagha'))
app.use('/api/newsKhagha', require('./routes/newsKhagha'))
app.use('/api/facultyKhagha', require('./routes/facultyKhagha'))
app.use('/api/facilitiesKhagha', require('./routes/facilitiesKhagha'))
app.use('/api/alumniKhagha', require('./routes/alumniKhagha'))
app.use('/api/feeKhagha', require('./routes/feeKhagha'))
app.use('/api/enquiry', require('./routes/enquiry'))
app.use('/api/enquiryKhagha', require('./routes/enquiryKhagha'))


app.listen(port, () => {
  console.log(`School backend listening on port ${port}`)
})


