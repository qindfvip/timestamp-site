# API Implementation Guide

Although our Unix timestamp conversion tool website is built with static HTML, CSS, and JavaScript, we can implement API interfaces using different backend technologies. Here are some common implementation approaches:

## 1. Node.js + Express

```javascript
const express = require('express');
const app = express();
const port = 3000;

// Timestamp to Date-Time
app.get('/api/timestamp-to-datetime', (req, res) => {
  const timestamp = req.query.timestamp;
  const timezone = req.query.timezone || 'Asia/Shanghai';
  
  if (!timestamp) {
    return res.status(400).json({ error: 'Missing timestamp parameter' });
  }
  
  const date = new Date(timestamp * 1000);
  const datetime = date.toLocaleString('zh-CN', { timeZone: timezone });
  
  res.json({
    timestamp: parseInt(timestamp),
    datetime: datetime,
    timezone: timezone
  });
});

// Date-Time to Timestamp
app.get('/api/datetime-to-timestamp', (req, res) => {
  const datetime = req.query.datetime;
  
  if (!datetime) {
    return res.status(400).json({ error: 'Missing datetime parameter' });
  }
  
  const date = new Date(datetime);
  const timestamp = Math.floor(date.getTime() / 1000);
  
  res.json({
    datetime: datetime,
    timestamp: timestamp
  });
});

// Get Current Timestamp
app.get('/api/current-timestamp', (req, res) => {
  const now = new Date();
  const timestamp = Math.floor(now.getTime() / 1000);
  const datetime = now.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
  
  res.json({
    timestamp: timestamp,
    datetime: datetime
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

## 2. Python + Flask

```python
from flask import Flask, request, jsonify
from datetime import datetime
import pytz

app = Flask(__name__)

# Timestamp to Date-Time
@app.route('/api/timestamp-to-datetime')
def timestamp_to_datetime():
    timestamp = request.args.get('timestamp')
    timezone = request.args.get('timezone', 'Asia/Shanghai')
    
    if not timestamp:
        return jsonify({'error': 'Missing timestamp parameter'}), 400
    
    try:
        timestamp = int(timestamp)
    except ValueError:
        return jsonify({'error': 'Invalid timestamp parameter'}), 400
    
    # 创建UTC时区的时间
    utc_dt = datetime.utcfromtimestamp(timestamp)
    
    # 转换到指定时区
    target_tz = pytz.timezone(timezone)
    target_dt = utc_dt.replace(tzinfo=pytz.utc).astimezone(target_tz)
    
    return jsonify({
        'timestamp': timestamp,
        'datetime': target_dt.strftime('%Y-%m-%d %H:%M:%S'),
        'timezone': timezone
    })

# Date-Time to Timestamp
@app.route('/api/datetime-to-timestamp')
def datetime_to_timestamp():
    datetime_str = request.args.get('datetime')
    
    if not datetime_str:
        return jsonify({'error': 'Missing datetime parameter'}), 400
    
    try:
        dt = datetime.strptime(datetime_str, '%Y-%m-%d %H:%M:%S')
        timestamp = int(dt.timestamp())
    except ValueError:
        return jsonify({'error': 'Invalid datetime format'}), 400
    
    return jsonify({
        'datetime': datetime_str,
        'timestamp': timestamp
    })

# Get Current Timestamp
@app.route('/api/current-timestamp')
def current_timestamp():
    now = datetime.now()
    timestamp = int(now.timestamp())
    datetime_str = now.strftime('%Y-%m-%d %H:%M:%S')
    
    return jsonify({
        'timestamp': timestamp,
        'datetime': datetime_str
    })

if __name__ == '__main__':
    app.run(debug=True, port=3000)
```

## 3. Deployment Recommendations

1. **Node.js Applications**: Can be deployed to cloud platforms that support Node.js, such as Heroku, Vercel, Netlify Functions, etc.
2. **Python Applications**: Can be deployed to cloud platforms that support Python, such as Heroku, PythonAnywhere, Google Cloud Run, etc.
3. **Static Website + API**: The static website can be deployed to a CDN (such as Netlify, Vercel, GitHub Pages), while the API can be deployed to a separate server or cloud functions.

## 4. Usage Instructions

After deploying the API, you need to update the example code in the API documentation page, replacing `http://localhost:8000` with your actual API address.

For example, if you deploy the API to `https://api.example.com`, the API call will become:

```javascript
// Timestamp to Date-Time
fetch('https://api.example.com/api/timestamp-to-datetime?timestamp=1609459200')
  .then(response => response.json())
  .then(data => console.log(data));
```

With this, your Unix timestamp conversion tool will have complete API functionality.