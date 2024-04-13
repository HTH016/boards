const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000;
const bodyParser = require('body-parser')
const db = require('./config/db.js');








/* ======================== ↑ ↑ ↑ Apply Express.js ↑ ↑ ↑ ======================== */
/* ======================== ↓ ↓ ↓ Connect Database(MYSQL) ↓ ↓ ↓ ======================== */

/*
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'kj04',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
*/


/* ======================== ↑ ↑ ↑ Connect Database(MYSQL) ↑ ↑ ↑ ======================== */
/* ======================== ↓ ↓ ↓ Option ↓ ↓ ↓ ======================== */


//const cors = require('cors')

app.use(bodyParser.urlencoded({ extended : false }));
//app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

/* ======================== ↑ ↑ ↑ Option ↑ ↑ ↑ ======================== */
/* ======================== ↓ ↓ ↓ Routings ↓ ↓ ↓ ======================== */





/*
app.get('/', (req, res) => {
    res.send('react 와 express 연동!')
})


app.get('/news', (req, res) => {
    res.send('오늘 비옴')
})

app.get('/shop', (req, res) => {
    res.send('쇼핑 페이지입니다.')
})

app.get('/storage', (req, res) => {
    res.send('저장소!')
})

app.get('/editor', (req, res) => {
    res.send('편집기!!!')
})


app.get('/appendgrade', (req, res) => {
        var sql = "INSERT INTO sl_user_grade (usergrade, usergrade_name) VALUES (30, 'banned')";
        conn.query(sql, (err, result) => {
        if (err) console.log("query is not excuted: " + err);
        else res.send(result);
        });
})

*/

    /*
    try {
        const [results, fields] = await connection.query(sql);
      
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
      } catch (err) {
        console.log(err);
      }
    */
    /*
    const exc = await conn.query(sql, (err, result) => {
        if (err) console.log("query is not excuted: " + err);
        else res.send(result);
    })
    */
   /*
    const result = async () => {
        const conn = connection.getConnection();
    
        try {
            const [row] = await conn.query(sql)
            return row
        } catch (e) {
            throw new Error(e)
        } finally {
           conn.release() // pool 을 돌려주는 역할을 한다.
        }
    }
    */


app.get('/', (req, res) => {
    console.log('root')
})




/* 로그인 */

app.post("/process/login", (req, res) => {
    var id = req.body.loginid;
    var passwd = req.body.loginpasswd;

    const sql = "select count(*) as 'cnt' from sl_user where id = ? and pw = ?;";
    db.query(sql, [id, passwd], (err, result) => {
        res.send(result);
        console.log(result[0]);
        if (result[0].cnt === 1) {
        res.send({ message: "success" });
        } else {
        res.send({ message: "fail" });
        }
    })
    });


/* 회원 가입 */

app.post("/userregister", (req, res) => {

    /* 이메일, 전화번호, 프로필 사진 경로 가공 */
    var emailinput = `${req.body.emailinput1}@${req.body.emailinput2}`
    var telinput = `${req.body.telinput1}-${req.body.telinput2}-${req.body.telinput3}`
    var profilepath;
    if (req.body.profileinput === '') {
        profilepath = 'default_profile.jpg';
    } else {
        profilepath = req.body.profileinput;
    }


    //
    db.query(`INSERT INTO sl_user 
    (user_id_name, user_passwd, user_nickname, user_name, usergrade, user_email, user_tel, user_reg_date, user_profile, user_point)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [req.body.idinput, req.body.passwdinput, req.body.nicknameinput, req.body.nameinput, 0,
        emailinput, telinput, new Date(), profilepath, 0],
        (err, data) => {
            if (!err) {
                res.send(data)
                console.log(data)
            }
            else {
                console.log(err)
            }
        })
    });


/* ======================== ↑ ↑ ↑ Routings ↑ ↑ ↑ ======================== */
/* ======================== ↓ ↓ ↓ Connection Inspect ↓ ↓ ↓ ======================== */


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}에서 서버 실행중`)
})










app.get('/movies', (req, res) => {
    console.log('movies')
    db.query("select * from sl_user", (err, data) => {
        if (!err) {
            //console.log(data)
            res.send(data)
        }
        else {
            console.log(err)
        }
    })
})

app.get('/board', (req, res) => {
    console.log('/board')
    db.query("select * from sl_board", (err, data) => {
        if (!err) {
            //console.log(data)
            res.send(data)
        }
        else {
            console.log(err)
        }
    })
})












































































/*
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express()
const port = process.env.port || 4000;

const cors = require('cors')
const bodyParser = require('body-parser')

const db = require('./mysql.js')
const conn = db.init();

app.use(bodyParser.urlencoded({ extended : false }));
app.use(cors());
app.use(bodyParser.json());






app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/text', (req, res) => {

    const text1 = req.body.inText;
    console.log(text1);

    const sendText = {
        text : "전송 성공!!!",
    };
    res.send(sendText);
});


app.get("/", function (req, res) {
    var sql = "select name from sl_user";
    conn.query(sql, (err, result) => {
      if (err) console.log("query is not excuted: " + err);
      else res.send(result);
    });
  });


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});


*/