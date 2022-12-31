const express = require('express');

const app = express();
const port = 3000;



///d

app.get('/users', (req,res)=> {
  res.send('유저입니다')
})


app.post('/login', (req, res) => {
  res.send('로그인입니다.')
})
///
app.post('/logout', (req, res) => {
  res.send('로그아웃입니다.')
})

app.post('/register', (req, res) => {
  res.send('레지스터입니다..')
})

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});